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
import figma from '../assets/images/figma-xelops.png';
import collaborateur from '../assets/images/collaborateur-page.png';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from "../assets/animations/scrollreveal.tsx"; 

gsap.registerPlugin(ScrollTrigger);


function App() {
  const Navigate = useNavigate();

  const prototypeScreen = useRef(null);

  const textRef = useRef(null);
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  const scrollRef = useRef(null);


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
            <div className='Design-system'>
            <h3>Design System</h3>
            <div className='design-system-content'>
              <div className='content-left'>
                <div className='top-part'>
                <div className='main-colors'>
                  <span className='main-color light'> <span className='color-type light'>Primary</span> Light Purple <br/> #C9C9DC </span>
                  <span className='main-color background'><span className='color-type background'>Primary</span> Dark Purple <br/> #C9C9DC</span>
                  <span className='main-color white'><span className='color-type white'>Primary</span> White <br/> #FFFFFF</span>
                  <span className='main-color purple'><span className='color-type purple'>Secondary</span> Blue-Violet <br/> #5B45FF</span>
                  <span className='main-color Light-Lavender'><span className='color-type Light-Lavender'>Secondary</span> Light Lavender <br/> #ABA3FF</span>
                  <span className='main-color Blue-Grey'><span className='color-type Blue-Grey'>Secondary</span> Muted Blue-Grey <br/> #8C8DB3</span>
                </div>
                <div className='state-colors'>
                  <span className='state-color draft'>Draft<br/>#FFAD60</span>
                  <span className='state-color progress'>In Progress<br/>#FFAD60</span>
                  <span className='state-color accepted'>Accepted<br/>#93C357</span>
                  <span className='state-color rejected'>Rejected<br/>#CC5759</span>
                </div>
                </div>
                <div className='typography'>
                  <h1>Aa</h1>
                  <h2>Aa</h2>
                  <h3>Aa</h3>
                  <span>Inter <div className='font-title'>Font</div></span>
                </div>
              </div>
              <div className='content-right'>
                <img src={figma} alt="Figma Design" className='figma-image'/>
                <h6>The design uses a modern purple-based palette with white for contrast, and status colors (yellow, green, red) for clarity. The Inter font was chosen for its readability and clean look. Mockups in Figma follow a minimalist, responsive design for both employee and manager interfaces.</h6>
              </div>
            </div>
            <div className='features-wrapper' ref={sectionRef}>
            <div className='features-breakdown' ref={triggerRef}>
              <h3>Features Breakdown</h3>
              <div className='features-content'>
                <div className='left-text' >
                  <div className='left-text-scrollable'>
                    <ScrollReveal containerRef={scrollRef} className="scrollreveal">
                      <h6>The Employee Page is a personalized dashboard for interns to manage their absences. It displays the remaining leave balance, provides a simple form to submit new absence requests, and lists the complete history of previous requests with their status. The goal is to offer a clear, intuitive interface that helps interns stay informed and easily manage their leave requests.
                      </h6>
                    </ScrollReveal>
                  </div>
                  <div ref={scrollRef} className='ghostscroll'>
                    <div style={{ height: 2200 }} />
                    </div>
                    
                  </div>
                <div>
                  <img src={collaborateur} alt="Collaborateur Page" className='collaborateur-image'/>
                </div>
              </div>
            </div>
            </div>
            <div className='conclusion-section'>
              <h6>The conclusion section summarizes the key points discussed in the presentation, reinforcing the importance of the design choices made and their impact on the user experience.</h6>
            </div>
            </div>
        </div>
     </section>
    </div>
    </>
  )
}

export default App
