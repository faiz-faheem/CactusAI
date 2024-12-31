import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  historyArr: [], // Array of chat histories
  newChat: false, // State to track if a new chat is being created
  chatIndex: -1, // Current selected chat index
};

export const promptSlice = createSlice({
  name: "Prompt",
  initialState,
  reducers: {
    localHistory: (state, action) => {
      state.historyArr = action.payload;
    },
    addHistory: (state, action) => {
      state.historyArr.push(action.payload);
    },
    updateHistory: (state, action) => {
      let len = state.historyArr.length - 1;
      if (state.chatIndex >= 0) {
        state.historyArr[state.chatIndex] = action.payload;
      } else {
        state.historyArr[len] = action.payload;
      }
    },
    // Updated deleteHistory action to remove a chat from history
    deleteHistory: (state, action) => {
      // Remove the chat history at the given index
      const indexToDelete = action.payload;
      if (indexToDelete >= 0 && indexToDelete < state.historyArr.length) {
        state.historyArr.splice(indexToDelete, 1);

        // Adjust the current selected chat index if necessary
        if (state.chatIndex === indexToDelete) {
          state.chatIndex = -1; // Reset the chatIndex if the deleted chat was selected
        } else if (state.chatIndex > indexToDelete) {
          state.chatIndex -= 1; // Shift the chatIndex down if the deleted chat is before the selected one
        }
      }
    },
    toggleNewChat: (state, action) => {
      state.newChat = action.payload;
    },
    setChatIndex: (state, action) => {
      state.chatIndex = action.payload;
    },
    // New Action for Renaming Chat Titles
    renameChatTitle: (state, action) => {
      const { index, newTitle } = action.payload;
      if (state.historyArr[index] && state.historyArr[index][0]) {
        state.historyArr[index][0].parts[0].text = newTitle; // Update the title
      }
    },
  },
});

export const {
  addHistory,
  updateHistory,
  deleteHistory,
  toggleNewChat,
  setChatIndex,
  localHistory,
  renameChatTitle,
} = promptSlice.actions;

export default promptSlice.reducer;