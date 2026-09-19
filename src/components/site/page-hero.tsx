import Image from "next/image";
import { Entrance } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

// Photo header shared by the inner pages. `overlap` leaves extra room at the
// bottom for content (e.g. contact tiles) that is pulled up over the image.
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  overlap = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  overlap?: boolean;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-black pt-24 text-white sm:pt-32",
        overlap ? "pb-32 sm:pb-40" : "pb-20 sm:pb-28",
      )}
    >
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Entrance>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[hsl(38_92%_55%)]">
            {eyebrow}
          </p>
        </Entrance>
        <Entrance delay={0.1}>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.1] sm:text-6xl">
            {title}
          </h1>
        </Entrance>
        <Entrance delay={0.2}>
          <p className="mt-5 max-w-xl text-white/75 sm:text-lg">{description}</p>
        </Entrance>
      </div>
    </section>
  );
}
