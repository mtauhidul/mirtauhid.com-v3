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
        <span className="inline-block bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
          #JavaScript
        </span>
        <span className="inline-block bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
          #React
        </span>
        <span className="inline-block bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
          #Node.js
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;
