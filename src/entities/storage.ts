import type { Task } from "./task";

const STORAGE_KEY = "tasks";
export function saveTasks(tasks: Task[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return parsed.map((task: Task) => ({
      ...task,
      created: new Date(task.created),
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
}
