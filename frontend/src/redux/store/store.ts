import { configureStore } from "@reduxjs/toolkit";
import { taskApi } from "../tasksSlice";
import { taskListsApi } from "../tasksListSlice";
import tasksReducer from '../tasksSlice';
import modalReducer from '../modalSlice';


const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    modal: modalReducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [taskListsApi.reducerPath]: taskListsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      taskListsApi.middleware,
      taskApi.middleware,
    ]),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
