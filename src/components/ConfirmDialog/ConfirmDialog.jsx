import { useEffect, useRef } from 'react';

const ConfirmDialog = ({
    isOpen,
    title,
    message,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    onConfirm,
    onClose
}) => {
    const dialogRef = useRef(null);

    useEffect(() => {
        const dialog = dialogRef.current;

        if (!dialog) {
            return;
        }

        if (isOpen && !dialog.open) {
            dialog.showModal();
        }

        if (!isOpen && dialog.open) {
            dialog.close();
        }
    }, [isOpen]);

    return (
        <dialog className="modal modal-bottom sm:modal-middle" ref={dialogRef}>
            <div className="modal-box max-w-lg rounded-3xl border border-slate-200 bg-white p-0 shadow-2xl">
                <div className="border-b border-slate-200 px-6 py-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-500">
                        Confirmation
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-slate-900">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{message}</p>
                </div>

                <div className="flex flex-col-reverse gap-3 px-6 py-5 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        className="btn rounded-full border-0 bg-slate-200 text-slate-800 hover:bg-slate-300"
                        onClick={onClose}
                    >
                        {cancelLabel}
                    </button>
                    <button
                        type="button"
                        className="btn rounded-full border-0 bg-amber-400 text-slate-950 hover:bg-amber-300"
                        onClick={onConfirm}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>close</button>
            </form>
        </dialog>
    );
};

export default ConfirmDialog;
