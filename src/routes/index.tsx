import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { IconBrandLinkedin, IconBrandGithub, IconMail } from "tabler-icons";
import { allPosts, allProjects } from "content-collections";
import { PostLink } from "#/components/post-preview";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsiblePanel,
} from "#/components/ui/collapsible";

export const Route = createFileRoute("/")({ component: App });

const posts = allPosts.sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

let hasAnimated = false;

function App() {
  const [shouldAnimate] = useState(() => !hasAnimated);

  useEffect(() => {
    hasAnimated = true;
  }, []);

  return (
    <div className="relative flex flex-col gap-20 max-w-xl mx-auto px-6 py-20 md:py-36">
        {/* Intro */}
        <section className="flex flex-col gap-5">
          <div className="w-16 h-16 rounded-full bg-border overflow-hidden">
            <img
              src="/images/me.jpg"
              alt="Kierian Lee"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-medium leading-snug text-foreground">
              Kierian Lee
            </h1>
            <p className="text-2xl font-medium leading-snug text-foreground/80">
              I'm a software engineer currently building products at{" "}
              <a
                href="https://sitemate.com"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-block text-blue-400 hover:text-blue-300 duration-150"
              >
                Sitemate
                <span className="absolute -bottom-px left-0 right-0 h-px">
                  <svg
                    width="100%"
                    height="8"
                    viewBox="0 0 37 8"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      className={
                        shouldAnimate
                          ? "animate-draw-line [stroke-dasharray:2] [stroke-dashoffset:2] [animation-delay:0.3s]"
                          : undefined
                      }
                      pathLength={1}
                      d="M1 5.39971C7.48565 -1.08593 6.44837 -0.12827 8.33643 6.47992C8.34809 6.52075 11.6019 2.72875 12.3422 2.33912C13.8991 1.5197 16.6594 2.96924 18.3734 2.96924C21.665 2.96924 23.1972 1.69759 26.745 2.78921C29.7551 3.71539 32.6954 3.7794 35.8368 3.7794"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>{" "}
              &{" "}
              <a
                href="https://medida.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-block text-foreground/80 hover:text-foreground duration-150"
              >
                Medida
                <span className="absolute -bottom-px left-0 right-0 h-px">
                  <svg
                    width="100%"
                    height="8"
                    viewBox="0 0 37 8"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      className={
                        shouldAnimate
                          ? "animate-draw-line [stroke-dasharray:2] [stroke-dashoffset:2] [animation-delay:0.9s]"
                          : undefined
                      }
                      pathLength={1}
                      d="M1 4.2C3.5 2.1 5.8 5.8 9.2 3.6C12.1 1.7 14.4 5.2 17.8 4.8C20.6 4.5 22.3 1.4 25.6 3.1C28.2 4.5 31.4 1.9 33.8 4.6C35.1 6.1 36 2.8 36 2.8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
              .
            </p>
          </div>
          <div className="flex gap-4">
            <a
              href="https://github.com/kierianlee"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              <IconBrandGithub size={24} />
            </a>
            <a
              href="https://linkedin.com/in/kierian"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              <IconBrandLinkedin size={24} />
            </a>
            <a
              href="mailto:hey@kierian.me"
              className="text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              <IconMail size={24} />
            </a>
          </div>
        </section>

        {/* Thoughts */}
        <ThoughtsSection posts={posts} />

        {/* Projects */}
        <section className="flex flex-col gap-4">
          <h2 className="font-medium text-muted-foreground">Projects</h2>
          <ul className="flex flex-col gap-3">
            {[...allProjects]
              .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
              .map((project) => (
                <li key={project._meta.path} className="w-fit">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col md:flex-row md:gap-2 items-start font-medium text-lg text-foreground/80 hover:text-foreground transition-colors duration-150"
                  >
                    <span className="whitespace-nowrap">{project.title}</span>
                    <span className="text-muted-foreground">
                      {project.description}
                    </span>
                  </a>
                </li>
              ))}
          </ul>
        </section>
    </div>
  );
}

function ThoughtsSection({ posts }: { posts: typeof allPosts }) {
  const visiblePosts = posts.slice(0, 3);
  const remainingPosts = posts.slice(3);
  const hasMore = remainingPosts.length > 0;

  return (
    <Collapsible>
      <section className="flex flex-col gap-4">
        <CollapsibleTrigger
          className={`font-medium text-muted-foreground text-left flex items-center gap-2 ${hasMore ? "cursor-pointer" : ""}`}
          disabled={!hasMore}
        >
          Thoughts
          {hasMore && (
            <>
              <span className="text-xs text-muted-foreground/60 in-data-panel-open:hidden">
                +{remainingPosts.length}
              </span>
              <span className="text-xs text-muted-foreground/60 hidden in-data-panel-open:inline">
                −
              </span>
            </>
          )}
        </CollapsibleTrigger>
        <ul className="flex flex-col gap-3 text-lg">
          {visiblePosts.map((post) => (
            <PostLink key={post._meta.path} post={post} />
          ))}
          {hasMore && (
            <CollapsiblePanel>
              <ul className="flex flex-col gap-3 text-lg">
                {remainingPosts.map((post) => (
                  <PostLink key={post._meta.path} post={post} />
                ))}
              </ul>
            </CollapsiblePanel>
          )}
        </ul>
      </section>
    </Collapsible>
  );
}
