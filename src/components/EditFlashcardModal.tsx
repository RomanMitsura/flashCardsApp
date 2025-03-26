import React, { useState } from "react";

interface EditFlashcardModalProps {
  flashcard: { id: number; question: string; answer: string };
  onClose: () => void;
  onSave: (question: string, answer: string) => void;
}

const EditFlashcardModal: React.FC<EditFlashcardModalProps> = ({
  flashcard,
  onClose,
  onSave,
}) => {
  const [question, setQuestion] = useState(flashcard.question);
  const [answer, setAnswer] = useState(flashcard.answer);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question && answer) onSave(question, answer);
  };

  return (
    <div className="fixed inset-0 bg-gray-900/50 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl transform transition-all duration-300 scale-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 tracking-wide">
          Редактировать карточку
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">
              Вопрос
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 bg-gray-50"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">
              Ответ
            </label>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
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
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-4 py-2 rounded-lg shadow-sm hover:from-indigo-600 hover:to-blue-600 transition-all duration-200"
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFlashcardModal;
