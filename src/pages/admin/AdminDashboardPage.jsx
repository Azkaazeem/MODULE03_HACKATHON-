import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Modal } from '../../components/Modal';
import { StatCard } from '../../components/StatCard';
import { Topbar } from '../../components/Topbar';
import { AdminSettingsForms } from '../../components/Forms';
import { useToast } from '../../components/ToastProvider';
import { useAppSelector } from '../../redux/hooks';
import { portalService } from '../../services/portalService';

export const AdminDashboardPage = () => {
  const { items: courses, applications } = useAppSelector((state) => state.courses);
  const { items: leaves } = useAppSelector((state) => state.leaves);
  const [addAdminOpen, setAddAdminOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [studentsCount, setStudentsCount] = useState(0);
  const { showToast } = useToast();

  useEffect(() => {
    portalService.fetchStudents().then((data) => setStudentsCount(data.length));
  }, []);

  return (
    <div className="space-y-6" data-motion="page-shell">
      <Topbar
        action={<div className="flex flex-wrap gap-3" data-wave="soft"><Button onClick={() => setPasswordOpen(true)} variant="secondary">Change Password</Button><Button onClick={() => setAddAdminOpen(true)}>Add Admin</Button></div>}
        subtitle="Quick overview of portal activity, student volume, course operations, and core admin controls."
        title="Dashboard"
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard helper="Eligible registered entries" label="Students" value={studentsCount} />
        <StatCard helper="Total created courses" label="Courses" value={courses.length} />
        <StatCard helper="Submitted leave requests" label="Leaves" value={leaves.length} />
        <StatCard helper="Admission interest captured" label="Applications" value={applications.length} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="relative overflow-hidden p-6" data-motion="card" data-origin="left">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-emerald-400/55 via-sky-400/35 to-transparent" />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">Applications</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Recent applications</h2>
          </div>
          <div className="mt-5 space-y-4">
            {applications.length ? applications.slice(0, 4).map((item) => (
              <div className="border border-white/8 bg-white/5 p-4" data-wave="soft" key={item.id}>
                <p className="font-semibold text-white">{item.name}</p>
                <p className="mt-1 text-sm text-slate-400">Applied for {item.courseName}</p>
              </div>
            )) : <p className="text-sm text-slate-500">No applications yet.</p>}
          </div>
        </Card>

        <Card className="relative overflow-hidden p-6" data-motion="card" data-origin="right">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-emerald-400/55 via-sky-400/35 to-transparent" />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">Control Notes</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Admin actions</h2>
          </div>
          <div className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
            <p>Use the Students area to upload Excel files and review approved student records.</p>
            <p>Use Courses to create, update, and reopen admissions directly through modal workflows.</p>
            <p>Use Leaves to approve or reject student requests with a cleaner review trail.</p>
          </div>
        </Card>
      </div>

      <Modal onClose={() => setAddAdminOpen(false)} open={addAdminOpen} title="Add New Admin" width="max-w-xl">
        <AdminSettingsForms.AddAdmin
          onSubmit={async (values) => {
            await portalService.addAdmin(values);
            showToast('New admin added.');
            setAddAdminOpen(false);
          }}
        />
      </Modal>

      <Modal onClose={() => setPasswordOpen(false)} open={passwordOpen} title="Change Password" width="max-w-xl">
        <AdminSettingsForms.ChangePassword
          onSubmit={async (values) => {
            try {
              await portalService.changeAdminPassword(values);
              showToast('Password updated successfully.');
              setPasswordOpen(false);
            } catch (error) {
              showToast(error.message, 'error');
            }
          }}
        />
      </Modal>
    </div>
  );
};
