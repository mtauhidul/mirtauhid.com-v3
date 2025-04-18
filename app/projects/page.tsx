import ProjectCard from "app/components/project-card";
import { getProjectDetails } from "app/lib/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Mir Tauhidul Islam",
  description:
    "Featured projects focused on performance, interactivity, and functionality - built with React, Next.js, and modern web technologies.",
};

let allProjects = getProjectDetails();

export default function Projects() {
  return (
    <section className="py-12">
      <div className="space-y-6 mb-12">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          Projects
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl">
          Featured projects focused on performance, interactivity, and
          functionality.
        </p>
        <div className="w-16 h-1 bg-green-500 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
        {allProjects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
}
