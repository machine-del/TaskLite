import styled from "@emotion/styled";
import { TaskItem } from "./task-item";
import type { Task } from "../entities/task";

export type TasksListProps = {
  tasks: Task[];
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
};

export function TasksList(props: TasksListProps) {
  const StyledUl = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: none;
    width: 100%;
    padding: ${(p) => p.theme.spacing(2)};
  `;

  const result = props.tasks.map((t) => (
    <TaskItem
      key={t.id}
      task={t}
      onToggle={props.onToggle}
      onRemove={props.onRemove}
      onEdit={props.onEdit}
    />
  ));

  const isEmpty = result.length > 0 ? result : <li>Список пуст</li>;

  return (
    <div>
      <StyledUl>{isEmpty}</StyledUl>
    </div>
  );
}
