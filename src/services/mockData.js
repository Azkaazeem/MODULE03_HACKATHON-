const STORAGE_KEY = 'smit-connect-portal-v2';

const seed = {
  admins: [
    { id: 'admin-1', name: 'Portal Admin', username: 'admin', password: 'admin123' },
  ],
  students: [
    { id: 'student-1', name: 'Ayesha Khan', cnic: '42101-1234567-8', rollNumber: 'SMIT-001', password: '', approved: true },
    { id: 'student-2', name: 'Ahmed Ali', cnic: '42101-2345678-9', rollNumber: 'SMIT-002', password: '', approved: true },
  ],
  courses: [
    { id: 'course-1', name: 'Web & App Development', description: 'Modern frontend and backend foundations with project-based learning.', status: 'Open' },
    { id: 'course-2', name: 'Graphic Design', description: 'Visual design, branding systems, and portfolio-ready creative workflows.', status: 'Closed' },
    { id: 'course-3', name: 'AI & Data Science', description: 'Practical AI concepts, data handling, and beginner-friendly model workflows.', status: 'Open' },
  ],
  applications: [],
  leaves: [],
};

const clone = (value) => JSON.parse(JSON.stringify(value));

export const readDb = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    return clone(seed);
  }

  try {
    return JSON.parse(raw);
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    return clone(seed);
  }
};

export const writeDb = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
};

export const updateDb = (updater) => {
  const current = readDb();
  const next = updater(current);
  return writeDb(next);
};

export const makeId = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 7)}`;
