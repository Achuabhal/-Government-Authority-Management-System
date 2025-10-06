import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api"; // ✅ your axios instance file

type SubAdmin = { email: string };

const STORAGE_KEY = "bvp.admin.subAdmins";

const SubAdmins = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [list, setList] = useState<SubAdmin[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as SubAdmin[]) : [];
    } catch {
      return [];
    }
  });
    useEffect(() => {
  const fetchAdminEmails = async () => {
    try {
      const res = await api.get("/api/admins"); // your backend route
      setList(res.data); // res.data = [{ email: "admin1@example.com" }, ...]
      console.log("Fetched admin emails", res.data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchAdminEmails();
}, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {}
  }, [list]);

  // Step 1: request OTP
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
      await api.post("/api/add", { email: trimmed }); // ✅ using axios instance
      setPendingEmail(trimmed);
      toast({ title: "OTP sent", description: `Check ${trimmed} for OTP` });
    } catch (err: any) {
      toast({ title: "Error", description: err.response?.data?.message || "Could not send OTP" });
    }
  };



  // Step 2: verify OTP
  const verifyOtp = async () => {
    if (!pendingEmail) return;
    try {
      await api.post("/api/verify-otp2", { email: pendingEmail, otp }); // ✅ axios instance
      setList((prev) => [...prev, { email: pendingEmail }]);
      toast({ title: "Sub admin added", description: pendingEmail });
      setPendingEmail(null);
      setEmail("");
      setOtp("");
    } catch (err: any) {
      toast({ title: "Invalid OTP", description: err.response?.data?.message || "Please try again" });
    }
  };

const removeEmail = async (target: string) => {
  try {
    await api.delete("/api/emails", { data: { email: target } });
    setList((prev) => prev.filter((s) => s.email !== target));
    toast({ title: "Removed", description: target });
  } catch (err: any) {
    toast({ title: "Error", description: err.response?.data?.message || "Failed to remove email" });
  }
};





  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <div className="mb-4">
        <div className="text-2xl font-semibold">Sub Admins</div>
        <div className="text-sm text-muted-foreground">
          Manage emails allowed to access limited admin features
        </div>
      </div>
      

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {pendingEmail ? "Enter OTP" : "Add sub admin"}
          </CardTitle>
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
              <div>
                <Button onClick={requestOtp}>Add</Button>
              </div>
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
              <div>
                <Button onClick={verifyOtp}>Verify</Button>
              </div>
            </div>
          )}

          <Separator className="my-4" />

        <div className="space-y-3">
  {list.length === 0 && (
    <div className="text-sm text-muted-foreground">
      No sub admins added yet.
    </div>
  )}
  {list.map((item) => (
    <div
      key={item.email}
      className="flex items-center justify-between rounded-md border p-3"
    >
      <div className="text-sm">{item.email}</div>
      <div className="flex gap-2">
        <Button variant="destructive" onClick={() => removeEmail(item.email)}>
          Delete
        </Button>
      </div>
    </div>
  ))}
</div>

        </CardContent>
      </Card>
    </div>
  );
};

export default SubAdmins;
