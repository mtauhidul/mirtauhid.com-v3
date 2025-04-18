import { CustomMDX } from "app/components/mdx";
import { metaData } from "app/config";
import { formatDate, getBlogPosts } from "app/lib/posts";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  let post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image
    ? image
    : `${metaData.baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title: `${title} | Blog | Mir Tauhidul Islam`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${metaData.baseUrl}/blog/${post.slug}`,
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

export default function Blog({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  function calculateReadingTime(post) {
    const wordsPerMinute = 200;
    const text = post.content;
    const numberOfWords = text.split(/\s/g).length;
    return Math.ceil(numberOfWords / wordsPerMinute);
  }

  // Safely handle tags
  const tagArray = post.metadata.tags
    ? post.metadata.tags.split(",").map((tag) => tag.trim())
    : [];

  return (
    <section className="py-8">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${metaData.baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${metaData.baseUrl}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: metaData.name,
            },
          }),
        }}
      />

      {/* Back to blog link */}
      <div className="mb-8">
        <Link
          href="/blog"
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
          Back to Blog
        </Link>
      </div>

      {/* Article header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          {post.metadata.title}
        </h1>

        <div className="flex items-center space-x-6 text-gray-400 mb-8">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
              M
            </div>
            <span className="font-medium">Mir Tauhidul Islam</span>
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
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <span>{formatDate(post.metadata.publishedAt)}</span>
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
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <span>{calculateReadingTime(post)} min read</span>
          </div>
        </div>

        {post.metadata.image && (
          <div className="relative w-full h-80 md:h-96 mb-10 rounded-xl overflow-hidden">
            <img
              src={post.metadata.image}
              alt={post.metadata.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Summary/Intro */}
        <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-6 mb-10">
          <p className="text-lg text-gray-300 italic">
            {post.metadata.summary}
          </p>
        </div>
      </div>

      {/* Main content */}
      <article className="prose prose-lg max-w-none prose-quoteless prose-neutral dark:prose-invert prose-headings:font-bold prose-headings:text-white prose-p:text-gray-300 prose-a:text-green-500 prose-strong:text-white prose-code:text-white prose-code:bg-gray-800 prose-code:rounded prose-code:px-1 prose-code:py-0.5 prose-pre:bg-gray-800/50 prose-pre:border prose-pre:border-gray-700 mb-12">
        <CustomMDX source={post.content} />
      </article>

      {/* Tags section */}
      {tagArray.length > 0 && (
        <div className="mt-16 pt-8 border-t border-gray-800">
          <h3 className="text-xl font-bold mb-4 text-white">Topics</h3>
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

      {/* Share and navigation section */}
      <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h4 className="text-lg font-medium mb-2 text-white">
            Share this article
          </h4>
          <div className="flex space-x-4">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                post.metadata.title
              )}&url=${encodeURIComponent(
                `${metaData.baseUrl}/blog/${post.slug}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-lg transition-colors"
              aria-label="Share on Twitter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                `${metaData.baseUrl}/blog/${post.slug}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-lg transition-colors"
              aria-label="Share on LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
              </svg>
            </a>
            <a
              href={`mailto:?subject=${encodeURIComponent(
                post.metadata.title
              )}&body=${encodeURIComponent(
                `Check out this article: ${metaData.baseUrl}/blog/${post.slug}`
              )}`}
              className="p-2 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-lg transition-colors"
              aria-label="Share via Email"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </a>
          </div>
        </div>

        <Link
          href="/blog"
          className="inline-flex items-center px-4 py-2 text-sm font-medium bg-green-500/10 text-green-500 hover:bg-green-500/20 rounded-lg transition-colors"
        >
          Read more articles
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
