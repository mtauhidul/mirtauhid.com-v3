import Image from "next/image";
import {
  FaBrain,
  FaCode,
  FaGraduationCap,
  FaLaptopCode,
} from "react-icons/fa6";

import avatar from "../public/avatar.jpg";

export default function Page() {
  return (
    <section>
      <Image
        src={avatar}
        alt="Profile photo"
        className="rounded-full bg-gray-100 block lg:mt-5 mt-0 lg:mb-5 mb-10 mx-auto sm:float-right sm:ml-5 sm:mb-5 grayscale dark:grayscale-0"
        unoptimized
        width={240}
        height={240}
        priority
      />

      <h3 className="text-4xl font-medium text-gray-600 mb-2">Hello! I’m-</h3>
      <h1 className="mb-8 text-7xl font-extrabold tracking-tight">
        Mir Tauhidul Islam
      </h1>
      <h3 className="text-4xl font-medium text-gray-600 mb-8">
        A self-taught{" "}
        <span className="text-gray-700 dark:text-gray-400 font-extrabold">
          Web Application Developer
        </span>{" "}
        <br />
        passionate about Computer Science.
      </h3>

      <div className="prose prose-neutral dark:prose-invert">
        <p className="text-xl text-gray-600 dark:text-gray-500 font-medium leading-tight mb-2">
          <FaCode
            className="inline-block text-green-400 dark:text-green-300 align-text-bottom"
            size={24}
          />{" "}
          Specializing in modern web technologies (JavaScript/
          <span className="text-green-400 font-bold">React</span>/Node.js).
        </p>
        <p className="text-xl text-gray-600 dark:text-gray-500 font-medium leading-tight mb-2">
          <FaLaptopCode
            className="inline-block text-green-400 dark:text-green-300 align-text-bottom"
            size={24}
          />{" "}
          Freelance Web Developer at{" "}
          <a
            href="https://www.upwork.com/freelancers/~014d7a947089fc4227"
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline text-green-400 hover:text-green-500 dark:hover:text-green-400"
          >
            <span className="text-green-400 font-bold">UpWork</span>
          </a>
          , creating AI-powered solutions.
        </p>
        <p className="text-xl text-gray-600 dark:text-gray-500 font-medium leading-tight mb-2">
          <FaGraduationCap
            className="inline-block text-green-400 dark:text-green-300 align-text-bottom"
            size={24}
          />{" "}
          Graduate in Statistics and Data Science; Full Stack Certified (
          <a
            href="https://studies.cs.helsinki.fi/stats/api/certificate/fullstackopen/en/7791e4226d19f2d21e0879c0130cdad4"
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline text-green-400 hover:text-green-500 dark:hover:text-green-400"
          >
            <span className="text-green-400 font-bold">FSO</span>
          </a>
          ).
        </p>
        <p className="text-xl text-gray-600 dark:text-gray-500 font-medium leading-tight mb-2">
          <FaBrain
            className="inline-block text-green-400 dark:text-green-300 align-text-bottom"
            size={24}
          />{" "}
          Passionate about advancing software engineering with{" "}
          <span className="text-green-400 font-bold">AI</span> innovation.
        </p>
      </div>
    </section>
  );
}
