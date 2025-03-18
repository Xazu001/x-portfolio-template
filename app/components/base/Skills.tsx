import {
  FaGithub,
  FaReact,
  FaHtml5,
  FaCss3,
  FaCode,
  FaNodeJs,
  FaCloudflare,
} from "react-icons/fa6";
import { RiTailwindCssFill, RiRemixRunFill } from "react-icons/ri";
import { SiAstro } from "react-icons/si";
import { Link } from "@remix-run/react";
import { RiBearSmileFill } from "react-icons/ri";
import { BiLogoTypescript } from "react-icons/bi";
import { SiDrizzle } from "react-icons/si";
import { TbLetterK } from "react-icons/tb";
import { useNavigate, useLocation } from "@remix-run/react";
import { SiHono } from "react-icons/si";
import { useState, useEffect } from "react";
import { bool } from "@/app/lib/validator";

const Skills = ({ match, random }: { match?: string[]; random?: boolean }) => {
  const iconBaseClassName = "text-2xl group-hover:text-accent-1 duration-100";
  const skills = [
    {
      icon: <FaReact className={`${iconBaseClassName}`} />,
      title: "React",
      value: "react",
    },
    {
      icon: <RiRemixRunFill className={`${iconBaseClassName}`} />,
      title: "Remix",
      value: "remix",
    },
    {
      icon: <SiAstro className={`${iconBaseClassName}`} />,
      title: "Astro",
      value: "astro",
    },
    {
      icon: <FaNodeJs className={`${iconBaseClassName}`} />,
      title: "Node",
      value: "node",
    },
    {
      icon: <FaCloudflare className={`${iconBaseClassName}`} />,
      title: "Cloudflare",
      value: "cloudflare",
    },
    {
      icon: <SiHono className={`${iconBaseClassName}`} />,
      title: "Hono",
      value: "hono",
    },
    {
      icon: <RiTailwindCssFill className={`${iconBaseClassName}`} />,
      title: "Tailwind CSS",
      value: "tailwind",
    },
    {
      icon: <RiBearSmileFill className={`${iconBaseClassName}`} />,
      title: "Zustand",
      value: "zustand",
    },
    {
      icon: <BiLogoTypescript className={`${iconBaseClassName}`} />,
      title: "TypeScript",
      value: "ts",
    },
    {
      icon: <SiDrizzle className={`${iconBaseClassName}`} />,
      title: "Drizzle",
      value: "drizzle",
    },
    {
      icon: <TbLetterK className={`${iconBaseClassName}`} />,
      title: "Kysely",
      value: "kysely",
    },
    {
      icon: <FaHtml5 className={`${iconBaseClassName}`} />,
      title: "HTML5",
      value: "html",
    },
    {
      icon: <FaCss3 className={`${iconBaseClassName}`} />,
      title: "CSS3",
      value: "css",
    },
  ];

  const [active, setActive] = useState<number | null>(null);
  const [hovered, setHovered] = useState<boolean>(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setActive(Math.floor(Math.random() * skills.length));
      }, Math.random() * 1000 + 2000);

      return () => clearInterval(interval);
    }
  }, [hovered]);

  const location = useLocation();

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {!match && (
        <div className="px-6 py-2 bg-border-1 border-[2px] border-border-1 rounded-full">
          <strong>Projects made with:</strong>
        </div>
      )}

      {skills.map((el, idx) => {
        const navigate = useNavigate();

        function Element() {
          return (
            <button
              type="button"
              onClick={() => {
                const href = window.location.href;
                const url = new URL(href);
                const search = url.searchParams.get("search");

                if (search) {
                  const json = JSON.parse(search);
                  const index = json.indexOf(el.value);

                  if (index > -1) {
                    json.splice(index, 1);
                  } else {
                    json.push(el.value);
                  }

                  navigate({
                    pathname: "/search/projects",
                    search: `?search=${JSON.stringify(json)}`,
                  });
                }

                if (!search) {
                  const json = [`${el.value}`];

                  navigate({
                    pathname: "/search/projects",
                    search: `?search=${JSON.stringify(json)}`,
                  });
                }
              }}
              onMouseEnter={() => {
                if (!hovered) {
                  setHovered(true);
                  setActive(null);
                }
              }}
              key={`index-skill-${el.value}`}
              className={`flex items-center gap-4 shadow-sm px-6 py-2 border-[2px] hover:border-accent-1 border-border-1 rounded-full duration-100 ${
                location.search.includes(el.value) || active === idx
                  ? "bg-accent-1"
                  : "group"
              } ${active === idx ? "scale-[1.075]" : ""}`}
            >
              {el.icon}
              <p className="font-medium">{el.title}</p>
            </button>
          );
        }

        if (match) {
          if (match.some((el2) => el2 === el.value)) {
            return Element();
          }
        }

        if (!match) {
          return Element();
        }
      })}
    </div>
  );
};

export default Skills;
