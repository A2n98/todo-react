import { useState } from "react";
import PlanTask from "./task-states-components/plan-task";
import EditTask from "./task-states-components/edit-task";
import { taskStates, type TaskType, type TaskStateType } from "./shared";
import { TaskStateContext, TaskSetStateContext } from "./task-state-context";
import DoneTask from "./task-states-components/done-task";

export default function Task(props: TaskType) {
  const TASK_STATE: TaskStateType = {
    state: props.isChecked ? taskStates.doneState : taskStates.planningState,
    id: props.id,
  };
  const [taskState, setTaskState] = useState(TASK_STATE);
  return (
    <TaskStateContext value={taskState}>
      <TaskSetStateContext value={setTaskState}>
        {taskStateRouter(taskState.state)}
      </TaskSetStateContext>
    </TaskStateContext>
  );
}

function taskStateRouter(state: string) {
  switch (state) {
    case taskStates.planningState:
      return <PlanTask></PlanTask>;
    case taskStates.editState:
      return <EditTask></EditTask>;
    case taskStates.doneState:
      return <DoneTask></DoneTask>;
  }
}
