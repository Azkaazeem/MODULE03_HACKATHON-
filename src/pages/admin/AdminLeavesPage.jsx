import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { EmptyState } from '../../components/EmptyState';
import { Modal } from '../../components/Modal';
import { StatusBadge } from '../../components/StatusBadge';
import { Topbar } from '../../components/Topbar';
import { useToast } from '../../components/ToastProvider';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchLeaves, updateLeaveStatus } from '../../redux/slices/leaveSlice';
import { formatDate } from '../../utils/helpers';

export const AdminLeavesPage = () => {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const leaves = useAppSelector((state) => state.leaves.items);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [confirm, setConfirm] = useState({ open: false, status: '', leaveId: '' });

  useEffect(() => {
    dispatch(fetchLeaves());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <Topbar subtitle="Review all leave requests and take action with confirmation." title="Leave Management" />
      <Card className="rounded-[30px] p-6">
        {!leaves.length ? <EmptyState description="New leave requests will show here." title="No leave requests" /> : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-slate-400">
                <tr>
                  <th className="pb-3">Student Name</th>
                  <th className="pb-3">Date Range</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave) => (
                  <tr className="border-t border-white/8" key={leave.id}>
                    <td className="py-4 pr-4 text-slate-200">{leave.studentName}</td>
                    <td className="py-4 pr-4 text-slate-400">{formatDate(leave.fromDate)} - {formatDate(leave.toDate)}</td>
                    <td className="py-4 pr-4"><StatusBadge status={leave.status} /></td>
                    <td className="py-4">
                      <div className="flex flex-wrap gap-2">
                        <Button onClick={() => setSelectedLeave(leave)} type="button" variant="secondary">View</Button>
                        <Button onClick={() => setConfirm({ open: true, status: 'Approved', leaveId: leave.id })} type="button">Approve</Button>
                        <Button onClick={() => setConfirm({ open: true, status: 'Rejected', leaveId: leave.id })} type="button" variant="danger">Reject</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal onClose={() => setSelectedLeave(null)} open={Boolean(selectedLeave)} title="Leave Details" width="max-w-xl">
        {selectedLeave ? (
          <div className="space-y-4 text-sm text-slate-300">
            <div><span className="font-semibold text-white">Student:</span> {selectedLeave.studentName}</div>
            <div><span className="font-semibold text-white">Reason:</span> {selectedLeave.reason}</div>
            <div><span className="font-semibold text-white">Date Range:</span> {formatDate(selectedLeave.fromDate)} - {formatDate(selectedLeave.toDate)}</div>
            <div><span className="font-semibold text-white">Status:</span> {selectedLeave.status}</div>
            {selectedLeave.imageUrl ? <img alt="Leave attachment" className="rounded-[24px]" src={selectedLeave.imageUrl} /> : null}
          </div>
        ) : null}
      </Modal>

      <ConfirmDialog
        confirmLabel={confirm.status === 'Approved' ? 'Approve' : 'Reject'}
        message={`Are you sure you want to mark this request as ${confirm.status}?`}
        onCancel={() => setConfirm({ open: false, status: '', leaveId: '' })}
        onConfirm={async () => {
          await dispatch(updateLeaveStatus({ id: confirm.leaveId, status: confirm.status }));
          showToast(`Leave ${confirm.status.toLowerCase()}.`);
          setConfirm({ open: false, status: '', leaveId: '' });
        }}
        open={confirm.open}
        title="Confirm Action"
      />
    </div>
  );
};
