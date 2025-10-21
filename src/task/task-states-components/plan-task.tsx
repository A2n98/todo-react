import { Checkbox, IconButton, Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { taskStates } from "../shared";
import { useContext } from "react";
import { TaskSetStateContext, TaskStateContext } from "../task-state-context";
import { TaskListContext, TaskListDispatch } from "../../todo/todo-context";

export default function PlanTask() {
  const setTaskState = useContext(TaskSetStateContext);
  const taskState = useContext(TaskStateContext);

  const tasks = useContext(TaskListContext);
  const tasksDispatch = useContext(TaskListDispatch);

  const TASK_TEXT = tasks.find((task) => task.id === taskState.id)?.text;

  function handleClickEditButton() {
    if (!setTaskState) {
      return;
    }
    setTaskState({ ...taskState, state: taskStates.editState });
  }

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
    if (!tasksDispatch || !TASK_TEXT) {
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
            aria-label="edit"
            className="buttonTask"
            size="small"
            edge="end"
            onClick={handleClickEditButton}
          >
            <EditIcon />
          </IconButton>
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
