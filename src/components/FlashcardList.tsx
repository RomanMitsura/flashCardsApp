import React, { useState } from "react";
import Flashcard from "./Flashcard";
import EditFlashcardModal from "./EditFlashcardModal";

interface FlashcardData {
  id: number;
  question: string;
  answer: string;
}

interface FolderData {
  id: number;
  name: string;
  flashcards: FlashcardData[];
}

interface FlashcardListProps {
  folder: FolderData;
  onEditFlashcard: (
    flashcardId: number,
    question: string,
    answer: string
  ) => void;
  onDeleteFlashcard: (flashcardId: number) => void;
}

const FlashcardList: React.FC<FlashcardListProps> = ({
  folder,
  onEditFlashcard,
  onDeleteFlashcard,
}) => {
  const [editFlashcardId, setEditFlashcardId] = useState<number | null>(null);

  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {folder.flashcards.map((card) => (
          <div key={card.id} className="flex flex-col items-center gap-3 group">
            <Flashcard
              question={card.question}
              answer={card.answer}
              initialSide="question"
            />
            <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={() => setEditFlashcardId(card.id)}
                className="text-gray-600 hover:text-indigo-600 transition-all duration-200 hover:scale-105"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              </button>
              <button
                onClick={() => onDeleteFlashcard(card.id)}
                className="text-gray-600 hover:text-red-600 transition-all duration-200 hover:scale-105"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      {editFlashcardId !== null && (
        <EditFlashcardModal
          flashcard={folder.flashcards.find((c) => c.id === editFlashcardId)!}
          onClose={() => setEditFlashcardId(null)}
          onSave={(question, answer) => {
            onEditFlashcard(editFlashcardId, question, answer);
            setEditFlashcardId(null);
          }}
        />
      )}
    </div>
  );
};

export default FlashcardList;
