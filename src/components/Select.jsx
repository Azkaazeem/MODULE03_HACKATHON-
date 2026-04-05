export const Select = ({ label, children, className = '', ...props }) => (
  <label className="block">
    {label ? <span className="mb-2 block text-sm font-medium text-slate-200">{label}</span> : null}
    <select
      className={`w-full rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-violet-400/60 ${className}`}
      {...props}
    >
      {children}
    </select>
  </label>
);
