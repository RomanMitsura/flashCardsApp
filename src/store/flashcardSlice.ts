import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

interface FlashcardState {
  folders: FolderData[];
  nextFolderId: number;
  nextFlashcardId: number;
  selectedFolderId: number | null;
  isTraining: boolean;
  trainingSettings: {
    sortOrder: "sequential" | "random";
    initialSide: "question" | "answer";
  } | null;
}

const initialState: FlashcardState = {
  folders: JSON.parse(localStorage.getItem("folders") || "[]"),
  nextFolderId:
    JSON.parse(localStorage.getItem("folders") || "[]").length > 0
      ? Math.max(
          ...JSON.parse(localStorage.getItem("folders") || "[]").map(
            (f: FolderData) => f.id
          )
        ) + 1
      : 1,
  nextFlashcardId:
    JSON.parse(localStorage.getItem("folders") || "[]").flatMap(
      (f: FolderData) => f.flashcards
    ).length > 0
      ? Math.max(
          ...JSON.parse(localStorage.getItem("folders") || "[]")
            .flatMap((f: FolderData) => f.flashcards)
            .map((f: FlashcardData) => f.id)
        ) + 1
      : 1,
  selectedFolderId: null,
  isTraining: false,
  trainingSettings: null,
};

const flashcardSlice = createSlice({
  name: "flashcards",
  initialState,
  reducers: {
    addFolder(state, action: PayloadAction<string>) {
      state.folders.push({
        id: state.nextFolderId,
        name: action.payload,
        flashcards: [],
      });
      state.nextFolderId += 1;
      localStorage.setItem("folders", JSON.stringify(state.folders));
    },
    editFolder(
      state,
      action: PayloadAction<{ folderId: number; newName: string }>
    ) {
      const folder = state.folders.find(
        (f) => f.id === action.payload.folderId
      );
      if (folder) folder.name = action.payload.newName;
      localStorage.setItem("folders", JSON.stringify(state.folders));
    },
    deleteFolder(state, action: PayloadAction<number>) {
      state.folders = state.folders.filter((f) => f.id !== action.payload);
      if (state.selectedFolderId === action.payload)
        state.selectedFolderId = null;
      localStorage.setItem("folders", JSON.stringify(state.folders));
    },
    addFlashcard(
      state,
      action: PayloadAction<{
        folderId: number;
        question: string;
        answer: string;
      }>
    ) {
      const folder = state.folders.find(
        (f) => f.id === action.payload.folderId
      );
      if (folder) {
        folder.flashcards.push({
          id: state.nextFlashcardId,
          question: action.payload.question,
          answer: action.payload.answer,
        });
        state.nextFlashcardId += 1;
        localStorage.setItem("folders", JSON.stringify(state.folders));
      }
    },
    editFlashcard(
      state,
      action: PayloadAction<{
        folderId: number;
        flashcardId: number;
        question: string;
        answer: string;
      }>
    ) {
      const folder = state.folders.find(
        (f) => f.id === action.payload.folderId
      );
      if (folder) {
        const card = folder.flashcards.find(
          (c) => c.id === action.payload.flashcardId
        );
        if (card) {
          card.question = action.payload.question;
          card.answer = action.payload.answer;
          localStorage.setItem("folders", JSON.stringify(state.folders));
        }
      }
    },
    deleteFlashcard(
      state,
      action: PayloadAction<{ folderId: number; flashcardId: number }>
    ) {
      const folder = state.folders.find(
        (f) => f.id === action.payload.folderId
      );
      if (folder) {
        folder.flashcards = folder.flashcards.filter(
          (c) => c.id !== action.payload.flashcardId
        );
        localStorage.setItem("folders", JSON.stringify(state.folders));
      }
    },
    setSelectedFolder(state, action: PayloadAction<number | null>) {
      state.selectedFolderId = action.payload;
    },
    startTraining(
      state,
      action: PayloadAction<{
        sortOrder: "sequential" | "random";
        initialSide: "question" | "answer";
      }>
    ) {
      state.isTraining = true;
      state.trainingSettings = action.payload;
    },
    stopTraining(state) {
      state.isTraining = false;
      state.trainingSettings = null;
    },
  },
});

export const {
  addFolder,
  editFolder,
  deleteFolder,
  addFlashcard,
  editFlashcard,
  deleteFlashcard,
  setSelectedFolder,
  startTraining,
  stopTraining,
} = flashcardSlice.actions;
export default flashcardSlice.reducer;
