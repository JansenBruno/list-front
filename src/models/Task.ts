export interface Task {
  id: number;
  name: string;
  cost: number;
  dueDate: string | null;
  displayOrder: number;
}