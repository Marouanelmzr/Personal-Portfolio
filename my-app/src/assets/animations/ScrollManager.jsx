import { useLocation, useNavigationType } from "react-router-dom";
import { useLayoutEffect } from "react";

export default function ScrollManager() {
  const location = useLocation();
  const navType = useNavigationType(); // 'POP' = back/forward
  const storeKey = `scroll:${location.pathname}`;

  const getContainer = () => document.querySelector('.App');

  // Save scroll before leaving
  useLayoutEffect(() => {
    return () => {
      const container = getContainer();
      if (container) {
        sessionStorage.setItem(storeKey, String(container.scrollTop));
      }
    };
  }, [storeKey]);

  // Restore scroll
  useLayoutEffect(() => {
    const container = getContainer();
    if (!container) return;

    const restoreScroll = () => {
      if (navType === "POP") {
        // Back/forward → restore scroll
        const y = parseInt(sessionStorage.getItem(storeKey) || "0", 10);
        container.scrollTo({ top: isNaN(y) ? 0 : y, behavior: "auto" });
      } else {
        // New navigation or hard reload → scroll to top
        container.scrollTo({ top: 0, behavior: "auto" });
        // Clear saved scroll to prevent old data being applied later
        sessionStorage.removeItem(storeKey);
      }
    };

    // Use requestAnimationFrame to ensure container is rendered before scrolling
    requestAnimationFrame(restoreScroll);
  }, [storeKey, navType]);

  return null;
}
