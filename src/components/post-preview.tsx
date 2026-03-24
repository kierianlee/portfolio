import { useRef, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import type { Post } from "content-collections";
import { MDXContent } from "@content-collections/mdx/react";
import { Card } from "#/components/ui/card";
import { useState } from "react";

export function PostLink({ post }: { post: Post }) {
  const [visible, setVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });

  const show = useCallback((e: React.MouseEvent) => {
    posRef.current = { x: e.clientX + 16, y: e.clientY + 16 };
    setVisible(true);
  }, []);

  const move = useCallback((e: React.MouseEvent) => {
    if (cardRef.current) {
      cardRef.current.style.translate = `${e.clientX + 16}px ${e.clientY + 16}px`;
    }
  }, []);

  const hide = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <li
      onMouseEnter={show}
      onMouseMove={move}
      onMouseLeave={hide}
      className="w-fit"
    >
      <Link
        to="/posts/$slug"
        params={{ slug: post._meta.path }}
        className="text-foreground/80 hover:text-foreground transition-colors duration-150 font-medium"
      >
        {post.title}
      </Link>

      <AnimatePresence>
        {visible && (
          <Card
            render={
              <motion.div
                initial={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              />
            }
            ref={(node) => {
              cardRef.current = node;
              if (node) {
                node.style.translate = `${posRef.current.x}px ${posRef.current.y}px`;
              }
            }}
            className="fixed top-0 left-0 z-50 pointer-events-none w-72 p-4"
          >
            <p className="text-sm text-muted-foreground mb-1">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <div className="text-sm text-foreground/80 line-clamp-3">
              <MDXContent code={post.mdx} />
            </div>
          </Card>
        )}
      </AnimatePresence>
    </li>
  );
}
