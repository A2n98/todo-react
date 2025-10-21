import { type TaskType } from "./task/shared";

export const storage = {
  keyTasks: "tasks",
  setTasks: function (tasks: TaskType[]) {
    localStorage.setItem(this.keyTasks, JSON.stringify(tasks));
  },
  getTasks: function () {
    const tasksInStorage = localStorage.getItem(this.keyTasks);
    if (!tasksInStorage) {
      return null;
    }

    return JSON.parse(tasksInStorage) as TaskType[];
  },
};
