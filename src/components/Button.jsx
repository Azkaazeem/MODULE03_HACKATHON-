export const Button = ({ children, className = '', variant = 'primary', ...props }) => {
  const variants = {
    primary: 'gradient-button text-white shadow-[0_16px_45px_rgba(99,102,241,0.35)] hover:shadow-[0_20px_55px_rgba(99,102,241,0.45)]',
    secondary: 'bg-white/8 text-slate-100 border border-white/12 hover:bg-white/12',
    ghost: 'bg-transparent text-slate-200 hover:bg-white/8',
    danger: 'bg-rose-500/18 text-rose-100 border border-rose-400/20 hover:bg-rose-500/25',
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
