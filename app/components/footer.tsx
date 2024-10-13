"use client";

import { metaData, socialLinks } from "app/config";
import { FaFileArrowDown, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { TbMailFilled } from "react-icons/tb";
import { Tooltip } from "react-tooltip";

const YEAR = new Date().getFullYear();

function SocialLink({ href, icon: Icon, tip }) {
  return (
    <a
      className="
      text-[#1C1C1C] dark:text-[#D4D4D4] 
      hover:text-green-500 dark:hover:text-green-400 
      transition-colors duration-300
    "
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-tooltip-id={tip}
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
      <SocialLink href={socialLinks.github} icon={FaGithub} tip="Github" />
      <SocialLink
        href={socialLinks.linkedin}
        icon={FaLinkedinIn}
        tip="Linkedin"
      />
      <SocialLink href={socialLinks.email} icon={TbMailFilled} tip="Email" />
      <SocialLink
        href={socialLinks.resume}
        icon={FaFileArrowDown}
        tip="Resume"
      />
    </div>
  );
}

export default function Footer() {
  return (
    <small className="block lg:mt-24 mt-16 text-md font-normal text-[#1C1C1C] dark:text-[#D4D4D4]">
      Crafted and Built by{" "}
      <a
        className="no-underline hover:text-green-500 dark:hover:text-green-400"
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
