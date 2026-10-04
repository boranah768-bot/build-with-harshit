"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getProduct, Product } from "../../../lib/products";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../lib/firebase";

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id as string;

  const [product, setProduct] = useState<Product | undefined>();
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (id) {
      setProduct(getProduct(id));
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [id]);

  if (loading) {
    return (
      <main className="checkout-page">
        <div className="checkout-loading">
          <div className="loading-ring" />
          <p>Loading project...</p>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="checkout-page">
        <div className="checkout-not-found">
          <span className="checkout-eyebrow">BWH / 404</span>

          <h1>Project not found.</h1>

          <p>
            This project does not exist or the link may be incorrect.
          </p>

          <Link href="/" className="checkout-button">
            ← Back to projects
          </Link>
        </div>
      </main>
    );
  }

  const continueToPayment = () => {
    router.push(`/payment/${product.id}`);
  };

  return (
    <main className="checkout-page">

      <div className="checkout-grid" />
      <div className="checkout-glow checkout-glow-one" />
      <div className="checkout-glow checkout-glow-two" />

      <header className="checkout-header">
        <Link href="/" className="checkout-brand">
          BUILD<span>WITH</span>HARSHIT
        </Link>

        <Link href="/" className="checkout-back">
          ← Projects
        </Link>
      </header>

      <section className="checkout-container">

        <div className="checkout-left">

          <div className="checkout-mini-label">
            PROJECT CHECKOUT
          </div>

          <h1 className="checkout-title">
            {product.title}
          </h1>

          <p className="checkout-description">
            {product.description}
          </p>

          <div className="checkout-tags">
            <span>{product.category}</span>
            <span>DIGITAL</span>
            <span>SOURCE CODE</span>
          </div>

          <div className="checkout-visual">
            <div className="checkout-cube">

              <div className="cube-face cube-front">
                <span>BWH</span>
                <strong>CODE</strong>
              </div>

              <div className="cube-face cube-back">
                BUILD
              </div>

              <div className="cube-face cube-right">
                SOURCE
              </div>

              <div className="cube-face cube-left">
                LAB
              </div>

              <div className="cube-face cube-top">
                BWH
              </div>

              <div className="cube-face cube-bottom">
                01
              </div>

            </div>
          </div>

        </div>

        <div className="checkout-card">

          <div className="checkout-card-top">
            <span>PROJECT ACCESS</span>

            <div className="checkout-status">
              <i />
              DIGITAL
            </div>
          </div>

          <div className="checkout-card-icon">
            &lt;/&gt;
          </div>

          <h2>{product.title}</h2>

          <p className="checkout-card-description">
            Get the complete project source code and start building it
            yourself.
          </p>

          <div className="checkout-price">
            <span>₹</span>
            {product.priceINR}
            <small>/ project</small>
          </div>

          <div className="checkout-divider" />

          <div className="checkout-includes">

            <div>
              <b>✓</b>
              <span>Complete source code</span>
            </div>

            <div>
              <b>✓</b>
              <span>Digital delivery</span>
            </div>

            <div>
              <b>✓</b>
              <span>Project instructions</span>
            </div>

            <div>
              <b>✓</b>
              <span>Educational use</span>
            </div>

          </div>

          <div className="checkout-divider" />

          {!loggedIn ? (
            <>
              <div className="checkout-login-message">
                <strong>Account required</strong>

                <span>
                  Sign in or create an account before purchasing this
                  project.
                </span>
              </div>

              <div className="checkout-actions">

                <Link
                  href={`/login?redirect=/checkout/${product.id}`}
                  className="checkout-primary"
                >
                  Login to continue
                </Link>

                <Link
                  href={`/signup?redirect=/checkout/${product.id}`}
                  className="checkout-secondary"
                >
                  Create account
                </Link>

              </div>
            </>
          ) : (
            <button
              className="checkout-primary checkout-buy"
              onClick={continueToPayment}
            >
              Continue to payment
              <span>→</span>
            </button>
          )}

          <p className="checkout-secure">
            🔒 Secure digital purchase
          </p>

        </div>
      </section>

      <section className="checkout-disclaimer">
        <span>IMPORTANT</span>

        <p>{product.disclaimer}</p>
      </section>

      <footer className="checkout-footer">

        <span>BUILDWITHHARSHIT</span>

        <div>
          <Link href="/">Projects</Link>
          <Link href="/login">Login</Link>
          <Link href="/signup">Sign Up</Link>
        </div>

      </footer>

    </main>
  );
}