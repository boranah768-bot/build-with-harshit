"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getProduct, Product } from "../../../../lib/products";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd1vAnhoABQc_xSH7UxI5isxm-L1sSn6JxZ0sNHZx3cOyLzkA/viewform";

export default function PaymentConfirmPage() {
  const params = useParams();
  const id = params?.id as string;

  const [product, setProduct] = useState<Product | undefined>();

  useEffect(() => {
    if (id) {
      setProduct(getProduct(id));
    }
  }, [id]);

  if (!product) {
    return (
      <main className="payment-confirm-page">
        <div className="payment-confirm-loading">
          <div className="loading-ring" />
          <p>Loading payment...</p>
        </div>
      </main>
    );
  }

  const formUrl =
    `${GOOGLE_FORM_URL}?product=${encodeURIComponent(
      product.title
    )}&amount=${encodeURIComponent(
      String(product.priceINR)
    )}`;

  return (
    <main className="payment-confirm-page">

      <div className="payment-confirm-grid" />

      <div className="payment-confirm-glow payment-confirm-glow-one" />
      <div className="payment-confirm-glow payment-confirm-glow-two" />

      {/* HEADER */}

      <header className="payment-confirm-header">

        <Link
          href="/"
          className="payment-confirm-brand"
        >
          BUILD<span>WITH</span>HARSHIT
        </Link>

        <Link
          href={`/payment/${product.id}`}
          className="payment-confirm-back"
        >
          ← Back to payment
        </Link>

      </header>

      {/* CONTENT */}

      <section className="payment-confirm-wrapper">

        <div className="payment-confirm-heading">

          <div className="confirm-eyebrow">
            PAYMENT / VERIFICATION
          </div>

          <h1>
            Confirm your
            <span> payment.</span>
          </h1>

          <p>
            Already completed your payment?
            Submit your transaction details and
            payment screenshot for verification.
          </p>

        </div>

        {/* MAIN CARD */}

        <div className="payment-confirm-card">

          {/* ORDER HEADER */}

          <div className="confirm-card-top">

            <div className="confirm-order">

              <span className="confirm-label">
                ORDER
              </span>

              <h2>
                {product.title}
              </h2>

            </div>

            <div className="confirm-total">

              <span className="confirm-label">
                TOTAL
              </span>

              <strong>
                ₹{product.priceINR}
              </strong>

            </div>

          </div>

          {/* STATUS */}

          <div className="payment-status">

            <div className="payment-status-dot" />

            <div>
              <strong>
                PAYMENT VERIFICATION
              </strong>

              <span>
                Manual verification required
              </span>
            </div>

          </div>

          {/* STEPS */}

          <div className="payment-steps">

            <div className="payment-step">

              <div className="payment-step-number">
                01
              </div>

              <div className="payment-step-line" />

              <div className="payment-step-content">

                <h3>
                  Complete payment
                </h3>

                <p>
                  Complete your ₹{product.priceINR}
                  payment using the payment method
                  shown on the previous page.
                </p>

              </div>

            </div>

            <div className="payment-step">

              <div className="payment-step-number">
                02
              </div>

              <div className="payment-step-line" />

              <div className="payment-step-content">

                <h3>
                  Submit payment proof
                </h3>

                <p>
                  Open the verification form and
                  submit your UTR and payment
                  screenshot.
                </p>

              </div>

            </div>

            <div className="payment-step">

              <div className="payment-step-number">
                03
              </div>

              <div className="payment-step-content">

                <h3>
                  Get your access
                </h3>

                <p>
                  Your payment will be checked
                  manually before your purchased
                  files and tutorial are delivered.
                </p>

              </div>

            </div>

          </div>

          {/* FORM ACTION */}

          <div className="payment-proof-box">

            <div className="payment-proof-icon">
              ↑
            </div>

            <div className="payment-proof-content">

              <div className="payment-proof-label">
                PAYMENT PROOF
              </div>

              <h3>
                Submit your payment
              </h3>

              <p>
                Upload your payment screenshot
                and enter your UTR in the secure
                verification form.
              </p>

            </div>

            <a
              href={formUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="payment-proof-button"
            >
              <span>I HAVE PAID</span>
              <strong>→</strong>
            </a>

          </div>

          {/* SECURITY */}

          <div className="payment-security">

            <div className="payment-security-icon">
              ✓
            </div>

            <div>

              <strong>
                Secure payment verification
              </strong>

              <p>
                Your screenshot is used only to
                verify your payment. Never upload
                passwords, private keys or other
                sensitive information.
              </p>

            </div>

          </div>

          {/* REVIEW */}

          <div className="manual-review">

            <div className="manual-review-icon">
              ✓
            </div>

            <div>

              <strong>
                Manual verification
              </strong>

              <p>
                After submitting the form, your
                payment will be reviewed. Once
                approved, your purchased content
                can be delivered.
              </p>

            </div>

          </div>

        </div>

        {/* HELP */}

        <div className="payment-help">

          <span>
            PAYMENT COMPLETED?
          </span>

          <p>
            Keep your payment screenshot and UTR
            available until your order has been
            verified.
          </p>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="payment-confirm-footer">

        <span>
          BUILDWITHHARSHIT
        </span>

        <span>
          SECURE DIGITAL DELIVERY
        </span>

      </footer>

    </main>
  );
}