import React, { useState } from "react";

interface FlashcardProps {
  question: string;
  answer: string;
  initialSide: "question" | "answer";
}

const Flashcard: React.FC<FlashcardProps> = ({
  question,
  answer,
  initialSide,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => setIsFlipped(!isFlipped);

  const displayedText = isFlipped
    ? initialSide === "question"
      ? answer
      : question
    : initialSide === "question"
      ? question
      : answer;

  const bgColor = isFlipped
    ? initialSide === "question"
      ? "bg-gradient-to-br from-green-100 to-green-200"
      : "bg-gradient-to-br from-blue-50 to-blue-100"
    : initialSide === "question"
      ? "bg-gradient-to-br from-blue-50 to-blue-100"
      : "bg-gradient-to-br from-green-100 to-green-200";

  return (
    <div
      className={`w-72 h-48 perspective-1000 cursor-pointer transition-all duration-300 transform hover:scale-105 `}
      onClick={handleFlip}
    >
      <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d">
        <div
          className={`absolute w-full h-full backface-hidden ${bgColor} rounded-xl  flex items-center justify-center border border-gray-100`}
        >
          <p className="text-lg font-medium text-gray-800 text-center p-6">
            {displayedText}
          </p>
        </div>
        <div
          className={`absolute w-full h-full backface-hidden ${bgColor} rounded-xl shadow-sm flex items-center justify-center rotate-y-180 border border-gray-100`}
        >
          <p className="text-lg font-medium text-gray-800 text-center p-6">
            {displayedText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
