import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Link } from "@heroui/link";
import { Chip } from "@heroui/chip";
import { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { title } from "@/components/primitives";

export const metadata: Metadata = {
  title: "Projects",
};
export default function Page() {
  return (
    <div>
      <h1 className={title()}>Projects</h1>
      {/* // TODO */}
      <div className="mt-8 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {siteConfig.projects.map(
          ({ title, description, sourceCode, technologies }, index) => (
            <Card key={index} className="max-w-full bg-content1 p-4">
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <h3 className="text-2xl font-bold">{title}</h3>
                </div>
              </CardHeader>

              <CardBody>
                <p>{description}</p>
                <div className="flex flex-wrap gap-y-1 mt-4">
                  {technologies.map((tech, index) => (
                    <Chip
                      key={index}
                      className="mr-2"
                      color="default"
                      size="sm"
                    >
                      {tech}
                    </Chip>
                  ))}
                </div>
              </CardBody>
              <CardFooter>
                <Link isExternal showAnchorIcon href={sourceCode}>
                  Visit source code on GitHub.
                </Link>
              </CardFooter>
            </Card>
          ),
        )}
      </div>
    </div>
  );
}
