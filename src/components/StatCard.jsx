import { Card } from './Card';

export const StatCard = ({ label, value, helper }) => (
  <Card className="relative overflow-hidden p-5">
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-emerald-400/50 via-sky-400/30 to-transparent" />
    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">{label}</p>
    <p className="mt-4 text-4xl font-extrabold tracking-tight text-white">{value}</p>
    <p className="mt-2 max-w-[18rem] text-sm leading-6 text-slate-400">{helper}</p>
  </Card>
);
