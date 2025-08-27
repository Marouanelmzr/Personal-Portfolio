import { useState , useEffect, useRef} from 'react'
import CursorDot from '../assets/components/CursorDot.jsx';
import { IoReturnUpBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import './styles.css';
import CartTooltip from '../assets/components/carttooltip.jsx';
import { IoPerson } from "react-icons/io5";
import { IoIosLock } from "react-icons/io";
import { IoPencil } from "react-icons/io5";
import { IoCodeSlash } from "react-icons/io5";


function App() {
  const Navigate = useNavigate();

  const prototypeScreen = useRef(null);

  return (
    <>
    <div className='App'>
     <CursorDot />
     <div class="blur-bottom"> 
      </div>
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
            <div className='xelops-project-challenge'>
            <h3>Challenge</h3>
            <h5>As part of its continuous improvement efforts and to provide an optimized user experience for its employees, Xelops Technology aimed to develop a simple and intuitive web application for managing leave requests and balances. Currently, this information is managed through an existing table, and the goal was to digitize the request and approval process.</h5>
            <h3>Problems & Constraints</h3>
            <div className='xelops-project-problems'>
              <div className='grids'>
                <span ><IoPerson className='span-icon'/></span>
                <span className='span-text'>A key challenge was managing the development of a full-stack application for the first time, which required quickly learning and applying new technologies such as ReactJS, Node.js, and Google OAuth, while delivering a functional and coherent system within a limited timeframe.</span>
              </div>
              <div className='grids'>
                <span ><IoIosLock className='span-icon'/></span>
                <span className='span-text'>Ensuring secure authentication via Google accounts was a key challenge, especially for interns with limited experience. The application needed to protect user data and correctly manage roles while integrating smoothly with existing systems.</span>
              </div>
              <div className='grids'>
                <span ><IoPencil className='span-icon'/></span>
                <span className='span-text'>A major challenge was designing the application from scratch, including researching user needs, gathering design inspirations, creating UI/UX mockups, and defining an intuitive user flow for both employees and managers.</span>
              </div>
              <div className='grids'>
                <span ><IoCodeSlash className='span-icon'/></span>
                <span className='span-text'>Another challenge was implementing the entire interface, covering login, employee, and manager pages, while ensuring full responsiveness across devices and maintaining a consistent user experience.</span>
              </div>
            </div>
            </div>
        </div>
     </section>
    </div>
    </>
  )
}

export default App
