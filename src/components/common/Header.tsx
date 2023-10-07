'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from "@nextui-org/react";
import { FaSuitcaseRolling } from "react-icons/fa";
import { MdTravelExplore } from "react-icons/md";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { TbSunMoon } from "react-icons/tb";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Header() {
  const { status, data } = useSession();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const storedDarkMode = localStorage.getItem("darkMode");
      return storedDarkMode === "true";
    }
    return false;
  });

  const router = useRouter();

  const handleLoginClick = () => signIn("google");
  const handleLogoutClick = () => signOut();

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", newDarkMode.toString());
      const htmlElement = document.querySelector("html");
      if (htmlElement) {
        if (newDarkMode) {
          htmlElement.classList.add("dark");
        } else {
          htmlElement.classList.remove("dark");
        }
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const htmlElement = document.querySelector("html");
      if (htmlElement) {
        if (isDarkMode) {
          htmlElement.classList.add("dark");
        } else {
          htmlElement.classList.remove("dark");
        }
      }
    }
  }, [isDarkMode]);

  return (
    <Navbar className="h-16 bg-neutral-100 dark:bg-[#18181b] dark:text-black shadow-lg dark:border-b-1 dark:border-primaryHotefy-lighter">
      <NavbarBrand>
        <Link href="/">
          {!isDarkMode && (
            <Image
              src="/logo.png"
              alt="Hotefy"
              width={120}
              height={40}
              priority
              style={{ width: "auto", height: "auto" }}
            />
          )}
          {isDarkMode && (
            <Image
              src="/logoDarkMode.png"
              alt="Hotefy"
              width={120}
              height={40}
              priority
              style={{ width: "auto", height: "auto" }}
            />
          )}
        </Link>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        {status === "loading" && (
          <Button
            variant="shadow"
            color="secondary"
            isLoading
            isIconOnly
          ></Button>
        )}
        {status === "unauthenticated" && (
          <Dropdown placement="right-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name=""
                size="sm"
                src=""
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Login Actions"
              variant="shadow"
              color="secondary"
            >
              <DropdownItem
                startContent={<LuLogIn />}
                key="login"
                onClick={handleLoginClick}
              >
                Login
              </DropdownItem>
              <DropdownItem
                startContent={<TbSunMoon />}
                onClick={toggleDarkMode}
              >
                Alterar tema
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
        {status === "authenticated" && data.user && (
          <Dropdown placement="right-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={data?.user?.name!}
                size="sm"
                src={data?.user?.image!}
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Profile Actions"
              variant="shadow"
              color="secondary"
              disabledKeys={["user-info"]}
            >
              <DropdownItem className="h-14 gap-2" key="user-info">
                <p className="font-semibold">{data?.user?.name}</p>
                <p className="text-xs">{data?.user?.email}</p>
              </DropdownItem>
              <DropdownItem
                startContent={<MdTravelExplore />}
                onClick={() => router.push("/")}
              >
                Catálogo
              </DropdownItem>
              <DropdownItem
                startContent={<FaSuitcaseRolling />}
                onClick={() => router.push("/my-trips")}
              >
                Minhas viagens
              </DropdownItem>

              <DropdownItem
                startContent={<TbSunMoon />}
                onClick={toggleDarkMode}
              >
                Alterar tema
              </DropdownItem>
              <DropdownItem
                startContent={<LuLogOut />}
                key="logout"
                color="secondary"
                onClick={handleLogoutClick}
              >
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>
    </Navbar>
  );
}
