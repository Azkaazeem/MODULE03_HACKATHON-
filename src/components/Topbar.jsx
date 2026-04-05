import { Button } from './Button';

export const Topbar = ({ title, subtitle, action, actionLabel, onAction }) => (
  <div className="glass-card mb-6 rounded-[30px] p-5 sm:p-6">
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.28em] text-violet-200">Admin Panel</p>
        <h1 className="mt-2 text-3xl font-bold text-white">{title}</h1>
        <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
      </div>
      {action ? action : actionLabel ? <Button onClick={onAction}>{actionLabel}</Button> : null}
    </div>
  </div>
);
