import { createSlice } from "@reduxjs/toolkit";
import { TaskState, Task } from "../interfaces/interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Status } from "../enums/Status";

const initialState: TaskState = {
  tasks: [],
  isLoading: false,
  error: null,
  visibleForms: {},
  formData: {
    name: "",
    description: "",
    dueDate: "",
    priority: "",
    status: "",
  },
};

export const taskApi = createApi({
  reducerPath: "tasksApi",
  tagTypes: ["Tasks"],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getTaskByTaskList: builder.query<Task, { id: number | undefined | null }>({
      query: ({ id }) => `tasks/${id}`,
    }),
    deleteTaskAsync: builder.mutation<Task, number |  undefined | null>({
      query: (taskId) => ({
        url: `tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
    deleteAllTaskAsyncByStatus: builder.mutation<
      Task,
      { status: Status; taskListId: number }
    >({
      query: ({ status, taskListId }) => ({
        url: `tasks/allTask/${status}/${taskListId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
    saveTask: builder.mutation<
      Task,
      { taskData: Task; taskListId: number | undefined }
    >({
      query: ({ taskData, taskListId }) => ({
        url: `tasks/${taskListId}`,
        method: "POST",
        body: taskData,
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTaskStatusAsync: builder.mutation<
      Task,
      { taskId: number | undefined | null; status: Status }
    >({
      query: ({ taskId, status }) => ({
        url: `tasks/${taskId}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTask: builder.mutation<Task, Partial<Task>>({
      query: ({ id, ...updateData }) => ({
        url: `tasks/${id}`,
        method: "PUT",
        body: updateData,
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

const {
  useGetTaskByTaskListQuery,
  useDeleteTaskAsyncMutation,
  useDeleteAllTaskAsyncByStatusMutation,
  useSaveTaskMutation,
  useUpdateTaskStatusAsyncMutation,
  useUpdateTaskMutation,
} = taskApi;

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setFormVisibility: (state, action) => {
      const { status, isVisible, taskId } = action.payload;
      state.visibleForms = {
        [status]: {
          [taskId]: isVisible,
        },
      };
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(taskApi.endpoints.getTaskByTaskList.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(
        taskApi.endpoints.getTaskByTaskList.matchFulfilled,
        (state, action) => {
          state.isLoading = false;
          state.tasks[0] = action.payload;
        }
      )
      .addMatcher(
        taskApi.endpoints.getTaskByTaskList.matchRejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.error.message || "An error occurred.";
        }
      )
      .addMatcher(taskApi.endpoints.deleteTaskAsync.matchPending, (state) => {
        state.isLoading = true;
      })
      .addMatcher(
        taskApi.endpoints.deleteTaskAsync.matchFulfilled,
        (state, action) => {
          state.isLoading = false;
          const deletedTaskId = action.payload.id;
          state.tasks = state.tasks.filter((task) => task.id !== deletedTaskId);
        }
      )
      .addMatcher(
        taskApi.endpoints.deleteTaskAsync.matchRejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.error.message || "An error occurred.";
        }
      );
  },
});

export const selectFormData = (state: { tasks: TaskState }) =>
  state.tasks.formData;

export const selectVisibleForms = (state: { tasks: TaskState }) =>
  state.tasks.visibleForms;

export const { setFormVisibility, setFormData } = taskSlice.actions;

export {
  useGetTaskByTaskListQuery,
  useDeleteTaskAsyncMutation,
  useDeleteAllTaskAsyncByStatusMutation,
  useSaveTaskMutation,
  useUpdateTaskStatusAsyncMutation,
  useUpdateTaskMutation,
};

export default taskSlice.reducer;
