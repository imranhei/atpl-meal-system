import { Fragment, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ChevronDown,
  Settings,
  CircleUser,
  SlidersHorizontal,
  UtensilsCrossed,
  TicketsPlane,
  FileChartColumn,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useSelector } from "react-redux";
import { Label } from "@radix-ui/react-dropdown-menu";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/employee/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    id: "attendance",
    label: "Attendance",
    path: "/employee/attendance",
    icon: <FileChartColumn size={20} />,
  },
  {
    id: "meal",
    label: "Meal",
    path: "/employee/meal",
    icon: <UtensilsCrossed size={20} />,
  },
  {
    id: "leave",
    label: "Leave",
    path: "/employee/leave",
    icon: <TicketsPlane size={20} />,
  },
  {
    id: "settings",
    label: "Settings",
    path: "/employee/setting",
    icon: <Settings size={20} />,
    submenu: [
      {
        id: "profile",
        label: "Profile",
        path: "/employee/setting",
        icon: <CircleUser size={20} />,
      },
      {
        id: "day-wise-meal",
        label: "Day Wise Meal",
        path: "/employee/day-wise-meal",
      },
    ],
  },
];

function MenuItem({ setOpenSidebar }) {
  const [openMenu, setOpenMenu] = useState(null);
  const location = useLocation();

  const handleMenuClick = (itemId) => {
    setOpenMenu(openMenu === itemId ? null : itemId);
  };

  return (
    <nav className="mt-8 flex flex-col gap-2">
      {adminSidebarMenuItems.map((item) => (
        <div key={item.id} className="flex flex-col">
          <div
            className={`flex justify-between items-center rounded-md ${
              location.pathname.includes(item.path) ? "bg-gray-100" : ""
            }`}
          >
            <Link
              to={item.path}
              onClick={() => {
                setOpenSidebar && setOpenSidebar(false);
              }}
              className={`flex w-full items-center justify-start gap-2 rounded-md px-3 py-2 font-semibold text-gray-500 hover:text-black cursor-pointer hover:bg-gray-100`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
            {item.submenu && (
              <div
                className={`${
                  openMenu === item.id ? "rotate-180" : ""
                } p-1 rounded transition-all duration-300 cursor-pointer`}
                size={20}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering Link
                  handleMenuClick(item.id);
                  // if (setOpenSidebar) setOpenSidebar(false);
                }}
              >
                <ChevronDown className="text-muted-foreground" />
              </div>
            )}
          </div>

          {item.submenu && openMenu === item.id && (
            <div
              className={`expandable ${
                openMenu === item.id ? "show" : ""
              } ml-2 mt-2 flex flex-col gap-2`}
            >
              {item.submenu && openMenu === item.id && (
                <div className="ml-4 mt-2 flex flex-col gap-2">
                  {item.submenu.map((subItem) => (
                    <Link
                      to={subItem.path}
                      key={subItem.id}
                      className={`flex items-center gap-2 font-semibold rounded-md px-3 py-2 text-gray-400 hover:text-gray-600 cursor-pointer hover:bg-gray-100 ${
                        location.pathname.includes(subItem.path)
                          ? "bg-gray-100 text-gray-800"
                          : ""
                      }`}
                      onClick={() => {
                        if (setOpenSidebar) setOpenSidebar(false);
                      }}
                    >
                      {subItem.icon}
                      <span>{subItem.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}

const EmployeeSidebar = ({ open, setOpenSidebar }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpenSidebar}>
        <SheetContent side="left" aria-describedby="sidebar">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2">
                <SlidersHorizontal size={24} />
                <span className="text-xl font-extrabold">User Panel</span>
              </SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <MenuItem setOpenSidebar={setOpenSidebar} />
            <Label className="absolute bottom-6 left-6">{user?.name}</Label>
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden h-screen w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/employee/dashboard")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <SlidersHorizontal size={24} />
          <h1 className="text-2xl font-extrabold">User Panel</h1>
        </div>
        <MenuItem />
        <Label className="absolute bottom-6 left-6">{user?.name}</Label>
      </aside>
    </Fragment>
  );
};

export default EmployeeSidebar;
