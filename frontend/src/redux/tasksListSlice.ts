import { createSlice } from "@reduxjs/toolkit";
import { List, ListSave, TaskListState } from "../interfaces/interface";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const initialState: TaskListState = {
  list: [],
  isLoading: false,
  error: null,
};
export const taskListsApi = createApi({
    reducerPath: "taskListsApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
    tagTypes: ["TaskLists"],
    endpoints: (builder) => ({
      getTasksList: builder.query<List[], void>({
        query: () => `/taskLists`,
        providesTags: ["TaskLists"],
      }),
      saveTaskList: builder.mutation<List, ListSave>({
        query: (list) => ({
          url: `/taskLists`,
          method: "POST",
          body: list,
        }),
        invalidatesTags: ["TaskLists"],
      }),
    }),
  });
  
  const { useGetTasksListQuery, useSaveTaskListMutation } = taskListsApi;

  const taskListSlice = createSlice({
    name: "tasksList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addMatcher(taskListsApi.endpoints.getTasksList.matchPending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addMatcher(taskListsApi.endpoints.getTasksList.matchFulfilled, (state, action) => {
          state.isLoading = false;
          state.list = action.payload
        })
        .addMatcher(taskListsApi.endpoints.getTasksList.matchRejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message || "An error occurred.";
        })
    },
  });

  export { useGetTasksListQuery, useSaveTaskListMutation}
  export default taskListSlice.reducer;
  
  