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
    <div className="space-y-6">
      <Topbar
        action={<div className="flex gap-3"><Button onClick={() => setPasswordOpen(true)} variant="secondary">Change Password</Button><Button onClick={() => setAddAdminOpen(true)}>Add Admin</Button></div>}
        subtitle="Quick overview of portal operations and admin settings."
        title="Dashboard"
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard helper="Eligible registered entries" label="Students" value={studentsCount} />
        <StatCard helper="Total created courses" label="Courses" value={courses.length} />
        <StatCard helper="Submitted requests" label="Leaves" value={leaves.length} />
        <StatCard helper="Admission interest" label="Applications" value={applications.length} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-[30px] p-6">
          <h2 className="text-2xl font-semibold text-white">Recent applications</h2>
          <div className="mt-5 space-y-4">
            {applications.length ? applications.slice(0, 4).map((item) => (
              <div className="rounded-[24px] border border-white/8 bg-white/5 p-4" key={item.id}>
                <p className="font-semibold text-white">{item.name}</p>
                <p className="mt-1 text-sm text-slate-400">Applied for {item.courseName}</p>
              </div>
            )) : <p className="text-sm text-slate-500">No applications yet.</p>}
          </div>
        </Card>

        <Card className="rounded-[30px] p-6">
          <h2 className="text-2xl font-semibold text-white">Admin actions</h2>
          <div className="mt-5 space-y-3 text-sm text-slate-300">
            <p>Use the Students area to upload Excel files and view approved student records.</p>
            <p>Use Courses to add or update admissions status through modals.</p>
            <p>Use Leaves to review requests and confirm approval or rejection.</p>
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
