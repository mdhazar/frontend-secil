interface ProductActionsProps {
  onSave: () => void;
  onCancel: () => void;
}

export default function ProductActions({
  onSave,
  onCancel,
}: ProductActionsProps) {
  return (
    <div className="flex gap-3 pb-5 w-full justify-end px-2">
      <button
        onClick={onCancel}
        className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-400 transition-colors"
      >
        Vazgeç
      </button>
      <button
        onClick={onSave}
        className="px-4 py-2 text-white bg-blue-400 rounded hover:bg-blue-500 transition-colors"
      >
        Kaydet
      </button>
    </div>
  );
}
