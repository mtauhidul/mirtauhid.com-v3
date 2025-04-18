import { formatDate, getBlogPosts } from "app/lib/posts";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

export const metadata = {
  title: "Blog | Mir Tauhidul Islam",
  description:
    "Sharing insights and lessons learned from my journey as a web developer",
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
    <section className="py-12">
      <div className="space-y-6 mb-12">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">Blog</h1>
        <p className="text-xl text-gray-400 max-w-3xl">
          Sharing insights and lessons learned from my journey.
        </p>
        <div className="w-16 h-1 bg-green-500 rounded-full"></div>
      </div>

      <div className="space-y-12">
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
            <article
              key={post.slug}
              className="group relative bg-gray-900/30 rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300"
            >
              <Link href={`/blog/${post.slug}`} className="block p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex-1 space-y-4">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-green-400 transition-colors duration-300">
                      {post.metadata.title}
                    </h2>

                    <p className="text-gray-400 md:text-lg">
                      {post.metadata.summary}
                    </p>

                    <div className="pt-4 flex items-center text-sm text-gray-500">
                      <span className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1 text-green-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {formatDate(post.metadata.publishedAt, false)}
                      </span>
                      <span className="mx-3 text-gray-600">•</span>
                      <span className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1 text-green-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {calculateReadingTime(post)} min read
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end md:self-center">
                    <span className="inline-flex items-center text-sm font-medium text-green-500 group-hover:translate-x-1 transition-transform duration-300">
                      Read Article
                      <FaArrowRight className="ml-2" />
                    </span>
                  </div>
                </div>
              </Link>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500/0 via-green-500/70 to-green-500/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out origin-left"></div>
            </article>
          ))}
      </div>

      {allBlogs.length === 0 && (
        <div className="text-center py-20 bg-gray-900/30 rounded-xl border border-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gray-600 mb-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            />
          </svg>
          <h3 className="text-2xl font-bold text-gray-300 mb-2">
            No blog posts yet
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            I'm working on some interesting articles. Check back soon!
          </p>
        </div>
      )}
    </section>
  );
}
