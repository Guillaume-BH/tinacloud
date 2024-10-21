"use client";
import React from "react";
import { cn } from "../../lib/utils";
import { Container } from "../layout/container";
import Link from "next/link";
import { Icon } from "../icon";
import { FaTwitter, FaYoutube } from "react-icons/fa";
import { useLayout } from "../layout/layout-context";

export default function Footer() {
  const { theme, globalSettings } = useLayout();
  const footer = globalSettings?.footer;

  const socialIconClasses = "h-7 w-auto";
  return (
    <footer className={cn(`bg-gradient-to-br`, "")}>
      <Container className="relative" size="small">
        <div className="flex justify-between items-center gap-6 flex-wrap">
          <Link
            href="/"
            className="group mx-2 flex items-center font-bold tracking-tight text-gray-400 dark:text-gray-300 opacity-50 hover:opacity-100 transition duration-150 ease-out whitespace-nowrap"
          >
            <Icon
              parentColor={footer.color}
              data={{}}
              className="inline-block h-10 w-auto group-hover:text-orange-500"
            />
          </Link>
          <div className="flex gap-4">
            {footer.social && footer.social.twitter && (
              <a
                className="inline-block opacity-80 hover:opacity-100 transition ease-out duration-150"
                href={footer.social.twitter}
                target="_blank"
              >
                <FaTwitter
                  className={`${socialIconClasses} text-pink-500 dark:text-pink-400 hover:text-pink-300`}
                />
              </a>
            )}
            {footer.social && footer.social.youtube && (
              <a
                className="inline-block opacity-80 hover:opacity-100 transition ease-out duration-150"
                href={footer.social.instagram}
                target="_blank"
              >
                <FaYoutube
                  className={`${socialIconClasses} text-pink-500 dark:text-pink-400 hover:text-pink-300`}
                />
              </a>
            )}
          </div>
        </div>
        <div
          className={cn(
            `absolute h-1 bg-gradient-to-r from-transparent`,
            theme.darkMode === "primary"
              ? `via-white`
              : `via-black dark:via-white`,
            "to-transparent bottom-0 left-4 right-4 -z-1 opacity-5"
          )}
        />
      </Container>
    </footer>
  );
}
