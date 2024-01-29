"use client";

import { Logo } from "./Logo";
import Link from "next/link";
import { HeaderLinksContainer } from "./HeaderLinksContainer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getSupabaseFileUrlFromRelativePath } from "@/services/supabase/storage";

type Props = {
  profilePictureUrl: string | null | undefined
}

export function Header({profilePictureUrl}: Props) {
  return (
    <header className="bg-mainGreen relative w-full justify-around px-4 py-2.5 flex items-center">
      <Logo />
      <HeaderLinksContainer />

      <Link href="/profile">
        <Avatar>
          <AvatarImage src={getSupabaseFileUrlFromRelativePath(profilePictureUrl ?? "", "avatars")} />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
      </Link>
    </header>
  );
}
