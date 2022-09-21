import { ReactNode, useState } from "react";
import CodeTag from "../code-tag";
import Link from "next/link";
import { useRouter } from "next/router";
import { Switch } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/pro-solid-svg-icons";

const navLinks = [
  { label: "home", path: "/" },
  { label: "about", path: "/about" },
  { label: "work", path: "/work" },
  { label: "blog", path: "/blog" },
  { label: "contact", path: "/contact" },
];

const Layout = ({ children }: { children: ReactNode }) => {
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);
  const router = useRouter();

  return (
    <main className="relative min-h-full bg-phantom text-white flex flex-col">
      <div className="fixed left-auto right-0 top-0 z-20 flex h-screen w-full justify-around">
        <span className="border-r border-white border-opacity-5"></span>
        <span className="border-r border-white border-opacity-5"></span>
        <span className="border-r border-white border-opacity-5"></span>
        <span className="hidden sm:block border-r border-white border-opacity-5"></span>
        <span className="hidden md:block border-r border-white border-opacity-5"></span>
        <span className="hidden lg:block border-r border-white border-opacity-5"></span>
      </div>
      <div className="absolute left-4 top-14 z-20">
        <CodeTag tag="html" className="mb-4" />
        <CodeTag className="ml-4" tag="body" />
      </div>
      <div className="flex-1 z-20">{children}</div>
      <div className="absolute left-4 bottom-4 z-10">
        <CodeTag className="ml-4" tag="/body" />
        <CodeTag tag="/html" className="mt-4" />
      </div>
      <div className="flex absolute left-1/2 -translate-x-1/2 py-2 w-full justify-center items-center bg-phantom-dark z-20 px-6 h-10">
        <div className="flex flex-wrap gap-x-8 gap-y-2 items-center">
          {navLinks.map(({ label, path }, index) => (
            <Link href={path} passHref key={index}>
              <a
                className={`relative text-xs md:text-sm font-light font-mono ${
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
        </div>
        {/* <Switch
          checked={darkModeEnabled}
          onChange={setDarkModeEnabled}
          className={`${
            darkModeEnabled ? "bg-[rgba(8,253,216,0.7)]" : "bg-gray-400"
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className="sr-only">Dark mode</span>
          <span className="absolute left-1">
            <FontAwesomeIcon icon={faMoon} color="#F2C315" />
          </span>
          <span className="absolute right-1">
            <FontAwesomeIcon icon={faSun} color="#F2C315" />
          </span>
          <span
            className={`${
              darkModeEnabled ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch> */}
      </div>
    </main>
  );
};

export default Layout;
