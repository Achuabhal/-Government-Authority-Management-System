import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Mail, Plus, Trash2, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ROLE_KEY = "bvp.admin.role"; // 'super' | 'sub'

interface AdminEmail {
  id: string;
  email: string;
  role: 'sub' | 'super';
  addedAt: string;
  otp: string;
}

const SuperAdminEmail = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<'sub' | 'super'>('sub');
  const [adminEmails, setAdminEmails] = useState<AdminEmail[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const currentRole = (localStorage.getItem(ROLE_KEY) || "sub").toLowerCase();
  
  if (currentRole !== "super") {
    return <Navigate to="/admin/banner" replace />;
  }

  // Load admin emails from localStorage
  useEffect(() => {
    const savedEmails = localStorage.getItem('adminEmails');
    if (savedEmails) {
      setAdminEmails(JSON.parse(savedEmails));
    }
  }, []);

  // Save admin emails to localStorage
  const saveAdminEmails = (emails: AdminEmail[]) => {
    localStorage.setItem('adminEmails', JSON.stringify(emails));
    setAdminEmails(emails);
  };

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleAddEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Check if email already exists
    if (adminEmails.some(admin => admin.email === email)) {
      toast({
        title: "Email Already Exists",
        description: "This email is already in the admin list.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      // Generate OTP
      const otp = generateOTP();
      
      // Create new admin entry
      const newAdmin: AdminEmail = {
        id: Date.now().toString(),
        email,
        role,
        addedAt: new Date().toISOString(),
        otp
      };

      // Add to list
      const updatedEmails = [...adminEmails, newAdmin];
      saveAdminEmails(updatedEmails);

      // Simulate sending OTP email
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Admin Added Successfully",
        description: `Admin email added with OTP: ${otp}. Please share this OTP with the admin.`,
        duration: 10000,
      });

      // Reset form
      setEmail("");
      setRole('sub');

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add admin email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveEmail = (id: string) => {
    const updatedEmails = adminEmails.filter(admin => admin.id !== id);
    saveAdminEmails(updatedEmails);
    
    toast({
      title: "Admin Removed",
      description: "Admin email has been removed from the list.",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <div className="mb-6">
        <div className="text-2xl font-semibold flex items-center gap-2">
          <UserPlus className="w-6 h-6" />
          Admin Email Management
        </div>
        <div className="text-sm text-muted-foreground">
          Add and manage admin email addresses for the portal
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add Admin Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add New Admin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddEmail} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Admin Role</Label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value as 'sub' | 'super')}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                >
                  <option value="sub">Sub Admin</option>
                  <option value="super">Super Admin</option>
                </select>
              </div>

              <Alert>
                <AlertDescription>
                  A 6-digit OTP will be generated and displayed after adding the admin. 
                  Share this OTP with the admin for login verification.
                </AlertDescription>
              </Alert>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Adding..." : "Add Admin"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Admin List */}
        <Card>
          <CardHeader>
            <CardTitle>Admin List ({adminEmails.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {adminEmails.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No admin emails added yet
              </div>
            ) : (
              <div className="space-y-4">
                {adminEmails.map((admin) => (
                  <div key={admin.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{admin.email}</span>
                        <Badge variant={admin.role === 'super' ? 'default' : 'secondary'}>
                          {admin.role === 'super' ? 'Super Admin' : 'Sub Admin'}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Added: {formatDate(admin.addedAt)}
                      </div>
                      <div className="text-xs text-muted-foreground font-mono">
                        OTP: {admin.otp}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveEmail(admin.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminEmail;


