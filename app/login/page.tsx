"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect =
    searchParams.get("redirect") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      router.push(redirect);
    } catch (err: any) {
      console.error(err);

      if (err?.code === "auth/invalid-credential") {
        setError("Invalid email or password.");
      } else if (err?.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else if (err?.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else if (err?.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else {
        setError(
          "Login failed. Please check your details and try again."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-card">

        <Link href="/" className="auth-logo">
          BUILD<span>WITH</span>HARSHIT
        </Link>

        <h1>Welcome back.</h1>

        <p className="auth-subtitle">
          Login to access your Build with Harshit projects
          and digital resources.
        </p>

        <form
          className="auth-form"
          onSubmit={handleLogin}
        >
          <label className="auth-label">
            Email

            <input
              className="auth-input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </label>

          <label className="auth-label">
            Password

            <input
              className="auth-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />
          </label>

          <button
            className="auth-submit"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && (
          <p className="auth-message">
            {error}
          </p>
        )}

        <div className="auth-footer">
          Don't have an account?{" "}
          <Link
            href={`/signup?redirect=${encodeURIComponent(
              redirect
            )}`}
          >
            Create account
          </Link>
        </div>

        <Link
          href="/"
          className="back-store"
        >
          ← Back to projects
        </Link>

      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="auth-page">
          <div className="auth-card">
            <div className="auth-logo">
              BUILD<span>WITH</span>HARSHIT
            </div>

            <p className="auth-subtitle">
              Loading...
            </p>
          </div>
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}