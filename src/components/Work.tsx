import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const projects = [
  {
    title: "Personal Branding",
    category: "Website + SEO + LinkedIn",
    description: "Personal branding website with SEO and LinkedIn integration.",
    tools: "SEO, Web Design, LinkedIn",
  },
  {
    title: "Authority Positioning",
    category: "LinkedIn Growth",
    description: "LinkedIn authority positioning for consultants & founders.",
    tools: "LinkedIn, Content Strategy",
  },
  {
    title: "Organic Growth",
    category: "B2B Strategy",
    description: "Organic growth strategy for niche B2B brands.",
    tools: "Strategy, SEO, Content",
  },
  {
    title: "SEO Content Systems",
    category: "Long-term Traffic",
    description: "SEO-led content systems for long-term traffic growth.",
    tools: "SEO, Content Architecture",
  },
  {
    title: "Performance Rebuild",
    category: "Web Development",
    description: "Website rebuild focused on performance & conversions.",
    tools: "React, Next.js, CRO",
  },
];

const Work = () => {
  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`, // Use actual scroll width
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    // Clean up (optional, good practice)
    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          Sample <span>Use Cases</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>{project.description}</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image="/images/placeholder.webp" alt={project.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
