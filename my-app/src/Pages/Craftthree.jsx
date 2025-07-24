import { useState , useEffect} from 'react'
import CursorDot from '../assets/components/CursorDot.jsx';
import { IoReturnUpBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import './styles.css';
import CartTooltip from '../assets/components/carttooltip.jsx';


function App() {
  const Navigate = useNavigate();
  const [currentCart, setCurrentCart] = useState(0);
  const [cartState, setCartState] = useState(false);
  const [prevCart, setprevCart] = useState();
  useEffect(() => {
    if (currentCart === 0) {
      setCartState(false);
    } else {
      setCartState(true);
    }
  }, [currentCart]);

  const handleCartUpdate = () => {
    if (prevCart !== currentCart) {
      setprevCart(currentCart);
      setCurrentCart(currentCart + 1);
    }
  };

  return (
    <>
    <div className='App'>
     <CursorDot />
     <section className='craft-page-header'>
        <div className='craft-page-header-back' onClick={() => Navigate(-1)}>
            <IoReturnUpBack />
            <p>Back</p>
        </div>
     </section>
     <section className='craft-page-content'>
        <div className='craft-page-content-header'>
        <h1>Cart Tooltip</h1>
        <span onClick={() =>  handleCartUpdate()}> Add to Cart</span>
        </div>
        <div className='craft-prototype'>
          <CartTooltip 
          cartcontent={currentCart}
          cartState={cartState}
          prevCart={prevCart}
          />
        </div>
     </section>
    </div>
    </>
  )
}

export default App
