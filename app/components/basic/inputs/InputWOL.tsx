export default function Input({
  name,
  placeholder,
  type,
  alert,
  className,
  inputClassName,
  rows,
}: {
  name: string;
  placeholder?: string;
  type?: "text" | "email" | "number" | "password" | "textarea";
  alert?: string | undefined | boolean;
  bgColor?: string;
  className?: string;
  inputClassName?: string;
  rows?: number;
}) {
  if (type === "textarea") {
    return (
      <div
        className={`relative mt-2 w-full md:min-w-[45%] max-w-[32rem] ${className}`}
      >
        {typeof alert === "string" && (
          <div className="top-0 left-5 absolute px-2 -translate-y-1/2">
            <div className="relative px-2">
              <div className="top-0 left-0 absolute bg-item-1 w-full h-1/2" />
              <div className="bottom-0 left-0 absolute bg-bg w-full h-1/2" />
              <p className="relative text-alert-1 text-sm">{alert}</p>
            </div>
          </div>
        )}

        <textarea
          name={name}
          rows={rows || 4}
          placeholder={placeholder}
          className={`w-full commonInput resize-none ${inputClassName} ${
            alert ? "ring-[2px] ring-alert-1" : ""
          }`}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative mt-2 w-full md:min-w-[45%] max-w-[32rem] ${className}`}
    >
      {typeof alert === "string" && (
        <div className="top-0 left-5 absolute px-2 -translate-y-1/2">
          <div className="relative px-2">
            <div className="top-0 left-0 absolute bg-item-1 w-full h-1/2" />
            <div className="bottom-0 left-0 absolute bg-bg w-full h-1/2" />
            <p className="relative text-alert-1 text-sm">{alert}</p>
          </div>
        </div>
      )}

      <input
        type={type || "text"}
        name={name}
        placeholder={placeholder}
        className={`w-full commonInput ${inputClassName} ${
          alert ? "ring-[2px] ring-alert-1" : ""
        }`}
      />
    </div>
  );
}
