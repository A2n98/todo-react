export const taskStates = {
  planningState: "plan",
  editState: "edit",
  doneState: "done",
};

export interface TaskType {
  text: string;
  id: number;
  isChecked: boolean;
}

export interface TaskStateType {
  state: string;
  id: number;
}

export const TASK_STATE_DEFAULT: TaskStateType = {
  state: taskStates.planningState,
  id: -1,
};

export const TASKS_DEFAULT: TaskType[] = [];
