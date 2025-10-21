import { createContext } from "react";
import { TASKS_DEFAULT, type TaskType } from "../task/shared";
import React from "react";
import { storage } from "../local-storage";

type TaskListDispatch = React.ActionDispatch<[action: ActionType]>;
export const TaskListContext = createContext(TASKS_DEFAULT);
export const TaskListDispatch = React.createContext<TaskListDispatch | null>(
  null
);

interface ActionType {
  type: string;
  taskId?: number;
  taskData?: TaskType;
}

export function taskReducer(taskList: TaskType[], action: ActionType) {
  switch (action.type) {
    case "add_task": {
      if (!action.taskData) {
        return [...taskList];
      }
      const newTaskList = [...taskList, { ...action.taskData }];
      storage.setTasks(newTaskList);
      return newTaskList;
    }

    case "delete_task": {
      if (!action.taskId) {
        return [...taskList];
      }
      const newTaskList = taskList.filter((task) => task.id !== action.taskId);
      storage.setTasks(newTaskList);
      return newTaskList;
    }

    case "change_check": {
      if (!action.taskId) {
        return [...taskList];
      }

      const changeTask = taskList.find((task) => task.id === action.taskId);
      if (!changeTask) {
        return [...taskList];
      }
      const newTask = { ...changeTask, isChecked: !changeTask?.isChecked };
      const newTaskList = taskList.filter((task) => task.id !== action.taskId);
      if (newTask.isChecked) {
        newTaskList.unshift(newTask);
      } else {
        newTaskList.push(newTask);
      }
      storage.setTasks(newTaskList);
      return newTaskList;
    }

    case "change_task": {
      if (!action.taskData) {
        return [...taskList];
      }

      const taskIndexInList = taskList.findIndex(
        (task) => task.id === action.taskData?.id
      );
      taskList[taskIndexInList] = { ...action.taskData };
      const newTaskList = [...taskList];
      storage.setTasks(newTaskList);
      return newTaskList;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
