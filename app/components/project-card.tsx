"use client";
import Link from "next/link";
import { useState } from "react";

const ProjectCard = ({ project }) => {
  const [imgError, setImgError] = useState(false);

  // Define image path based on error state
  const imageSrc = imgError
    ? "/images/project-placeholder.png"
    : `/projects/${project.slug}.png`;

  return (
    <div className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 hover:border-gray-700/70">
      {/* Image container with proper aspect ratio */}
      <div className="relative aspect-[16/10] w-full">
        <Link
          href={`/projects/${project.slug}`}
          className="block absolute inset-0"
        >
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-black/70 opacity-100"></div>

          {/* Regular img tag instead of Next Image to avoid SSR issues */}
          <img
            src={imageSrc}
            alt={project.metadata.title}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        </Link>

        {/* Title positioned over the image bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
          <h2 className="text-2xl font-bold text-white drop-shadow-md">
            {project.metadata.title}
          </h2>
        </div>
      </div>

      {/* Content area */}
      <div className="flex flex-col flex-grow p-5 space-y-4">
        <p className="text-gray-300 leading-relaxed text-sm">
          {project.metadata.summary}
        </p>

        {/* Tags section */}
        {project.metadata.tags && (
          <div className="flex flex-wrap gap-2">
            {project.metadata.tags
              .split(",")
              .slice(0, 4)
              .map((tag, index) => {
                // Color-blind friendly palette with reduced opacity
                const tagColors = [
                  "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
                  "bg-blue-500/10 text-blue-300 border-blue-500/30",
                  "bg-amber-500/10 text-amber-300 border-amber-500/30",
                  "bg-purple-500/10 text-purple-300 border-purple-500/30",
                  "bg-rose-500/10 text-rose-300 border-rose-500/30",
                  "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
                ];

                const colorClass = tagColors[index % tagColors.length];

                return (
                  <span
                    key={tag}
                    className={`px-2 py-0.5 text-xs rounded-full ${colorClass} border inline-flex items-center`}
                  >
                    {tag.trim()}
                  </span>
                );
              })}
            {project.metadata.tags.split(",").length > 4 && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-gray-700/30 text-gray-300 border border-gray-600/30">
                +{project.metadata.tags.split(",").length - 4}
              </span>
            )}
          </div>
        )}

        {/* Footer with link and potential icons */}
        <div className="flex items-center justify-between pt-2 mt-auto">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center font-medium text-sm text-gray-300 hover:text-white group-hover:text-green-400 transition-colors"
          >
            Explore project
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>

          {/* Tech stack indicators - visual only */}
          <div className="flex -space-x-1.5">
            {project.metadata.techs?.slice(0, 3).map((tech, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center ring-1 ring-gray-900"
              >
                <span className="text-xs font-medium text-gray-300">
                  {tech.charAt(0)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
