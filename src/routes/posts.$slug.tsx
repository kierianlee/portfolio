import { createFileRoute, Link } from "@tanstack/react-router";
import { allPosts } from "content-collections";
import { MDXContent } from "@content-collections/mdx/react";

export const Route = createFileRoute("/posts/$slug")({
  component: PostPage,
});

function PostPage() {
  const { slug } = Route.useParams();
  const post = allPosts.find((p) => p._meta.path === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-xl mx-auto px-6 py-36">
          <p className="text-muted-foreground">Post not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-xl mx-auto px-6 py-36">
        <Link
          to="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150 mb-8 inline-block"
        >
          &larr; Home
        </Link>
        <article className="flex flex-col gap-6">
          <header className="flex flex-col gap-2">
            <h1 className="text-2xl font-medium text-foreground">
              {post.title}
            </h1>
            <time className="text-sm text-muted-foreground">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </header>
          <div className="prose prose-invert max-w-none text-foreground/80">
            <MDXContent code={post.mdx} />
          </div>
        </article>
      </div>
    </div>
  );
}
