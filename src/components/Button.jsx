export const Button = ({ children, className = '', variant = 'primary', ...props }) => {
  const variants = {
    primary: 'gradient-button text-white shadow-[0_16px_36px_rgba(37,99,235,0.2)] hover:shadow-[0_20px_44px_rgba(37,99,235,0.24)]',
    secondary: 'bg-white/6 text-slate-100 border border-white/10 hover:bg-white/10',
    ghost: 'bg-transparent text-slate-200 hover:bg-white/6',
    danger: 'bg-rose-500/16 text-rose-100 border border-rose-400/20 hover:bg-rose-500/24',
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
