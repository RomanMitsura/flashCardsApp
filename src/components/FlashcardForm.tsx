import React, { useState } from "react";

interface FlashcardFormProps {
  onAdd: (question: string, answer: string) => void;
}

const FlashcardForm: React.FC<FlashcardFormProps> = ({ onAdd }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question && answer) {
      onAdd(question, answer);
      setQuestion("");
      setAnswer("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-sm mb-10 border border-gray-100"
    >
      <div className="mb-5">
        <label className="block text-gray-700 font-medium mb-2">Вопрос</label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 bg-gray-50"
          required
        />
      </div>
      <div className="mb-5">
        <label className="block text-gray-700 font-medium mb-2">Ответ</label>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 bg-gray-50"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-5 py-2 rounded-lg shadow-sm hover:from-indigo-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105"
      >
        Добавить
      </button>
    </form>
  );
};

export default FlashcardForm;
