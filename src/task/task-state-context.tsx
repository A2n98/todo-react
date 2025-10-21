import React from "react";
import { TASK_STATE_DEFAULT, type TaskStateType } from "./shared";

type TaskSetState = React.Dispatch<React.SetStateAction<TaskStateType>>;

export const TaskSetStateContext = React.createContext<TaskSetState | null>(
  null
);
export const TaskStateContext = React.createContext(TASK_STATE_DEFAULT);
