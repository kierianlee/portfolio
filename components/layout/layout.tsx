import { ReactNode } from "react";
import { motion } from "framer-motion";
import CodeTag from "../code-tag";
import Link from "next/link";
import { useRouter } from "next/router";

const navLinks = [
  { label: "home", path: "/" },
  { label: "about", path: "/about" },
  { label: "work", path: "/work" },
  { label: "blog", path: "/blog" },
  { label: "contact", path: "/contact" },
];

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  return (
    <main className="relative min-h-full bg-phantom text-white flex flex-col">
      <div className="fixed left-auto right-0 top-0 z-20 flex h-screen w-full justify-around">
        <span className="border-r border-white border-opacity-5"></span>
        <span className="border-r border-white border-opacity-5"></span>
        <span className="border-r border-white border-opacity-5"></span>
        <span className="border-r border-white border-opacity-5"></span>
        <span className="border-r border-white border-opacity-5"></span>
        <span className="border-r border-white border-opacity-5"></span>
      </div>
      <div className="absolute left-4 top-4 z-30">
        <CodeTag tag="html" className="mb-4" />
        <CodeTag className="ml-4" tag="body" />
      </div>
      <div className="flex-1 z-20">{children}</div>
      <div className="absolute left-4 bottom-4 z-10">
        <CodeTag className="ml-4" tag="/body" />
        <CodeTag tag="/html" className="mt-4" />
      </div>
      <motion.div className="flex gap-8 absolute left-1/2 -translate-x-1/2 py-2 w-full justify-center bg-phantom-dark z-20">
        {navLinks.map(({ label, path }, index) => (
          <Link href={path} passHref key={index}>
            <a
              className={`relative text-sm font-light font-mono ${
                router.pathname === path
                  ? "text-crayola"
                  : "text-[rgba(255,255,255,0.4)]"
              } hover:text-white duration-100 ${
                index === navLinks.length - 1
                  ? ""
                  : `after:content-['/'] after:text-[rgba(255,255,255,0.4)] after:absolute after:left-[calc(100%+1rem)] after:-translate-x-1/2 after:pointer-events-none`
              } `}
            >
              {label}
            </a>
          </Link>
        ))}
      </motion.div>
    </main>
  );
};

export default Layout;
