import { Button } from './Button';
import { Modal } from './Modal';

export const ConfirmDialog = ({ open, title, message, onConfirm, onCancel, confirmLabel = 'Confirm' }) => (
  <Modal open={open} onClose={onCancel} title={title} width="max-w-lg">
    <p className="text-sm leading-7 text-slate-300">{message}</p>
    <div className="mt-8 flex justify-end gap-3">
      <Button onClick={onCancel} type="button" variant="secondary">Cancel</Button>
      <Button onClick={onConfirm} type="button">{confirmLabel}</Button>
    </div>
  </Modal>
);
