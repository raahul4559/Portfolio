import type { Metadata } from "next";

import { ContactModule } from "@/components/modules/Contact";
import { moduleById, profile } from "@/content";

export const metadata: Metadata = {
  title: "contact",
  description: `${moduleById.get("contact")?.description} — ${profile.availability.label}.`,
};

export default function Page() {
  return <ContactModule />;
}
