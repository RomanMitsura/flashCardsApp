import React, { useState } from "react";

interface FolderSettingsProps {
  onStartTraining: (settings: {
    sortOrder: "sequential" | "random";
    initialSide: "question" | "answer";
  }) => void;
}

const FolderSettings: React.FC<FolderSettingsProps> = ({ onStartTraining }) => {
  const [sortOrder, setSortOrder] = useState<"sequential" | "random">(
    "sequential"
  );
  const [initialSide, setInitialSide] = useState<"question" | "answer">(
    "question"
  );

  const handleStartTraining = () => onStartTraining({ sortOrder, initialSide });

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-10 border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 tracking-wide">
        Настройки тренировки
      </h3>
      <div className="mb-5">
        <label className="block text-gray-700 font-medium mb-2">Порядок</label>
        <select
          value={sortOrder}
          onChange={(e) =>
            setSortOrder(e.target.value as "sequential" | "random")
          }
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 bg-gray-50"
        >
          <option value="sequential">По порядку</option>
          <option value="random">Случайно</option>
        </select>
      </div>
      <div className="mb-5">
        <label className="block text-gray-700 font-medium mb-2">
          Начальная сторона
        </label>
        <select
          value={initialSide}
          onChange={(e) =>
            setInitialSide(e.target.value as "question" | "answer")
          }
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 bg-gray-50"
        >
          <option value="question">Вопрос</option>
          <option value="answer">Ответ</option>
        </select>
      </div>
      <button
        onClick={handleStartTraining}
        className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-5 py-2 rounded-lg shadow-sm hover:from-green-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-105"
      >
        Начать
      </button>
    </div>
  );
};

export default FolderSettings;
