"use client";

import { useState } from "react";
import { Camera } from "lucide-react";

/**
 * Looks for /public/photo.jpg. Until you add one, this renders a clean
 * placeholder so the layout still looks intentional rather than broken.
 */
export default function PhotoFrame() {
  const [loaded, setLoaded] = useState(true);

  return (
    <div className="relative w-full max-w-sm">
      {loaded ? (
        <div
          className="relative w-full overflow-hidden rounded-2xl p-1"
          style={{
            background:
              "linear-gradient(135deg, #8B5CF6 0%, #EC4899 40%, #06B6D4 100%)",
          }}
        >
          {/* inner gradient card */}
          <div
            className="relative w-full overflow-hidden rounded-xl"
            style={{
              background:
                "linear-gradient(160deg, rgba(139,92,246,0.25) 0%, rgba(236,72,153,0.18) 50%, rgba(6,182,212,0.22) 100%)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/pfp(1).jpeg"
              alt="A candid photo"
              onError={() => setLoaded(false)}
              className="w-full h-auto object-contain transition-all duration-500 hover:scale-[1.02]"
            />
          </div>
        </div>
      ) : (
        <div className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-3 border border-line bg-paper-dim/40 px-6 text-center dark:border-line-dark dark:bg-charcoal-dim/40">
          <Camera size={20} className="text-ink-soft/50 dark:text-mist-soft/50" />
          <p className="text-xs leading-relaxed text-ink-soft/70 dark:text-mist-soft/70">
            Add a candid photo — drop <code className="font-mono">pfp(1).jpeg</code> into{" "}
            <code className="font-mono">/public</code>
          </p>
        </div>
      )}
    </div>
  );
}
