import './cart.css';
import { BsCart4 } from "react-icons/bs";
import { useEffect, useRef, useState } from 'react';
import curvedsvg from '../images/curvedsvg.png';

const CartTooltip = ({ cartcontent, cartState, prevCart, prototypeScreen }) => {

  const [shopActive, setshopActive] = useState(false);
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const dragThreshold = 5; // Minimum drag distance to open shop
  const [corner, setCorner] = useState("top-left");

   useEffect(() => {
     const leftprototype = prototypeScreen.current.offsetLeft;
     const topprototype = prototypeScreen.current.offsetTop;
     setPosition({
       left: leftprototype + 20 + 'px',
       top: topprototype + 20 + 'px'
     });
   }, [prototypeScreen]);

  const prevRef = useRef(null);
  const currentRef = useRef(null);
  const backroundRef = useRef(null);
  const tooltipcloserRef = useRef(null);

  useEffect(() => {
    if (prevRef.current && prevCart !== 0) {
      prevRef.current.classList.remove('animate'); // reset
      void prevRef.current.offsetWidth;            // force reflow
      prevRef.current.classList.add('animate');    // retrigger animation
    }
  }, [prevCart]); // run when prevCart changes
  useEffect(() => {
    if (currentRef.current && cartState) {
      currentRef.current.classList.remove('animate'); // reset
      void currentRef.current.offsetWidth;            // force reflow
      currentRef.current.classList.add('animate');    // retrigger animation
    }
  }, [cartcontent]);
  useEffect(() => {
    if (backroundRef.current ) {
      backroundRef.current.classList.remove('animate');
      void backroundRef.current.offsetWidth;            
      backroundRef.current.classList.add('animate');    
    }
  }, [cartcontent]); 

  // Dragable functionality

  useEffect(() => {
    const tooltip = backroundRef.current;
    if (!tooltip) return;

    let isDragging = false;
    let moved = false;
    let initialX, initialY, offsetX = 0, offsetY = 0;

    // ✅ Velocity tracking
    let lastX = 0, lastY = 0, lastTime = 0;
    let velocityX = 0, velocityY = 0;

    const onMouseDown = (e) => {
      e.preventDefault();
      isDragging = true;
      moved = false;
      tooltip.style.transition = "none";
      initialX = e.clientX;
      initialY = e.clientY;
      offsetX = tooltip.offsetLeft;
      offsetY = tooltip.offsetTop;
      tooltipcloserRef.style.cursor = 'grabbing';

      // Initialize velocity tracking
      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = Date.now();
    };

    const onMouseMove = (e) => {
      if (!isDragging || shopActive) return;
      e.preventDefault();
      const deltaX = e.clientX - initialX;
      const deltaY = e.clientY - initialY;

      if (Math.abs(deltaX) > dragThreshold || Math.abs(deltaY) > dragThreshold) {
    moved = true;
  }

      tooltip.style.left = offsetX + deltaX + 'px';
      tooltip.style.top = offsetY + deltaY + 'px';

    // ✅ Calculate velocity
    const now = Date.now();
    const dt = now - lastTime;
    if (dt > 0) {
      velocityX = (e.clientX - lastX) / dt;
      velocityY = (e.clientY - lastY) / dt;
    }
    lastX = e.clientX;
    lastY = e.clientY;
    lastTime = now;
    };

const onMouseUp = () => {
  if (!isDragging) return;
  isDragging = false;
  if (!moved) {
    setshopActive(prev => !prev);
  }

  tooltipcloserRef.current.style.cursor = 'grab';

  const tooltipWidth = tooltip.offsetWidth;
  const tooltipHeight = tooltip.offsetHeight;

  const rect = prototypeScreen.current.getBoundingClientRect();
  const screenWidth = rect.width;
  const screenHeight = rect.height;
  const screenLeft = rect.left;
  const screenTop = rect.top;

  const currentX = tooltip.offsetLeft;
  const currentY = tooltip.offsetTop;

  // ✅ Use velocity to project final direction
  const velocityBoost = 600; // tweak to make projection stronger or weaker
  const projectedX = currentX + velocityX * velocityBoost;
  const projectedY = currentY + velocityY * velocityBoost;

  // Distances to corners depending on projected position
  const distTopLeft = Math.hypot(projectedX - screenLeft, projectedY - screenTop);
  const distTopRight = Math.hypot((screenLeft + screenWidth) - (projectedX + tooltipWidth), projectedY - screenTop);
  const distBottomLeft = Math.hypot(projectedX - screenLeft, (screenTop + screenHeight) - (projectedY + tooltipHeight));
  const distBottomRight = Math.hypot((screenLeft + screenWidth) - (projectedX + tooltipWidth), (screenTop + screenHeight) - (projectedY + tooltipHeight));

  // Find nearest corner
  const minDist = Math.min(distTopLeft, distTopRight, distBottomLeft, distBottomRight);
  let finalLeft, finalTop;

  if (minDist === distTopLeft) {
    finalLeft = screenLeft + 20 ; 
    finalTop = screenTop + 20;
    setCorner("top-left");
  } else if (minDist === distTopRight) {
    finalLeft = screenWidth + screenLeft- tooltipWidth - 20;
    finalTop = screenTop + 20;
    setCorner("top-right");
  } else if (minDist === distBottomLeft) {
    finalLeft = screenLeft + 20;
    finalTop = screenHeight + screenTop - tooltipHeight - 20;
    setCorner("bottom-leftt");
  } else {
    finalLeft = screenWidth + screenLeft - tooltipWidth - 20;
    finalTop = screenHeight + screenTop - tooltipHeight - 20;
    setCorner("bottom-right");
  }

  // Smooth snap
  tooltip.style.transition = "all 0.4s cubic-bezier(0.25, 1.2, 0.25, 1)";
  tooltip.style.left = finalLeft + "px";
  tooltip.style.top = finalTop + "px";

};


    // ✅ Attach only once
    tooltipcloserRef.current.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    // ✅ Cleanup
    return () => {
      tooltip.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [prototypeScreen, shopActive]);



  return (
    <div className={`cart ${corner}`} ref={backroundRef} style={{ left: position.left, top: position.top }}>
      <div ref={tooltipcloserRef} className={`cart-tooltip-container ${shopActive ? 'active' : ''} ${corner}`}>
      <div className={`cart-tooltip ${cartState ? 'active' : ''} ${shopActive ? 'larger' : ''}`} >
        <BsCart4 className={`cart-icon ${shopActive ? 'active' : ''}`} />
        <span ref={prevRef} className={`cart-content-prevnumber ${shopActive ? 'active' : ''}`}>{prevCart}</span>
        <span ref={currentRef} className={`cart-content-number ${cartState ? 'visible' : 'hidden'} ${cartcontent > 9 ? 'bignumber' : ''} ${shopActive ? 'active' : ''}`}>{cartcontent}</span>
        <span className={`cart-content ${cartState ? 'visible' : 'hidden'} `}></span>
      </div>
      <h1>Shopping cart</h1>
      <img src={curvedsvg} alt="Curved Background" className={`cart-curved ${shopActive ? 'active' : ''} ${corner}`} />
      </div>
      <div className={`shopping-cart ${shopActive ? 'active' : ''} ${corner}`}>

      </div>
    </div>
  );
};

export default CartTooltip;