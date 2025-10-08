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

  // Fetch content and store in localStorage
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await api.get("/content/all-content");
        const data = res.data;

        const isEmpty =
          !data ||
          (Array.isArray(data.banner) && data.banner.length === 0) ||
          (Array.isArray(data.galleryImages) && data.galleryImages.length === 0) ||
          (Array.isArray(data.newsItems) && data.newsItems.length === 0) ||
          !data.toggle;

        if (isEmpty) {
          localStorage.removeItem("superContent");
          console.log("Local storage cleared because some content is empty:", data);
        } else {
          localStorage.setItem("superContent", JSON.stringify(data));
          console.log("Data saved to localStorage:", data);
        }
      } catch (error) {
        console.error("Failed to fetch content:", error);
        localStorage.removeItem("superContent");
      }
    };

    fetchContent();
  }, []);

  // Fetch and toggle day state
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

  useEffect(() => {
    fetchToggle();
  }, []);

  const toggleDay = async () => {
    try {
      await api.put("/content/toggle", { isActive: !toggleState.isActive });
      fetchToggle();
    } catch {
      toast({
        title: "Error",
        description: "Failed to toggle day. Try again.",
      });
    }
  };

  // Forward and Reject buttons
  const handleForward = async () => {
    try {
      await api.put("/superadmin/forward");
      toast({ title: "Success", description: "Data forwarded to higher admin!" });
    } catch {
      toast({ title: "Error", description: "Failed to forward data." });
    }
  };

  const handleReject = async () => {
    try {
      await api.put("/superadmin/reject");
      toast({ title: "Rejected", description: "Data rejected successfully." });
      localStorage.removeItem("superContent");
      window.location.reload();
    } catch {
      toast({ title: "Error", description: "Failed to reject data." });
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await api.get("/logout");
      localStorage.clear();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      navigate("/admin/login");
    } catch {
      toast({
        title: "Error",
        description: "Failed to log out. Try again.",
      });
    }
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-[240px_1fr] bg-gradient-to-br from-slate-100 to-slate-200 text-gray-800">
      {/* Sidebar */}
      <aside className="border-r bg-white shadow-md flex flex-col justify-between">
        <div>
          <div className="h-16 px-5 flex items-center justify-between border-b bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-semibold text-lg">
            <span>Admin Panel</span>
          </div>

          <div className="flex flex-col gap-3 p-4">
            <div className="flex gap-2">
              <Button
                onClick={handleForward}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-green-500 transition-all"
              >
                Accept
              </Button>
              <Button
                onClick={handleReject}
                className="flex-1 bg-gradient-to-r from-rose-500 to-red-600 text-white hover:from-red-600 hover:to-rose-500 transition-all"
              >
                Reject
              </Button>
            </div>

            <Separator className="my-3" />

            <nav className="flex flex-col gap-2">
              {[
                { to: "/admin3", label: "Original Content" },
                { to: "/admin/banner", label: "Check Banner" },
                { to: "/admin/news", label: "News Manager" },
                { to: "/admin/photo-gallery", label: "Photo Gallery" },
                { to: "/admin/sub-admins", label: "Sub Admins" },
                { to: "/admin/logs", label: "Activity Log" },
              ].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition ${
                      isActive
                        ? "bg-blue-100 text-blue-600 border-l-4 border-blue-600"
                        : "hover:bg-gray-100 text-gray-700"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              {role === "super" && (
                <NavLink
                  to="/admin/super-email"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition ${
                      isActive
                        ? "bg-blue-100 text-blue-600 border-l-4 border-blue-600"
                        : "hover:bg-gray-100 text-gray-700"
                    }`
                  }
                >
                  Super Admin Email
                </NavLink>
              )}
            </nav>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex items-center space-x-2 mb-3">
            <User className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-600 truncate">{adminEmail}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 border-gray-300 hover:bg-red-50 hover:text-red-600 transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="p-8">
        

        {/* Page Content */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
