interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "success" | "error";
  title?: string;
  message?: string;
}

export default function ResultModal({
  isOpen,
  onClose,
  type,
  title,
  message,
}: ResultModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getConfig = () => {
    if (type === "success") {
      return {
        title: title || "Başarılı",
        message: message || "Sabitler İçerisinden Çıkarıldı.",
        icon: (
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
        iconBg: "bg-green-100",
      };
    } else {
      return {
        title: title || "Uyarı!",
        message: message || "Sabitler İçerisinden Çıkarılırken Hata Oluştu.",
        icon: (
          <svg
            className="h-8 w-8 text-yellow-600"
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
        ),
        iconBg: "bg-yellow-100",
      };
    }
  };

  const config = getConfig();

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <div className="text-center">
          <div className="mb-4">
            <div
              className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${config.iconBg}`}
            >
              {config.icon}
            </div>
          </div>

          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {config.title}
          </h3>

          <p className="text-sm text-gray-500 mb-6">{config.message}</p>

          <button
            onClick={onClose}
            className="px-8 py-2 text-white bg-green-500 rounded hover:bg-green-600 transition-colors font-medium"
          >
            TAMAM
          </button>
        </div>
      </div>
    </div>
  );
}
