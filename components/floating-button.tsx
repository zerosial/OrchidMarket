import Link from "next/link";
import React from "react";

interface FloatingButton {
  children: React.ReactNode;
  href: string;
}

export default function FloatingButton({ children, href }: FloatingButton) {
  return (
    <Link href={href}>
      <a className="fixed right-6 bottom-28 md:sticky md:ml-[480px] md:translate-x-4 hover:bg-ani-500 border-0 aspect-square border-transparent transition-colors cursor-pointer shadow-xl bg-ani-300 rounded-full w-14 flex items-center justify-center text-white">
        {children}
      </a>
    </Link>
  );
}
