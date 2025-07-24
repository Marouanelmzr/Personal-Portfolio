import './cart.css';
import { BsCart4 } from "react-icons/bs";

const CartTooltip = ({ cartcontent , cartState , prevCart}) => {

  return (
    <div className="cart">
        <div className={`cart-tooltip ${cartState ? 'active' : ''}`}>
            <BsCart4 className='cart-icon' />
            <span className={`cart-content-number ${cartState ? 'visible' : 'hidden'}`}>{prevCart}</span>
            <span className={`cart-content-number ${cartState ? 'visible' : 'hidden'}`}>{cartcontent}</span>
        </div>
      
    </div>
  );
};

export default CartTooltip;