import React from "react";
import { FaRegCopy, FaArrowRight } from "react-icons/fa";
import vibrance from '../images/vibrancePortfolio.png' // Adjust path as needed

const ContactSection = () => {
  const handleCopyEmail = () => {
    navigator.clipboard.writeText("elmozariahimarouane05@gmail.com");
    window.dispatchEvent(
      new CustomEvent("cursor-label", { detail: { label: "Copied!" } })
    );
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("cursor-label", { detail: { label: "Copy Email" } })
      );
    }, 2000);
  };

  const socials = [
    { name: "Email", action: handleCopyEmail, icon: <FaRegCopy className="icon-social" /> },
    { name: "X - Twitter", action: () => {}, icon: <FaArrowRight className="icon-social rotate" /> },
    { name: "LinkedIn", action: () => {}, icon: <FaArrowRight className="icon-social rotate" /> },
    { name: "Behance", action: () => {}, icon: <FaArrowRight className="icon-social rotate" /> },
  ];

  return (
    <section className="contact-container" id="contact">
      <img src={vibrance} alt="Vibrance Portfolio" className="vibrance-portfolio" />

      <div className="contact-wrapper">
        <h1>Let's Connect</h1>
        <h3>
          Whether you’re interested in working together, have a project in mind, or just want to say hello, 
          feel free to reach out. I’m always open to new ideas, creative exchanges, and meaningful collaborations.
        </h3>
      </div>

      <div className="contact-socials">
        {socials.map((social, index) => (
          <div
            key={index}
            className="socials"
            data-cursor={social.name === "Email" ? "Copy Email" : "Visit"}
            onClick={social.action}
          >
            <h2>{social.name}</h2>
            {social.icon}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactSection;
