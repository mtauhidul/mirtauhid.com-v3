"use client";

import { metaData, socialLinks } from "app/config";
import { FaFileArrowDown, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { TbMailFilled } from "react-icons/tb";
import { Tooltip } from "react-tooltip";

const YEAR = new Date().getFullYear();

const brandColors = {
  github: "#333", // GitHub: Black
  linkedin: "#0077b5", // LinkedIn: Blue
  email: "#D93025", // Email: Red
  resume: "#166534", // Resume: Green
};

function SocialLink({ href, icon: Icon, tip, color }) {
  return (
    <a
      className="
        transition-colors duration-300
      "
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-tooltip-id={tip}
      style={{
        color: "var(--initial-color)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = color)}
      onMouseLeave={(e) =>
        (e.currentTarget.style.color = e.currentTarget.style.color =
          "var(--initial-color)")
      }
    >
      <Icon />
      <Tooltip
        id={tip}
        place="top"
        style={{
          backgroundColor: "#1C1C1C",
          color: "#D4D4D4",
          fontSize: "0.75rem",
          padding: "0.25rem 0.5rem",
          borderRadius: "0.25rem",
          boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.1)",
        }}
      >
        {tip}
      </Tooltip>
    </a>
  );
}

function SocialLinks() {
  return (
    <div className="flex text-lg gap-3.5 float-right transition-opacity duration-300 hover:opacity-90">
      <SocialLink
        href={socialLinks.github}
        icon={FaGithub}
        tip="Github"
        color="#333" // GitHub brand color
      />
      <SocialLink
        href={socialLinks.linkedin}
        icon={FaLinkedinIn}
        tip="Linkedin"
        color="#0077b5" // LinkedIn brand color
      />
      <SocialLink
        href={socialLinks.email}
        icon={TbMailFilled}
        tip="Email"
        color="#D93025" // Email red
      />
      <SocialLink
        href={socialLinks.resume}
        icon={FaFileArrowDown}
        tip="Resume"
        color="#166534" // Resume green
      />
    </div>
  );
}

export default function Footer() {
  return (
    <small className="block lg:mt-24 mt-16 text-md font-normal text-[#1C1C1C] dark:text-[#D4D4D4]">
      <span className="hidden sm:inline">Crafted and Built by</span>{" "}
      <span className="inline sm:hidden">©</span>{" "}
      <a
        className="no-underline text-[#1C1C1C] dark:text-[#D4D4D4] 
        hover:text-[#166534] dark:hover:text-[#dcfce7]"
        href={metaData.baseUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-tooltip-id={metaData.title}
      >
        {metaData.title}
      </a>
      <style jsx>{`
        @media screen and (max-width: 480px) {
          article {
            padding-top: 2rem;
            padding-bottom: 4rem;
          }
        }
      `}</style>
      <SocialLinks />
      <Tooltip
        id={metaData.title}
        place="top"
        style={{
          backgroundColor: "#1C1C1C",
          color: "#D4D4D4",
          fontSize: "0.75rem",
          padding: "0.25rem 0.5rem",
          borderRadius: "0.25rem",
          boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.1)",
        }}
      >
        Thank you for visiting!
      </Tooltip>
    </small>
  );
}
