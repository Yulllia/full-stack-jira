import { Priority } from "../enums/Priority";

export const capitalizeFirstLetter = (string: string | undefined) => {
  return string && string.charAt(0).toUpperCase() + string.slice(1);
};
const priorityColors: Record<Priority, string> = {
  [Priority.LOW]: "green",
  [Priority.MEDIUM]: "orange",
  [Priority.HIGH]: "red",
};

export const getColorForPriority = (priority: Priority) => {
  return priorityColors[priority] || "grey";
};
