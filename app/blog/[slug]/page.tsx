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
    </section>
  );
}
