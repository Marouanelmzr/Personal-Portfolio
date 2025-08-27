import { useState , useEffect, useRef} from 'react'
import CursorDot from '../assets/components/CursorDot.jsx';
import { IoReturnUpBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import './styles.css';
import CartTooltip from '../assets/components/carttooltip.jsx';


function App() {
  const Navigate = useNavigate();

  const prototypeScreen = useRef(null);

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
        <h1>Absence Management platform</h1>
        </div>
        <div className='xelops-overview' >
            <h2>Internship Project</h2>
            <h4>Founded in 2008, XELOPS Technology (formerly NEOXIA Maroc) is a leading consulting and development company specializing in tailored digital solutions. In June 2025, I had the opportunity to join XELOPS as a Full Stack Developer intern, collaborating closely with one of my schoolmates. During this internship, we designed and developed a custom web application for absence management, enabling the company to efficiently track and manage interns’ leaves. This project combined both front-end and back-end development, focusing on usability, scalability, and seamless integration with their internal processes.</h4>
            <div className='xelops-project-details'>
                <span>
                    <h3>Role</h3>
                    <p>Supervised the project,<br/> 
                      designed the UI in Figma, <br/>
                      and developed the entire front-end.</p>
                </span>
                <span>
                    <h3>Timeline</h3>
                    <p>Tangier, Morocco (remote).<br/>
                      5 weeks.</p>
                </span>
                <span>
                    <h3>Tools</h3>
                    <p>
                      Figma, Adobe Photoshop,<br/>
                      JavaScript, CSS, HTML, React.js.<br/>
                      MySQL, OAuth2.0, Github.
                    </p>
                </span>
            </div>
        </div>
     </section>
    </div>
    </>
  )
}

export default App
