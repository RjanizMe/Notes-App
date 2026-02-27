import { atom } from "jotai";

export type Task = {
  id: number;
  title: string;
  notes: string;
};

export const taskAtom = atom<Task[]>([
  {
    id: 1,
    title: "jhghjh",
    notes: "jshfjksd",
  },
  {
    id: 2,
    title: "hjskfs0",
    notes: "jshfjksd",
  },
]);

export const isContainerGridAtom = atom(false);
