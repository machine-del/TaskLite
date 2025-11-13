import { useState } from "react";
import { MainButton } from "./main-button";

type TaskInputProps = {
  onAdd: (task: string) => void;
};

export function TaskInput(props: TaskInputProps) {
  const [task, setTask] = useState("");
  return (
    <>
      <input
        type="text"
        value={task}
        onChange={(event) => setTask(event.target.value)}
      />
      <MainButton onClick={() => props.onAdd(task)} text="Добавить" />
    </>
  );
}
