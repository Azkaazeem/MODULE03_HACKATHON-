export const cn = (...classes) => classes.filter(Boolean).join(' ');

export const formatDate = (value) => {
  if (!value) return 'N/A';
  return new Date(value).toLocaleDateString('en-PK', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const getStatusColor = (status) => {
  const normalized = (status || '').toLowerCase();
  if (normalized === 'open' || normalized === 'approved') return 'bg-emerald-500/15 text-emerald-200 border-emerald-400/25';
  if (normalized === 'closed' || normalized === 'rejected') return 'bg-rose-500/15 text-rose-200 border-rose-400/25';
  return 'bg-amber-500/15 text-amber-200 border-amber-400/25';
};

export const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));
