// src/pages/ScrollRevealDemo.jsx
import React, { useRef } from "react";
import ScrollReveal from "../assets/animations/scrollreveal"; // path -> adjust if needed

export default function ScrollRevealDemo() {
  const scrollRef = useRef(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#111",
        color: "#fff",
        fontFamily: "Inter, sans-serif",
        padding: "40px",
      }}
    >
      <div
        style={{
          width: 640,
          height: 520,
          borderRadius: 12,
          background: "#1e1e1e",
          padding: 20,
          position: "relative",
          boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
          overflow: "hidden", // hide the underlying scroll bar if you want a cleaner look
        }}
      >
        <h2 style={{ margin: 0, marginBottom: 8, textAlign: "center" }}>ScrollReveal — pinned</h2>
        <p style={{ marginTop: 0, marginBottom: 16, textAlign: "center", color: "#aab0b6" }}>
          Scroll inside the (invisible) scroll layer — the visible text stays pinned while words reveal.
        </p>

        {/* PINNED overlay that shows the text (pointerEvents: 'none' lets the scroll go through to underlying layer) */}
        <div
          style={{
            position: "absolute",
            top: 80,
            left: 20,
            right: 20,
            height: 360,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 5,
            pointerEvents: "none", // allow pointer/scroll to pass through to underlying scroll layer
          }}
        >
          {/* ScrollReveal will listen to scrollRef (external), so it doesn't need to be a scrollable element itself */}
          <ScrollReveal
            containerRef={scrollRef}
            style={{
              width: "100%",
              height: "100%",
              background: "transparent",
              padding: 16,
              textAlign: "center",
              fontSize: 18,
              lineHeight: 1.6,
              color: "#E6E7E9",
              pointerEvents: "none", // make sure overlay does not swallow pointer events
            }}
          >
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in
              eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum
              nulla, ut commodo diam libero vitae erat.
            </p>
            <p>
              Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae
              risus tristique posuere. Proin sed libero enim sed faucibus turpis in eu mi bibendum.
            </p>
            <p>
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </p>
          </ScrollReveal>
        </div>

        {/* UNDERLYING scrollable layer — this is the real scroll container.
            Keep it behind the overlay so scrolling drives the reveal without moving the text. */}
        <div
          ref={scrollRef}
          style={{
            position: "absolute",
            top: 80,
            left: 0,
            right: 0,
            bottom: 20,
            overflowY: "auto",
            zIndex: 1,
            padding: 0,
            // optional: show the scrollbar by setting background; set it to transparent for hidden effect
            background: "transparent",
          }}
        >
          {/* The long inner content creates the scroll range that drives ScrollReveal */}
          <div style={{ height: 2200 }} />
        </div>
      </div>
    </div>
  );
}
