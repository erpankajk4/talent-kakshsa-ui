import React, { useState } from "react";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";

interface NavItem {
  id: number | string;
  label: string;
  href: string;
  subNav?: NavItem[];
  iconImage?: string;
}

interface MenuMobileProps {
  navItemsArray: NavItem[];
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeItemId: string | null;
}

const MenuMobile: React.FC<MenuMobileProps> = ({
  navItemsArray,
  setIsMobileMenuOpen,
  activeItemId,
}) => {
  return (
    <ul className="flex w-full flex-col bg-white">
      {navItemsArray.map((item) => (
        <SingleNavItem
          key={item.id}
          item={item}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          activeItemId={activeItemId}
        />
      ))}
    </ul>
  );
};

interface SingleNavItemProps {
  item: NavItem;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeItemId: string | null;
}

const SingleNavItem: React.FC<SingleNavItemProps> = ({
  item,
  setIsMobileMenuOpen,
  activeItemId,
}) => {
  const [isItemOpen, setItemOpen] = useState(false);

  const toggleItem = () => {
    setItemOpen(!isItemOpen);
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <Link
            href={item.href ?? "#"}
            className={`relative flex justify-between border-b border-zinc-200 px-5 py-3 transition-all hover:bg-orange-500 hover:text-white ${
              activeItemId === item.id.toString()
                ? "text-orange-500"
                : "text-black"
            }`}
            onClick={() => {
              setIsMobileMenuOpen(false);
            }}
          >
            {item.label}
          </Link>
          {item?.subNav && item.subNav?.length !== 0 && (
            <IoIosArrowDown
              className={`mr-5 transition-transform ${isItemOpen ? "rotate-180" : "rotate-0"}`}
              onClick={() => {
                if (item.subNav && item.subNav.length > 0) {
                  toggleItem();
                } else {
                  setIsMobileMenuOpen(false); // Close the menu if there are no subnav items
                }
              }}
            />
          )}
        </div>

        {isItemOpen && item.subNav && (
          <div className="z-10 flex w-full flex-col gap-1 bg-gray-100 pl-6">
            {item.subNav.map((subItem, index) => (
              <Link
                key={index}
                href={subItem.href ?? "#"}
                onClick={() => {
                  setIsMobileMenuOpen(false); // Close the menu when a subnav item is clicked
                }}
                className={`flex cursor-pointer items-center py-2 pr-8 capitalize transition-colors hover:bg-orange-500 hover:text-white ${
                  activeItemId === subItem.id.toString()
                    ? "text-orange-500"
                    : "text-blue-950"
                }`}
              >
                {subItem.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MenuMobile;
