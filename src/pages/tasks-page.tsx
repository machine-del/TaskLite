import styled from "@emotion/styled";
import { TaskInput } from "../components/task-input";
import { useEffect, useState } from "react";
import { TasksList } from "../components/tasks-list";
import { makeTask, type Task } from "../entities/task";
import { loadTasks, saveTasks } from "../entities/storage";
import { TaskModal } from "../components/task-modal";
import ProgressBar from "../components/progress-bar";
import { Filters } from "../components/Filters";
import { Title } from "../components/Title";

const Wrapper = styled.div`
  padding: ${(p) => p.theme.spacing(2)};
  max-width: 700px;
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
`;

const InformationTasks = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InfoText = styled.div`
  color: #868687;
`;

const StyledButton = styled.button`
  padding: ${(p) => p.theme.spacing(1.2)};
  border: 1px dashed #9b79cf;
  border-radius: 6px;
  color: #9b79cf;
  transition: 0.2s ease;
  cursor: pointer;

  &:hover {
    border: 1px solid #b88ef7ff;
    color: #b88ef7ff;
  }
`;

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());
  const [isEditingTask, setIsEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState("all");
  const [SortByDate, setSortByDate] = useState<"new" | "old">("new");
  const [query, setQuery] = useState("");

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const handleRemoveTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleAddTask = (title: string) => {
    const newTask = makeTask(title);
    setTasks([newTask, ...tasks]);
  };

  const handleEditTask = (
    id: string,
    newTitle: string,
    newDescription: string,
    newDeadline: Date | null
  ) => {
    setTasks(
      tasks.map((t) =>
        t.id === id
          ? {
              ...t,
              title: newTitle,
              description: newDescription,
              deadline: newDeadline,
            }
          : t
      )
    );
  };

  const handleToggleTask = (id: string) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, complete: !t.complete } : t))
    );
  };

  const handleClearCompleted = () => {
    setTasks(tasks.filter((task) => !task.complete));
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.complete;
    if (filter === "completed") return t.complete;
    return true;
  });

  const searchedTasks = filteredTasks.filter((x) => {
    return x.title.includes(query.trim().toLowerCase());
  });

  const sortedTasks = [...searchedTasks].sort((a, b) => {
    const ta = new Date(a.created).getTime();
    const tb = new Date(b.created).getTime();
    return SortByDate === "new" ? tb - ta : ta - tb;
  });

  const total = tasks.length;
  const completed = tasks.filter((x) => x.complete).length;
  const percent = total !== 0 ? Math.round((completed / total) * 100) : 0;
  const active = total - completed;

  return (
    <Wrapper>
      <Container>
        <Title text="TaskLite" />
        <TaskInput onAdd={handleAddTask} setQuery={setQuery} query={query} />

        <Filters
          filter={filter}
          onFilterChange={setFilter}
          sortByDate={SortByDate}
          onSortChange={setSortByDate}
        />

        <ProgressBar percent={percent} />
        <TasksList
          tasks={sortedTasks}
          onToggle={handleToggleTask}
          onEdit={(task) => setIsEditingTask(task)}
          onRemove={handleRemoveTask}
        />

        <InformationTasks>
          <InfoText>
            Всего: {total} | Активных: {active} | Выполненных: {completed}
          </InfoText>
          <StyledButton
            onClick={handleClearCompleted}
            disabled={completed === 0}
          >
            Очистить выполненные
          </StyledButton>
        </InformationTasks>
      </Container>

      {isEditingTask && (
        <TaskModal
          task={isEditingTask}
          onClose={() => setIsEditingTask(null)}
          onSave={handleEditTask}
        />
      )}
    </Wrapper>
  );
}
