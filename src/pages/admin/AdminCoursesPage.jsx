import { useEffect, useState } from 'react';
import { CourseCard } from '../../components/CourseCard';
import { CourseEditorForm } from '../../components/Forms';
import { Modal } from '../../components/Modal';
import { Topbar } from '../../components/Topbar';
import { useToast } from '../../components/ToastProvider';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchCourses, saveCourse } from '../../redux/slices/courseSlice';

export const AdminCoursesPage = () => {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const courses = useAppSelector((state) => state.courses.items);
  const [editingCourse, setEditingCourse] = useState(null);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  return (
    <div className="space-y-6" data-motion="page-shell">
      <Topbar actionLabel="Add Course" onAction={() => setEditingCourse({ name: '', description: '', status: 'Open' })} subtitle="Add or update courses using modal forms." title="Course Management" />
      <div className="grid gap-5 md:grid-cols-2">
        {courses.map((course) => (
          <CourseCard adminView course={course} key={course.id} onEdit={setEditingCourse} />
        ))}
      </div>

      <Modal onClose={() => setEditingCourse(null)} open={Boolean(editingCourse)} title={editingCourse?.id ? 'Edit Course' : 'Add Course'}>
        <CourseEditorForm
          initialValues={editingCourse}
          onSubmit={async (values) => {
            await dispatch(saveCourse(values));
            showToast(editingCourse?.id ? 'Course updated.' : 'Course added.');
            setEditingCourse(null);
          }}
        />
      </Modal>
    </div>
  );
};
