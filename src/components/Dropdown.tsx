import { useClickOutside } from "@/customHook/useClickOutside";
import Link from "next/link";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

export default function Dropdown({ title, href, list }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const clickOutsiderRef = useClickOutside(() => setIsOpen(false));
  return (
    <div className="relative inline-block text-left" ref={clickOutsiderRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex-center w-full gap-2 rounded-full bg-white px-4 py-2 font-medium text-black"
      >
        <Link href={href || "#"}>{title}</Link>
        {list?.length > 0 && (
          <FaAngleDown
            className={`transition-transform ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        )}
      </button>

      {/* Dropdown Menu */}
      {list?.length > 0 && (
        <div
          className={`absolute right-0 z-[99999] mt-2 min-w-36 origin-top-right rounded-md bg-white shadow-lg transition-all duration-300 ease-in-out ${
            isOpen
              ? "scale-100 transform opacity-100"
              : "pointer-events-none scale-95 transform opacity-0"
          }`}
        >
          <div className="py-1">
            {list?.map((item: any) => {
              return (
                <Link
                  href={item?.href}
                  key={item?.name}
                  className="block px-4 py-2 text-sm font-medium capitalize text-zinc-700 hover:bg-zinc-200 hover:text-zinc-900"
                >
                  {item?.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
