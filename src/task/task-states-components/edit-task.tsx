import { TextField, IconButton, Box } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { useContext } from "react";
import { TaskSetStateContext, TaskStateContext } from "../task-state-context";
import { taskStates } from "../shared";
import { TaskListContext, TaskListDispatch } from "../../todo/todo-context";

export default function EditTask() {
  const taskState = useContext(TaskStateContext);
  const setTaskStateContext = useContext(TaskSetStateContext);

  const tasks = useContext(TaskListContext);
  const tasksDispatch = useContext(TaskListDispatch);

  const TASK_TEXT = tasks.find((task) => task.id === taskState.id)?.text;

  function handleSaveChanges() {
    if (!setTaskStateContext) {
      return;
    }
    setTaskStateContext({ ...taskState, state: taskStates.planningState });
  }

  function handleEditTaskText(event: React.ChangeEvent<HTMLInputElement>) {
    const isEventValueExist =
      event.target.value && event.target.value.trim() !== "";
    if (!isEventValueExist || !tasksDispatch) {
      return;
    }

    tasksDispatch({
      type: "change_task",
      taskData: {
        id: taskState.id,
        text: event.target.value,
        isChecked: false,
      },
    });
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TextField
          fullWidth
          value={TASK_TEXT}
          margin="none"
          variant="standard"
          onChange={handleEditTaskText}
        />
        <Box>
          <IconButton
            aria-label="doneEdit"
            className="buttonTask"
            size="small"
            edge="end"
            onClick={handleSaveChanges}
          >
            <DoneIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}
