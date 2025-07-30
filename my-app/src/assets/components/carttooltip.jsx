import './cart.css';
import { BsCart4 } from "react-icons/bs";
import { useEffect, useRef, useState } from 'react';

const CartTooltip = ({ cartcontent, cartState, prevCart, prototypeScreen }) => {

  const [position, setPosition] = useState({ left: 0, top: 0 });

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
    let initialX, initialY, offsetX = 0, offsetY = 0;

    // ✅ Velocity tracking
    let lastX = 0, lastY = 0, lastTime = 0;
    let velocityX = 0, velocityY = 0;

    const onMouseDown = (e) => {
      e.preventDefault(); 
      isDragging = true;
      tooltip.style.transition = "none";
      initialX = e.clientX;
      initialY = e.clientY;
      offsetX = tooltip.offsetLeft;
      offsetY = tooltip.offsetTop;
      tooltip.style.cursor = 'grabbing';

      // Initialize velocity tracking
      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = Date.now();
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - initialX;
      const deltaY = e.clientY - initialY;

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

  tooltip.style.cursor = 'grab';

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
  } else if (minDist === distTopRight) {
    finalLeft = screenWidth + screenLeft- tooltipWidth - 20;
    finalTop = screenTop + 20;
  } else if (minDist === distBottomLeft) {
    finalLeft = screenLeft + 20;
    finalTop = screenHeight + screenTop - tooltipHeight - 20;
  } else {
    finalLeft = screenWidth + screenLeft - tooltipWidth - 20;
    finalTop = screenHeight + screenTop - tooltipHeight - 20;
  }

  // Smooth snap
  tooltip.style.transition = "all 0.4s cubic-bezier(0.25, 1.2, 0.25, 1)";
  tooltip.style.left = finalLeft + "px";
  tooltip.style.top = finalTop + "px";

};


    // ✅ Attach only once
    tooltip.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    // ✅ Cleanup
    return () => {
      tooltip.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, []);



  return (
    <div className="cart" ref={backroundRef} style={{ left: position.left, top: position.top }}>
      <div  className={`cart-tooltip ${cartState ? 'active' : ''}`}>
        <BsCart4 className='cart-icon' />
        <span ref={prevRef} className="cart-content-prevnumber">{prevCart}</span>
        <span ref={currentRef} className={`cart-content-number ${cartState ? 'visible' : 'hidden'} ${cartcontent > 9 ? 'bignumber' : ''}`}>{cartcontent}</span>
        <span className={`cart-content ${cartState ? 'visible' : 'hidden'}`}></span>
      </div>
      <div className='shopping-cart'>

      </div>
    </div>
  );
};

export default CartTooltip;