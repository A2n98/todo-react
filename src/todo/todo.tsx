import { Box, TextField, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ListTasks from "../task/list-tasks.tsx";
import { useContext, useState } from "react";
import { type TaskType } from "../task/shared.tsx";
import { TaskListContext, TaskListDispatch } from "./todo-context.tsx";

export default function ToDo() {
  const TASK_TEXT_DEFAULT = "";
  const [newTaskText, setNewTaskText] = useState(TASK_TEXT_DEFAULT);

  const listTasksState = useContext(TaskListContext);
  const listTaskDispatch = useContext(TaskListDispatch);

  const planTasks = listTasksState.filter((task) => !task.isChecked);
  const doneTasks = listTasksState.filter((task) => task.isChecked);

  function handleNewTaskTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.value || event.target.value.trim() === "") {
      return;
    }

    setNewTaskText(event.target.value);
  }

  function handleAddTask() {
    if (!listTaskDispatch) {
      return;
    }

    const newTask = {
      text: newTaskText,
      isChecked: false,
      id: nextTaskId(listTasksState),
    };
    listTaskDispatch({ type: "add_task", taskData: newTask });
    setNewTaskText(TASK_TEXT_DEFAULT);
  }

  return (
    <>
      <Box className="boxStyle mainBox">
        <span className="titleBox">TODO</span>
        <Box className="addTasks">
          <TextField
            fullWidth
            label="Введите текст задачи"
            margin="none"
            variant="standard"
            value={newTaskText}
            onChange={handleNewTaskTextChange}
          />
          <IconButton onClick={handleAddTask}>
            <AddIcon />
          </IconButton>
        </Box>
        <ListTasks title="ПЛАН" tasks={planTasks}></ListTasks>
        <ListTasks title="ГОТОВО" tasks={doneTasks}></ListTasks>
      </Box>
    </>
  );
}

function nextTaskId(tasksList: TaskType[]) {
  if (tasksList.length === 0) {
    return 1;
  }

  const maxTaskId = Math.max(...tasksList.map((task) => task.id));
  return maxTaskId + 1;
}
