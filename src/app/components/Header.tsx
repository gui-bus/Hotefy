"use client";
import React, { useState } from "react";
import Image from "next/image";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from "@nextui-org/react";
import { FaSuitcaseRolling, FaCog, FaUser } from "react-icons/fa";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { TbSunMoon } from "react-icons/tb";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { status, data } = useSession();
  const handleLoginClick = () => signIn("google");
  const handleLogoutClick = () => signOut();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);

    // Adicione ou remova a classe 'dark' ao elemento HTML
    const htmlElement = document.querySelector("html");
    if (isDarkMode) {
      htmlElement?.classList.remove("dark");
    } else {
      htmlElement?.classList.add("dark");
    }
  };

  return (
    <Navbar className="h-16 mb-5 bg-neutral-100 dark:bg-[#18181b] dark:text-black drop-shadow-md">
      <NavbarBrand>
        <Link href="/">
          <Image src="/logo.png" alt="Hotefy" width={150} height={40} />
        </Link>
      </NavbarBrand>

      <NavbarContent
        className="hidden sm:flex gap-4 dark:text-black"
        justify="center"
      >
        <NavbarItem>
          <Link color="foreground" href="#">
            Hotel
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Fazenda
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Chalé
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Pousada
          </Link>
        </NavbarItem>
      </NavbarContent>

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
              <DropdownItem startContent={<FaUser />}>Perfil</DropdownItem>
              <DropdownItem startContent={<FaSuitcaseRolling />}>
                Minhas viagens
              </DropdownItem>

              <DropdownItem startContent={<FaCog />}>
                Configurações
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
