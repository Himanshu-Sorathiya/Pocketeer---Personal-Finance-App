import SidebarLogo from "./SidebarLogo.tsx";
import SidebarNav from "./SidebarNav.tsx";

function Sidebar() {
  return (
    <div className="h-full w-60 space-y-2 divide-y divide-gray-700 bg-gray-900 p-3 text-gray-100">
      <SidebarLogo />

      <SidebarNav />
    </div>
  );
}

export default Sidebar;
