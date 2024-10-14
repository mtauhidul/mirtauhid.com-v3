const ProjectCard = ({ project }) => {
  return (
    <div
      className="
          bg-transparent
          shadow-sm rounded-md
          overflow-hidden
          max-w-md w-full mx-auto
      "
    >
      <a
        href={`/projects/${project.slug}`}
        className="block hover:opacity-90 transition-opacity duration-200"
      >
        <img
          className="w-full h-48 object-cover"
          src={`/projects/${project.slug}.png`}
          alt="Project Image"
        />
      </a>

      <div className="px-6 py-4">
        <div className="font-bold text-2xl mb-2 text-gray-800 dark:text-gray-300">
          {project.metadata.title}
        </div>
        <p className="text-gray-700 dark:text-gray-500 text-base font-medium">
          {project.metadata.summary}
        </p>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800"></div>

      <div className="px-6 pt-4 pb-2">
        <div className="flex flex-wrap gap-2 mt-2">
          {project.metadata.tags.split(",").map((tag, index) => {
            const colors = [
              "bg-green-100 text-green-800",
              "bg-blue-100 text-blue-800",
              "bg-yellow-100 text-yellow-800",
              "bg-purple-100 text-purple-800",
              "bg-pink-100 text-pink-800",
              "bg-red-100 text-red-800",
              "bg-indigo-100 text-indigo-800",
              "bg-gray-100 text-gray-800",
            ];

            const colorClass = colors[index % colors.length];

            return (
              <span
                key={tag}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg inline-block ${colorClass} hover:opacity-90 transition-opacity duration-200 ease-in-out`}
              >
                {tag}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
