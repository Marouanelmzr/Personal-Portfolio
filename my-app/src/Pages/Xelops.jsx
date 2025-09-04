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
import navigation from '../assets/images/collaborateur-page-navigation.png';
import solde from '../assets/images/collaborateur-page-solde.png';
import table from '../assets/images/collaborateur-page-table.png';
import accepter from '../assets/images/figma-xelops-accepter.png';
import demande from '../assets/images/figma-xelops-demande.png';
import modification from '../assets/images/collaborateur-page-modification.png';
import manager from '../assets/images/figma-xelops-manager.png';
import search from '../assets/images/manager-page-search.png';
import responsive from '../assets/images/responsive-pages.png';
import gsap from 'gsap';
import ScrollReveal from "../assets/animations/scrollreveal.tsx"; 
import { motion, AnimatePresence } from "framer-motion";
import ParagraphsStack from '../assets/components/featuresparagraphs.jsx';
import ContactSection from '../assets/components/footer.jsx';




function App() {
    const navigate = useNavigate();

      const handleBack = () => {
    // Go back to main page
    navigate("/", { replace: false });

    // Wait for DOM to update, then scroll to #craft
    setTimeout(() => {
      const craftSection = document.getElementById("craft");
      if (craftSection) {
        craftSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 30); // 30ms delay ensures main page is mounted
  };

  const prototypeScreen = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const images = [
    collaborateur, // for paragraph 0
    navigation,       // for paragraph 1
    solde,            // for paragraph 2
    table,            // for paragraph 3
    table,            // for paragraph 4 (initially same as paragraph 3)
    demande,         // for paragraph 4
    manager,         // for paragraph 5
    responsive       // for paragraph 6
  ];


  return (
    <>
    <div className='App'>
     <CursorDot />
     <div class="blur-bottom"> 
      </div>
     <section className='craft-page-header'>
        <div className='craft-page-header-back'  onClick={handleBack}>
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
            </div>
        </div>
     </section>
     <section className='features-wrapper' >
            <div className='features-breakdown' >
              <h3>Features Breakdown</h3>
              <div className='features-content'>
                <ParagraphsStack onIndexChange={setActiveIndex} onProgressChange={setProgress} />
                <div className='collaborateur-container'>
                  {images.map((img, i) => (
                    <motion.img
                      key={i}
                      src={img}
                      alt={`Page ${i}`}
                      initial={false} // no animation on mount
                      animate={{ opacity: i === activeIndex ? 1 : 0 }}
                      transition={{ duration: 0.5 }}
                      className='collaborateur-image'
                      style={{
                        zIndex: i === activeIndex ? 2 : 1,
                      }}
                    />
                  ))}
                {activeIndex === 3 && (
                  <motion.img
                    key={progress < 0.75 ? "extra-4-a" : "extra-4-b"} // Key changes on progress
                    src={progress < 0.75 ? table : modification}
                    alt="Extra for Paragraph 4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="collaborateur-image"
                    style={{
                      zIndex: 3,
                    }}
                  />
                )}
                {activeIndex === 6 && (
                  <motion.img
                    key={  
                      progress < 0.45 ? "extra-6-a" :
                      progress < 0.7 ? "extra-6-b" : "extra-6-c" } // Key changes on progress
                    src={
                      progress < 0.45 ? manager : 
                      progress < 0.7 ? accepter : search
                    }
                    alt="Extra for Paragraph 6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="collaborateur-image"
                    style={{
                      zIndex: 4,
                    }}
                  />
                )}
                </div>
              </div>
            </div>
            </section>
            <section className='conclusion-section'>
              <h3>Retrospective</h3>
              <h5>Here are my reflections and key takeaways after completing this project :</h5>
              <div className='conclusion-content'>
              <h4>What I Learned</h4>
                <ul>
                  <li>Since this was my first collaborative project, I learned how to use GitHub effectively and manage merge conflicts alongside my teammate.</li>
                  <li>This was also my first internship related to websites (and computer science in general), so gaining insights from our internship supervisor was a valuable experience. We learned to focus not just on aesthetics, but also on usability and performance.</li>
                  <li>I gained my first hands-on experience with SQL databases and authentication systems. I learned how to implement secure login mechanisms and handle large-scale databases efficiently.</li>
                  <li>Working under very tight deadlines taught me to prioritize what matters most: usability, meeting the supervisor’s requirements, and keeping the website simple and functional rather than overly focused on appearance.</li>
                </ul>
              <h4>What I Would Do Differently</h4>
              <ul>
                <li>With more time, I could have improved the micro-interactions, such as animations for filters and dropdowns.</li>
                <li>I should have spent more time on research and gathered feedback from actual employees to better align the features with user needs.</li>
                <li>I could have added more precision to absence submissions, such as supporting half days off at the start and end of each absence.</li>
                <li>I would have implemented Docker containers to ensure the application was easily deployable and consistently accessible across different operating systems. This would have mitigated compatibility issues, particularly for MacBook users, and streamlined both testing and deployment processes.</li>
              </ul>
              </div>
            </section>
      <ContactSection />
    </div>
    </>
  )
}

export default App
