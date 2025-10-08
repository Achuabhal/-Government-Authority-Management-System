import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import api from "../lib/api";

export default function LoginOtp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // 🔹 loading state

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      try {
        const res = await api.get("/check");
        if (res.data.role === "superadmin") {
          navigate("/admin", { replace: true });
        } else if (res.data.role === "leadadmin") {
          navigate("/admin1", { replace: true });
        } else if (res.data.role === "admin") {
          navigate("/admin2", { replace: true });
        }
      } catch (err) {
        // Not logged in, stay here
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

    if (email && password) {
      try {
        setLoading(true); // 🔹 start loading
        const res = await api.post("/login", { email, password, captchaToken });
        if (res.data.success) {
          setShowOtp(true);
          alert("OTP sent to your email.");
        } else {
          alert("Invalid email or password");
        }
      } catch (err) {
        alert("Something went wrong. Please try again.");
      } finally {
        setLoading(false); // 🔹 stop loading
      }
    } else {
      alert("Enter email and password");
    }
  };

  // Handle OTP verification
  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true); // 🔹 start loading
      const res = await api.post("/verify-otp", { email, otp });
      const data = res.data.role;

      if (data === "superadmin") {
        navigate("/admin");
      } else if (data === "leadadmin") {
        navigate("/admin1");
      } else if (data === "admin") {
        navigate("/admin2");
      } else {
        alert("Invalid OTP. Try again!");
      }
    } catch (err) {
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false); // 🔹 stop loading
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
              disabled={loading}
              className={`w-full text-white p-3 rounded-lg transition ${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Loading..." : "Login"}
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
              disabled={loading}
              className={`w-full text-white p-3 rounded-lg transition ${
                loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}
      </form>
    </div>
  );
}
