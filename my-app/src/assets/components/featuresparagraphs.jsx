import React, { useRef, useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import ScrollReveal from "../animations/scrollreveal.tsx";
import { PiMouseScrollFill } from "react-icons/pi";

const paragraphs = [
  "The Employee Page is a personalized dashboard for interns to manage their absences. It displays the remaining leave balance, provides a simple form to submit new absence requests, and lists the complete history of previous requests with their status.",
  "The Collaborator Page features a navigation with two sections: Collaborator and Manager. Simple employees can access only the Collaborator section, while managers have access to both, allowing them to switch views as needed. This ensures clear, role-based access while keeping the interface simple and intuitive.",
  "The Collaborator Page also includes features for leave management. The “Solde de congé” displays the remaining leave balance using a progress bar, giving users a clear overview of their available days. The “Faire une demande d'absence” allows employees to submit new leave requests."
];

const PinnedParagraph = React.forwardRef(
  ({ text, show, scrollHeight = 2200, onProgress }, ref) => {
    const scrollRef = useRef(null);
    const [progress, setProgress] = useState(0);

    // expose scrollRef to parent
    useEffect(() => {
      if (ref) ref.current = scrollRef.current;
    }, [ref]);

    // track scroll
    useEffect(() => {
      if (!scrollRef.current) return;
      const container = scrollRef.current;

      const onScroll = () => {
        const scrollTop = container.scrollTop;
        const height = container.scrollHeight - container.clientHeight;
        const p = Math.min(Math.max(scrollTop / height, 0), 1);
        setProgress(p);

        if (onProgress) {
          onProgress(p);
        }
      };

      container.addEventListener("scroll", onScroll);
      return () => container.removeEventListener("scroll", onScroll);
    }, [onProgress]);

    const words = text.split(" ");
    const springProgress = useSpring(progress, { damping: 20, stiffness: 100 });

    if (!show) return null;

    return (
      <div >
        <div className="left-text-scrollable">
          <ScrollReveal containerRef={scrollRef} className="scrollreveal">
            <motion.h6>
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  style={{
                    color: springProgress.get() * words.length > i ? "#5B45FF" : "#999",
                  }}
                >
                  {word}{" "}
                </motion.span>
              ))}
            </motion.h6>
          </ScrollReveal>
        </div>
        
        <div ref={scrollRef} className="ghostscroll">
          <div style={{ height: scrollHeight }} />
        </div>
        
      </div>
    );
  }
);

export default function ParagraphsStack({ onIndexChange }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRefs = useRef(paragraphs.map(() => React.createRef()));

  const handleProgress = (p, index) => {
    if (p >= 1 && index < paragraphs.length - 1) {
      setCurrentIndex(index + 1); // scroll down → next paragraph
      if (onIndexChange) onIndexChange(index + 1);
    } else if (p <= 0 && index > 0) {
      setCurrentIndex(index - 1); // scroll up → previous paragraph
      if (onIndexChange) onIndexChange(index - 1);
    }
  };

  // Call callback on mount to set initial index
  useEffect(() => {
    if (onIndexChange) onIndexChange(currentIndex);
  }, []);

  return (
    <div
      className="left-text"
      data-cursor="Scroll Down"
      onMouseEnter={() => {
        window.dispatchEvent(
          new CustomEvent("cursor-label", { detail: { label: "Scroll Down" } })
        );
      }}
      onMouseLeave={() => {
        window.dispatchEvent(
          new CustomEvent("cursor-label", { detail: { label: "" } })
        );
      }}
    >
      {paragraphs.map((p, i) => (
        <PinnedParagraph
          key={i}
          text={p}
          show={i === currentIndex}
          scrollHeight={2200}
          ref={scrollRefs.current[i]}
          onProgress={(p) => handleProgress(p, i)}
        />
      ))}
      <div className="scroll-indicator">
        <PiMouseScrollFill className="icon-scroll" />
      </div>
    </div>
  );
}

