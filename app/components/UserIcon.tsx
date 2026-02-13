"use client";

import { useRouter } from "next/navigation";
import IconButton from "./IconButton";

export default function UserIcon() {
  const router = useRouter();

  return (
    <div className="absolute top-[40px] right-0 left-0 z-30 max-w-7xl mx-auto px-4 flex justify-end">
      <div className="flex items-center gap-2 bg-[#007874] rounded-full p-2">
        <IconButton
          icon="solar:user-broken"
          className="text-white"
          onClick={() => router.push("/minha-conta")}
          aria-label="Minha conta"
          width={26}
          height={26}
        />
      </div>
    </div>
  );
}
