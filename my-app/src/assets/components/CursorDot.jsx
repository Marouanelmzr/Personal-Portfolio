import { useEffect, useRef, useState } from "react";

const CursorDot = () => {
  const dotRef = useRef(null);
  const requestRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });
  const position = useRef({ x: 0, y: 0 });
  const [label, setLabel] = useState("");

useEffect(() => {
  const handleMouseMove = (e) => {
    mouse.current.x = e.clientX;
    mouse.current.y = e.clientY;
  };

  document.addEventListener("mousemove", handleMouseMove);

  const animate = () => {
    position.current.x += (mouse.current.x - position.current.x) * 0.15;
    position.current.y += (mouse.current.y - position.current.y) * 0.15;

    if (dotRef.current) {
      dotRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0)`;
    }

    requestRef.current = requestAnimationFrame(animate);
  };

  requestRef.current = requestAnimationFrame(animate);

  const handleHover = (e) => {
    let el = e.target;
    while (el && el !== document) {
      const label = el.getAttribute("data-cursor");
      if (label) {
        console.log("Hovered:", el, label); // ✅ should now log
        setLabel(label);
        return;
      }
      el = el.parentElement;
    }
    setLabel("");
  };

  const clearLabel = () => {
    setLabel("");
  };

  document.addEventListener("mouseover", handleHover);
  document.addEventListener("mouseout", clearLabel);

  return () => {
    document.removeEventListener("mousemove", handleMouseMove);
    cancelAnimationFrame(requestRef.current);
    document.removeEventListener("mouseover", handleHover);
    document.removeEventListener("mouseout", clearLabel);
  };
}, []);

  return (
    <div>
      <div ref={dotRef}  className={`cursor-dot ${label ? "hover" : ""}`}>
        {label && <span className="cursor-label">{label}</span>}
      </div>
    </div>
  );
};

export default CursorDot;
