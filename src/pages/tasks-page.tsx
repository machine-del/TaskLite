import styled from "@emotion/styled";
import { TaskInput } from "../components/task-input";
import { useEffect, useState } from "react";
import { TasksList } from "../components/tasks-list";
import { makeTask, type Task } from "../entities/task";
import { loadTasks, saveTasks } from "../entities/storage";
import { TaskModal } from "../components/task-modal";
import ProgressBar from "../components/progress-bar";

const Wrapper = styled.div`
  padding: ${(p) => p.theme.spacing(2)};
`;

const ButtonFilter = styled.button<ButtonFilter>`
  padding: ${(p) => p.theme.spacing(2)};
  background-color: ${(p) => (p.active ? "red" : "white")};
`;

interface ButtonFilter {
  active: boolean;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());
  const [isEditingTask, setIsEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState("all");
  // const [SortByDate, setSortByDate] = useState<"new" | "old">("new");
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

  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.complete;
    if (filter === "completed") return t.complete;
    return true;
  });

  // const searchedTasks = filteredTasks.filter((x) => {
  //   return x.title.includes(query);
  // });

  // const sortedTasks = [...searchedTasks].sort((a, b) => {
  //   const ta = new Date(a.created).getTime();
  //   const tb = new Date(b.created).getTime();
  //   return SortByDate === "new" ? tb - ta : ta - tb;
  // });

  const total = tasks.length;
  const completed = tasks.filter((x) => x.complete).length;
  const percent = total !== 0 ? Math.round((completed / total) * 100) : 0;
  const active = total - completed;

  return (
    <Wrapper>
      <TaskInput onAdd={handleAddTask} />
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        type="text"
      />
      <div>
        <div>
          <ButtonFilter
            active={filter === "all"}
            onClick={() => setFilter("all")}
          >
            Все
          </ButtonFilter>
          <ButtonFilter
            active={filter === "active"}
            onClick={() => setFilter("active")}
          >
            Активные
          </ButtonFilter>
          <ButtonFilter
            active={filter === "completed"}
            onClick={() => setFilter("completed")}
          >
            Завершенные
          </ButtonFilter>
        </div>
        {/* 
        <select onClick={(e) => setSortByDate(e.target.value as "new" | "old")}>
          <option value="new">Сначала новые</option>
          <option value="old">Сначала старые</option>
        </select> */}
      </div>
      <ProgressBar percent={percent} />
      <TasksList
        tasks={filteredTasks}
        onToggle={handleToggleTask}
        onEdit={(task) => setIsEditingTask(task)}
        onRemove={handleRemoveTask}
      />

      <div>
        Всего: {total} | Активных: {active} | Выполненных: {completed}
      </div>

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
