export const Modal = ({ open, title, children, onClose, width = 'max-w-2xl' }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/78 px-4 py-8 backdrop-blur-sm">
      <div className={`glass-card-strong relative w-full ${width} max-h-[90vh] overflow-y-auto rounded-[30px] p-6 sm:p-8`}>
        <div className="mb-6 flex items-start justify-between gap-4">
          <h2 className="text-2xl font-semibold text-white">{title}</h2>
          <button className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300" onClick={onClose} type="button">
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
