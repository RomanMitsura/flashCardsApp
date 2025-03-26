import React, { useState } from "react";

interface FolderFormModalProps {
  onAdd: (name: string) => void;
  onClose: () => void;
}

const FolderFormModal: React.FC<FolderFormModalProps> = ({
  onAdd,
  onClose,
}) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name) {
      onAdd(name);
      setName("");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/50 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl transform transition-all duration-300 scale-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 tracking-wide">
          Новая папка
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">
              Название
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 bg-gray-50"
              required
            />
          </div>
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-lg shadow-sm hover:from-green-600 hover:to-teal-600 transition-all duration-200"
            >
              Создать
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FolderFormModal;
