import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useMemo, useEffect, useState } from "react";
import { LogOut, User, Send, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api"; // Axios instance

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

  // Fetch all content
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await api.get("/leadadmin/all-content");
        localStorage.setItem("leadContent", JSON.stringify(res.data));
        console.log("Data saved to localStorage:", res.data);
      } catch (error) {
        console.error("Failed to fetch content:", error);
      }
    };
    fetchContent();
  }, []);

  // Fetch toggle
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
      await api.put("/leadadmin/toggle", { isActive: !toggleState.isActive });
      fetchToggle();
    } catch {
      toast({
        title: "Error",
        description: "Failed to toggle day. Try again.",
      });
    }
  };

  const handleForward = async () => {
    try {
      await api.put("/leadadmin/forward");
      toast({ title: "Success", description: "Data forwarded to higher admin!" });
    } catch {
      toast({ title: "Error", description: "Failed to forward data." });
    }
  };

  const handleReject = async () => {
  try {
    await api.put("/leadadmin/reject");
    toast({ title: "Rejected", description: "Data rejected successfully!" });
    
    // ✅ Refresh the page after success
    window.location.reload();
  } catch {
    toast({ title: "Error", description: "Failed to reject data." });
  }
};


  const handleLogout = async () => {
    try {
      await api.get("/logout");
      localStorage.removeItem("bvp.admin.loggedIn");
      localStorage.removeItem("bvp.admin.email");
      localStorage.removeItem("bvp.admin.role");
      toast({ title: "Logged Out", description: "You have been successfully logged out." });
      navigate("/admin/login");
    } catch {
      toast({ title: "Error", description: "Failed to log out. Try again." });
    }
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-[250px_1fr] bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="border-r bg-white shadow-sm flex flex-col justify-between">
        <div>
          {/* Sidebar Header */}
          <div className="h-14 px-5 flex items-center text-lg font-semibold border-b bg-gray-50">
            Lead Admin
          </div>

          {/* Action Buttons */}
          <div className="p-4 space-y-3">
            <Button
              onClick={handleForward}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md hover:opacity-90 transition"
            >
              <Send className="w-4 h-4 mr-2" />
              Forward
            </Button>

            <Button
              onClick={handleReject}
              className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-md hover:opacity-90 transition"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Reject
            </Button>
          </div>

          <Separator />

          {/* Navigation Links */}
          <nav className="p-2 space-y-1">
            {[
              { to: "/admin1/banner1", label: "Update Banner" },
              { to: "/admin1/news1", label: "News Manager" },
              { to: "/admin1/photo-gallery1", label: "Photo Gallery" },
              ...(role === "super"
                ? [{ to: "/admin1/super-email1", label: "Super Admin Email" }]
                : []),
            ].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md text-sm transition ${
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

        {/* Footer */}
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
        {/* Day Toggle Card */}
      

        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
