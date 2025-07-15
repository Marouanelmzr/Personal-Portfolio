import { useState , useEffect} from 'react'
import './App.css'
import moroccandeco from './assets/images/moroccandeco.png'
import moroccanlogo from './assets/images/Moroccanlogo.png'
import instagramlogo from './assets/images/instagramlogo.png'
import twitterlogo from './assets/images/twitterlogo.png'
import tstreched from './assets/images/T-streched.png'
import sahara from './assets/images/Saharatimeline.png'
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaCircleArrowLeft } from "react-icons/fa6";
import Paragraph from './assets/components/paragraph.jsx'
import CursorDot from './assets/components/CursorDot.jsx';
import marouanesketch from './assets/images/marouanesketch.png'
import { IoLogoJavascript } from "react-icons/io5";
import { SiTypescript } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { SiPostgresql } from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";
import { FaGitAlt } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { FaHtml5 } from "react-icons/fa";
import { SiAdobephotoshop } from "react-icons/si";
import { SiAdobeillustrator } from "react-icons/si";
import { SiFigma } from "react-icons/si";
import { SiBlender } from "react-icons/si";
import { SiCinema4D } from "react-icons/si";
import zbrush from './assets/images/zbrush.webp'
import substancepainter from './assets/images/substance-painter.png'
import { FaRegCopy } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import vibrance from './assets/images/vibrancePortfolio.png'


function App() {

  const labels = {
          0: "Landing",
          5: "Craft",
          10: "Timeline",
          15: "About",
          20: "Contact"
        };

  const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};
  const [activeSection, setActiveSection] = useState("");
  const [animateText, setAnimateText] = useState(false);
  useEffect(() => {
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);

        // Trigger text animation when timeline section comes into view
          if (entry.target.id === 'timeline') {
            setAnimateText(true);
          }
        }
      });
    },
    { threshold: 0.5 } // 50% visible = section active
  );

  sections.forEach(section => observer.observe(section));
  return () => {
    sections.forEach(section => observer.unobserve(section));
  };
}, []);

    // Handle slider clicks
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [direction, setDirection] = useState(null);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setPrevIndex(currentIndex);
      setDirection("left");
      setCurrentIndex((prev) => prev - 1);
    }
  };
  const handleNext = () => {
    if (currentIndex < 5 - 1) {
      setPrevIndex(currentIndex);
      setDirection("right");
      setCurrentIndex((prev) => prev + 1);
    }
  };
  const handleSetIndex = (newIndex) => {
  if (newIndex === currentIndex) return; // Rien à faire si même index
  setPrevIndex(currentIndex);
  setDirection(newIndex > currentIndex ? "right" : "left");
  setCurrentIndex(newIndex);
};

  // paragraphs in timeline section

  const paragraphs = [
  {
    title: ["2024-2028", "Pursuing Master’s in Computer Science"],
    text: "Currently Pursuing a Master’s degree in Computer Science at ENSAT, the National School of Applied Sciences in Tangier, Morocco."
  },
  {
    title: ["2025", "Remote Internship at Xelops"],
    text: "Collaborated on the design and development of an absence management platform within a one-month timeframe. Co-developed both the frontend and backend, implementing secure login systems and building an intuitive, user-friendly interface tailored for company-wide accessibility."
  },
  {
    title: ["2024", "Internship at PandoraBox"],
    text: "Contributed to the creation of visual assets including posters, logos, and digital content. Gained practical experience in teamwork, design processes, and meeting tight deadlines within a fast-paced agency environment."
  },
  {
    title: ["2021-2024", "Freelance Design Projects"],
    text: "Delivered creative assets for clients, including posters, social media content, and branding visuals. Used tools like Photoshop, Blender, and ZBrush to produce both 2D and 3D designs. Strengthened skills in client communication, creative direction, and project management."
  },
  {
    title: ["2019", "Hello World"],
    text: "Inspired by video games, films, and visual storytelling, I became fascinated by the creative potential of technology. This curiosity led me to start exploring the fundamentals of design and programming at an early age, setting the foundation for my journey into digital creation."
  }
];

const [titleWords, setTitleWords] = useState([]);
const [animateTitle, setAnimateTitle] = useState(false);

useEffect(() => {
  const newWords = paragraphs[currentIndex].title[1].split(" ");
  setAnimateTitle(false); // reset animation
  setTimeout(() => {
    setTitleWords(newWords);
    setAnimateTitle(true); // trigger animation
  }, 50); // slight delay to allow DOM refresh
}, [currentIndex]);



  return (
    <>
    <div className='App'>
     <CursorDot />
      <div class="blur-bottom"></div>
      <div className='nav-wrapper'>
        <div className='navigation-container'>
          <div className='navig-clock-main'>
            {[...Array(21)].map((_, i) => 
            <span key={i} style={{ "--index": i + 35, }}  onClick={() => labels[i] && scrollToSection(labels[i].toLowerCase())}   
              className={   labels[i] ? 
              `clickable ${activeSection === labels[i].toLowerCase() ? "active" : ""}` : ""  } >
              <div className='bar-container'>
              <p></p>
              {labels[i] && (
                <div className={`bar-label ${labels[i]}`}>
                  {labels[i]}
                </div>
              )}
              </div>
            </span>
            )}
           </div>
        </div>
      </div>
    <section className='Landing-section' id="landing" >
      <div className='Landing-header-container'>
        <div className='header-right'>
          <h3>MAROUANE ELMOZARIAHI </h3>
          <span className='arabic-text'>مروان المزاريحي</span>
        </div>
        <div className='header-left'>
          <img src={instagramlogo} alt="Instagram Logo" className='social-logo' data-cursor="Instagram"/>
          <img src={twitterlogo} alt="Twitter Logo" className='social-logo' data-cursor="Twitter"/>
          <div className='get-cv' data-cursor="Download">
            <h4>GET CV</h4>
          </div>
        </div>
      </div>
      <div className='Landing-Title-Container' >
        <h2> 
            <img src={moroccandeco} alt="Moroccan Decoration" className='moroccan-decoration-title'/> 
            <span className='Brush-incoming'> Incoming</span> 
            <span className='highlight-title color'> S<span className='hide-letter'>O</span>FTWARE </span>
            <img src={moroccanlogo} alt="Moroccan Logo" className='moroccan-logo' /> ENGINEER
        </h2>
      </div>
        <div className='open-to-work' onClick={() => scrollToSection('contact')} data-cursor="Contact">
          <h4>Open to <span className='highlight-title'>WORK</span> </h4>
          <div className="green-circle"></div>
          <div className="white-circle"></div>
        </div>
        <div className='bio-container'>
          <h4>Hi, I’m Marouane a designer and aspiring software engineer blending creativity with code. <span class="block">  Passionate about building clean, functional experiences. Currently based in Tangier, Morocco.</span></h4>
        </div>
    </section>

    <section className='crafts-container' id='craft'>
        <h2> <img src={tstreched} alt="T-Stretched" className='t-stretched-title'/> CRAF<span className='hide-letter'>T</span>S</h2>
        <div className='crafts-wrapper'>
          <div className='craft one' data-cursor="Open">
          </div>
          <div className='craft six' data-cursor="Open">
          </div>
          <div className='craft three' data-cursor="Open">
          </div>
          <div className='craft four' data-cursor="Open">
          </div>
          <div className='craft five' data-cursor="Open">
          </div>
          <div className='craft two' data-cursor="Open">
          </div>
        </div>
    </section>
    <section className='timeline-container' id='timeline'>
      <h2 className='title-red'>Timeline</h2>
      <div className='timeline-wrapper'>
      <img src={sahara} alt="Sahara Timeline" className='timeline-image' />
      <div className='timeline-progress'>
        <span className={currentIndex === 0 ? `year-progress tweenyfive active-year` : `year-progress tweenyfive`} onClick={() => handleSetIndex(0)}>2026</span>
        <span className={currentIndex === 1 ? `year-progress twentyfour active-year` : `year-progress twentyfour`} onClick={() => handleSetIndex(1)}>2025</span>
        <span className={currentIndex === 2 ? `year-progress twentythree active-year` : `year-progress twentythree`} onClick={() => handleSetIndex(2)}>2024</span>
        <span className={currentIndex === 3 ? `year-progress nineteen active-year larger` : `year-progress nineteen`} onClick={() => handleSetIndex(3)}>2023-21</span>
        <span className={currentIndex === 4 ? `year-progress eighteen active-year` : `year-progress eighteen`} onClick={() => handleSetIndex(4)}>2019</span>
        <div className='progress-line' style={{ "--progress-distance": currentIndex}}>
          <span className={currentIndex === 3 ? 'year larger' : 'year'}></span>
          <span className='line'></span>
        </div>
        <h4 className={`animated-title ${animateTitle ? "animate" : ""}`}>
          {titleWords.map((word, i) => (
            <span
              key={i + word}
              className="word"
              style={{ "--word-index": i }}
            >
            {word + " "}
            </span>
          ))}
        </h4>

      </div>
      <div className='timeline-description'>
        {paragraphs.map((_, i) => (
          <Paragraph
            key={i}
            index={i}
            currentIndex={currentIndex}
            prevIndex={prevIndex}
            direction={direction}
            animateText={animateText}
            paragraph={paragraphs[i]}
          />
        ))}

        <div className='description-slider'>
          <FaCircleArrowLeft className='slider-button' onClick={ handlePrev } disabled={currentIndex === 0} data-cursor="Previous"/>
          <h4><span className='bold'>{currentIndex + 1}</span> Of <span className='bold'>5</span></h4>
          <FaCircleArrowRight className='slider-button' onClick={ handleNext } disabled={currentIndex === 4} data-cursor="Next"/>
        </div>
      </div>
      </div>
    </section>
    <section className='about-container' id='about'>
      <h2 className='title-red'></h2>
      <div className='about-wrapper'>
        <img src={marouanesketch} alt="Marouane Sketch" className='marouane-sketch' />
        <div className='about-right'>
          <h1>HELLO</h1>
          <h2>I'm <span className='bold'>Marouane Elmozariahi</span>,</h2>
          <h3>a multidisciplinary creative with a passion for visual storytelling, interactive design, and digital experiences.</h3>
          <h4>My journey began with an obsession for video games, movies, and posters. That fascination grew into a desire to create immersive worlds and visuals of my own. Over time, I explored everything from graphic design and 3D sculpting to web development, shaping a toolkit that merges art with technology. Whether it’s a line of code or a brushstroke, I treat every project as a chance to tell a story that feels human, thoughtful, and a little bit unexpected. I’m driven by curiosity, intentionality, and a constant hunger to learn something new.</h4>
          <div className='about-stacks'>
          <p className='smaller'>Stacks</p>
          <h2>Code & Frameworks</h2>
          <div className='stacks'>
            <div className='stacks-scroll'>
            <span className='stack'> <IoLogoJavascript className='icon-stack'/> Java Script</span>
            <span className='stack'> <SiTypescript className='icon-stack'/> Type Script</span>
            <span className='stack'> <FaReact className='icon-stack'/> React</span>
            <span className='stack'> <SiPostgresql className='icon-stack'/> PostgreSQL</span>
            <span className='stack'> <FaNodeJs className='icon-stack'/> Node.js</span>
            <span className='stack'> <FaGitAlt className='icon-stack'/> Git</span>
            <span className='stack'> <FaCss3Alt className='icon-stack'/> CSS</span>
            <span className='stack'> <FaHtml5 className='icon-stack'/> HTML</span>

            <span className='stack'> <IoLogoJavascript className='icon-stack'/> Java Script</span>
            <span className='stack'> <SiTypescript className='icon-stack'/> Type Script</span>
            <span className='stack'> <FaReact className='icon-stack'/> React</span>
            <span className='stack'> <SiPostgresql className='icon-stack'/> PostgreSQL</span>
            <span className='stack'> <FaNodeJs className='icon-stack'/> Node.js</span>
            <span className='stack'> <FaGitAlt className='icon-stack'/> Git</span>
            <span className='stack'> <FaCss3Alt className='icon-stack'/> CSS</span>
            <span className='stack'> <FaHtml5 className='icon-stack'/> HTML</span>
            </div>
          </div>
          <h2>Design Tools</h2>
          <div className='stacks'>
            <div className='stacks-scroll-reverse'>
              <span className='stack'> <SiAdobephotoshop className='icon-stack'/> Photoshop</span>
              <span className='stack'> <SiAdobeillustrator className='icon-stack'/> Illustrator</span>
              <span className='stack'> <SiFigma className='icon-stack'/> Figma</span>
              <span className='stack'> <SiBlender className='icon-stack'/> Blender</span>
              <span className='stack'> <SiCinema4D className='icon-stack'/> Cinema 4D</span>
              <span className='stack'> <img src={zbrush}className='icon-stack'/> ZBrush</span>
              <span className='stack'> <img src={substancepainter} className='icon-stack'/> Substance Painter</span>

              <span className='stack'> <SiAdobephotoshop className='icon-stack'/> Photoshop</span>
              <span className='stack'> <SiAdobeillustrator className='icon-stack'/> Illustrator</span>
              <span className='stack'> <SiFigma className='icon-stack'/> Figma</span>
              <span className='stack'> <SiBlender className='icon-stack'/> Blender</span>
              <span className='stack'> <SiCinema4D className='icon-stack'/> Cinema 4D</span>
              <span className='stack'> <img src={zbrush}className='icon-stack'/> ZBrush</span>
              <span className='stack'> <img src={substancepainter} className='icon-stack' fill="#363732"/> Substance Painter</span>


            
            </div>
          </div>
          </div>
        <div className='about-experience-education'>
          <div className='about-experience'>
          <p>Experience</p>
          <h2>XELOPS Technology</h2>
          <h3>Remote Internship - June 2025</h3>
          <h4>Co-developed an absence management platform with one teammate: UI design, frontend/backend coding, and SQL database setup.</h4>
          <h2>PandoraBox Communication</h2>
          <h3>Internship - July 2024</h3>
          <h4>Designed visual assets for high-profile clients such as Orange, Renault, and Tanger City Mall.</h4>
          <h2>Freelance Digital Designer</h2>
          <h3>Self-Employed - 2021/2024</h3>
          <h4>Delivered posters, logos, and 3D visuals for clients such as Juggernaut Energy, esports organizations, and various independent creatives and businesses.</h4>
          </div>
          <div className='about-education'>
          <p>Education</p>
          <h2>ENSA, Tangier</h2>
          <h3>2024 - 2028</h3>
          <h4>Master's degree in Computer Science.</h4>
          <p>Soft skills</p>
          <span className='soft-skills'>
          <h4>Multilingual Communication (Fluent in Arabic, French, and English)</h4>
          <h4>Adaptability & Flexibility</h4>
          <h4>Teamwork & Collaboration</h4>
          <h4>Creative Problem Solving</h4>
          <h4>Time Management</h4>
          <h4>Open to Feedback</h4>
          </span>
          </div>
        </div>
        </div>
      </div>
    </section>
    <section className='contact-container' id='contact'>
      <img src={vibrance} alt="Vibrance Portfolio" className='vibrance-portfolio' />
      <div className='contact-wrapper'>
      <h1>Let's Connect</h1>
      <h3>Whether you’re interested in working together, have a project in mind, or just want to say hello, feel free to reach out. I’m always open to new ideas, creative exchanges, and meaningful collaborations.</h3>
      </div>
      <div className='contact-socials'>
        <div className='socials' onClick={() => navigator.clipboard.writeText('elmozariahimarouane05@gmail.com')} data-cursor="Copy Email">
          <h2>Email</h2>
          <FaRegCopy className='icon-social' />
        </div>
          <div className='socials' data-cursor="Visit">
          <h2>X - Twitter</h2>
          <FaArrowRight className='icon-social rotate' />
        </div>
        <div className='socials' data-cursor="Visit">
          <h2>LinkedIn</h2>
          <FaArrowRight className='icon-social rotate' />
        </div>
        <div className='socials' data-cursor="Visit">
          <h2>Behance</h2>
          <FaArrowRight className='icon-social rotate' />
        </div>
      </div>
    </section>
    </div>
    </>
  )
}

export default App
