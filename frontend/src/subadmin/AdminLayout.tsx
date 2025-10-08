import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useMemo, useEffect, useState } from "react";
import { LogOut, User, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";

const ROLE_KEY = "bvp.admin.role";

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

  // Fetch all content on mount
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await api.get("/admin/all-content");
        localStorage.setItem("Content", JSON.stringify(res.data));
        console.log("Data saved to localStorage:", res.data);
      } catch (error) {
        console.error("Failed to fetch content:", error);
      }
    };
    fetchContent();
  }, []);

  // Fetch toggle state
  const fetchToggle = async () => {
    try {
      setLoading(true);
      const res = await api.get<ToggleResponse>("/admin/toggle");
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

  const handleForward = async () => {
    try {
      await api.put("/admin/forward");
      toast({
        title: "Success",
        description: "Data forwarded to higher admin!",
      });
      window.location.reload();
    } catch {
      toast({
        title: "Error",
        description: "Failed to forward data.",
      });
    }
  };

  const handleRestore = async () => {
    try {
      await api.put("/admin/restore");
      toast({
        title: "Success",
        description: "Data restored successfully!",
      });
      window.location.reload();
    } catch {
      toast({
        title: "Error",
        description: "Failed to restore data.",
      });
    }
  };

  const toggleDay = async () => {
    try {
      await api.put("/admin/toggle", { isActive: !toggleState.isActive });
      fetchToggle();
    } catch {
      toast({
        title: "Error",
        description: "Failed to toggle day. Try again.",
      });
    }
  };

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
    } catch {
      toast({
        title: "Error",
        description: "Logout failed. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-[240px_1fr] bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="border-r bg-white shadow-sm flex flex-col justify-between">
        <div>
          <div className="h-14 px-5 flex items-center text-lg font-semibold border-b">
            {role === "super" ? "Super Admin" : "Sub Admin"}
          </div>

          <div className="p-4 space-y-3">
            <Button
              onClick={handleForward}
              className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:opacity-90 transition-all"
            >
              <Send className="w-4 h-4 mr-2" />
              Forward
            </Button>

            {/* Uncomment if you want Restore */}
            {/* <Button
              onClick={handleRestore}
              variant="secondary"
              className="w-full border border-indigo-300 hover:bg-indigo-50"
            >
              Restore
            </Button> */}
          </div>

          <Separator />

          {/* Navigation */}
          <nav className="p-2 space-y-1">
            {[
              { to: "/admin2/banner2", label: "Update Banner" },
              { to: "/admin2/news2", label: "News Manager" },
              { to: "/admin2/photo-gallery2", label: "Photo Gallery" },
              ...(role === "super"
                ? [{ to: "/admin2/super-email2", label: "Super Admin Email" }]
                : []),
            ].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg text-sm transition ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700 font-medium"
                      : "hover:bg-gray-100"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Footer - User Info */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex items-center space-x-2 mb-3">
            <User className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600 truncate">{adminEmail}</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout} className="w-full">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Section */}
      <main className="p-8">
       

        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
