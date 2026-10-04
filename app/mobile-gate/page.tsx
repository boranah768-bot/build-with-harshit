"use client";

import { useEffect, useState } from "react";

export default function MobileGate() {
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktopMode, setIsDesktopMode] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const mobile =
        /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

      setIsMobile(mobile);

      // Desktop Site normally gives a much wider viewport.
      setIsDesktopMode(window.innerWidth >= 900);
    };

    checkDevice();

    window.addEventListener("resize", checkDevice);

    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  if (!isMobile) {
    return null;
  }

  const continueToWebsite = () => {
    if (isDesktopMode) {
      window.location.reload();
    }
  };

  return (
    <div className="mobile-gate">
      <div className="mobile-gate-grid" />

      <div className="mobile-gate-glow mobile-gate-glow-one" />
      <div className="mobile-gate-glow mobile-gate-glow-two" />

      <section className="mobile-gate-card">

        <div className="mobile-gate-logo">
          BUILD<span>WITH</span>HARSHIT
        </div>

        <div className="mobile-gate-icon">
          <div className="phone-icon">
            <div className="phone-screen" />
          </div>
        </div>

        <div className="mobile-gate-eyebrow">
          BEST EXPERIENCE
        </div>

        <h1>
          Please switch to
          <span> Desktop Site.</span>
        </h1>

        <p className="mobile-gate-description">
          This website is currently optimized for desktop
          screens. For the best experience, please enable
          <strong> Desktop Site</strong> in your browser.
        </p>

        <div className="mobile-gate-steps">

          <div className="mobile-gate-step">
            <div className="mobile-gate-number">01</div>

            <div>
              <strong>Open your browser menu</strong>

              <p>
                Tap the <b>⋮</b> menu in Chrome or your
                browser options.
              </p>
            </div>
          </div>

          <div className="mobile-gate-step">
            <div className="mobile-gate-number">02</div>

            <div>
              <strong>Turn on Desktop Site</strong>

              <p>
                Select <b>Desktop site</b> or
                <b> Request Desktop Website</b>.
              </p>
            </div>
          </div>

          <div className="mobile-gate-step">
            <div className="mobile-gate-number">03</div>

            <div>
              <strong>Return to this website</strong>

              <p>
                Come back here after enabling Desktop Site.
              </p>
            </div>
          </div>

        </div>

        <button
          type="button"
          className={`mobile-gate-button ${
            isDesktopMode ? "ready" : ""
          }`}
          onClick={continueToWebsite}
        >
          <span>
            {isDesktopMode
              ? "CONTINUE TO WEBSITE"
              : "I'VE ENABLED DESKTOP SITE"}
          </span>

          <strong>→</strong>
        </button>

        <div
          className={`mobile-gate-status ${
            isDesktopMode ? "ready-status" : ""
          }`}
        >
          <span className="status-dot" />

          {isDesktopMode
            ? "Desktop mode detected"
            : "Waiting for Desktop Site"}
        </div>

        <div className="mobile-gate-footer">
          BUILDWITHHARSHIT
          <span>•</span>
          DIGITAL PROJECT LIBRARY
        </div>

      </section>
    </div>
  );
}