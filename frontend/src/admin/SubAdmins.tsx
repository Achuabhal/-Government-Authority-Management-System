import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";

interface AdminUser {
  name: string;
  email: string;
  role: string;
}

const STORAGE_KEY = "bvp.admin.subAdmins";

const ManageSubAdmins: React.FC = () => {
  const { toast } = useToast();

  const [list, setList] = useState<AdminUser[]>([]);
  const [tempRoles, setTempRoles] = useState<Record<string, string>>({});
  const [loadingEmails, setLoadingEmails] = useState<string[]>([]);

  // Add sub-admin state
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);

  // Fetch all admins/sub-admins
  const fetchAdmins = async () => {
    try {
      const res = await api.get("/api/admins");
      setList(res.data);

      const roles: Record<string, string> = {};
      res.data.forEach((admin: AdminUser) => {
        roles[admin.email] = admin.role; // keep track of current role
      });
      setTempRoles(roles);

      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(res.data));
    } catch (err: any) {
      toast({
        title: "Error fetching admins",
        description: err.response?.data?.message || "Please try again later.",
      });
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Add sub-admin (request OTP)
  const requestOtp = async () => {
    const trimmed = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast({ title: "Invalid email", description: "Please enter a valid email." });
      return;
    }
    if (list.some((s) => s.email === trimmed)) {
      toast({ title: "Already added", description: "That email is already a sub admin." });
      return;
    }
    try {
      await api.post("/api/add", { email: trimmed });
      setPendingEmail(trimmed);
      toast({ title: "OTP sent", description: `Check ${trimmed} for OTP` });
    } catch (err: any) {
      toast({ title: "Error", description: err.response?.data?.message || "Could not send OTP" });
    }
  };

  // Verify OTP and add sub-admin
  const verifyOtp = async () => {
    if (!pendingEmail) return;
    try {
      await api.post("/api/verify-otp2", { email: pendingEmail, otp });
      const newAdmin: AdminUser = { name: pendingEmail.split("@")[0], email: pendingEmail, role: "admin" };
      setList((prev) => [...prev, newAdmin]);
      setTempRoles((prev) => ({ ...prev, [pendingEmail]: "admin" }));
      toast({ title: "Sub admin added", description: pendingEmail });
      setPendingEmail(null);
      setEmail("");
      setOtp("");
    } catch (err: any) {
      toast({ title: "Invalid OTP", description: err.response?.data?.message || "Please try again" });
    }
  };

  // Remove admin
  const removeEmail = async (target: string) => {
    try {
      await api.delete("/api/emails", { data: { email: target } });
      setList((prev) => prev.filter((s) => s.email !== target));
      toast({ title: "Removed", description: target });
    } catch (err: any) {
      toast({ title: "Error", description: err.response?.data?.message || "Failed to remove email" });
    }
  };

  // Update role
  const updateRole = async (email: string) => {
    const newRole = tempRoles[email];
    setLoadingEmails((prev) => [...prev, email]);
    try {
      await api.post("/api/changerole", { email, newRole });
      setList((prev) => prev.map((a) => (a.email === email ? { ...a, role: newRole } : a)));
      toast({ title: "Role Updated", description: `${email} is now ${newRole}` });
    } catch (err: any) {
      toast({ title: "Error", description: err.response?.data?.message || "Failed to update role." });
    } finally {
      setLoadingEmails((prev) => prev.filter((id) => id !== email));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Add Sub-admin Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{pendingEmail ? "Enter OTP" : "Add Sub Admin"}</CardTitle>
        </CardHeader>
        <CardContent>
          {!pendingEmail ? (
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 items-end">
              <div className="space-y-2">
                <Label htmlFor="sub-email">Email</Label>
                <Input
                  id="sub-email"
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button onClick={requestOtp}>Add</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 items-end">
              <div className="space-y-2">
                <Label htmlFor="otp">OTP</Label>
                <Input
                  id="otp"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <Button onClick={verifyOtp}>Verify</Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* Manage Admins Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Manage Admins</CardTitle>
        </CardHeader>
        <CardContent>
          {list.length === 0 ? (
            <p className="text-gray-500">No admins found.</p>
          ) : (
            <div className="space-y-4">
              {list.map((admin) => (
                <div
                  key={admin.email}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b pb-3"
                >
                  <div>
                    <p className="font-medium">{admin.name}</p>
                    <p className="text-sm text-gray-500">{admin.email}</p>
                    <p className="text-sm text-gray-700">
                      Current Role: <span className="font-semibold">{admin.role}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <select
                      className="border rounded-md px-2 py-1"
                      value={tempRoles[admin.email]}
                      onChange={(e) =>
                        setTempRoles((prev) => ({ ...prev, [admin.email]: e.target.value }))
                      }
                    >
                      <option value="superadmin">Super Admin</option>
                      <option value="leadadmin">Lead Admin</option>
                      <option value="admin">Admin</option>
                    </select>

                    <Button
                      onClick={() => updateRole(admin.email)}
                      disabled={loadingEmails.includes(admin.email)}
                    >
                      {loadingEmails.includes(admin.email) ? "Updating..." : "Update"}
                    </Button>

                    <Button variant="destructive" onClick={() => removeEmail(admin.email)}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageSubAdmins;
