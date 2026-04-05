export const LoadingSpinner = ({ label = 'Loading...' }) => (
  <div className="flex items-center gap-3 text-sm text-slate-300">
    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/25 border-t-violet-300" />
    <span>{label}</span>
  </div>
);
