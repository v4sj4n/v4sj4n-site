import { Metadata } from "next";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";

import { siteConfig } from "@/config/site";
import { subtitle, title } from "@/components/primitives";

export const metadata: Metadata = {
  title: "Contact",
};

export default function Page() {
  return (
    <div className="flex flex-col items-center  gap-8">
      <div className="space-y-2">
        <h1 className={title()}>Contact Me</h1>
        <p className={subtitle()}>Are you a business looking to collaborate?</p>
      </div>
      {/* May switch to a form */}
      <Link isExternal href={`mailto:${siteConfig.email}`}>
        <Button className="px-6" color="default" size="lg">
          Get in touch
        </Button>
      </Link>
    </div>
  );
}
