import { delay } from '../utils/helpers';
import { hasSupabase, supabase } from './supabaseClient';
import { makeId, readDb, updateDb } from './mockData';

const uploadOptionalImage = async (file) => {
  if (!file) return null;

  if (!hasSupabase) {
    return URL.createObjectURL(file);
  }

  const fileName = `${Date.now()}-${file.name}`;
  const { error } = await supabase.storage.from('leave-attachments').upload(fileName, file);
  if (error) throw new Error(error.message);
  const { data } = supabase.storage.from('leave-attachments').getPublicUrl(fileName);
  return data.publicUrl;
};

const normalizeStudent = (student) => ({
  id: student.id,
  name: student.name,
  cnic: String(student.cnic || '').trim(),
  rollNumber: String(student.rollNumber || student.roll_number || '').trim(),
  password: student.password || '',
  approved: student.approved ?? true,
});

const pickValue = (row, keys) => {
  for (const key of keys) {
    if (row[key] !== undefined && row[key] !== null && String(row[key]).trim() !== '') {
      return row[key];
    }
  }
  return '';
};

const normalizeExcelRows = (rows) =>
  rows
    .map((row, index) => {
      let name = '';
      let cnic = '';
      let rollNumber = '';

      if (Array.isArray(row)) {
        name = row[0] || '';
        cnic = row[1] || '';
        rollNumber = row[2] || '';
      } else {
        name = pickValue(row, ['Name', 'name', 'Student Name', 'StudentName', 'student_name']);
        cnic = pickValue(row, ['CNIC', 'cnic', 'Cnic', 'CNIC Number', 'CNIC No']);
        rollNumber = pickValue(row, ['Roll Number', 'RollNumber', 'rollNumber', 'roll_number', 'Roll No', 'roll no', 'SMIT Roll Number']);
      }

      return {
        id: makeId(`student-${index}`),
        name: String(name).trim(),
        cnic: String(cnic).trim(),
        rollNumber: String(rollNumber).trim(),
        password: '',
        approved: true,
      };
    })
    .filter((student) => student.name && student.cnic && student.rollNumber);

export const portalService = {
  async studentSignup(payload) {
    if (hasSupabase) {
      const { data: found } = await supabase
        .from('students')
        .select('*')
        .eq('cnic', payload.cnic)
        .eq('roll_number', payload.rollNumber)
        .single();

      if (!found) throw new Error('Only students added by admin can register.');

      const { data, error } = await supabase
        .from('students')
        .update({ password: payload.password, approved: true })
        .eq('id', found.id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return normalizeStudent(data);
    }

    await delay();
    const db = updateDb((draft) => {
      const student = draft.students.find((item) => item.cnic === payload.cnic && item.rollNumber === payload.rollNumber);
      if (!student) throw new Error('Only students added by admin can register.');
      student.password = payload.password;
      return draft;
    });

    return db.students.find((item) => item.cnic === payload.cnic && item.rollNumber === payload.rollNumber);
  },

  async studentLogin(payload) {
    if (hasSupabase) {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('cnic', payload.cnic)
        .eq('password', payload.password)
        .single();
      if (error || !data) throw new Error('Invalid student credentials.');
      return normalizeStudent(data);
    }

    await delay();
    const student = readDb().students.find((item) => item.cnic === payload.cnic && item.password === payload.password);
    if (!student) throw new Error('Invalid student credentials.');
    return student;
  },

  async adminLogin(payload) {
    if (hasSupabase) {
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .eq('username', payload.username)
        .eq('password', payload.password)
        .single();
      if (error || !data) throw new Error('Invalid admin credentials.');
      return data;
    }

    await delay();
    const admin = readDb().admins.find((item) => item.username === payload.username && item.password === payload.password);
    if (!admin) throw new Error('Invalid admin credentials.');
    return admin;
  },

  async fetchCourses() {
    if (hasSupabase) {
      const { data, error } = await supabase.from('courses').select('*').order('name');
      if (error) throw new Error(error.message);
      return data;
    }
    await delay();
    return readDb().courses;
  },

  async submitApplication(payload) {
    if (hasSupabase) {
      const { data, error } = await supabase.from('applications').insert(payload).select().single();
      if (error) throw new Error(error.message);
      return data;
    }
    await delay();
    const db = updateDb((draft) => {
      draft.applications.unshift({ id: makeId('application'), ...payload, createdAt: new Date().toISOString() });
      return draft;
    });
    return db.applications[0];
  },

  async fetchStudents() {
    if (hasSupabase) {
      const { data, error } = await supabase.from('students').select('*').order('name');
      if (error) throw new Error(error.message);
      return data.map(normalizeStudent);
    }
    await delay();
    return readDb().students;
  },

  async uploadStudents(file) {
    const XLSX = await import('xlsx');
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const objectRows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
    let importedStudents = normalizeExcelRows(objectRows);

    if (!importedStudents.length) {
      const rawRows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
      importedStudents = normalizeExcelRows(rawRows);
    }

    if (!importedStudents.length) {
      throw new Error('Excel file me ya to headers use karo: Name, CNIC, Roll Number; ya phir first 3 columns me direct Name, CNIC, Roll Number rakho.');
    }

    if (hasSupabase) {
      const payload = importedStudents.map((student) => ({
        name: student.name,
        cnic: student.cnic,
        roll_number: student.rollNumber,
        password: student.password,
        approved: true,
      }));

      const { error } = await supabase.from('students').upsert(payload, { onConflict: 'cnic' });
      if (error) throw new Error(error.message);
      return this.fetchStudents();
    }

    await delay();
    const db = updateDb((draft) => {
      importedStudents.forEach((student) => {
        const existing = draft.students.find(
          (item) => item.cnic === student.cnic || item.rollNumber === student.rollNumber,
        );

        if (existing) {
          existing.name = student.name;
          existing.cnic = student.cnic;
          existing.rollNumber = student.rollNumber;
          existing.approved = true;
        } else {
          draft.students.unshift(student);
        }
      });
      return draft;
    });

    return db.students;
  },

  async saveCourse(payload) {
    if (hasSupabase) {
      const query = payload.id
        ? supabase.from('courses').update({ name: payload.name, status: payload.status, description: payload.description }).eq('id', payload.id)
        : supabase.from('courses').insert({ name: payload.name, status: payload.status, description: payload.description });
      const { data, error } = await query.select().single();
      if (error) throw new Error(error.message);
      return data;
    }

    await delay();
    const db = updateDb((draft) => {
      if (payload.id) {
        const item = draft.courses.find((course) => course.id === payload.id);
        Object.assign(item, payload);
      } else {
        draft.courses.unshift({ id: makeId('course'), ...payload });
      }
      return draft;
    });

    return payload.id ? db.courses.find((item) => item.id === payload.id) : db.courses[0];
  },

  async submitLeave(payload) {
    const imageUrl = await uploadOptionalImage(payload.file);

    if (hasSupabase) {
      const { data, error } = await supabase
        .from('leave_requests')
        .insert({
          student_name: payload.studentName,
          reason: payload.reason,
          from_date: payload.fromDate,
          to_date: payload.toDate,
          status: 'Pending',
          image_url: imageUrl,
        })
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data;
    }

    await delay();
    const db = updateDb((draft) => {
      draft.leaves.unshift({
        id: makeId('leave'),
        studentName: payload.studentName,
        reason: payload.reason,
        fromDate: payload.fromDate,
        toDate: payload.toDate,
        status: 'Pending',
        imageUrl,
      });
      return draft;
    });
    return db.leaves[0];
  },

  async fetchLeaves() {
    if (hasSupabase) {
      const { data, error } = await supabase.from('leave_requests').select('*').order('from_date', { ascending: false });
      if (error) throw new Error(error.message);
      return data.map((item) => ({
        id: item.id,
        studentName: item.student_name,
        reason: item.reason,
        fromDate: item.from_date,
        toDate: item.to_date,
        status: item.status,
        imageUrl: item.image_url,
      }));
    }
    await delay();
    return readDb().leaves;
  },

  async updateLeaveStatus({ id, status }) {
    if (hasSupabase) {
      const { data, error } = await supabase.from('leave_requests').update({ status }).eq('id', id).select().single();
      if (error) throw new Error(error.message);
      return {
        id: data.id,
        studentName: data.student_name,
        reason: data.reason,
        fromDate: data.from_date,
        toDate: data.to_date,
        status: data.status,
        imageUrl: data.image_url,
      };
    }
    await delay();
    const db = updateDb((draft) => {
      const leave = draft.leaves.find((item) => item.id === id);
      if (leave) leave.status = status;
      return draft;
    });
    return db.leaves.find((item) => item.id === id);
  },

  async addAdmin(payload) {
    await delay();
    const db = updateDb((draft) => {
      draft.admins.unshift({ id: makeId('admin'), ...payload });
      return draft;
    });
    return db.admins[0];
  },

  async changeAdminPassword({ username, oldPassword, newPassword }) {
    await delay();
    const db = updateDb((draft) => {
      const admin = draft.admins.find((item) => item.username === username && item.password === oldPassword);
      if (!admin) throw new Error('Old password is incorrect.');
      admin.password = newPassword;
      return draft;
    });
    return db.admins.find((item) => item.username === username);
  },

  async fetchApplications() {
    await delay();
    return readDb().applications;
  },
};
