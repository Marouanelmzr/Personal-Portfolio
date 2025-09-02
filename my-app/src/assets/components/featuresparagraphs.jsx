import React, { useRef, useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import ScrollReveal from "../animations/scrollreveal.tsx";
import { PiMouseScrollFill } from "react-icons/pi";

const paragraphs = [
  "The Employee Page is a personalized dashboard for interns to manage their absences. It displays the remaining leave balance, provides a simple form to submit new absence requests, and lists the complete history of previous requests with their status.",
  "Second paragraph appears after the first one finishes, highlighting each word from start to end.",
  "Third paragraph comes last, also highlighting word by word as you scroll."
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

export default function ParagraphsStack() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRefs = useRef(paragraphs.map(() => React.createRef()));

  const handleProgress = (p, index) => {
    if (p >= 1 && index < paragraphs.length - 1) {
      setCurrentIndex(index + 1); // scroll down → next paragraph
    } else if (p <= 0 && index > 0) {
      setCurrentIndex(index - 1); // scroll up → previous paragraph
    }
  };

  return (
    <div className="left-text"   data-cursor="Scroll Down"
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
        <PiMouseScrollFill className="icon-scroll"/>
      </div>
    </div>
  );
}
