import Image from "next/image";
import { FaBrain, FaCode, FaGraduationCap, FaLaptopCode } from "react-icons/fa";
import avatar from "../public/avatar.jpg";

export default function Page() {
  return (
    <section className="max-w-4xl mx-auto pt-12 pb-20 px-5">
      <div className="mb-16 flex flex-col md:flex-row items-center md:items-start gap-10">
        <div className="order-2 md:order-1 text-center md:text-left">
          <div className="mb-1 inline-block text-sm font-medium px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full">
            Hello there 👋
          </div>

          <h1 className="mt-4 text-5xl md:text-6xl font-bold tracking-tight">
            Mir Tauhidul Islam
          </h1>

          <div className="h-1 w-16 bg-green-500 my-5 mx-auto md:mx-0"></div>

          <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-medium mb-6">
            Frontend Developer with full-stack experience
          </h2>

          <p className="text-gray-600 dark:text-gray-400 max-w-xl mb-8">
            Building readable, maintainable, and scalable web applications. I'm
            on a deliberate journey to master React, TypeScript, and modern
            JavaScript patterns – focusing on quality code over quick solutions.
          </p>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <a
              href="/projects"
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-all shadow-sm hover:shadow-md"
            >
              View my work
            </a>
            <a
              href="/blog"
              className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-all hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm hover:shadow-md"
            >
              Read my blog
            </a>
          </div>
        </div>

        <div className="order-1 md:order-2 flex-shrink-0">
          <div className="relative overflow-hidden rounded-2xl w-48 h-48 md:w-56 md:h-56 border-4 border-white dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300">
            <Image
              src={avatar}
              alt="Mir Tauhidul Islam"
              className="object-cover transition-all hover:scale-110 grayscale hover:grayscale-0 duration-700"
              fill
              sizes="(max-width: 768px) 192px, 224px"
              priority
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            icon: <FaCode className="text-green-500" size={20} />,
            title: "Tech Stack",
            description:
              "JavaScript enthusiast with a focus on React ecosystem. Building with Next.js, TypeScript, and TailwindCSS while exploring modern frontend patterns and occasionally diving into Node.js.",
          },
          {
            icon: <FaLaptopCode className="text-green-500" size={20} />,
            title: "Work Approach",
            description:
              "I value clean code, thoughtful architecture, and user-focused designs. Each project is a chance to write better code than yesterday.",
          },
          {
            icon: <FaGraduationCap className="text-green-500" size={20} />,
            title: "Background",
            description:
              "Statistics and Data Science graduate with Full Stack certification from University of Helsinki (FSO). Self-taught developer with a love for continuous learning.",
          },
          {
            icon: <FaBrain className="text-green-500" size={20} />,
            title: "Current Focus",
            description:
              "Deepening my React expertise, building accessible interfaces, and exploring the intersection of web development and AI.",
          },
        ].map((card, index) => (
          <div
            key={index}
            className="p-6 rounded-xl bg-white dark:bg-gray-800/50 shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-800 transition-all duration-300 group hover:-translate-y-1"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-green-100 dark:group-hover:bg-green-900/30 transition-colors">
                {card.icon}
              </div>
              <h3 className="font-medium text-lg">{card.title}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-20 max-w-2xl mx-auto text-center">
        <h3 className="text-2xl font-semibold mb-4">Committed to Craft</h3>
        <p className="text-gray-600 dark:text-gray-400">
          After a few years of building web apps, I'm intentionally slowing down
          to strengthen fundamentals and deepen my expertise. My goal is to
          write code that other developers enjoy reading and maintaining,
          whether it's frontend or the occasional backend work.
        </p>
      </div>
    </section>
  );
}
