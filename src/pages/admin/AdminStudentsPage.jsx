import { useEffect, useState } from 'react';
import { Card } from '../../components/Card';
import { EmptyState } from '../../components/EmptyState';
import { Topbar } from '../../components/Topbar';
import { useToast } from '../../components/ToastProvider';
import { portalService } from '../../services/portalService';

export const AdminStudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    portalService.fetchStudents().then(setStudents);
  }, []);

  return (
    <div className="space-y-6" data-motion="page-shell">
      <Topbar subtitle="Upload Excel files and manage the student registry." title="Student Management" />
      <Card className="rounded-[30px] p-6" data-motion="card" data-origin="left">
        <label className="block rounded-[24px] border border-dashed border-white/12 bg-white/4 p-6 text-sm text-slate-300">
          <span className="mb-3 block font-semibold text-white">Upload Excel file</span>
          <input
            className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3"
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={async (event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              setUploading(true);
              try {
                const next = await portalService.uploadStudents(file);
                setStudents(next);
                showToast('Students imported successfully.');
              } catch (error) {
                showToast(error.message || 'Student import failed.', 'error');
              } finally {
                setUploading(false);
                event.target.value = '';
              }
            }}
          />
          <p className="mt-3 text-xs text-slate-500">Expected columns: Name, CNIC, Roll Number</p>
          {uploading ? <p className="mt-3 text-xs text-violet-200">Uploading...</p> : null}
        </label>
      </Card>

      <Card className="rounded-[30px] p-6" data-motion="table" data-origin="up">
        {!students.length ? <EmptyState description="Uploaded students will appear in this table." title="No students yet" /> : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-slate-400">
                <tr>
                  <th className="pb-3">Name</th>
                  <th className="pb-3">CNIC</th>
                  <th className="pb-3">Roll Number</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr className="border-t border-white/8" key={student.id}>
                    <td className="py-4 pr-4 text-slate-200">{student.name}</td>
                    <td className="py-4 pr-4 text-slate-400">{student.cnic}</td>
                    <td className="py-4 text-slate-400">{student.rollNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};
