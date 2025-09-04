import React, { useRef, useEffect, useState } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import ScrollReveal from "../animations/scrollreveal.tsx";
import { PiMouseScrollFill } from "react-icons/pi";

const paragraphs = [
  "The Employee Page is a personalized dashboard designed for interns to manage their absences efficiently. It displays the remaining leave balance, provides a straightforward form to submit new leave requests, and presents a comprehensive history of previously submitted requests along with their current status.",
  "The Collaborator Page features a navigation system with two distinct sections: Collaborator and Manager. Regular employees can access only the Collaborator section, while managers have access to both, enabling them to switch views as necessary. This structure ensures clear, role-based access while maintaining a simple and intuitive interface.",
  "The Collaborator Page also includes functionality for managing leave. The “Solde de congé” section displays the remaining leave balance using a progress bar, offering users a clear overview of their available days. The “Faire une demande d'absence” feature allows employees to submit new leave requests easily.",
  "The page includes a detailed history table displaying all submitted leave requests. Each entry shows the submission date, start and end dates, total number of days, type of leave, and current status (Pending, Approved, Rejected, or Draft). Requests saved as Draft remain editable, enabling employees to make modifications before final submission.",
  "The table is designed to handle large datasets efficiently. It displays five rows per page and utilizes a backend-driven pagination system, rather than performing pagination on the frontend. This approach ensures fast response times and minimal client-side processing by fetching only the required subset of data from the SQL database for each page request, improving scalability and performance for larger teams.",
  "The leave request form allows employees to provide comprehensive details regarding their absence, including start and end dates and the reason for leave. Users can choose to save a request as a draft for later editing or submit it directly for approval, offering flexibility and greater control over leave management.",
  "The Manager Page offers an organized overview of leave requests submitted by team members under the manager’s supervision. Each request is displayed as a card containing all relevant details, and managers can open a card to approve or reject the request. The page also features a search function, enabling managers to quickly locate specific team members’ requests and manage absences efficiently and effectively.",
  "Both the Employee and Manager Pages are fully responsive, ensuring an optimal experience across all devices and screen sizes. The layout, navigation, and interactive elements automatically adjust to desktops, tablets, and mobile devices, allowing users to access leave information, submit requests, or manage team absences efficiently, regardless of the device they are using."

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
          <ScrollReveal containerRef={scrollRef} className={`scrollreveal`}>
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

export default function ParagraphsStack({ onIndexChange, onProgressChange }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRefs = useRef(paragraphs.map(() => React.createRef()));

  const handleProgress = (p, index) => {
    if (p >= 1 && index < paragraphs.length - 1) {
      setCurrentIndex(index + 1);
      if (onIndexChange) onIndexChange(index + 1);
    } else if (p <= 0 && index > 0) {
      setCurrentIndex(index - 1);
      if (onIndexChange) onIndexChange(index - 1);
    }

    // For the 4th and 5th paragraphs, report progress
    if ((index === 3 || index === 6) && onProgressChange) {
      onProgressChange(p);
    }
  };

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
      <div className="paragraph-counter">
        <h4>
          <span className='bold'>{currentIndex + 1}</span> Of <span className='bold'>8</span>
          
          </h4>
      </div>
    </div>
  );
}
