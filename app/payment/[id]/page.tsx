"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProduct, Product } from "../../../lib/products";

const BSC_ADDRESS =
  "0xf91d4cc5ce33386f5101fc5eb825f91035824fdd";

const TRON_ADDRESS =
  "TAf6W46B8CZwmuWPnCrV8CbZxGLQsaHTGd";

/*
  Change this if you want to use a different
  INR → USDT conversion rate.

  Example:
  ₹900 / 90 = 10 USDT
*/
const USDT_RATE = 90;

export default function PaymentPage() {
  const params = useParams();
  const id = params?.id as string;

  const [product, setProduct] = useState<Product | undefined>();
  const [method, setMethod] = useState<"upi" | "crypto">("upi");
  const [network, setNetwork] = useState<"bsc" | "tron">("bsc");

  const [timeLeft, setTimeLeft] = useState(300);
  const [copied, setCopied] = useState("");

  useEffect(() => {
    if (id) {
      setProduct(getProduct(id));
    }
  }, [id]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const copyAddress = async (address: string, name: string) => {
    try {
      await navigator.clipboard.writeText(address);

      setCopied(name);

      setTimeout(() => {
        setCopied("");
      }, 1800);
    } catch {
      alert("Unable to copy address.");
    }
  };

  if (!product) {
    return (
      <main className="payment-page">
        <div className="payment-loading">
          <div className="loading-ring" />
          <p>Loading payment...</p>
        </div>
      </main>
    );
  }

  const usdtAmount = (product.priceINR / USDT_RATE).toFixed(2);

  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");

  const seconds = (timeLeft % 60)
    .toString()
    .padStart(2, "0");

  const currentAddress =
    network === "bsc" ? BSC_ADDRESS : TRON_ADDRESS;

  const currentNetwork =
    network === "bsc" ? "BNB Smart Chain (BEP-20)" : "TRON (TRC-20)";

  return (
    <main className="payment-page">

      <div className="payment-grid-bg" />

      <header className="payment-header">

        <Link href="/" className="payment-brand">
          BUILD<span>WITH</span>HARSHIT
        </Link>

        <Link
          href={`/checkout/${product.id}`}
          className="payment-back"
        >
          ← Back
        </Link>

      </header>

      <section className="payment-wrapper">

        <div className="payment-heading">

          <div className="payment-eyebrow">
            PAYMENT / SECURE CHECKOUT
          </div>

          <h1>
            Complete your
            <span> payment.</span>
          </h1>

          <p>
            Choose your preferred payment method below. Your payment
            session is reserved for 5 minutes.
          </p>

        </div>

        <div className="payment-card">

          <div className="payment-card-top">

            <div>
              <span className="payment-small-label">
                ORDER
              </span>

              <h2>{product.title}</h2>
            </div>

            <div className="payment-total">
              <small>TOTAL</small>
              <strong>₹{product.priceINR}</strong>
            </div>

          </div>

          <div className="payment-timer">

            <div className="timer-dot" />

            <div>
              <span>PAYMENT SESSION</span>

              <strong>
                {timeLeft > 0
                  ? `${minutes}:${seconds}`
                  : "EXPIRED"}
              </strong>
            </div>

            <small>
              {timeLeft > 0
                ? "Complete payment before the session expires."
                : "This payment session has expired."}
            </small>

          </div>

          <div className="payment-methods">

            <button
              className={`payment-method ${
                method === "upi" ? "active" : ""
              }`}
              onClick={() => setMethod("upi")}
            >
              <span className="payment-method-icon">
                ₹
              </span>

              <span>
                <strong>Indian UPI</strong>
                <small>Pay using QR</small>
              </span>
            </button>

            <button
              className={`payment-method ${
                method === "crypto" ? "active" : ""
              }`}
              onClick={() => setMethod("crypto")}
            >
              <span className="payment-method-icon">
                ◈
              </span>

              <span>
                <strong>USDT</strong>
                <small>For international payments</small>
              </span>
            </button>

          </div>

          {method === "upi" && (
            <div className="upi-payment">

              <div className="payment-section-label">
                INDIAN PAYMENT
              </div>

              <div className="upi-layout">

                <div className="upi-qr-card">

                  <div className="qr-frame">

  <img
    src="/payment-qr.png"
    alt="BWH UPI payment QR"
    className="upi-qr"
  />

</div>

                  <div className="qr-status">
                    <span />
                    QR PAYMENT
                  </div>

                </div>

                <div className="upi-details">

                  <span className="payment-label">
                    AMOUNT TO PAY
                  </span>

                  <div className="upi-amount">
                    ₹{product.priceINR}
                  </div>

                  <p>
                    Scan the QR using any supported UPI app and
                    complete the exact amount shown above.
                  </p>

                  <div className="payment-security-note">
                    <span>✓</span>
                    Pay only the amount shown on this page.
                  </div>

                  <div className="payment-security-note">
                    <span>✓</span>
                    Keep your payment confirmation after paying.
                  </div>

                </div>

              </div>

              <div className="payment-instruction">

                <strong>After payment</strong>

                <span>
                  Keep your UPI transaction ID / payment screenshot.
                  You will need it to confirm your purchase.
                </span>

              </div>

            </div>
          )}

          {method === "crypto" && (
            <div className="crypto-payment">

              <div className="payment-section-label">
                INTERNATIONAL PAYMENT
              </div>

              <div className="crypto-amount-box">

                <div>
                  <span>USDT AMOUNT</span>

                  <strong>
                    {usdtAmount} USDT
                  </strong>
                </div>

                <small>
                  Based on ₹{USDT_RATE} = 1 USDT
                </small>

              </div>

              <div className="network-selector">

                <button
                  className={network === "bsc" ? "active" : ""}
                  onClick={() => setNetwork("bsc")}
                >
                  <strong>BSC</strong>
                  <span>BEP-20</span>
                </button>

                <button
                  className={network === "tron" ? "active" : ""}
                  onClick={() => setNetwork("tron")}
                >
                  <strong>TRON</strong>
                  <span>TRC-20</span>
                </button>

              </div>

              <div className="crypto-address-card">

                <div className="crypto-address-top">

                  <div>
                    <span>NETWORK</span>

                    <strong>
                      {currentNetwork}
                    </strong>
                  </div>

                  <div className="network-live">
                    ACTIVE
                  </div>

                </div>

                <div className="crypto-address">

                  <code>
                    {currentAddress}
                  </code>

                  <button
                    onClick={() =>
                      copyAddress(
                        currentAddress,
                        network
                      )
                    }
                  >
                    {copied === network
                      ? "COPIED ✓"
                      : "COPY"}
                  </button>

                </div>

              </div>

              <div className="crypto-warning">

                <span>!</span>

                <div>
                  <strong>Send USDT only on the selected network.</strong>

                  <p>
                    Sending USDT through another network may result
                    in permanent loss of funds.
                  </p>
                </div>

              </div>

              <div className="payment-instruction">

                <strong>After payment</strong>

                <span>
                  Save the transaction hash / TxID. You will need it
                  to confirm your purchase.
                </span>

              </div>

            </div>
          )}

          <div className="payment-confirm-area">

            <div className="confirmation-icon">
              ✓
            </div>

            <div>
              <strong>Already paid?</strong>

              <p>
                Continue to payment confirmation after sending the
                exact amount.
              </p>
            </div>

            <Link
              href={`/payment/${product.id}/confirm`}
              className="payment-confirm-button"
            >
              I have paid →
            </Link>

          </div>

          <div className="payment-footer-note">

            <span>SECURE DIGITAL DELIVERY</span>

            <p>
              Payment verification may be required before project
              access is delivered.
            </p>

          </div>

        </div>

      </section>

      <footer className="payment-page-footer">
        <span>BUILDWITHHARSHIT</span>

        <Link href="/">
          Projects
        </Link>
      </footer>

    </main>
  );
}