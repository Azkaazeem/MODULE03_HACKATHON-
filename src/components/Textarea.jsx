export const Textarea = ({ label, className = '', ...props }) => (
  <label className="block">
    {label ? <span className="mb-2 block text-sm font-medium text-slate-200">{label}</span> : null}
    <textarea
      className={`w-full rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-violet-400/60 ${className}`}
      {...props}
    />
  </label>
);
