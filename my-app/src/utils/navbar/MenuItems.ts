import { v4 as uuidv4 } from "uuid";
/* import { MdOutlineDashboard } from "react-icons/md";
import { BiLogIn } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";
import { BiRegistered } from "react-icons/bi"; */

interface MenuItemProps {
  id: string;
  item: string;
  url: string;
}

export const byUserMenuItems: MenuItemProps[] = [
  { id: uuidv4(), item: "home", url: "/" },
  { id: uuidv4(), item: "add tour", url: "/add-tour" },
  { id: uuidv4(), item: "dashboard", url: "/dashboard" },
  { id: uuidv4(), item: "edit", url: "/edit" },
];

export const menuItems: MenuItemProps[] = [
  { id: uuidv4(), item: "home", url: "/" },
  { id: uuidv4(), item: "login", url: "/login" },
  { id: uuidv4(), item: "register", url: "/register" },
];
