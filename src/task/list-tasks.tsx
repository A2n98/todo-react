import type { TaskType } from "./shared";
import { Box } from "@mui/material";
import Task from "./task";

interface ListTasksProps {
  title: string;
  tasks: TaskType[];
}

export default function ListTasks({ title, tasks }: ListTasksProps) {
  if (tasks.length === 0) {
    return null;
  }
  const titleWithLenght = title + " (" + tasks.length.toString() + ")";

  return (
    <Box sx={{ mb: 2, mt: 2 }} className="boxStyle listTask">
      <span>{titleWithLenght}</span>
      {tasks.map((task) => (
        <Task
          key={task.id}
          text={task.text}
          isChecked={task.isChecked}
          id={task.id}
        ></Task>
      ))}
    </Box>
  );
}
