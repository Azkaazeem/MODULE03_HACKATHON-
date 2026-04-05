import { Button } from './Button';

export const Topbar = ({ title, subtitle, action, actionLabel, onAction }) => (
  <div className="glass-card relative overflow-hidden p-6 sm:p-7">
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-emerald-400/55 via-sky-400/35 to-transparent" />
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-200">Admin Panel</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-400">{subtitle}</p>
      </div>
      {action ? action : actionLabel ? <Button onClick={onAction}>{actionLabel}</Button> : null}
    </div>
  </div>
);
