import { useNavigate } from "@remix-run/react";
import { IoIosArrowBack } from "react-icons/io";

export default function GoBack({ to }: { to: string | number }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="group relative"
      onClick={() => {
        if (to) {
          if (typeof to === "string") {
            navigate(to);
          } else if (typeof to === "number") {
            navigate(to);
          }
        }
      }}
    >
      <IoIosArrowBack className="absolute text-8xl translate-x-[6px] translate-y-[2px] group-hover:-translate-x-[6px] group-hover:translate-y-[4px] duration-100 text-accent-1" />
      <IoIosArrowBack className="relative text-8xl" />
    </button>
  );
}
