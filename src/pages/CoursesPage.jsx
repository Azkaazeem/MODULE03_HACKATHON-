import { useEffect, useMemo, useState } from 'react';
import { CourseApplicationForm } from '../components/Forms';
import { CourseCard } from '../components/CourseCard';
import { EmptyState } from '../components/EmptyState';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Modal } from '../components/Modal';
import { useToast } from '../components/ToastProvider';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchCourses, submitApplication } from '../redux/slices/courseSlice';

export const CoursesPage = () => {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const { items, status } = useAppSelector((state) => state.courses);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const sortedCourses = useMemo(() => [...items].sort((a, b) => a.name.localeCompare(b.name)), [items]);

  return (
    <div className="page-shell py-4">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-violet-200">Courses</p>
        <h1 className="mt-2 text-4xl font-bold text-white">Available course admissions</h1>
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
