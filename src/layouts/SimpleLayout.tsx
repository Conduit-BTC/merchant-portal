import Logo from "@/components/Logo";
import Button from "@/components/Buttons/Button";
import React, { type PropsWithChildren } from "react";
import PageSection from "@/layouts/PageSection";

const legalLinks = [
  {
    name: "Privacy Policy",
    link: "/privacy",
  },
  {
    name: "Terms of Service",
    link: "/terms",
  },
  {
    name: "Cookies Settings",
    link: "/cookies",
  },
];

const SimpleLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header className="relative">
        <PageSection width="wide">
          <div className="flex justify-between items-center gap-4">
            <div>
              <Logo className="max-w-50" />
            </div>
          </div>
        </PageSection>
      </header>

      <main>{children}</main>

      <footer>
        <PageSection width="narrow">
          <div className="border-t border-muted py-8 flex flex-col md:flex-row justify-between items-center">
            <div className="legal flex items-center flex-wrap gap-4">
              <span className="voice-sm text-muted-foreground">
                © 2025 Conduit. All rights reserved.
              </span>
              {legalLinks.map((link) => (
                <React.Fragment key={link.name}>
                  <span className="text-base-400">|</span>
                  <Button
                    variant="link"
                    size="sm"
                    isLink
                    to={link.link}
                    rounded={false}
                  >
                    {link.name}
                  </Button>
                </React.Fragment>
              ))}
            </div>
          </div>
        </PageSection>
      </footer>
    </>
  );
};

export default SimpleLayout;
