import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import { FaSchool } from "react-icons/fa6";

import NavbarDropdown from "./NavbarDropdown";

import { ThemeSwitch } from "@/components/theme-switch";
import { auth } from "@/auth";

export const Navbar = async () => {
  const data = await auth();

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <FaSchool size={25} />
            <p className="font-bold text-inherit">ESJM</p>
          </NextLink>
        </NavbarBrand>
        <ThemeSwitch />
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        {data ? (
          <NavbarDropdown name={data.user?.name as string} />
        ) : (
          <div className="flex gap-1">
            <Link href="/login">Login</Link>|
            <Link href="/register">Register</Link>
          </div>
        )}
      </NavbarContent>
    </HeroUINavbar>
  );
};
