import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import projects from "#/lib/content/Projects";
import Skills from "@/app/components/base/Skills";
import { Link } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { IoIosArrowBack } from "react-icons/io";
import TransitionWrapper from "@/app/components/base/PageTransitionWrapper";
import GoBack from "@/app/components/base/GoBack";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  const search = url.searchParams.get("search");

  let filteredProjects = projects;

  if (search) {
    const searchArray = JSON.parse(search);

    if (searchArray.length === 1) {
      filteredProjects = projects.filter((project) =>
        project.skills?.some((skill) => searchArray.includes(skill))
      );
    }

    if (searchArray.length > 1) {
      filteredProjects = projects.filter((project) =>
        searchArray.every((search: string) =>
          project.skills.some((skill) => skill === search)
        )
      );
    }
  }

  return {
    projects: filteredProjects,
  };
};

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <div className="mt-[2rem] min-h-svh">
      <section className="pt-0">
        <div className="flex justify-center container">
          <TransitionWrapper>
            <GoBack to="/" />
          </TransitionWrapper>
        </div>
      </section>
      <section>
        <div className="container">
          <TransitionWrapper directionX={-7.5}>
            <div className="justify-center pt-12">
              <Skills />
            </div>
          </TransitionWrapper>
        </div>
      </section>
      <section>
        <div className="gap-3 grid sm:grid-cols-2 container">
          {loaderData.projects.map((el) => (
            <TransitionWrapper
              key={`search-project-${el.route}`}
              directionY={5}
            >
              <ProjectItem {...el} />
            </TransitionWrapper>
          ))}
        </div>
      </section>
    </div>
  );
}

export function ProjectItem({
  route,
  name,
  bannerText,
  bannerBannerSrc,
  bannerLogoSrc,
}: {
  route: string;
  name: string;
  bannerText?: string;
  bannerBannerSrc?: string;
  bannerLogoSrc?: string;
}) {
  return (
    <Link
      to={`/projects/project/${route}`}
      className="relative flex justify-center items-center bg-item-1 shadow-xl hover:shadow-item border-[1px] hover:border-accent-1 border-border-1 aspect-video duration-300 hover:shadow-s-accent-1"
    >
      {bannerBannerSrc && (
        <img
          src={bannerBannerSrc}
          alt={`Project ${name}`}
          className="top-0 left-0 absolute brightness-75 w-full h-full object-cover"
        />
      )}

      {bannerLogoSrc && (
        <div className="p-12">
          <img
            src={bannerLogoSrc}
            alt={`Logo ${name}`}
            className="relative h-[7.5rem]"
          />
        </div>
      )}
      {bannerText && (
        <div className="flex justify-center items-center p-12 w-full h-full">
          <strong className="sm:text-4xl text-5xl lg:text-5xl text-center">
            {bannerText}
          </strong>
        </div>
      )}
    </Link>
  );
}
