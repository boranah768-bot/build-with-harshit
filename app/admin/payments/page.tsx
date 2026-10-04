"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../../../lib/firebase";

const ADMIN_EMAIL = "boranaharshit381@gmail.com";

export default function AdminPaymentsPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setChecking(false);

      if (!currentUser) {
        router.replace("/login");
        return;
      }

      if (currentUser.email !== ADMIN_EMAIL) {
        router.replace("/");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/login");
  };

  if (checking) {
    return (
      <main className="admin-page">
        <div className="admin-loading">
          <div className="admin-loader" />
          <p>AUTHENTICATING ADMIN...</p>
        </div>
      </main>
    );
  }

  if (!user || user.email !== ADMIN_EMAIL) {
    return null;
  }

  return (
    <main className="admin-page">
      <div className="admin-bg-grid" />
      <div className="admin-glow admin-glow-one" />
      <div className="admin-glow admin-glow-two" />

      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          BUILD<span>WITH</span>HARSHIT
        </div>

        <div className="admin-sidebar-label">
          CONTROL CENTER
        </div>

        <nav className="admin-nav">
          <button className="admin-nav-item active">
            <span>◈</span>
            Dashboard
          </button>

          <button className="admin-nav-item">
            <span>◎</span>
            Payments
          </button>

          <button className="admin-nav-item">
            <span>◇</span>
            Products
          </button>

          <button className="admin-nav-item">
            <span>↗</span>
            Customers
          </button>

          <button className="admin-nav-item">
            <span>⚙</span>
            Settings
          </button>
        </nav>

        <div className="admin-sidebar-bottom">
          <div className="admin-account">
            <div className="admin-avatar">H</div>

            <div>
              <strong>Harshit</strong>
              <span>Administrator</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="admin-logout"
          >
            LOG OUT
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <section className="admin-main">

        {/* TOP BAR */}
        <header className="admin-topbar">
          <div>
            <div className="admin-breadcrumb">
              ADMIN / DASHBOARD
            </div>

            <h1>
              Command <span>Center.</span>
            </h1>
          </div>

          <div className="admin-online">
            <span />
            SYSTEM ONLINE
          </div>
        </header>

        {/* WELCOME */}
        <div className="admin-welcome">
          <div>
            <span>PRIVATE ADMIN PANEL</span>

            <h2>
              Welcome back, Harshit.
            </h2>

            <p>
              Manage payments, customers and digital
              product delivery from one place.
            </p>
          </div>

          <div className="admin-secure">
            <div className="secure-icon">✓</div>

            <div>
              <strong>SECURE SESSION</strong>
              <span>{user.email}</span>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="admin-stats">

          <div className="admin-stat-card">
            <div className="stat-top">
              <span>TOTAL PAYMENTS</span>
              <b>↗</b>
            </div>

            <strong>0</strong>

            <small>
              All payment requests
            </small>
          </div>

          <div className="admin-stat-card pending">
            <div className="stat-top">
              <span>PENDING</span>
              <b>◷</b>
            </div>

            <strong>0</strong>

            <small>
              Awaiting verification
            </small>
          </div>

          <div className="admin-stat-card approved">
            <div className="stat-top">
              <span>APPROVED</span>
              <b>✓</b>
            </div>

            <strong>0</strong>

            <small>
              Successful payments
            </small>
          </div>

          <div className="admin-stat-card revenue">
            <div className="stat-top">
              <span>REVENUE</span>
              <b>₹</b>
            </div>

            <strong>₹0</strong>

            <small>
              Verified payments
            </small>
          </div>

        </div>

        {/* PAYMENT SECTION */}
        <section className="admin-section">

          <div className="admin-section-header">

            <div>
              <div className="section-eyebrow">
                TRANSACTION MONITOR
              </div>

              <h2>
                Payment requests
              </h2>

              <p>
                Review customer payments before
                granting digital access.
              </p>
            </div>

            <div className="payment-filter">
              <button className="filter-active">
                ALL
              </button>

              <button>
                PENDING
              </button>

              <button>
                APPROVED
              </button>
            </div>

          </div>

          {/* EMPTY STATE */}
          <div className="admin-empty">

            <div className="empty-orbit">
              <div className="empty-symbol">
                ✓
              </div>
            </div>

            <div className="empty-eyebrow">
              PAYMENT QUEUE
            </div>

            <h3>
              No payment requests yet
            </h3>

            <p>
              When a customer submits their UTR and
              payment screenshot, the request will
              automatically appear here.
            </p>

            <div className="empty-flow">

              <div>
                <span>01</span>
                CUSTOMER PAYS
              </div>

              <i>→</i>

              <div>
                <span>02</span>
                SUBMITS PROOF
              </div>

              <i>→</i>

              <div>
                <span>03</span>
                YOU VERIFY
              </div>

              <i>→</i>

              <div>
                <span>04</span>
                ACCESS UNLOCKED
              </div>

            </div>

          </div>

        </section>

      </section>
    </main>
  );
}