
import React, { useState } from "react";


const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      // ตัวอย่างการส่งข้อมูลไป backend (แก้ endpoint ตามจริง)
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ");
        setTimeout(() => navigate("/singin"), 1500);
      } else {
        setError(data.message || "สมัครสมาชิกไม่สำเร็จ");
      }
    } catch (err) {
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">สมัครสมาชิก</h2>
        {error && (
          <div className="mb-4 text-red-500 text-center">{error}</div>
        )}
        {success && (
          <div className="mb-4 text-green-500 text-center">{success}</div>
        )}
        <div className="mb-4">
          <label className="block mb-1 font-medium">ชื่อผู้ใช้</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">อีเมล</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium">รหัสผ่าน</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
        >
          สมัครสมาชิก
        </button>
        <div className="mt-4 text-center">
          มีบัญชีอยู่แล้ว?{' '}
          <Link to="/singin" className="text-blue-500 hover:underline">
            เข้าสู่ระบบ
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
