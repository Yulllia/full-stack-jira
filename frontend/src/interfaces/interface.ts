import { ReactNode } from "react";

export interface Task {
  id?: number | null,
  name: string;
  description: string;
  dueDate: string | undefined;
  priority: string;
  status: string;
}

export interface VisibleForms {
  [status: string]: {
    [taskId: string]: boolean;
  };
}
export interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: null | string;
  visibleForms: VisibleForms;
  formData: Task;
}

export interface List {
  id: number;
  title: string;
  tasks: Task[];
}
export interface ListSave {
  title: string;
  tasks: Task[];
}
export interface TaskListState {
  list: List[];
  isLoading: boolean;
  error: null | string;
}

export interface DividerLineProps {
  children: ReactNode;
}

export interface ModalState {
  visible: boolean;
  id: number | null | undefined
}
