import { List } from "./list";
import { NewButtonSidebar } from "./new-button-sidebar";

export const Sidebar = () => {
  return (
    <aside className="fixed z-[1] left-0 bg-blue-950 h-full w-[60-px] flex flex-col p-3 gap-y-4 text-white">
      <List />
      <NewButtonSidebar />
    </aside>
  );
};
