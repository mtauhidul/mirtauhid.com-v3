import ProjectCard from "app/components/project-card";
import type { Metadata } from "next";
import { projects } from "./project-data";

export const metadata: Metadata = {
  title: "Projects",
  description: "My Projects",
};

export default function Projects() {
  return (
    <section>
      <h1 className="mb-4 text-6xl font-bold tracking-tight">Projects</h1>
      <p className="text-2xl mb-8 text-gray-500 font-medium">
        Crafting interactive web applications with advanced functionality.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
}
