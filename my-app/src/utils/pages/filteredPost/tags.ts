import { v4 as uuidv4 } from "uuid";

interface TagProps {
  tag: string;
  id: string;
}

export const tags: TagProps[] = [
  { id: uuidv4(), tag: "paris" },
  { id: uuidv4(), tag: "eu" },
  { id: uuidv4(), tag: "tower" },
  { id: uuidv4(), tag: "island" },
  { id: uuidv4(), tag: "sea" },
  { id: uuidv4(), tag: "beach" },
  { id: uuidv4(), tag: "south" },
  { id: uuidv4(), tag: "historic" },
];
