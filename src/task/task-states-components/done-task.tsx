import { Box, Checkbox, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { TaskStateContext } from "../task-state-context";
import { useContext } from "react";
import { TaskListContext, TaskListDispatch } from "../../todo/todo-context";

export default function DoneTask() {
  const taskState = useContext(TaskStateContext);
  const tasks = useContext(TaskListContext);
  const tasksDispatch = useContext(TaskListDispatch);
  const TASK_TEXT = tasks.find((task) => task.id === taskState.id)?.text;

  function handleDeleteTask() {
    if (!tasksDispatch) {
      return;
    }
    tasksDispatch({
      type: "delete_task",
      taskId: taskState.id,
    });
  }

  function handleChangeCheck() {
    if (!tasksDispatch) {
      return;
    }
    tasksDispatch({
      type: "change_check",
      taskId: taskState.id,
    });
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Checkbox
          sx={{ p: 0, maxHeight: 25, mr: 2 }}
          checked
          onClick={handleChangeCheck}
        />
        <Typography sx={{ flexGrow: 1, textAlign: "left" }}>
          {TASK_TEXT}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <IconButton
            aria-label="delete"
            className="buttonTask"
            size="small"
            edge="end"
            onClick={handleDeleteTask}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}
