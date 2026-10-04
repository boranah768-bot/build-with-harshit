"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../lib/firebase";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect =
    searchParams.get("redirect") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignup(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      router.push(redirect);
    } catch (err: any) {
      console.error(err);

      if (err?.code === "auth/email-already-in-use") {
        setError(
          "An account already exists with this email."
        );
      } else if (err?.code === "auth/invalid-email") {
        setError(
          "Please enter a valid email address."
        );
      } else if (
        err?.code === "auth/weak-password"
      ) {
        setError(
          "Password is too weak. Use at least 6 characters."
        );
      } else {
        setError(
          "Account creation failed. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">

      <div className="auth-card">

        {/* BRAND */}
        <Link
          href="/"
          className="auth-logo"
        >
          BUILD<span>WITH</span>HARSHIT
        </Link>

        {/* TITLE */}
        <h1>Create your account.</h1>

        <p className="auth-subtitle">
          Create an account to access your
          Build with Harshit projects and
          digital resources.
        </p>

        {/* FORM */}
        <form
          className="auth-form"
          onSubmit={handleSignup}
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
              autoComplete="email"
              required
            />
          </label>

          <label className="auth-label">
            Password

            <input
              className="auth-input"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              autoComplete="new-password"
              required
            />
          </label>

          <label className="auth-label">
            Confirm password

            <input
              className="auth-input"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              autoComplete="new-password"
              required
            />
          </label>

          <button
            className="auth-submit"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating account..."
              : "Create account"}
          </button>

        </form>

        {/* ERROR */}
        {error && (
          <p className="auth-message">
            {error}
          </p>
        )}

        {/* LOGIN */}
        <div className="auth-footer">
          Already have an account?{" "}
          <Link
            href={`/login?redirect=${encodeURIComponent(
              redirect
            )}`}
          >
            Login
          </Link>
        </div>

        {/* BACK */}
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

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <main className="auth-page">
          <div className="auth-card">

            <div className="auth-logo">
              BUILD<span>WITH</span>HARSHIT
            </div>

            <h1>Loading...</h1>

            <p className="auth-subtitle">
              Preparing your account page...
            </p>

          </div>
        </main>
      }
    >
      <SignupForm />
    </Suspense>
  );
}