import { Card } from './Card';
import { StatusBadge } from './StatusBadge';
import { Button } from './Button';

export const CourseCard = ({ course, onApply, onEdit, adminView = false }) => (
  <Card className="hover-lift relative flex h-full flex-col overflow-hidden p-6" data-motion="card" data-origin="up">
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-emerald-400/55 via-sky-400/35 to-transparent" />
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-violet-200/90">Course</p>
        <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">{course.name}</h3>
      </div>
      <StatusBadge status={course.status} />
    </div>

    <p className="mt-4 flex-1 text-sm leading-7 text-slate-300">{course.description}</p>

    <div className="mt-6 flex gap-3" data-wave="soft">
      {adminView ? (
        <Button onClick={() => onEdit(course)} type="button" variant="secondary">Edit</Button>
      ) : (
        <Button disabled={course.status === 'Closed'} onClick={() => onApply(course)} type="button">
          {course.status === 'Closed' ? 'Admissions Closed' : 'Apply'}
        </Button>
      )}
    </div>
  </Card>
);
