import Link from "next/link";

const ProjectCard = ({ project }) => {
  return (
    <div className="group flex flex-col bg-gray-900/40 rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="relative overflow-hidden h-52">
        <Link href={`/projects/${project.slug}`} className="block">
          <img
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
            src={`/projects/${project.slug}.png`}
            alt={project.metadata.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>
      </div>

      <div className="flex flex-col flex-grow p-6 space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">
            {project.metadata.title}
          </h2>
          <p className="text-gray-400 leading-relaxed">
            {project.metadata.summary}
          </p>
        </div>

        {project.metadata.tags && (
          <div className="pt-4 mt-auto border-t border-gray-800">
            <div className="flex flex-wrap gap-2">
              {project.metadata.tags.split(",").map((tag, index) => {
                // Modern, cohesive tag color palette
                const tagColors = [
                  "bg-emerald-900/30 text-emerald-400 border-emerald-800",
                  "bg-blue-900/30 text-blue-400 border-blue-800",
                  "bg-amber-900/30 text-amber-400 border-amber-800",
                  "bg-purple-900/30 text-purple-400 border-purple-800",
                  "bg-rose-900/30 text-rose-400 border-rose-800",
                  "bg-cyan-900/30 text-cyan-400 border-cyan-800",
                  "bg-indigo-900/30 text-indigo-400 border-indigo-800",
                  "bg-teal-900/30 text-teal-400 border-teal-800",
                ];

                const colorClass = tagColors[index % tagColors.length];

                return (
                  <span
                    key={tag}
                    className={`px-2.5 py-0.5 text-xs font-medium rounded-md ${colorClass} border border-opacity-50 inline-flex items-center`}
                  >
                    {tag.trim()}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center text-sm font-medium text-green-500 hover:text-green-400 transition-colors"
          >
            Know more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1.5"
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

          {/* You can easily add GitHub/demo links here if needed */}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
