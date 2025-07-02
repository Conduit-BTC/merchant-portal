import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/Buttons/Button";
import NavLinks from "@/components/NavLinks";
import { useNavStore } from "@/stores/useNavStore";

export const NavDrawer = () => {
  const { isNavOpen, toggleNav } = useNavStore();

  return (
    <div
      className={cn(
        "fixed top-13 h-[95vh] left-0 w-80 z-50 transition-all duration-600 ease-bounce",
        isNavOpen
          ? "translate-x-0 opacity-90"
          : "translate-x-[calc(-100%+60px)] opacity-50"
      )}
    >
      <div className="inner-column cart-drawer px-5 relative h-full">
        {/* close */}
        <div className="absolute top-[-40px] right-5 z-[-1] pb-2 bg-accent rounded-t-full from-primary-800 to-accent/80 bg-gradient-to-t">
          <Button variant="ghost" size="icon" onClick={toggleNav}>
            <X />
          </Button>
        </div>
        <div className="py-4">
          <NavLinks />
        </div>
      </div>
    </div>
  );
};
