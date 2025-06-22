interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Uyarı!",
  message = "Sabitlerden Çıkarılacaktır Emin Misiniz?",
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0  bg-black/50  flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <div className="text-center">
          <div className="mb-4">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full">
              <svg
                className="h-8 w-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
          </div>

          <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>

          <p className="text-sm text-gray-500 mb-6">{message}</p>

          <div className="flex gap-3 justify-center">
            <button
              onClick={onClose}
              className="px-6 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition-colors font-medium"
            >
              Vazgeç
            </button>
            <button
              onClick={onConfirm}
              className="px-6 py-2 text-white bg-green-500 rounded hover:bg-green-600 transition-colors font-medium"
            >
              Onayla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
