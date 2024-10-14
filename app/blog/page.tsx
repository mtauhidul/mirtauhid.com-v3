import { formatDate, getBlogPosts } from "app/lib/posts";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

export const metadata = {
  title: "Blog",
  description: "Nextfolio Blog",
};

export default function BlogPosts() {
  let allBlogs = getBlogPosts();

  // A function to calculate the estimated reading time of a blog post
  function calculateReadingTime(post) {
    const wordsPerMinute = 200;
    const text = post.content;
    const numberOfWords = text.split(/\s/g).length;
    return Math.ceil(numberOfWords / wordsPerMinute);
  }

  return (
    <section>
      <h1 className="mb-4 text-6xl font-bold tracking-tight">Blog</h1>
      <p className="text-2xl mb-4 text-gray-500 font-medium">
        Sharing insights and lessons learned from my journey.
      </p>
      <div className="border-t border-gray-800 mb-8"></div>
      <div>
        {allBlogs
          .sort((a, b) => {
            if (
              new Date(a.metadata.publishedAt) >
              new Date(b.metadata.publishedAt)
            ) {
              return -1;
            }
            return 1;
          })
          .map((post) => (
            <div
              key={post.slug}
              className="w-full flex flex-col sm:flex-row justify-between items-start space-y-1 sm:space-y-0 sm:space-x-2 mb-8 sm:mb-4
              "
            >
              <div className="mb-6">
                <p className="text-2xl text-black dark:text-white tracking-tight font-bold max-w-xl">
                  {post.metadata.title}
                </p>
                <div className="sm:hidden flex flex-col items-start space-y-1 mb-4 mt-4 ">
                  <p className="text-green-500 dark:text-green-400 font-medium tabular-nums">
                    {formatDate(post.metadata.publishedAt, false)}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400  font-medium tabular-nums text-sm mb-8">
                    {calculateReadingTime(post)} min read
                  </p>
                </div>
                <p
                  className="text-lg font-medium text-neutral-600 dark:text-neutral-400 max-w-xl
                  "
                >
                  {post.metadata.summary}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="text-green-500 dark:text-green-400 font-medium flex 
                  items-center space-x-1 cursor-pointer transition-transform duration-200 hover:translate-x-2 max-w-max"
                >
                  Read More <FaArrowRight className="ml-1" />
                </Link>
              </div>
              <div className="flex flex-col items-start space-y-1 mb-4 mt-4  hidden sm:flex">
                <p className="text-green-500 dark:text-green-400 font-medium tabular-nums">
                  {formatDate(post.metadata.publishedAt, false)}
                </p>
                <p className="text-gray-600 dark:text-gray-400  font-medium tabular-nums text-sm mb-8">
                  {calculateReadingTime(post)} min read
                </p>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
