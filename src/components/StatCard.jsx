import { Card } from './Card';

export const StatCard = ({ label, value, helper }) => (
  <Card className="rounded-[26px] p-5">
    <p className="text-sm text-slate-400">{label}</p>
    <p className="mt-4 text-4xl font-extrabold text-white">{value}</p>
    <p className="mt-2 text-sm text-slate-500">{helper}</p>
  </Card>
);
