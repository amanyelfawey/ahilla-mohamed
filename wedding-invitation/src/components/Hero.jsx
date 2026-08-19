import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { CONFIG } from "../config.js";
import { EASE_LUXE, SPRING_SOFT } from "../lib/motion.js";

import photo1 from "../assets/1.jpeg";
import photo2 from "../assets/2.jpeg";
import photo3 from "../assets/3.jpeg";
import photo4 from "../assets/4.jpeg";

const HEADLINE = "THE BIG DAY";

const SENTENCE =
  "The day we've been dreaming of is almost here — and it would not be complete without you.";

const GALLERY = [
  { src: photo1, lift: 14, depth: -46, tilt: -2.5, delay: 0.55 },
  { src: photo4, lift: -22, depth: -84, tilt: 1.5, delay: 0.7 },
  { src: photo2, lift: 8, depth: -62, tilt: -1.5, delay: 0.85 },
  { src: photo3, lift: -16, depth: -100, tilt: 2.5, delay: 1 },
];

const DUST = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: `${(i * 4.6 + 3) % 97}%`,
  size: 1.5 + (i % 3),
  delay: (i % 7) * 0.9,
  duration: 12 + (i % 5) * 2.4,
  drift: (i % 2 === 0 ? 1 : -1) * (10 + (i % 4) * 7),
}));

function KineticHeadline({ text, opened, reduced, baseDelay = 0 }) {
  return (
    <span className="inline-flex flex-wrap justify-center">
      {Array.from(text).map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block"
          style={{ transformOrigin: "50% 100%" }}
          initial={
            reduced ? { opacity: 0 } : { opacity: 0, y: "0.45em", rotateX: -75 }
          }
          animate={
            opened
              ? { opacity: 1, y: 0, rotateX: 0 }
              : reduced
                ? { opacity: 0 }
                : { opacity: 0, y: "0.45em", rotateX: -75 }
          }
          transition={{
            duration: 0.95,
            ease: EASE_LUXE,
            delay: baseDelay + i * 0.05,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero({ opened }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  // Config stores "El Maadi"; the cover reads better as "Al-Maadi".
  const heroLocation = `${CONFIG.venue.name} · ${CONFIG.venue.area.replace(/^El\s+/i, "Al-")}`;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const contentY = useTransform(smoothScroll, [0, 1], [0, reduced ? 0 : -120]);
  const contentOpacity = useTransform(smoothScroll, [0, 0.6], [1, 0]);
  const cueOpacity = useTransform(smoothScroll, [0, 0.06], [1, 0]);

  const archY0 = useTransform(
    smoothScroll,
    [0, 1],
    [GALLERY[0].lift, GALLERY[0].lift + GALLERY[0].depth],
  );
  const archY1 = useTransform(
    smoothScroll,
    [0, 1],
    [GALLERY[1].lift, GALLERY[1].lift + GALLERY[1].depth],
  );
  const archY2 = useTransform(
    smoothScroll,
    [0, 1],
    [GALLERY[2].lift, GALLERY[2].lift + GALLERY[2].depth],
  );
  const archY3 = useTransform(
    smoothScroll,
    [0, 1],
    [GALLERY[3].lift, GALLERY[3].lift + GALLERY[3].depth],
  );
  const archY = [archY0, archY1, archY2, archY3];

  const entry = (delay) => ({
    initial: reduced
      ? { opacity: 0 }
      : { opacity: 0, y: 22, filter: "blur(5px)" },
    animate: opened
      ? { opacity: 1, y: 0, filter: "blur(0px)" }
      : reduced
        ? { opacity: 0 }
        : { opacity: 0, y: 22, filter: "blur(5px)" },
    transition: { duration: 1.15, ease: EASE_LUXE, delay },
  });

  return (
    <section
      ref={ref}
      className="cover relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[radial-gradient(120%_100%_at_50%_0%,#FBF6EF_0%,#F1E8DC_45%,#E4D8C8_100%)] text-ink"
      id="top"
    >
      {/* Ambient light */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        <div className="absolute inset-x-0 top-0 h-[45%] bg-[radial-gradient(60%_100%_at_50%_0%,rgba(255,255,255,0.75),transparent_70%)]" />
        <div className="absolute inset-0 shadow-[inset_0_0_180px_60px_rgba(120,90,95,0.13)]" />
        {!reduced && (
          <>
            <motion.div
              className="absolute -left-[10%] top-[12%] size-[460px] rounded-full bg-gold-soft/25 blur-[130px]"
              animate={{ x: [0, 60, 0], y: [0, -34, 0], scale: [1, 1.12, 1] }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -right-[8%] bottom-[8%] size-[420px] rounded-full bg-blush/25 blur-[120px]"
              animate={{ x: [0, -48, 0], y: [0, 40, 0], scale: [1, 1.16, 1] }}
              transition={{
                duration: 19,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2.5,
              }}
            />
          </>
        )}
      </div>

      {/* Gold dust */}
      {!reduced && (
        <div
          className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
          aria-hidden="true"
        >
          {DUST.map((mote) => (
            <motion.span
              key={mote.id}
              className="absolute bottom-[-6%] rounded-full bg-gold-soft/55"
              style={{ width: mote.size, height: mote.size, left: mote.left }}
              animate={{
                y: [0, -760],
                x: [0, mote.drift, 0],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: mote.duration,
                repeat: Infinity,
                ease: "linear",
                delay: mote.delay,
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        className="relative z-10 flex w-full max-w-[1000px] flex-col items-center gap-9 px-6 py-16 text-center sm:gap-11"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Date & venue */}
        <motion.div
          className="flex flex-col items-center gap-3"
          {...entry(0.2)}
        >
          <p className="font-script text-[1.35rem] leading-none text-gold-deep/90">
            {" "}
            With hearts full of love and happiness{" "}
          </p>{" "}
          <p className="font-script text-[1.6rem] leading-none text-gold-deep">
            {" "}
            Ahilla & Mohamed{" "}
          </p>{" "}
          <p className="font-script text-[1.35rem] leading-none text-gold-deep/90">
            {" "}
            invite you to be part of their forever{" "}
          </p>
          {/* <p className="mt-2 text-[0.72rem] font-medium tracking-[0.38em] uppercase text-ink/60">
            {CONFIG.displayDate} · {heroLocation}
          </p> */}
        </motion.div>

        {/* Arch gallery */}
        <div className="grid w-full max-w-[880px] grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
          {GALLERY.map((item, i) => (
            <motion.figure
              key={i}
              className="relative m-0"
              style={{ y: archY[i] }}
              initial={
                reduced
                  ? { opacity: 0 }
                  : { opacity: 0, y: 64, scale: 0.9, rotate: item.tilt * 2 }
              }
              animate={
                opened
                  ? { opacity: 1, y: 0, scale: 1, rotate: item.tilt }
                  : reduced
                    ? { opacity: 0 }
                    : { opacity: 0, y: 64, scale: 0.9, rotate: item.tilt * 2 }
              }
              transition={{ ...SPRING_SOFT, delay: item.delay }}
              whileHover={
                reduced ? undefined : { y: -12, scale: 1.03, rotate: 0 }
              }
            >
              <div className="relative overflow-hidden rounded-t-[999px] rounded-b-[10px] border border-gold/30 bg-cream shadow-[0_26px_64px_-26px_rgba(120,90,95,0.55)]">
                <img
                  src={item.src}
                  alt=""
                  loading={i < 2 ? "eager" : "lazy"}
                  className="aspect-[3/4.3] w-full object-cover saturate-[1.05] contrast-[1.04]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(47,38,41,0.34),transparent_55%)]" />
                <div className="absolute inset-[5px] rounded-t-[999px] rounded-b-[6px] border border-white/40" />
                {!reduced && (
                  <motion.div
                    className="absolute inset-0 bg-[linear-gradient(105deg,transparent_35%,rgba(255,255,255,0.55)_50%,transparent_65%)]"
                    initial={{ x: "-120%" }}
                    animate={opened ? { x: "120%" } : { x: "-120%" }}
                    transition={{
                      duration: 1.5,
                      ease: EASE_LUXE,
                      delay: item.delay + 0.5,
                    }}
                  />
                )}
              </div>
            </motion.figure>
          ))}
        </div>

        {/* Headline */}
        <motion.div
          className="relative flex flex-col items-center gap-5"
          {...entry(1.05)}
        >
          <h1 className="relative font-display text-[clamp(3rem,11.5vw,6.5rem)] font-extralight leading-[0.95] tracking-[0.01em] text-ink">
            <KineticHeadline
              text={HEADLINE}
              opened={opened}
              reduced={reduced}
              baseDelay={1.15}
            />
            {!reduced && (
              <motion.span
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,transparent_38%,rgba(212,188,134,0.85)_50%,transparent_62%)] bg-clip-text text-transparent"
                aria-hidden="true"
                animate={{ backgroundPosition: ["-160% 0%", "260% 0%"] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 2.6,
                }}
                style={{ backgroundSize: "220% 100%" }}
              >
                {HEADLINE}
              </motion.span>
            )}
          </h1>

          <motion.span
            className="block h-px w-40 origin-center bg-[linear-gradient(90deg,transparent,var(--color-gold),transparent)]"
            initial={{ scaleX: 0 }}
            animate={opened ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.4, ease: EASE_LUXE, delay: 1.9 }}
          />

          <p className="max-w-[36ch] font-display text-[clamp(1.05rem,3.4vw,1.4rem)] italic leading-relaxed text-ink-soft">
            {SENTENCE}
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      {opened && (
        <motion.div
          className="absolute bottom-8 z-20 flex flex-col items-center gap-2 text-[0.58rem] tracking-[0.32em] uppercase text-ink/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 1 }}
          style={{ opacity: cueOpacity }}
        >
          <span>Scroll to continue</span>
          <motion.span
            className="block h-9 w-px bg-gradient-to-b from-gold/55 to-transparent"
            animate={{ scaleY: [0, 1, 0], originY: [0, 0, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </section>
  );
}
