"use client";

import { useState } from "react";
import { loginAdmin } from "@/actions/adminActions";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await loginAdmin(password);
    if (success) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Mật khẩu không đúng!");
    }
  };

  return (
    <div style={{ 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      minHeight: "80vh" 
    }}>
      <div className="card" style={{ padding: "2rem", width: "100%", maxWidth: "400px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>🔒 Đăng nhập Quản trị</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>Mật khẩu Admin:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              style={{ 
                width: "100%", 
                padding: "0.75rem", 
                borderRadius: "8px", 
                border: "1px solid var(--border)" 
              }}
              required
            />
          </div>
          {error && <p style={{ color: "red", fontSize: "0.9rem", marginBottom: "1rem" }}>{error}</p>}
          <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
            Vào Trang Quản Trị
          </button>
        </form>
      </div>
    </div>
  );
}
