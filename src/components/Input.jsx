export const Input = ({ label, className = '', rightElement = null, ...props }) => (
  <label className="block">
    {label ? <span className="mb-2 block text-sm font-medium tracking-[0.01em] text-slate-200">{label}</span> : null}
    <div className="relative">
      <input
        className={`w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3.5 text-sm text-slate-900 shadow-[0_10px_25px_rgba(15,23,42,0.06)] outline-none transition placeholder:text-slate-400 focus:border-emerald-400/60 focus:bg-white focus:shadow-[0_0_0_4px_rgba(34,165,89,0.08)] ${rightElement ? 'pr-14' : ''} ${className}`}
        {...props}
      />
      {rightElement ? <div className="absolute inset-y-0 right-3 flex items-center">{rightElement}</div> : null}
    </div>
  </label>
);
