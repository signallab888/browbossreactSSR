"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Phone, Clock } from "lucide-react";

const bookingBase =
  "https://square.site/appointments/book/2H4Q2RWG1Q1QF/browboss-brow-beauty-san-diego-ca";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

interface Service {
  name: string;
  tag: string;
  description: string;
  bestFor: string[];
  image: string;
  price: string;
  duration: string;
  bookingUrl: string;
}

interface ServiceGroup {
  category: string;
  intro: string;
  services: Service[];
}

const serviceGroups: ServiceGroup[] = [
  {
    category: "Microblading",
    intro: "All microblading services are performed exclusively by Leslie Ritchie. One client at a time.",
    services: [
      {
        name: "Microblading",
        tag: "Hair Strokes",
        description: "A handheld tool with fine needles creates individual hair-like strokes that mimic real brow hairs. Shading is added when necessary for depth.",
        bestFor: ["Sparse brows", "Natural finish", "Fair to medium skin"],
        image: "/images/ba-micro-after.jpg",
        price: "$900",
        duration: "1 hr+",
        bookingUrl: bookingBase,
      },
      {
        name: "Ombre Powder Brows",
        tag: "Soft Powder",
        description: "Fine dots build a soft, makeup-like gradient — lighter at the front, deeper at the tail. No harsh edges. Long-lasting on all skin types.",
        bestFor: ["Oily skin", "Makeup look", "Bold definition"],
        image: "/images/powder-brows.jpg",
        price: "$900",
        duration: "3 hrs 30 mins+",
        bookingUrl: bookingBase,
      },
      {
        name: "Combo Brows",
        tag: "Hybrid",
        description: "Hair strokes at the front for a natural look, powder shading through the body and tail for fullness. The best of both techniques in one session.",
        bestFor: ["Thin to medium brows", "Defined yet natural", "Any skin type"],
        image: "/images/ba-brow-after.jpg",
        price: "$900",
        duration: "3 hrs 30 mins",
        bookingUrl: bookingBase,
      },
    ],
  },
  {
    category: "Consultation",
    intro: "Had microblading before or have questions? A consultation is the right first step.",
    services: [
      {
        name: "Microblading Consultation",
        tag: "First Step",
        description: "If you have had previous microblading done or have questions regarding our services, we highly recommend starting here. Fee is applied toward your appointment.",
        bestFor: ["Previous microblading", "Unsure which technique", "Color matching"],
        image: "/images/leslie-founder.jpg",
        price: "$100",
        duration: "30 mins+",
        bookingUrl: bookingBase,
      },
    ],
  },
];

export default function BookMicroblading() {
  return (
    <div className="min-h-screen bg-white font-sans text-black">

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-zinc-100">
        <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 z-50">
            <img
              src="https://browboss.com/img/logo.svg"
              alt="BrowBoss Logo"
              className="h-12 w-auto brightness-0"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const s = document.createElement("span");
                s.className = "font-serif font-bold text-2xl tracking-[0.2em] text-black";
                s.textContent = "BROWBOSS";
                e.currentTarget.parentElement?.appendChild(s);
              }}
            />
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-[11px] tracking-[0.2em] uppercase">
            <Link href="/" className="hover:opacity-60 transition-opacity">Services</Link>
            <Link href="/gallery" className="hover:opacity-60 transition-opacity">Gallery</Link>
            <a href="tel:8583220010" className="flex items-center gap-2 text-zinc-500 hover:text-black transition-colors">
              <Phone className="w-3.5 h-3.5" /> (858) 322-0010
            </a>
          </nav>
          <a href="tel:8583220010" className="md:hidden flex items-center gap-2 text-[11px] tracking-[0.2em] text-zinc-500 hover:text-black transition-colors">
            <Phone className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* ── Intro ──────────────────────────────────────────────────────── */}
      <section className="bg-[#F5F1EC] py-10 md:py-16 border-b border-zinc-200">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="mb-5">
              <Link href="/" className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-zinc-400 hover:text-black transition-colors">
                <ArrowLeft className="w-3 h-3" /> Services
              </Link>
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-serif text-4xl md:text-6xl font-light leading-tight mb-3">
              Book your microblading.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-sm text-zinc-500 max-w-sm">
              All services performed by Leslie Ritchie. Each card books directly into that appointment.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Artist banner ───────────────────────────────────────────────── */}
      <div className="bg-white border-b border-zinc-100">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl py-6 flex items-center gap-5">
          <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-zinc-100">
            <img
              src="/images/leslie-founder.jpg"
              alt="Leslie Ritchie"
              className="w-full h-full object-cover object-top grayscale"
            />
          </div>
          <div>
            <p className="font-serif text-lg font-light">Leslie Ritchie</p>
            <p className="text-[10px] tracking-[0.28em] uppercase text-zinc-400">Founder · Lead Artist · La Jolla</p>
          </div>
        </div>
      </div>

      {/* ── Services ───────────────────────────────────────────────────── */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="space-y-12 md:space-y-16"
          >
            {serviceGroups.map((group) => (
              <motion.div key={group.category} variants={fadeUp}>

                {/* Category header */}
                <div className="mb-6 pb-4 border-b border-zinc-100">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="font-serif text-2xl md:text-3xl font-light">{group.category}</h2>
                    <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-400">
                      {group.services.length} {group.services.length === 1 ? "service" : "services"}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500 mt-1 max-w-xl">{group.intro}</p>
                </div>

                {/* Service cards */}
                <div className={`grid gap-4 ${
                  group.services.length === 1
                    ? "grid-cols-1 max-w-sm"
                    : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                }`}>
                  {group.services.map((svc) => (
                    <motion.div
                      key={svc.name}
                      variants={fadeUp}
                      className="group border border-zinc-100 bg-white hover:border-zinc-300 transition-all duration-300 hover:shadow-sm flex flex-col"
                    >
                      {/* Result image */}
                      <div className="aspect-[4/3] overflow-hidden bg-zinc-100 relative">
                        <img
                          src={svc.image}
                          alt={svc.name}
                          className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                        {/* Technique tag */}
                        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[9px] tracking-[0.28em] uppercase text-zinc-700 px-2.5 py-1">
                          {svc.tag}
                        </span>
                      </div>

                      <div className="p-5 flex flex-col flex-1">
                        <p className="font-serif text-lg font-light mb-2 leading-snug">{svc.name}</p>
                        <p className="text-[12px] text-zinc-500 leading-relaxed mb-4 flex-1">{svc.description}</p>

                        {/* Best for */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {svc.bestFor.map((b) => (
                            <span key={b} className="text-[9px] tracking-[0.18em] uppercase text-zinc-400 border border-zinc-200 px-2 py-0.5">
                              {b}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between mb-4 pt-4 border-t border-zinc-100">
                          <span className="text-sm font-medium text-black">{svc.price}</span>
                          <span className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                            <Clock className="w-3 h-3" /> {svc.duration}
                          </span>
                        </div>

                        <a
                          href={svc.bookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 bg-black text-white w-full py-3 text-[10px] tracking-[0.25em] uppercase hover:bg-zinc-800 transition-colors"
                        >
                          Book Now <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Need help strip ────────────────────────────────────────────── */}
      <div className="bg-[#F5F1EC] border-t border-zinc-200 py-6">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-zinc-500">Not sure which service is right for you?</p>
          <a
            href="tel:8583220010"
            className="inline-flex items-center gap-2 border border-zinc-300 bg-white text-black px-6 py-3 text-[10px] tracking-[0.25em] uppercase hover:border-black transition-colors whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5" /> Call Us — (858) 322-0010
          </a>
        </div>
      </div>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="border-t border-zinc-100 py-6 bg-white">
        <div className="container mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] tracking-[0.2em] uppercase text-zinc-400">
          <span>1150 Silverado St Suite 308, La Jolla CA 92037</span>
          <span>Tue–Sat 9am–5pm</span>
        </div>
      </footer>

    </div>
  );
}
