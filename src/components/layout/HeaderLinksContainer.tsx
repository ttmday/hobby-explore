"use client";
import { HeaderLink } from "./HeaderLink";
import { FaBookmark } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa";
import { MdExplore } from "react-icons/md";
import { MdOutlineExplore } from "react-icons/md";
import { Home } from "lucide-react";
import { BookMarked } from "lucide-react";

export function HeaderLinksContainer() {
  return (
    <ul className="flex gap-4">
      <li>
        <HeaderLink
          LinkIcon={Home}
          href="/app/explore"
          stringToInclude="/explore"
          shouldUseInclude
        >
          Explore
        </HeaderLink>
      </li>
      <li>
        <HeaderLink
          LinkIcon={BookMarked}
          shouldUseInclude
          stringToInclude="/saved"
          href="/app/saved/my-activities"
        >
          Saved
        </HeaderLink>
      </li>
    </ul>
  );
}
