import { useEffect, useMemo, useState } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { CourseApplicationForm, LeaveForm } from '../components/Forms';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Modal } from '../components/Modal';
import { StatusBadge } from '../components/StatusBadge';
import { StatCard } from '../components/StatCard';
import { useToast } from '../components/ToastProvider';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { logoutStudent } from '../redux/slices/authSlice';
import { fetchApplications, fetchCourses, submitApplication } from '../redux/slices/courseSlice';
import { fetchLeaves, submitLeave } from '../redux/slices/leaveSlice';
import { formatDate } from '../utils/helpers';

export const StudentDashboardPage = () => {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const student = useAppSelector((state) => state.auth.student);
  const courseState = useAppSelector((state) => state.courses);
  const leaveState = useAppSelector((state) => state.leaves);
  const [courseModal, setCourseModal] = useState(false);
  const [leaveModal, setLeaveModal] = useState(false);

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchLeaves());
    dispatch(fetchApplications());
  }, [dispatch]);

  const openCourses = useMemo(() => courseState.items.filter((item) => item.status === 'Open').length, [courseState.items]);
  const myLeaves = useMemo(() => leaveState.items.filter((item) => item.studentName === student?.name), [leaveState.items, student]);

  return (
    <div className="page-shell space-y-6 py-4">
      <Card className="rounded-[32px] p-6 sm:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-violet-200">Student Dashboard</p>
            <h1 className="mt-3 text-3xl font-bold text-white">Hello, {student?.name || 'Student'}</h1>
            <p className="mt-2 text-sm text-slate-400">View courses, apply for admissions, and manage leave requests.</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => setCourseModal(true)} variant="secondary">Apply for Course</Button>
            <Button onClick={() => setLeaveModal(true)}>Request Leave</Button>
            <Button onClick={() => dispatch(logoutStudent())} variant="ghost">Logout</Button>
          </div>
        </div>
      </Card>

      <div className="grid gap-5 md:grid-cols-3">
        <StatCard helper="Currently accepting admissions" label="Open Courses" value={openCourses} />
        <StatCard helper="Your total history" label="Leave Requests" value={myLeaves.length} />
        <StatCard helper="Pending decisions" label="Pending" value={myLeaves.filter((item) => item.status === 'Pending').length} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Card className="rounded-[30px] p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">Courses</h2>
            {courseState.status === 'loading' ? <LoadingSpinner label="Fetching" /> : null}
          </div>
          <div className="space-y-4">
            {courseState.items.map((course) => (
              <div className="rounded-[24px] border border-white/8 bg-white/5 p-4" key={course.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-white">{course.name}</h3>
                    <p className="mt-2 text-sm text-slate-400">{course.description}</p>
                  </div>
                  <StatusBadge status={course.status} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-[30px] p-6">
          <h2 className="text-2xl font-semibold text-white">Leave History</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-slate-400">
                <tr>
                  <th className="pb-3">Reason</th>
                  <th className="pb-3">Date Range</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {myLeaves.length ? myLeaves.map((leave) => (
                  <tr className="border-t border-white/8" key={leave.id}>
                    <td className="py-4 pr-4 text-slate-200">{leave.reason}</td>
                    <td className="py-4 pr-4 text-slate-400">{formatDate(leave.fromDate)} - {formatDate(leave.toDate)}</td>
                    <td className="py-4"><StatusBadge status={leave.status} /></td>
                  </tr>
                )) : (
                  <tr><td className="py-6 text-slate-500" colSpan="3">No leave requests yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <Modal onClose={() => setCourseModal(false)} open={courseModal} title="Apply for Course">
        <CourseApplicationForm
          courses={courseState.items}
          onSubmit={async (values) => {
            const course = courseState.items.find((item) => item.id === values.courseId);
            await dispatch(submitApplication({ ...values, courseName: course?.name || '' }));
            showToast('Course application submitted.');
            setCourseModal(false);
          }}
          selectedCourse={courseState.items.find((item) => item.status === 'Open')}
        />
      </Modal>

      <Modal onClose={() => setLeaveModal(false)} open={leaveModal} title="Submit Leave Request">
        <LeaveForm
          loading={leaveState.status === 'loading'}
          onSubmit={async (values) => {
            await dispatch(submitLeave({ ...values, studentName: student?.name || 'Student' }));
            showToast('Leave request submitted.');
            setLeaveModal(false);
          }}
        />
      </Modal>
    </div>
  );
};
