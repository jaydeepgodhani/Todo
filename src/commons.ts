export enum Priority {
  high = "high",
  medium = "medium",
  low = "low"
}

export interface TodoBox {
  done: boolean;
  name: string;
  priority: Priority;
  id: string;
}

export interface Lists {
  [key: string]: any;
  todo: TodoBox[];
  done: TodoBox[];
}

export type Box = (item: TodoBox, type: string) => void;
