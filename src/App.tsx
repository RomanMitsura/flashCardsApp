import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store/store";
import {
  addFolder,
  setSelectedFolder,
  startTraining,
  stopTraining,
} from "./store/flashcardSlice";
import FolderList from "./components/FolderList";
import FlashcardList from "./components/FlashcardList";
import FlashcardForm from "./components/FlashcardForm";
import FolderFormModal from "./components/FolderFormModal";
import FolderSettings from "./components/FolderSettings";
import TrainingMode from "./components/TrainingMode";
import EditFolderModal from "./components/EditFolderModal";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { folders, selectedFolderId, isTraining, trainingSettings } =
    useSelector((state: RootState) => state.flashcards);
  const selectedFolder = folders.find(
    (folder) => folder.id === selectedFolderId
  );
  const [editFolderId, setEditFolderId] = useState<number | null>(null);
  const [isFolderFormOpen, setIsFolderFormOpen] = useState(false);

  const handleAddFolder = (name: string) => {
    dispatch(addFolder(name));
    setIsFolderFormOpen(false);
  };
  const handleStartTraining = (settings: {
    sortOrder: "sequential" | "random";
    initialSide: "question" | "answer";
  }) => dispatch(startTraining(settings));
  const handleStopTraining = () => dispatch(stopTraining());
  const handleBackToFolders = () => dispatch(setSelectedFolder(null));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-10 tracking-wide">
          Flashcards
        </h1>
        <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
          {!selectedFolder && !isTraining && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 tracking-wide">
                  Папки
                </h2>
                <button
                  onClick={() => setIsFolderFormOpen(true)}
                  className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-5 py-2 rounded-lg shadow-sm hover:from-green-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-105"
                >
                  Новая папка
                </button>
              </div>
              <FolderList
                folders={folders}
                onSelectFolder={(id) => dispatch(setSelectedFolder(id))}
                onEditFolder={(id) => setEditFolderId(id)}
                onDeleteFolder={(id) =>
                  dispatch({ type: "flashcards/deleteFolder", payload: id })
                }
              />
            </div>
          )}
          {selectedFolder && !isTraining && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 tracking-wide">
                  {selectedFolder.name}
                </h2>
                <button
                  onClick={handleBackToFolders}
                  className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                >
                  ← Назад к папкам
                </button>
              </div>
              <FolderSettings onStartTraining={handleStartTraining} />
              <FlashcardForm
                onAdd={(question, answer) =>
                  dispatch({
                    type: "flashcards/addFlashcard",
                    payload: { folderId: selectedFolder.id, question, answer },
                  })
                }
              />
              <FlashcardList
                folder={selectedFolder}
                onEditFlashcard={(flashcardId, question, answer) =>
                  dispatch({
                    type: "flashcards/editFlashcard",
                    payload: {
                      folderId: selectedFolder.id,
                      flashcardId,
                      question,
                      answer,
                    },
                  })
                }
                onDeleteFlashcard={(flashcardId) =>
                  dispatch({
                    type: "flashcards/deleteFlashcard",
                    payload: { folderId: selectedFolder.id, flashcardId },
                  })
                }
              />
            </div>
          )}
          {isTraining && selectedFolder && trainingSettings && (
            <TrainingMode
              folder={selectedFolder}
              settings={trainingSettings}
              onStopTraining={handleStopTraining}
            />
          )}
        </div>
      </div>
      {editFolderId !== null && (
        <EditFolderModal
          folder={folders.find((f) => f.id === editFolderId)!}
          onClose={() => setEditFolderId(null)}
          onSave={(newName) => {
            dispatch({
              type: "flashcards/editFolder",
              payload: { folderId: editFolderId, newName },
            });
            setEditFolderId(null);
          }}
        />
      )}
      {isFolderFormOpen && (
        <FolderFormModal
          onAdd={handleAddFolder}
          onClose={() => setIsFolderFormOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
