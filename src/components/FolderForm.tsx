import React, { useState } from "react";

interface FolderFormProps {
  onAdd: (name: string) => void;
}

const FolderForm: React.FC<FolderFormProps> = ({ onAdd }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name) {
      onAdd(name);
      setName("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-sm mb-10 w-full max-w-sm border border-gray-100"
    >
      <div className="mb-5">
        <label className="block text-gray-700 font-medium mb-2">
          Название папки
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 bg-gray-50"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-5 py-2 rounded-lg shadow-sm hover:from-green-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-105"
      >
        Создать
      </button>
    </form>
  );
};

export default FolderForm;
