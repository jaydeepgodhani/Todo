export enum Priority {
  default = "default",
  high = "high",
  medium = "medium",
  low = "low"
}

export interface TodoBox {
  done: boolean;
  name: string;
  priority: Priority;
}

export type Box = { item: TodoBox, type: string }
