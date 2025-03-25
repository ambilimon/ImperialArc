
import * as LucideIcons from "lucide-react";

export type IconName = keyof typeof LucideIcons;

export const Icons = {
  ...LucideIcons,
  // Add any custom icons here if needed
  Ellipsis: LucideIcons.MoreHorizontal, // Default fallback
};
