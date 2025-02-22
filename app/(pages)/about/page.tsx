import { Metadata } from "next";

import { title } from "@/components/primitives";

export const metadata: Metadata = {
  title: "About",
};

export default function Page() {
  return (
    <div>
      <h1 className={title()}>About</h1>
    </div>
  );
}
