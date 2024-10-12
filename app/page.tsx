import Image from "next/image";
import avatar from "../public/avatar.jpg";

export default function Page() {
  return (
    <section>
      <Image
        src={avatar}
        alt="Profile photo"
        className="rounded-full bg-gray-100 block lg:mt-5 mt-0 lg:mb-5 mb-10 mx-auto sm:float-right sm:ml-5 sm:mb-5 grayscale hover:grayscale-0 hover:scale-105 transition-transform"
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
        <p className="text-xl text-gray-600 dark:text-gray-500 font-medium leading-relaxed mb-6">
          🚀 Specializing in modern web technologies (JavaScript/React/Node.js)
          <br />⚡ Freelance Web Developer at{" "}
          <a
            href="https://www.upwork.com/freelancers/~014d7a947089fc4227"
            target="_blank"
            rel="noopener noreferrer"
            className="
            no-underline
            text-green-400
            "
          >
            <span className="text-green-400">UpWork</span>
          </a>
          , working on <span className="text-green-400">AI</span>-driven
          projects. <br />
          🎓 Statistics and Data Science graduate; Full Stack Certified (
          <a
            href="https://fullstackopen.com/en/"
            target="_blank"
            rel="noopener noreferrer"
            className="
            no-underline
            text-green-400
            "
          >
            <span className="text-green-400">FSO</span>
          </a>
          ). <br />
          🎯 Seeking opportunities for a Master’s in Software Engineering.
        </p>
      </div>
    </section>
  );
}
