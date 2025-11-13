export type Task = {
  readonly id: string;
  title: string;
  created: Date;
  description?: string;
  complete: boolean;
  deadline: Date | null;
};

export function makeTask(title: string): Task {
  return {
    id: getRandomId(),
    title: title,
    created: new Date(),
    description: "",
    complete: false,
    deadline: null,
  };
}

export function getRandomId(): string {
  return Math.random().toString(36).slice(2, 10);
}
