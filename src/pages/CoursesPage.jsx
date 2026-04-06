import { useEffect, useMemo, useRef, useState } from 'react';
import { CourseApplicationForm } from '../components/Forms';
import { CourseCard } from '../components/CourseCard';
import { EmptyState } from '../components/EmptyState';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Modal } from '../components/Modal';
import { useToast } from '../components/ToastProvider';
import { usePortalMotion } from '../hooks/usePortalMotion';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchCourses, submitApplication } from '../redux/slices/courseSlice';

export const CoursesPage = () => {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const { items, status } = useAppSelector((state) => state.courses);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const pageRef = useRef(null);

  usePortalMotion(pageRef);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const sortedCourses = useMemo(() => [...items].sort((a, b) => a.name.localeCompare(b.name)), [items]);

  return (
    <div className="page-shell py-4" data-motion="page-shell" ref={pageRef}>
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-violet-200" data-motion="copy">Courses</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-white" data-motion="heading">Available course admissions</h1>
        </div>
        <p className="max-w-xl text-sm leading-7 text-slate-400" data-motion="copy">Browse active admissions, review course descriptions, and apply directly from the portal.</p>
      </div>

      {status === 'loading' ? <LoadingSpinner label="Loading courses..." /> : null}
      {!sortedCourses.length && status !== 'loading' ? (
        <EmptyState title="No courses available" description="Courses added by admin will appear here." />
      ) : null}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {sortedCourses.map((course) => (
          <CourseCard course={course} key={course.id} onApply={setSelectedCourse} />
        ))}
      </div>

      <Modal onClose={() => setSelectedCourse(null)} open={Boolean(selectedCourse)} title="Apply for Course">
        <CourseApplicationForm
          courses={sortedCourses}
          loading={status === 'loading'}
          onSubmit={async (values) => {
            const course = sortedCourses.find((item) => item.id === values.courseId);
            await dispatch(submitApplication({ ...values, courseName: course?.name || '' }));
            showToast('Application submitted successfully.');
            setSelectedCourse(null);
          }}
          selectedCourse={selectedCourse}
        />
      </Modal>
    </div>
  );
};
