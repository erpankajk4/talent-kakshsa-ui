"use client";

import React, { useState, useEffect } from "react";
import Wrapper, { Wrapper1 } from "@/components/Wrappers";
import Link from "next/link";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";
import { VscChromeClose } from "react-icons/vsc";
import { IoLogOutOutline, IoMenu } from "react-icons/io5";
import { MdOutlinePerson } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/Redux";
import { clearAuthState } from "@/Redux/authSlice";
import { useRouter, usePathname } from "next/navigation";
import { LoginSignUpModule } from "../loginSignUpModule/LoginSignUpModule";
import { Button } from "../Button";
import { store } from "@/Redux";
import useUserData from "@/customHook/useProfile";
import NewsTypeHeadSearchBar from "../TypeHeadSearchBar/NewsTypeHeadSearchBar";
import { FaRegBell } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";

const Header = ({ header }: any) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [show, setShow] = useState<string>("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [navItems, setNavItems] = useState<any[]>([]);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  const pathname = usePathname();
  const router = useRouter();
  const getBasePath = (url: string) => {
    const urlSegments = url.split("/");
    return `/${urlSegments[1]}`;
  };

  useEffect(() => {
    if (header?.navItems) {
      setNavItems(header.navItems);
    }
  }, [header?.navItems]);

  useEffect(() => {
    const activeItem =
      navItems.find((item) => item.href === getBasePath(pathname)) ||
      navItems.find((item) =>
        item.subNav?.some(
          (subItem: { href: string }) => subItem.href === getBasePath(pathname),
        ),
      );
    if (activeItem) {
      setActiveItemId(activeItem.id.toString());
    } else {
      setActiveItemId(null);
    }
  }, [pathname, navItems]);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > 200) {
        if (window.scrollY > lastScrollY && !isMobileMenuOpen) {
          setShow("-translate-y-[100px]");
        } else {
          setShow("shadow-sm");
        }
      } else {
        setShow("translate-y-0");
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY, isMobileMenuOpen]);

  const handleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavItemClick = (itemId: string, href: string) => {
    setActiveItemId(itemId);
    setIsMobileMenuOpen(false);
    router.push(href);
  };

  return (
    <header
      className={`fixed top-0 z-50 flex h-20 w-full items-center justify-between bg-white transition-transform duration-300 md:h-20 ${show}`}
    >
      <Wrapper1 className="hidden h-20 items-center justify-between gap-4 rounded-lg md:flex">
        {/* Logo with Link */}
        <Link href="/">
          <Image
            src={header?.logo}
            alt="logo"
            height={100}
            width={100}
            className="h-16 max-h-16 w-min object-contain md:h-20"
          />
        </Link>
        {/* Menu */}
        <Menu
          navItemsArray={navItems}
          activeItemId={activeItemId}
          onItemClick={handleNavItemClick}
        />
        {/* Search Bar */}
        <div className="relative mx-auto flex h-min w-full max-w-sm items-center gap-2 rounded-full border border-blue-900 bg-white px-2 py-2 focus-within:border-orange-500">
          <NewsTypeHeadSearchBar />
        </div>
        {/* Icons  */}
        <div className="flex justify-center gap-4 text-xl text-blue-900">
          <FaRegBell className="cursor-pointer hover:text-orange-500" />
          <TiShoppingCart className="cursor-pointer hover:text-orange-500" />
        </div>
        <div className="flex gap-4">
          <LoginSignUpQASection buttonType="LOG-IN" />
          <LoginSignUpQASection buttonType="SIGN-UP" />
        </div>
      </Wrapper1>
      {/* Mobile Section */}
      <Wrapper1 className="flex h-20 w-full items-center justify-between gap-3 bg-white md:hidden">
        {/* Logo with Link */}
        <Link href="/">
          <Image
            src={header?.logo}
            alt="logo"
            height={100}
            width={100}
            className="h-16 max-h-12 w-min object-contain"
          />
        </Link>
        <div className="flex gap-4">
          <LoginSignUpQASection buttonType="LOG-IN" />
          <div className="flex-center relative cursor-pointer rounded-full text-3xl text-blue-950 hover:bg-blue-500/5">
            {isMobileMenuOpen ? (
              <VscChromeClose onClick={handleMobileMenu} />
            ) : (
              <IoMenu onClick={handleMobileMenu} />
            )}
          </div>
        </div>
      </Wrapper1>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 top-20 w-full md:hidden">
          <MenuMobile
            navItemsArray={navItems}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            activeItemId={activeItemId}
          />
        </div>
      )}
    </header>
  );
};

export default Header;

const LoginSignUpQASection = ({ buttonType = "LOG-IN" }: any) => {
  const [isClient, setIsClient] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [isLoginModule, setIsLoginModule] = useState(true);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isUserLoggedIn = useAppSelector((state) => !!state.auth.token); // Use selector to get auth state
  const loginUserName = useAppSelector((state) => state.auth.userName);
  const { data: userProfileData, loading, error, refetch } = useUserData();
  // ================================================================ //
  useEffect(() => {
    if (!loading && !userProfileData) {
      refetch();
    }
  }, [userProfileData, refetch, loading]);
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // This will run when isUserLoggedIn changes
  }, [isUserLoggedIn]);

  const openLoginPopup = () => {
    setShowPopUp(true);
    document.body.style.overflow = "hidden";
    setIsLoginModule(true);
  };
  const openSignUpPopup = () => {
    setShowPopUp(true);
    document.body.style.overflow = "hidden";
    setIsLoginModule(false);
  };

  const closePopup = () => {
    setShowPopUp(false);
    document.body.style.overflow = "";
  };

  const handleLogout = () => {
    dispatch(clearAuthState());
    router.push("/");
  };

  if (!isClient) {
    return null;
  }

  if (buttonType === "LOG-IN") {
    return (
      <>
        <div className="flex items-center gap-4">
          {isUserLoggedIn ? (
            <div className="group relative">
              <div className="flex-center h-9 w-9 overflow-hidden rounded-full border-2 border-white bg-orange-500 p-0.5 text-blue-900 shadow-lg">
                {userProfileData?.attributes?.avatar?.data?.attributes?.url ? (
                  <Image
                    src={
                      userProfileData?.attributes?.avatar?.data?.attributes?.url
                    }
                    alt="avatar"
                    width={100}
                    height={100}
                    className="hover:text-primary group h-full w-full cursor-pointer rounded-full object-cover"
                  />
                ) : (
                  <p className="font-bold capitalize">
                    {loginUserName.slice(0, 1)}
                  </p>
                )}
              </div>
              <div className="absolute right-0 top-9 z-10 hidden w-max rounded-md border border-gray-200 bg-white py-1 text-zinc-600 group-hover:block">
                <p className="text-center text-xs text-orange-500">
                  Hello, {userProfileData?.attributes?.username?.split(" ")[0]}
                </p>
                <Link
                  href={"/profile"}
                  className="item-center flex cursor-pointer gap-x-2 px-3 py-1 hover:bg-orange-500 hover:text-white"
                >
                  <MdOutlinePerson className="mt-0.5" /> Profile
                </Link>
                <div
                  className="item-center flex cursor-pointer gap-x-2 px-3 py-1 hover:bg-orange-500 hover:text-white"
                  onClick={handleLogout}
                >
                  <IoLogOutOutline className="mt-0.5" /> Logout
                </div>
              </div>
            </div>
          ) : (
            <Button
              onClick={openLoginPopup}
              variant="white"
              className="text-nowrap !px-2"
            >
              Log In
            </Button>
          )}
        </div>
        {/* Pop-up Module */}
        {showPopUp && (
          <LoginSignUpModule
            closePopup={closePopup}
            isLoginModule={isLoginModule}
            setIsLoginModule={setIsLoginModule}
          />
        )}
      </>
    );
  }
  if (buttonType === "SIGN-UP" && !isUserLoggedIn) {
    return (
      <>
        <div className="flex items-center gap-4">
          <Button
            onClick={openSignUpPopup}
            variant="blue"
            className="text-nowrap !px-2"
          >
            Sign up
          </Button>
        </div>
        {/* Pop-up Module */}
        {showPopUp && (
          <LoginSignUpModule
            closePopup={closePopup}
            isLoginModule={isLoginModule}
            setIsLoginModule={setIsLoginModule}
          />
        )}
      </>
    );
  }

  return null;
};
