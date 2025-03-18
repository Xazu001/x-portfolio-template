type Project = {
  route: string;
  name: string;
  bannerBannerSrc?: string;
  bannerLogoSrc?: `/img/projects/${string}/${string}.${string}`;
  bannerText?: string;
  skills: string[];
  github?: string;
  site?: string;
  content: JSX.Element;
};

const projects: Project[] = [
  {
    route: "nocodeyne",
    name: "nocodeyne.com",
    bannerLogoSrc: "/img/projects/nocodeyne/logo.svg",
    skills: ["astro", "react", "cloudflare", "css", "html", "tailwind", "ts"],
    site: "https://nocodeyne.com",
    content: (
      <div>
        <h1>Hi!</h1>
      </div>
    ),
  },
  {
    route: "xn-brand-template",
    name: "Brand Template XN",
    bannerText: "Brand Template XN",
    skills: ["react", "cloudflare", "css", "html", "tailwind", "ts", "remix"],
    github: "https://github.com/Xazu001/brand-template-5325",
    site: "https://brand-template-xn.pages.dev",
    content: (
      <div>
        <h1>Hi!</h1>
      </div>
    ),
  },
  {
    route: "norse-names-gen",
    name: "Norse Names Generator",
    bannerText: "Norse Names Generator",
    skills: ["react", "cloudflare", "css", "html", "tailwind", "ts", "remix"],
    github: "https://github.com/xazu001/norse-names-gen",
    site: "https://norse-names-gen.pages.dev",
    content: (
      <div>
        <h1>Hi!</h1>
      </div>
    ),
  },
];

export default projects;
