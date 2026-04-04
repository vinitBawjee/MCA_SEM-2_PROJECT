import "./About.css";
import aboutImg from "../assets/Top-10-Ranking-About-Us-Pages.webp";

function About() {
  return (
    <div className="about-container">

      <section className="about-section">
        <h2>WHO WE ARE</h2>

        <div className="about-banner">
          <img src={aboutImg} alt="About" />
          <div className="about-overlay">ABOUT US</div>
        </div>

        <p>
          We are a team of MCA (Master of Computer Applications) students —
          Vinit, Ujwala, and Sirivi — with a shared passion for web development
          and modern technologies. This project is developed as part of our
          academic journey to gain practical knowledge and real-world experience.
        </p>

        <p>
          This website is inspired by the learning environment of VUS
          (Virtual University System), focusing on building user-friendly and
          efficient web applications.
        </p>

        <p>
          Our goal is to design responsive, clean, and functional interfaces
          using technologies like React, CSS, and JavaScript while continuously
          improving our development skills.
        </p>

        <p>
          Through this platform, we aim to showcase our teamwork, creativity,
          and understanding of modern web development practices.
        </p>
      </section>

      <section className="about-section">
        <h2>MISSION</h2>
        <p>
          Our mission is to become skilled full-stack developers by continuously
          learning, building projects, and applying concepts learned during our
          MCA program.
        </p>
      </section>

      <section className="about-section">
        <h2>VISION</h2>
        <p>
          Our vision is to create impactful digital solutions that solve real-world
          problems and contribute to the tech industry with innovative ideas.
        </p>
      </section>

      <section className="about-section">
        <h2>LEARNING CULTURE</h2>
        <p>
          We believe in continuous learning, teamwork, and problem-solving.
          Platforms like VUS help in building a strong academic foundation
          combined with practical exposure.
        </p>
      </section>

      <section className="about-section">
        <h2>VALUES</h2>
        <p>
          Dedication, collaboration, consistency, and discipline are the core
          values that guide us as students and developers. Writing clean code
          and building meaningful projects are our priorities.
        </p>
      </section>

      <section className="about-section">
        <h2>ABOUT PROJECT</h2>
        <p>
          This project is developed as part of our MCA coursework to demonstrate
          our understanding of frontend development using React. It reflects our
          ability to design, develop, and present a complete web application as a team.
        </p>
      </section>

    </div>
  );
}

export default About;