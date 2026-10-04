"use client";

import Link from "next/link";
import { useState } from "react";
import { products } from "../lib/products";
import MobileGate from "./mobile-gate/page";

const reels = [
  {
    title: "Arduino Pro Micro — Unlock PIN",
    url: "https://www.instagram.com/reel/DarxMSguR0o/",
  },
  {
    title: "ESP32 — Unlimited Wi-Fi",
    url: "https://www.instagram.com/reel/DcgTkAouMFa/",
  },
  {
    title: "ESP32 — Unlock PIN",
    url: "https://www.instagram.com/reel/Db0RPqBuKTK/",
  },
  {
    title: "ESP32 — Wi-Fi Scanning",
    url: "https://www.instagram.com/reel/DcyOiCwOfqQ/",
  },
  {
    title: "ESP32 — Evil Twin",
    url: "https://www.instagram.com/reel/DcqoaeNouQa/",
  },
];

export default function HomePage() {
  const [category, setCategory] = useState("All");

  const categories = ["All", "Arduino", "ESP32", "Security Lab"];

  const filteredProducts =
    category === "All"
      ? products
      : products.filter((product) => product.category === category);

  return (
    <>
      {/* MOBILE DESKTOP-MODE GATE */}
      <MobileGate />

      {/* MAIN WEBSITE */}
      <main>
        {/* DISCLAIMER */}
        <div className="disclaimer-bar">
          <div className="disclaimer-track">
            ⚠ EDUCATIONAL & AUTHORIZED PROJECT USE ONLY • DO NOT USE PROJECTS
            AGAINST SYSTEMS, NETWORKS OR DEVICES WITHOUT PERMISSION • ALL
            PROJECTS ARE PROVIDED FOR LEARNING, RESEARCH & CONTROLLED LAB USE
            ONLY •
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="site-nav">
          <Link href="/" className="logo">
            BUILD<span>WITH</span>HARSHIT
          </Link>

          <div className="nav-links">
            <a href="#projects">Projects</a>
            <a href="#reels">Reels</a>
            <a href="#about">About</a>
          </div>

          <div className="nav-auth">
            <Link href="/login" className="nav-button">
              Login
            </Link>

            <Link href="/signup" className="nav-button primary">
              Sign Up
            </Link>
          </div>
        </nav>

        {/* HERO */}
        <section className="hero">
          <div className="hero-content">
            <div className="eyebrow">
              Project Source Code • Tutorials • Labs
            </div>

            <h1>
              BUILD
              <br />
              <span>WITHOUT</span>
              <br />
              LIMITS.
            </h1>

            <p className="hero-description">
              Explore practical Arduino, ESP32 and cybersecurity laboratory
              projects with source code and tutorials. Watch the project. Get
              the code. Build it yourself.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="primary-button">
                Explore Projects
              </a>

              <a href="#reels" className="secondary-button">
                Watch Reels ↗
              </a>
            </div>
          </div>

          {/* 3D CUBE */}
          <div className="cube-area">
            <div className="cube-glow" />

            <div className="cube-wrapper">
              <div className="cube">
                <div className="face front" />
                <div className="face back" />
                <div className="face right" />
                <div className="face left" />
                <div className="face top" />
                <div className="face bottom" />
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="stats">
          <div className="stat">
            <div className="stat-number">{products.length}</div>
            <div className="stat-label">Projects Available</div>
          </div>

          <div className="stat">
            <div className="stat-number">₹49+</div>
            <div className="stat-label">Starting Price</div>
          </div>

          <div className="stat">
            <div className="stat-number">100%</div>
            <div className="stat-label">Digital</div>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="section" id="projects">
          <div className="section-heading">
            <div>
              <div className="section-kicker">Project Library</div>

              <h2>
                SOURCE.
                <br />
                BUILD. LEARN.
              </h2>
            </div>

            <p className="section-description">
              Watch the project first. Then get the source code and build it
              yourself.
            </p>
          </div>

          {/* FILTERS */}
          <div className="filters">
            {categories.map((item) => (
              <button
                key={item}
                className={`filter ${category === item ? "active" : ""}`}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {/* PROJECT GRID */}
          <div className="project-grid">
            {filteredProducts.map((product) => (
              <article className="project-card" key={product.id}>
                <div className="project-visual">
                  <div className="project-chip">{product.category}</div>

                  <div className="project-icon">
                    <span>
                      {product.category === "Arduino"
                        ? "ARD"
                        : product.category === "ESP32"
                          ? "ESP"
                          : "SEC"}
                    </span>
                  </div>
                </div>

                <div className="project-info">
                  <h3>{product.title}</h3>

                  <p>{product.description}</p>

                  <div className="project-bottom">
                    <div className="price">₹{product.priceINR}</div>

                    <Link
                      href={`/checkout/${product.id}`}
                      className="get-code"
                    >
                      GET CODE →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* REELS */}
        <section className="section reels-section" id="reels">
          <div className="section-heading">
            <div>
              <div className="section-kicker">Build With Harshit</div>

              <h2>
                WATCH.
                <br />
                BUILD.
              </h2>
            </div>

            <p className="section-description">
              See the projects in action on Instagram before getting the
              source code.
            </p>
          </div>

          <div className="reels-grid">
            {reels.map((reel) => (
              <article className="reel-card" key={reel.url}>
                <div className="reel-frame">
                  <iframe
                    src={`${reel.url}embed/`}
                    title={reel.title}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>

                <div className="reel-info">
                  <h3>{reel.title}</h3>

                  <p>
                    Watch the project reel and see the build before getting
                    the source code.
                  </p>

                  <a
                    href={reel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="reel-link"
                  >
                    WATCH ON INSTAGRAM ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section className="section" id="about">
          <div className="section-heading">
            <div>
              <div className="section-kicker">Build With Harshit</div>

              <h2>
                BUILD
                <br />
                SOMETHING
                <br />
                REAL.
              </h2>
            </div>

            <p className="section-description">
              A digital project library for builders, learners, developers and
              electronics enthusiasts.
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div>
            <strong>BUILD WITH HARSHIT</strong>
            <br />
            Practical projects. Real builds.
          </div>

          <div>Educational & authorized use only.</div>
        </footer>
      </main>
    </>
  );
}