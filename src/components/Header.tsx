import React, { useEffect, useRef, useState } from "react";
import { useAccountStore } from "@/stores/useAccountStore";
import { useStoreProfileStore } from "@/stores/useStoreProfileStore";
import "@/styles/typography.css";
import StorePill from "./StorePill";
import PageSection from "@/layouts/PageSection";
import Breadcrumbs from "./Breadcrumbs";
import Button from "./Buttons/Button";
import Icon from "./Icon";
import Field from "./Form/Field";
import Logo from "./Logo";
import { useBreadcrumbItems } from "@/hooks/useBreadcrumbItems";
import NavLinks from "./NavLinks";

const Header: React.FC = () => {
  const { user, isLoggedIn } = useAccountStore();
  const { profile, fetchProfile } = useStoreProfileStore();
  const [displayName, setDisplayName] = useState<string>("");

  const profileDisplayName = profile?.display_name || profile?.name || null;
  const profilePicture = profile?.picture || null;

  const formatNpub = (npub: string): string =>
    `${npub.substring(0, 8)}...${npub.substring(npub.length - 8)}`;

  // Innitial load
  useEffect(() => {
    (async () => {
      if (isLoggedIn && user?.pubkey) {
        await fetchProfile(user.pubkey);
      }
    })();
  }, [isLoggedIn, user?.pubkey, fetchProfile]);

  useEffect(() => {
    if (profileDisplayName) {
      setDisplayName(profileDisplayName);
    } else if (user?.npub) {
      setDisplayName(formatNpub(user.npub));
    }
  }, [profileDisplayName, user?.npub]);

  const items = useBreadcrumbItems({
    labelMap: {
      store: "Store",
      products: "My Products",
      create: "Create Product",
    },
  });

  return (
    <header className="relative">
      <PageSection width="wide">
        <div className="flex justify-between items-center gap-4">
          <div>
            <Logo className="max-w-50" />
            <Breadcrumbs items={items} />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center flex-1 justify-end gap-4">
            <NavLinks />

            {/* login button, else user button */}
            <StorePill
              storeName={displayName ? displayName : "N"}
              imageUrl={profilePicture}
            />
          </div>

          {/* Mobile Menu */}
          {/* <MobileMenu /> */}
        </div>
        {/* <Breadcrumbs /> */}
      </PageSection>
    </header>
  );
};

export default Header;
