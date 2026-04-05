import { useEffect, useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { Select } from './Select';
import { Textarea } from './Textarea';

export const CourseApplicationForm = ({ selectedCourse, courses, onSubmit, loading }) => {
  const [formData, setFormData] = useState({ name: '', cnic: '', courseId: selectedCourse?.id || '' });

  useEffect(() => {
    setFormData((current) => ({ ...current, courseId: selectedCourse?.id || '' }));
  }, [selectedCourse]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  return (
    <form className="grid gap-4" onSubmit={(event) => { event.preventDefault(); onSubmit(formData); }}>
      <Input label="Name" name="name" onChange={handleChange} placeholder="Enter full name" required value={formData.name} />
      <Input label="CNIC" name="cnic" onChange={handleChange} placeholder="42101-1234567-8" required value={formData.cnic} />
      <Select label="Course" name="courseId" onChange={handleChange} required value={formData.courseId}>
        <option value="">Select a course</option>
        {courses.map((course) => (
          <option key={course.id} value={course.id}>{course.name}</option>
        ))}
      </Select>
      <div className="flex justify-end">
        <Button disabled={loading} type="submit">{loading ? 'Submitting...' : 'Submit Application'}</Button>
      </div>
    </form>
  );
};

export const AuthForm = ({ fields, onSubmit, buttonLabel, loading, helper }) => {
  const [formData, setFormData] = useState(Object.fromEntries(fields.map((field) => [field.name, ''])));
  return (
    <form className="grid gap-4" onSubmit={(event) => { event.preventDefault(); onSubmit(formData); }}>
      {helper ? <p className="rounded-2xl border border-amber-400/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">{helper}</p> : null}
      {fields.map((field) => (
        <Input key={field.name} label={field.label} name={field.name} onChange={(event) => setFormData((current) => ({ ...current, [field.name]: event.target.value }))} placeholder={field.placeholder} required type={field.type || 'text'} value={formData[field.name]} />
      ))}
      <Button className="mt-2" disabled={loading} type="submit">{loading ? 'Please wait...' : buttonLabel}</Button>
    </form>
  );
};

export const LeaveForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({ reason: '', fromDate: '', toDate: '', file: null });
  return (
    <form className="grid gap-4" onSubmit={(event) => { event.preventDefault(); onSubmit(formData); }}>
      <Textarea label="Reason" name="reason" onChange={(event) => setFormData((current) => ({ ...current, reason: event.target.value }))} placeholder="Briefly explain your leave request" required rows={5} value={formData.reason} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Date From" name="fromDate" onChange={(event) => setFormData((current) => ({ ...current, fromDate: event.target.value }))} required type="date" value={formData.fromDate} />
        <Input label="Date To" name="toDate" onChange={(event) => setFormData((current) => ({ ...current, toDate: event.target.value }))} required type="date" value={formData.toDate} />
      </div>
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-slate-200">Upload Image (optional)</span>
        <input className="w-full rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 text-sm text-slate-100" onChange={(event) => setFormData((current) => ({ ...current, file: event.target.files?.[0] || null }))} type="file" />
      </label>
      <div className="flex justify-end">
        <Button disabled={loading} type="submit">{loading ? 'Submitting...' : 'Submit Leave'}</Button>
      </div>
    </form>
  );
};

export const CourseEditorForm = ({ initialValues, onSubmit, loading }) => {
  const [formData, setFormData] = useState(initialValues || { name: '', description: '', status: 'Open' });
  useEffect(() => {
    setFormData(initialValues || { name: '', description: '', status: 'Open' });
  }, [initialValues]);

  return (
    <form className="grid gap-4" onSubmit={(event) => { event.preventDefault(); onSubmit(formData); }}>
      <Input label="Course Name" name="name" onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))} required value={formData.name} />
      <Textarea label="Short Description" name="description" onChange={(event) => setFormData((current) => ({ ...current, description: event.target.value }))} required rows={4} value={formData.description} />
      <Select label="Status" name="status" onChange={(event) => setFormData((current) => ({ ...current, status: event.target.value }))} value={formData.status}>
        <option value="Open">Open</option>
        <option value="Closed">Closed</option>
      </Select>
      <div className="flex justify-end">
        <Button disabled={loading} type="submit">{loading ? 'Saving...' : 'Save Course'}</Button>
      </div>
    </form>
  );
};

export const AdminSettingsForms = {
  AddAdmin: ({ onSubmit, loading }) => {
    const [formData, setFormData] = useState({ name: '', username: '', password: '' });
    return (
      <form className="grid gap-4" onSubmit={(event) => { event.preventDefault(); onSubmit(formData); }}>
        <Input label="Name" name="name" onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))} required value={formData.name} />
        <Input label="Username" name="username" onChange={(event) => setFormData((current) => ({ ...current, username: event.target.value }))} required value={formData.username} />
        <Input label="Password" name="password" onChange={(event) => setFormData((current) => ({ ...current, password: event.target.value }))} required type="password" value={formData.password} />
        <div className="flex justify-end"><Button disabled={loading} type="submit">{loading ? 'Saving...' : 'Add Admin'}</Button></div>
      </form>
    );
  },
  ChangePassword: ({ onSubmit, loading }) => {
    const [formData, setFormData] = useState({ username: '', oldPassword: '', newPassword: '' });
    return (
      <form className="grid gap-4" onSubmit={(event) => { event.preventDefault(); onSubmit(formData); }}>
        <Input label="Username" name="username" onChange={(event) => setFormData((current) => ({ ...current, username: event.target.value }))} required value={formData.username} />
        <Input label="Old Password" name="oldPassword" onChange={(event) => setFormData((current) => ({ ...current, oldPassword: event.target.value }))} required type="password" value={formData.oldPassword} />
        <Input label="New Password" name="newPassword" onChange={(event) => setFormData((current) => ({ ...current, newPassword: event.target.value }))} required type="password" value={formData.newPassword} />
        <div className="flex justify-end"><Button disabled={loading} type="submit">{loading ? 'Updating...' : 'Change Password'}</Button></div>
      </form>
    );
  },
};
