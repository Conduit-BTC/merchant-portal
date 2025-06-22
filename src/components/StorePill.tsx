import React from "react";
import { cn } from "@/lib/utils";
import Pill from "./Pill";
import Avatar from "./Avatar";
import Sidebar from "./NavLinks";
import { ChevronRight } from "lucide-react";
import { useAccountStore } from "@/stores/useAccountStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./Form/Dropdown";

interface StorePillProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  imageUrl?: string | null;
  storeName: string;
}

const StorePill: React.FC<StorePillProps> = ({
  imageUrl,
  storeName,
  className,
  ...props
}) => {
  const { logout } = useAccountStore();

  const handleLogout = () => {
    logout();
    console.log("Logging out...");
    // Add your actual logout logic here
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Pill className="w-full">
          <Avatar
            imageUrl={imageUrl}
            alt={storeName}
            size="xl"
            fallback={storeName}
          />
          <div className="flex flex-col leading-none">
            <span className="text-xs text-muted-foreground">Logged as</span>
            <span className="font-semibold whitespace-nowrap">{storeName}</span>
          </div>
          <ChevronRight className="size-5 ml-auto text-muted-foreground shrink-0" />
        </Pill>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Sidebar />
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="text-destructive-foreground cursor-pointer"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StorePill;
