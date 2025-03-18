import type { LinksFunction } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import ItemButton from "../components/basic/buttons/AccentButton";
import { FaGithub, FaCode, FaLinkedin } from "react-icons/fa6";
import { Link } from "@remix-run/react";
import TransitionWrapper from "../components/base/PageTransitionWrapper";
import Skills from "../components/base/Skills";

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const birthDate = new Date("2004-02-07");
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);

  return { age };
};

export const links: LinksFunction = () => [
  {
    href: "/img/photo.avif",
    rel: "preload",
    as: "image",
  },
];

export default function Index() {
  const { age } = useLoaderData<typeof loader>();
  return (
    <div className="mt-[2rem]">
      <div className="min-h-svh">
        {" "}
        <section>
          <div className="flex justify-center max-w-screen-md container">
            <div>
              <TransitionWrapper>
                <div className="flex justify-center">
                  <img
                    src="img/photo.avif"
                    className="bg-item-1 shadow-img border-[3px] border-accent-1 rounded-full h-[19rem] object-cover aspect-square shadow-s-accent-1"
                    // biome-ignore lint/a11y/noRedundantAlt: <explanation>
                    alt="Portfolio Photo"
                  />
                </div>
              </TransitionWrapper>

              <TransitionWrapper directionY={7.5}>
                <div className="pt-8 text-center">
                  <strong className="opacity-70 font-header text-3xl text-accent-1">
                    Temp
                  </strong>
                  <br />
                  <strong className="font-header text-4xl">John Doe</strong>
                  <br />
                  <strong className="opacity-70 text-3xl">
                    Frontend / TS Backend Developer
                  </strong>
                  <br />
                  <br />
                  <p className="opacity-60 font-medium text-xl">
                    Hi! My name is John. i'm {age} years old REACT developer
                    from Poland. My dream is to get my first constant job as
                    Frontend Dev and get into space someday.
                  </p>
                </div>
              </TransitionWrapper>

              <TransitionWrapper directionX={7.5}>
                <div className="flex justify-center gap-6 pt-16">
                  <a
                    href="https://github.com/xazu001"
                    className="group shadow-sm p-3 border-[2px] hover:border-accent-1 border-border-1 rounded-full duration-100"
                    target="_blank"
                    rel="noreferrer"
                    title="GitHub Profile"
                  >
                    <FaGithub className="text-5xl duration-100 group-hover:text-accent-1" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/kacper-kijek-349275272/"
                    className="group shadow-sm p-3 border-[2px] hover:border-accent-1 border-border-1 rounded-full duration-100"
                    target="_blank"
                    rel="noreferrer"
                    title="LinkedIn Profile"
                  >
                    <FaLinkedin className="text-5xl scale-[0.95] duration-100 group-hover:text-accent-1" />
                  </a>
                  <Link
                    to="/search/projects"
                    className="group shadow-sm p-3 border-[2px] hover:border-accent-1 border-border-1 rounded-full duration-100"
                    title="Projects"
                  >
                    <FaCode className="text-5xl duration-100 group-hover:text-accent-1" />
                  </Link>
                  <ItemButton
                    to="/contact"
                    className="flex items-center"
                    textClassName="px-10 text-xl text-bg"
                  >
                    Get In Touch
                  </ItemButton>
                </div>
              </TransitionWrapper>
            </div>
          </div>
          <div className="container">
            <TransitionWrapper directionX={-7.5}>
              <div className="justify-center pt-12">
                <Skills random />
              </div>
            </TransitionWrapper>
          </div>
        </section>
      </div>
      <footer className="px-6 py-2 text-center">
        <a
          href="https://github.com/Xazu001/x-portfolio-template"
          target="_blank"
          rel="noreferrer"
        >
          FREE TO USE TEMPLATE
        </a>
      </footer>
    </div>
  );
}
