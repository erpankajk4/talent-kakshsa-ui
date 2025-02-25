import React from "react";

const LoadingSvg = (
  <svg
    width="20"
    height="20"
    fill="currentColor"
    className="mr-2 animate-spin"
    viewBox="0 0 1792 1792"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
  </svg>
);

export const Button = ({
  variant = "blue",
  className = "",
  children,
  onClick,
  type = "button",
  loading = false,
  disabled = false,
  ...props
}: any) => {
  let style = "";
  if (variant === "blue") {
    style = `hover:bg-blue-950 bg-blue-900 border-2 border-blue-900 text-white ${disabled ? "opacity-80 cursor-not-allowed" : ""}`;
  }
  if (variant === "blueBorder") {
    style = `bg-transparent hover:bg-blue-900 hover:text-white border-2 border-blue-900 text-blue-900 font-semibold !rounded-full ${disabled ? "opacity-80 cursor-not-allowed" : ""}`;
  }
  if (variant === "orange") {
    style = `hover:bg-orange-600 bg-orange-500 border-2 border-orange-500 text-white ${disabled ? "bg-zinc-800 cursor-not-allowed" : ""}`;
  }
  if (variant === "whiteTransparent") {
    style = `hover:bg-opacity-10 bg-white border-2 border-white bg-opacity-30 text-white ${disabled ? "bg-zinc-200 cursor-not-allowed" : ""}`;
  }
  if (variant === "white") {
    style = `hover:bg-blue-900 hover:text-white bg-white border-2 border-blue-900 text-blue-900 ${disabled ? "bg-zinc-200 cursor-not-allowed" : ""}`;
  }
  if (variant === "orangeAnimated") {
    style = `button-54 active:!scale-100 ${disabled ? "bg-zinc-800 cursor-not-allowed" : ""}`;
  }
  return (
    <button
      className={`${style} ${className} flex-center w-min gap-2 rounded-lg px-10 py-2 capitalize active:scale-90`}
      onClick={onClick}
      type={type}
      {...props} // Spread all additional props onto the button
    >
      {children} {loading && LoadingSvg}
    </button>
  );
};

export const LoadingButton = ({
  children,
  className,
  onClick,
  type = "button",
  disabled = false,
  ...props
}: any) => {
  return (
    <button
      className={`${className} loadingButton flex-center w-min gap-2 text-nowrap rounded bg-orange-500 px-14 py-2 active:scale-90 ${disabled ? "cursor-not-allowed bg-orange-300" : ""}`}
      onClick={onClick}
      type={type}
      {...props}
    >
      <p className="svg-wrapper">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path
            fill="currentColor"
            d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
          ></path>
        </svg>
      </p>
      <span>{children}</span>
    </button>
  );
};
