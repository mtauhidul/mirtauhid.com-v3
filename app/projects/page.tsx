import ProjectCard from "app/components/project-card";
import { getProjectDetails } from "app/lib/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "My Projects",
};

let allProjects = getProjectDetails();

export default function Projects() {
  return (
    <section>
      <h1 className="mb-4 text-6xl font-bold tracking-tight">Projects</h1>
      <p className="text-2xl mb-4 text-gray-500 font-medium">
        Crafting interactive web applications with advanced functionality.
      </p>
      <div className="border-t border-gray-800 mb-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        {allProjects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
}
