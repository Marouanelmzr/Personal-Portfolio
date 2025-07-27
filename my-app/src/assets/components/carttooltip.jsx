import './cart.css';
import { BsCart4 } from "react-icons/bs";
import { useEffect, useRef } from 'react';

const CartTooltip = ({ cartcontent, cartState, prevCart }) => {
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

  return (
    <div className="cart">
      <div ref={backroundRef} className={`cart-tooltip ${cartState ? 'active' : ''}`}>
        <BsCart4 className='cart-icon' />
        <span ref={prevRef} className="cart-content-prevnumber">{prevCart}</span>
        <span ref={currentRef} className={`cart-content-number ${cartState ? 'visible' : 'hidden'} ${cartcontent > 9 ? 'bignumber' : ''}`}>{cartcontent}</span>
        <span className={`cart-content ${cartState ? 'visible' : 'hidden'}`}></span>
      </div>
    </div>
  );
};

export default CartTooltip;