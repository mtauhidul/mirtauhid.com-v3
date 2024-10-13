import { CustomMDX } from "app/components/mdx";
import { metaData } from "app/config";
import { formatDate, getBlogPosts } from "app/lib/posts";
import type { Metadata } from "next";
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
    title,
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

  return (
    <section>
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
      <h1 className="title mb-3 font-bold text-6xl tracking-tight ">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center align-center mt-2 mb-4 text-medium">
        <p className="text-xl font-medium text-green-600 dark:text-green-400">
          ⚡️ mirtauhid • {formatDate(post.metadata.publishedAt)} •{" "}
          {calculateReadingTime(post)} min read
        </p>
      </div>
      <div className="border-t border-gray-800 mb-8"></div>
      <article className="prose prose-quoteless prose-neutral dark:prose-invert">
        <CustomMDX source={post.content} />
      </article>

      <div className="mt-12">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
          Tags
        </h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {post.metadata.tags.split(",").map((tag, index) => {
            const colors = [
              "bg-green-100 text-green-800",
              "bg-blue-100 text-blue-800",
              "bg-yellow-100 text-yellow-800",
              "bg-purple-100 text-purple-800",
              "bg-pink-100 text-pink-800",
              "bg-red-100 text-red-800",
              "bg-indigo-100 text-indigo-800",
              "bg-gray-100 text-gray-800",
            ];

            const colorClass = colors[index % colors.length];

            return (
              <span
                key={tag}
                className={`px-2 py-1 text-sm font-medium rounded-lg ${colorClass}`}
              >
                {tag}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
