import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import api from "../lib/api"
import { useEffect } from "react";
export default function LoginOtp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

    useEffect(() => {
    const checkIfLoggedIn = async () => {
      try {
        const res = await api.get("/check");
        if (res.data.role=="superadmin") {
          navigate("/admin", { replace: true }); // already logged in → go to admin layout
        }
        if (res.data.role=="leadadmin") {
          navigate("/admin1", { replace: true }); // already logged in → go to admin layout
        }
        if (res.data.role=="admin") {
          navigate("/admin2", { replace: true }); // already logged in → go to admin layout
        }

      } catch (err) {
        // Not logged in, stay on login page
      }
    };
    checkIfLoggedIn();
  }, [navigate]);

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) {
      alert("Please verify captcha first!");
      return;
    }

    // ✅ Call backend to validate email + password
   

    if (email && password) {
    const res = await api.post("/login", { email, password, captchaToken });
      if (res.data.success) {
        setShowOtp(true); // show OTP input
        alert("OTP sent to your email.");
      }
    } else {
      alert("Enter email and password");
    }
  };

  // Handle OTP verification
  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Normally backend verifies OTP
    const res = await api.post("/verify-otp", { email, otp });
    console.log(res.data.role);
    const data = res.data.role;
    console.log(data);
    if (data=="superadmin") {
          navigate("/admin"); // already logged in → go to admin layout
        }
        if (data=="leadadmin") {
          navigate("/admin1"); // already logged in → go to admin layout
        }
        if (data=="admin") {
          navigate("/admin2"); // already logged in → go to admin layout
        }else {
      alert("Invalid OTP. Try again!");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded-2xl shadow-md w-96">
        {!showOtp ? (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="mb-4 flex justify-center">
              <ReCAPTCHA
                sitekey="6LcVls8rAAAAAIkTwhtL3j82tPhOQa_1UsSjSGOp"
                onChange={(token) => setCaptchaToken(token)}
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
            >
              Login
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Enter OTP</h2>
            <p className="mb-4 text-sm text-gray-600 text-center">
              OTP sent to <span className="font-semibold">{email}</span>
            </p>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={handleOtpVerify}
              className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
            >
              Verify OTP
            </button>
          </>
        )}
      </form>
    </div>
  );
}
