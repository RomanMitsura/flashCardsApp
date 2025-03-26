import React, { useState, useEffect } from "react";
import Flashcard from "./Flashcard";

interface FlashcardData {
  id: number;
  question: string;
  answer: string;
}

interface TrainingModeProps {
  folder: { id: number; name: string; flashcards: FlashcardData[] };
  settings: {
    sortOrder: "sequential" | "random";
    initialSide: "question" | "answer";
  };
  onStopTraining: () => void;
}

const TrainingMode: React.FC<TrainingModeProps> = ({
  folder,
  settings,
  onStopTraining,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sortedFlashcards, setSortedFlashcards] = useState<FlashcardData[]>([]);

  useEffect(() => {
    const flashcardsCopy = [...folder.flashcards];
    if (settings.sortOrder === "sequential") {
      setSortedFlashcards(flashcardsCopy.sort(() => Math.random() - 0.5));
    } else {
      setSortedFlashcards(flashcardsCopy.sort(() => Math.random() - 0.5));
    }
  }, [folder.flashcards, settings.sortOrder]);

  const handleNext = () => {
    if (currentIndex < sortedFlashcards.length - 1)
      setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className="mt-10 flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8 tracking-wide">
        Тренировка: {folder.name}
      </h2>
      {sortedFlashcards.length > 0 ? (
        <>
          <Flashcard
            question={sortedFlashcards[currentIndex].question}
            answer={sortedFlashcards[currentIndex].answer}
            initialSide={settings.initialSide}
          />
          <div className="mt-8 flex gap-4">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg shadow-sm hover:bg-gray-300 transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
            >
              Назад
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === sortedFlashcards.length - 1}
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-5 py-2 rounded-lg shadow-sm hover:from-indigo-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
            >
              Далее
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-600 text-lg">Нет карточек</p>
      )}
      <button
        onClick={onStopTraining}
        className="mt-8 bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-lg shadow-sm hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105"
      >
        Завершить
      </button>
    </div>
  );
};

export default TrainingMode;
