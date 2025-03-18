import { type LoaderFunctionArgs, redirect } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import TransitionWrapper from "@/app/components/base/PageTransitionWrapper";
import "react-photo-view/dist/react-photo-view.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "@remix-run/react";
import { FaGithub } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import Skills from "@/app/components/base/Skills";
import projects from "@/app/lib/content/Projects";
import GoBack from "@/app/components/base/GoBack";
export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const project = projects.find((el) => el.route === params.project);

  if (!project) {
    return redirect("/404");
  }

  return project;
};

export default function Index() {
  const {
    name,
    bannerBannerSrc,
    bannerLogoSrc,
    bannerText,
    content,
    github,
    site,
    skills,
  } = useLoaderData<typeof loader>();

  const navigate = useNavigate();

  return (
    <div className="mt-[2rem] min-h-svh">
      <section className="pt-0">
        <div className="flex justify-center container">
          <GoBack to={-1} />
        </div>
      </section>
      <section>
        <div className="container">
          <TransitionWrapper directionY={5}>
            <div className="flex justify-center">
              {bannerLogoSrc && (
                <img
                  src={bannerLogoSrc}
                  alt={`Project ${name} Logo`}
                  className="h-[12rem]"
                />
              )}
            </div>
            <div className="pt-24">
              <h2 className="font-header text-center">{name}</h2>
              <div className="flex justify-center gap-6 pt-8">
                {github && (
                  <a
                    href={github}
                    className="group shadow-sm p-3 border-[2px] hover:border-accent-1 border-border-1 rounded-full duration-100"
                    target="_blank"
                    rel="noreferrer"
                    title="GitHub Repo"
                  >
                    <FaGithub className="text-5xl duration-100 group-hover:text-accent-1" />
                  </a>
                )}
                {site && (
                  <a
                    href={site}
                    className="group shadow-sm p-3 border-[2px] hover:border-accent-1 border-border-1 rounded-full duration-100"
                    target="_blank"
                    rel="noreferrer"
                    title={`${name} link`}
                  >
                    <TbWorld className="text-5xl duration-100 group-hover:text-accent-1" />
                  </a>
                )}
              </div>
              <div className="pt-8">
                <Skills match={skills} />
              </div>
              <div className="pt-24">{content}</div>
            </div>
          </TransitionWrapper>
        </div>
      </section>
    </div>
  );
}
