"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const manifestoCopy = [
  "PARTISANS is an award-winning Toronto-based architecture studio that thrives at the intersection of technology, craft, and storytelling. We invent unexpected ways to choreograph light, volume, and emotion so that every project feels both cinematic and human.",
  "Our practice is collaborative and experimental. We work shoulder to shoulder with multidisciplinary teams—artists, researchers, fabricators, coders—to transform sketches into experiences. From cultural institutions to private retreats, we chase the audacious ideas that refuse to sit still.",
  "Beauty, to us, is a consequence of risk. When a design misbehaves it questions assumptions, exposes the hidden potential of a site, and invites people to participate. We embrace that tension because that is where the work becomes alive."
];

const windowBlueprint = [
  {
    id: "studio-photo",
    title: "ABOUT",
    width: 520,
    height: 520,
    position: { top: 60, left: 80 },
    render: () => (
      <div className="relative h-full w-full">
        <Image
          src="https://images.unsplash.com/photo-1503386435953-66943ba0e08f?auto=format&fit=crop&w=1400&q=80"
          alt="Studio portrait"
          fill
          className="object-cover"
          priority
        />
      </div>
    )
  },
  {
    id: "manifesto",
    title: "ABOUT",
    width: 560,
    height: 600,
    position: { top: 140, left: 540 },
    render: () => (
      <div className="flex h-full flex-col bg-black/90">
        <div className="px-6 pb-6 pt-6">
          <p className="text-[0.75rem] uppercase tracking-[0.35em] text-white/60">
            Beauty Emerges When Design Misbehaves
          </p>
          <p className="mt-4 text-4xl font-black leading-tight text-white md:text-5xl">
            BEAUTY EMERGES WHEN DESIGN MISBEHAVES
          </p>
        </div>
        <div className="flex-1 overflow-y-auto px-6 pb-8 text-lg leading-8 text-zinc-200">
          {manifestoCopy.map((paragraph) => (
            <p key={paragraph} className="mb-6 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    )
  }
];

export default function AboutPage() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1920&q=80"
          alt="Studio background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative flex min-h-screen flex-col">

        <main
          ref={canvasRef}
          className="relative flex-1 px-4 pb-24 pt-6 md:px-12 md:pt-0"
        >
          <div className="absolute inset-0" />
          <div className="relative mx-auto flex h-full w-full max-w-6xl flex-col md:block">
            {windowBlueprint.map((win) => (
              <motion.div
                key={win.id}
                drag={!isMobile}
                dragConstraints={canvasRef}
                dragElastic={0.04}
                dragMomentum={false}
                initial={{
                  opacity: 0,
                  scale: 0.94,
                  y: -40
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0
                }}
                className={`mb-6 rounded border border-white/20 bg-black/85 text-white shadow-2xl backdrop-blur-sm ${
                  isMobile ? "relative w-full" : "md:absolute"
                }`}
                style={{
                  width: isMobile ? "100%" : win.width,
                  height: isMobile ? "auto" : win.height,
                  ...(isMobile ? {} : { top: win.position.top, left: win.position.left })
                }}
              >
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-[0.65rem] uppercase tracking-[0.35em]">
                  <span>{win.title}</span>
                  <div className="flex items-center gap-1">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded border border-white/20 text-base leading-none">
                      ×
                    </span>
                  </div>
                </div>
                {win.render()}
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

