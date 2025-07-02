//

import { ColorGuide } from "@/components/StyleGuide/ColorGuide";
import { TypographyGuide } from "@/components/StyleGuide/TypographyGuide";
import PageSection from "@/layouts/PageSection";

export default function StyleGuidePage() {
  return (
    <div className="grid gap-8">
      <PageSection width="wide">
        <div className="mb-8">
          <h1 className="voice-6l mb-6">Style Guide</h1>
          <p className="text-muted-foreground">
            A comprehensive guide to the design system and components.
          </p>
        </div>
      </PageSection>

      <PageSection width="wide">
        <ColorGuide />
        <TypographyGuide />
      </PageSection>
    </div>
  );
}
