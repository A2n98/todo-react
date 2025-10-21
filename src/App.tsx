import { useReducer } from "react";
import "./App.css";
import ToDo from "./todo/todo";
import {
  taskReducer,
  TaskListContext,
  TaskListDispatch,
} from "./todo/todo-context";
import { storage } from "./local-storage.tsx";
import { TASKS_DEFAULT } from "./task/shared.tsx";

const TASKS_FROM_STORAGE = storage.getTasks();
const tasksActual = TASKS_FROM_STORAGE ?? TASKS_DEFAULT;

export default function App() {
  const [taskList, dispatch] = useReducer(taskReducer, tasksActual);
  return (
    <>
      <TaskListContext value={taskList}>
        <TaskListDispatch value={dispatch}>
          <ToDo></ToDo>
        </TaskListDispatch>
      </TaskListContext>
    </>
  );
}
