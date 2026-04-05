import { Card } from './Card';

export const EmptyState = ({ title, description, action }) => (
  <Card className="p-8 text-center">
    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-xl">+</div>
    <h3 className="text-xl font-semibold text-white">{title}</h3>
    <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
    {action ? <div className="mt-6">{action}</div> : null}
  </Card>
);
