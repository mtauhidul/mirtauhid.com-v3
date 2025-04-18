import { CustomMDX } from "app/components/mdx";
import { metaData } from "app/config";
import { formatDate, getProjectDetails } from "app/lib/projects";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  let projects = getProjectDetails();

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  let project = getProjectDetails().find(
    (project) => project.slug === params.slug
  );
  if (!project) {
    return;
  }

  let {
    title,
    completedAt: publishedTime,
    summary: description,
    image,
    tags,
  } = project.metadata;
  let ogImage = image
    ? image
    : `${metaData.baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title: `${title} | Projects | Mir Tauhidul Islam`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${metaData.baseUrl}/projects/${project.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Project({ params }) {
  let project = getProjectDetails().find(
    (project) => project.slug === params.slug
  );

  if (!project) {
    notFound();
  }

  // Extract tags as an array
  const tagArray = project.metadata.tags
    ? project.metadata.tags.split(",").map((tag) => tag.trim())
    : [];

  // Demo link and GitHub link (if available in your data structure)
  // const demoLink = project.metadata.demoUrl
  // const githubLink = project.metadata.githubUrl;

  return (
    <section className="py-8">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            headline: project.metadata.title,
            datePublished: project.metadata.completedAt,
            dateModified: project.metadata.completedAt,
            description: project.metadata.summary,
            image: project.metadata.image
              ? `${metaData.baseUrl}${project.metadata.image}`
              : `/og?title=${encodeURIComponent(project.metadata.title)}`,
            url: `${metaData.baseUrl}/projects/${project.slug}`,
            author: {
              "@type": "Person",
              name: metaData.name,
            },
          }),
        }}
      />

      {/* Back to projects link */}
      <div className="mb-8">
        <Link
          href="/projects"
          className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-green-500 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Projects
        </Link>
      </div>

      {/* Project banner image */}
      <div className="relative w-full h-80 md:h-96 mb-10 rounded-xl overflow-hidden">
        <img
          src={`/projects/${project.slug}.png`}
          alt={project.metadata.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      {/* Project header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          {project.metadata.title}
        </h1>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0">
          <div className="flex items-center text-gray-400">
            <div className="flex items-center mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-green-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{formatDate(project.metadata.completedAt)}</span>
            </div>

            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-green-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Mir Tauhidul Islam</span>
            </div>
          </div>

          {/* Project links */}
          {/* <div className="flex space-x-4">
            {demoLink && (
              <a
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 text-sm font-medium bg-green-500/10 text-green-500 hover:bg-green-500/20 rounded-lg transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                Live Demo
              </a>
            )}

            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 text-sm font-medium bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                <svg
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View Code
              </a>
            )}
          </div> */}
        </div>
      </div>

      {/* Tags */}
      {tagArray.length > 0 && (
        <div className="mb-10">
          <h3 className="text-lg font-medium mb-3 text-gray-300">
            Technologies
          </h3>
          <div className="flex flex-wrap gap-2">
            {tagArray.map((tag, index) => {
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
                  className={`px-3 py-1 text-sm font-medium rounded-md ${colorClass} border border-opacity-50`}
                >
                  {tag}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Project summary */}
      <div className="mb-10 bg-gray-900/40 border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-medium mb-3 text-gray-300">
          Project Overview
        </h3>
        <p className="text-gray-400">{project.metadata.summary}</p>
      </div>

      {/* Project content */}
      <div className="border-t border-gray-800 pt-10">
        <article className="prose prose-lg max-w-none prose-quoteless prose-neutral dark:prose-invert prose-headings:font-bold prose-headings:text-white prose-p:text-gray-300 prose-a:text-green-500 prose-strong:text-white prose-code:text-white prose-code:bg-gray-800 prose-code:rounded prose-code:px-1 prose-code:py-0.5 prose-pre:bg-gray-800/50 prose-pre:border prose-pre:border-gray-700">
          <CustomMDX source={project.content} />
        </article>
      </div>
    </section>
  );
}
