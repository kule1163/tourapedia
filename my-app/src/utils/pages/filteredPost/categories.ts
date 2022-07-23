import { v4 as uuidv4 } from "uuid";

interface CategoryProps {
  id: string;
  value: string;
  label: string;
}

export const categories: CategoryProps[] = [
  { id: uuidv4(), label: "historic", value: "historic" },
  { id: uuidv4(), label: "sea", value: "sea" },
  { id: uuidv4(), label: "beach", value: "beach" },
  { id: uuidv4(), label: "temple", value: "temple" },
  { id: uuidv4(), label: "hill", value: "hill" },
];
