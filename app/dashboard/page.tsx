"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { products } from "../../lib/products";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function handleLogout() {
    try {
      await signOut(auth);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  if (loading) {
    return (
      <main className="bwh-dashboard-loading">
        <div className="bwh-loading-ring"></div>
        <p>LOADING BUILD WITH HARSHIT...</p>
      </main>
    );
  }

  const displayName =
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "BUILDER";

  return (
    <main className="bwh-dashboard">

      <div className="bwh-dashboard-grid"></div>
      <div className="bwh-dashboard-glow bwh-glow-one"></div>
      <div className="bwh-dashboard-glow bwh-glow-two"></div>

      {/* NAVBAR */}
      <nav className="bwh-dashboard-nav">
        <a href="/" className="bwh-dashboard-logo">
          BUILD<span>WITH</span>HARSHIT
        </a>

        <div className="bwh-dashboard-nav-right">
          <span className="bwh-user-email">
            {user?.email || "BUILDER"}
          </span>

          <button
            className="bwh-logout-button"
            onClick={handleLogout}
          >
            LOG OUT
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="bwh-dashboard-hero">

        <div className="bwh-hero-left">

          <div className="bwh-small-label">
            BUILDER DASHBOARD
          </div>

          <h1>
            BUILD.
            <br />
            <span>LEARN.</span>
            <br />
            CREATE.
          </h1>

          <p className="bwh-hero-description">
            Welcome back,{" "}
            <strong>{displayName}</strong>.
            <br />
            Your projects, source code and tutorials are ready.
          </p>

          <div className="bwh-hero-buttons">
            <a
              href="/#projects"
              className="bwh-primary-button"
            >
              EXPLORE PROJECTS
            </a>

            <a
              href="/"
              className="bwh-secondary-button"
            >
              BACK TO STORE
            </a>
          </div>

        </div>

        {/* 3D CUBE */}
        <div className="bwh-cube-area">

          <div className="bwh-cube-shadow"></div>

          <div className="bwh-cube">

            <div className="bwh-cube-face bwh-cube-front">
              <span>BWH</span>
              <strong>BUILD</strong>
            </div>

            <div className="bwh-cube-face bwh-cube-back">
              <span>CODE</span>
              <strong>LAB</strong>
            </div>

            <div className="bwh-cube-face bwh-cube-right">
              <span>ESP32</span>
              <strong>01</strong>
            </div>

            <div className="bwh-cube-face bwh-cube-left">
              <span>ARDUINO</span>
              <strong>02</strong>
            </div>

            <div className="bwh-cube-face bwh-cube-top">
              <span>SOURCE</span>
            </div>

            <div className="bwh-cube-face bwh-cube-bottom">
              <span>CREATE</span>
            </div>

          </div>
        </div>
      </section>

      {/* PROJECT LIBRARY */}
      <section className="bwh-dashboard-section">

        <div className="bwh-section-heading">

          <div>
            <div className="bwh-small-label">
              YOUR LIBRARY
            </div>

            <h2>
              PROJECT
              <br />
              <span>ACCESS.</span>
            </h2>
          </div>

          <p>
            Browse the Build With Harshit
            project collection.
          </p>

        </div>

        <div className="bwh-project-grid">

          {products.map((product, index) => (

            <article
              className="bwh-project-card"
              key={product.id}
            >

              <div className="bwh-project-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="bwh-project-category">
                {product.category}
              </div>

              <h3>{product.title}</h3>

              <p>{product.description}</p>

              <div className="bwh-project-bottom">

                <strong>
                  ₹{product.priceINR}
                </strong>

                <a
                  href={`/checkout/${product.id}`}
                  className="bwh-project-button"
                >
                  GET CODE →
                </a>

              </div>

            </article>

          ))}

        </div>
      </section>

      {/* REELS */}
      <section className="bwh-reels-section">

        <div className="bwh-section-heading">

          <div>
            <div className="bwh-small-label">
              BUILD WITH HARSHIT
            </div>

            <h2>
              WATCH.
              <br />
              <span>BUILD.</span>
            </h2>
          </div>

          <p>
            Watch the projects in action
            before you build them yourself.
          </p>

        </div>

        <div className="bwh-reels-grid">

          {products.slice(0, 4).map((product, index) => (

            <a
              href={product.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bwh-reel-card"
              key={product.id}
            >

              <div className="bwh-reel-number">
                0{index + 1}
              </div>

              <div className="bwh-reel-play">
                ▶
              </div>

              <div className="bwh-reel-content">

                <span>
                  INSTAGRAM REEL
                </span>

                <h3>
                  {product.title}
                </h3>

                <p>
                  WATCH REEL ↗
                </p>

              </div>

            </a>

          ))}

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bwh-dashboard-footer">

        <div>
          <strong>
            BUILDWITHHARSHIT
          </strong>

          <p>
            PROJECT SOURCE CODE • TUTORIALS • LABS
          </p>
        </div>

        <div className="bwh-footer-right">
          EDUCATIONAL & AUTHORIZED USE ONLY
        </div>

      </footer>

    </main>
  );
}