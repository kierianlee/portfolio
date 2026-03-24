import { createFileRoute } from "@tanstack/react-router";
import { IconBrandLinkedin, IconBrandGithub } from "tabler-icons";

export const Route = createFileRoute("/")({ component: App });

const writing = [
  { title: "Lorem ipsum dolor sit amet, consectetur adipiscing" },
  { title: "Elit sed do eiusmod tempor incididunt ut" },
  { title: "Labore et dolore magna aliqua ut enim ad minim veniam" },
];

const projects = [
  {
    title: "Project A",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
  },
  {
    title: "Project B",
    description: "Elit sed do eiusmod tempor incididunt ut",
  },
  {
    title: "Project C",
    description: "Labore et dolore magna aliqua ut enim ad minim veniam",
  },
];

function App() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative flex flex-col gap-20 max-w-xl mx-auto px-6 py-36">
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
                className="relative inline-block text-blue-400"
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
                className="relative inline-block text-foreground"
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
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <IconBrandGithub size={24} />
            </a>
            <a
              href="https://linkedin.com/in/kierian"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <IconBrandLinkedin size={24} />
            </a>
          </div>
        </section>

        {/* Writing */}
        <section className="flex flex-col gap-4">
          <h2 className=" font-medium text-muted-foreground">Writing</h2>
          <ul className="flex flex-col gap-3">
            {writing.map((post) => (
              <li key={post.title}>
                <a
                  href="#"
                  className="text-lg text-foreground/80 hover:text-foreground transition-colors font-medium"
                >
                  {post.title}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Projects */}
        <section className="flex flex-col gap-4">
          <h2 className="font-medium text-muted-foreground">Projects</h2>
          <ul className="flex flex-col gap-3">
            {projects.map((project) => (
              <li
                key={project.title}
                className="flex gap-2 items-center font-medium"
              >
                <h3 className="text-lg text-foreground/80">{project.title}</h3>
                <p className="text text-muted-foreground">
                  {project.description}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
