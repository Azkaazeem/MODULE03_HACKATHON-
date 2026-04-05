const STORAGE_KEY = 'smit-connect-portal-db';

const seed = {
  admins: [
    {
      id: 'admin-1',
      name: 'Portal Super Admin',
      username: 'admin',
      password: 'admin123',
    },
  ],
  students: [
    {
      id: 'student-1',
      full_name: 'Ayesha Khan',
      cnic: '42101-1234567-8',
      roll_number: 'SMIT-001',
      password: 'student123',
      email: 'ayesha@smit.pk',
      city: 'Karachi',
      registered: false,
    },
    {
      id: 'student-2',
      full_name: 'Ahmed Ali',
      cnic: '42101-2345678-9',
      roll_number: 'SMIT-002',
      password: 'student123',
      email: 'ahmed@smit.pk',
      city: 'Karachi',
      registered: false,
    },
  ],
  courses: [
    {
      id: 'course-1',
      name: 'Web and App Development',
      status: 'Open',
      description: 'Frontend and backend development track for modern web products.',
      batch: 'Evening',
    },
    {
      id: 'course-2',
      name: 'Graphic Design',
      status: 'Closed',
      description: 'Creative suite foundations, layouts, branding, and production.',
      batch: 'Weekend',
    },
    {
      id: 'course-3',
      name: 'AI and Data Science',
      status: 'Open',
      description: 'Machine learning concepts, data preparation, and practical deployment.',
      batch: 'Morning',
    },
  ],
  courseApplications: [],
  leaveRequests: [],
};

const read = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    return structuredClone(seed);
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    return structuredClone(seed);
  }
};

const write = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
};

const generateId = (prefix) =>
  `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;

export const mockDb = {
  getState: () => read(),
  setState: (updater) => {
    const current = read();
    const next = updater(current);
    return write(next);
  },
  generateId,
};
