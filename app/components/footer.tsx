"use client";

import { metaData, socialLinks } from "app/config";
import { FaFileArrowDown, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { TbMailFilled } from "react-icons/tb";
import { Tooltip } from "react-tooltip";

function SocialLink({ href, icon: Icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      data-tooltip-id={label}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
    >
      <Icon size={18} />
      <Tooltip
        id={label}
        place="top"
        className="!bg-white dark:!bg-gray-800 !text-gray-800 dark:!text-gray-200 !text-xs !py-1 !px-2 !rounded-md !shadow-md !border !border-gray-100 dark:!border-gray-700"
      >
        {label}
      </Tooltip>
    </a>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 mb-10 max-w-4xl mx-auto px-5">
      <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-500 dark:text-gray-400 order-2 sm:order-1">
            <span className="hidden sm:inline">Crafted with care by </span>
            <a
              href={metaData.baseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              data-tooltip-id="creator-tooltip"
            >
              {metaData.title}
            </a>
            <Tooltip
              id="creator-tooltip"
              place="top"
              className="!bg-white dark:!bg-gray-800 !text-gray-800 dark:!text-gray-200 !text-xs !py-1 !px-2 !rounded-md !shadow-md !border !border-gray-100 dark:!border-gray-700"
            >
              Thank you for visiting!
            </Tooltip>
            <span className="text-gray-400 dark:text-gray-600">
              {" "}
              • {currentYear}
            </span>
          </div>

          <div className="flex items-center gap-1 order-1 sm:order-2">
            <SocialLink
              href={socialLinks.github}
              icon={FaGithub}
              label="GitHub"
            />
            <SocialLink
              href={socialLinks.linkedin}
              icon={FaLinkedinIn}
              label="LinkedIn"
            />
            <SocialLink
              href={socialLinks.email}
              icon={TbMailFilled}
              label="Email"
            />
            <SocialLink
              href={socialLinks.resume}
              icon={FaFileArrowDown}
              label="Resume"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
