import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ModalState } from "../interfaces/interface";

const initialState: ModalState = {
    visible: false,
    id: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    showModal: (
      state,
      action: PayloadAction<{ id: number | undefined | null }>
    ) => {
        state.visible = true;
        state.id = action.payload.id;
    },
    hideModal: (state) => {
        state.visible = false;
        state.id = null
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;
