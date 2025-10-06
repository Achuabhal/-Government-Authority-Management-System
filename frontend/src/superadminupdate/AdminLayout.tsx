import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useMemo, useEffect, useState } from "react";
import { LogOut, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";

const ROLE_KEY = "bvp.admin.role"; // 'super' | 'sub'

interface ToggleResponse {
  isActive: boolean;
  message: string;
}

const AdminLayout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const role = useMemo(() => (localStorage.getItem(ROLE_KEY) || "sub").toLowerCase(), []);
  const adminEmail = localStorage.getItem("bvp.admin.email");

  const [toggleState, setToggleState] = useState<ToggleResponse>({
    isActive: false,
    message: "Normal Day",
  });
  const [loading, setLoading] = useState(true);

  // Fetch current toggle state
  const fetchToggle = async () => {
    try {
      setLoading(true);
      const res = await api.get<ToggleResponse>("/content/toggle");
      setToggleState(res.data);
    } catch (err) {
      console.error("Failed to fetch toggle:", err);
    } finally {
      setLoading(false);
    }
  };

  // Toggle between normal/special day
  const toggleDay = async () => {
    try {
      await api.put("/content/toggle", { isActive: !toggleState.isActive });
      fetchToggle();
    } catch (err) {
      console.error("Toggle failed:", err);
      toast({
        title: "Error",
        description: "Failed to toggle day. Try again.",
      });
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await api.get("/logout");
      localStorage.removeItem("bvp.admin.loggedIn");
      localStorage.removeItem("bvp.admin.email");
      localStorage.removeItem("bvp.admin.role");

      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });

      navigate("/admin/login");
    } catch (err) {
      console.error("Logout failed:", err);
      toast({
        title: "Error",
        description: "Failed to log out. Try again.",
      });
    }
  };

  useEffect(() => {
    fetchToggle();
  }, []);

  return (
    <div className="min-h-screen w-full grid grid-cols-[250px_1fr] bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <aside className="flex flex-col justify-between border-r bg-white shadow-sm">
        {/* Header */}
        <div>
          <div className="h-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg flex items-center justify-center shadow-md">
            Admin Dashboard
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2 mt-2">
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `block px-4 py-2 text-sm rounded-md font-medium transition ${
                  isActive
                    ? "bg-blue-100 text-blue-700 border-l-4 border-blue-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                }`
              }
            >
              Check Requests
            </NavLink>

            <Separator />

            <NavLink
              to="/admin3/banner3"
              className={({ isActive }) =>
                `block px-4 py-2 text-sm rounded-md font-medium transition ${
                  isActive
                    ? "bg-blue-100 text-blue-700 border-l-4 border-blue-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                }`
              }
            >
              Update Banner
            </NavLink>

            <NavLink
              to="/admin3/news3"
              className={({ isActive }) =>
                `block px-4 py-2 text-sm rounded-md font-medium transition ${
                  isActive
                    ? "bg-blue-100 text-blue-700 border-l-4 border-blue-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                }`
              }
            >
              News Manager
            </NavLink>

            <NavLink
              to="/admin3/photo-gallery3"
              className={({ isActive }) =>
                `block px-4 py-2 text-sm rounded-md font-medium transition ${
                  isActive
                    ? "bg-blue-100 text-blue-700 border-l-4 border-blue-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                }`
              }
            >
              Photo Gallery
            </NavLink>

            {role === "super" && (
              <NavLink
                to="/admin/super-email3"
                className={({ isActive }) =>
                  `block px-4 py-2 text-sm rounded-md font-medium transition ${
                    isActive
                      ? "bg-blue-100 text-blue-700 border-l-4 border-blue-600"
                      : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                  }`
                }
              >
                Super Admin Email
              </NavLink>
            )}
          </nav>
        </div>

        {/* User Info and Logout */}
        <div className="border-t p-4 bg-gray-50">
          <div className="flex items-center space-x-2 mb-3">
            <User className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-600 truncate">{adminEmail}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="w-full border-gray-300 hover:bg-red-50 hover:text-red-600 transition"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="p-8">
        <div className="bg-white rounded-xl shadow-md p-8 text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-700 mb-4">
            {loading ? "Loading..." : toggleState.message}
          </h1>
          <Button
            onClick={toggleDay}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow transition-all duration-200"
          >
            {toggleState.isActive ? "Switch to Normal Day" : "Activate Special Day"}
          </Button>
        </div>

        {/* Page Outlet */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
