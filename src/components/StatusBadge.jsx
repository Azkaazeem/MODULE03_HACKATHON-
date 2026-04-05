import { cn } from '../utils/helpers';
import { getStatusColor } from '../utils/helpers';

export const StatusBadge = ({ status }) => (
  <span className={cn('inline-flex rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.2em] uppercase', getStatusColor(status))}>
    {status}
  </span>
);
