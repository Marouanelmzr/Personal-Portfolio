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
          <img src={instagramlogo} alt="Instagram Logo" className='social-logo' />
          <img src={twitterlogo} alt="Twitter Logo" className='social-logo' />
          <div className='get-cv'>
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
        <div className='open-to-work'>
          <h4>Open to <span className='highlight-title'>WORK</span> </h4>
          <div className="green-circle"></div>
          <div className="white-circle"></div>
        </div>
        <div className='bio-container'>
          <h4>Hi, I’m Marouane — a designer and aspiring software engineer blending creativity with code. <span class="block">  Passionate about building clean, functional experiences. Currently based in Tangier, Morocco.</span></h4>
        </div>
    </section>

    <section className='crafts-container' id='craft'>
        <h2> <img src={tstreched} alt="T-Stretched" className='t-stretched-title'/> CRAF<span className='hide-letter'>T</span>S</h2>
        <div className='crafts-wrapper'>
          <div className='craft one'>
          </div>
          <div className='craft six'>
          </div>
          <div className='craft three'>
          </div>
          <div className='craft four'>
          </div>
          <div className='craft five'>
          </div>
          <div className='craft two'>
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
          <FaCircleArrowLeft className='slider-button' onClick={ handlePrev } disabled={currentIndex === 0}/>
          <h4><span className='bold'>{currentIndex + 1}</span> Of <span className='bold'>5</span></h4>
          <FaCircleArrowRight className='slider-button' onClick={ handleNext } disabled={currentIndex === 4}/>
        </div>
      </div>
      </div>
    </section>
    </div>
    </>
  )
}

export default App
