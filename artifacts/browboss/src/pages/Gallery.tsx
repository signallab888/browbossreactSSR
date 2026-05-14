import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

const bookingUrl =
  "https://square.site/appointments/book/2H4Q2RWG1Q1QF/browboss-brow-beauty-san-diego-ca";

const pairs = [
  {
    id: 1,
    treatment: "Lash Lift",
    before: "/images/lash-before-1.jpg",
    after: "/images/lash-after-1.jpg",
  },
  {
    id: 2,
    treatment: "Lash Lift",
    before: "/images/lash-before-2.jpg",
    after: "/images/lash-after-2.jpg",
  },
];

const treatments = ["All", ...Array.from(new Set(pairs.map((p) => p.treatment)))];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function Gallery() {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? pairs : pairs.filter((p) => p.treatment === active);

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-zinc-100">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <img
              src="https://browboss.com/img/logo.svg"
              alt="BrowBoss"
              className="h-12 w-auto brightness-0 cursor-pointer"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const s = document.createElement("span");
                s.className = "font-serif font-bold text-2xl tracking-[0.2em] text-black";
                s.textContent = "BROWBOSS";
                e.currentTarget.parentElement?.appendChild(s);
              }}
            />
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-black">
            <Link href="/#services" className="text-sm font-medium tracking-widest uppercase hover:opacity-70 transition-opacity">Services</Link>
            <Link href="/gallery" className="text-sm font-medium tracking-widest uppercase text-black border-b border-black pb-0.5">Gallery</Link>
            <Link href="/#about" className="text-sm font-medium tracking-widest uppercase hover:opacity-70 transition-opacity">About</Link>
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium tracking-widest uppercase hover:opacity-70 transition-opacity">Book</a>
            <a href="tel:8583220010" className="text-sm font-medium tracking-widest uppercase hover:opacity-70 transition-opacity flex items-center gap-2">
              <Phone className="w-4 h-4" />
              (858) 322-0010
            </a>
          </nav>
          <Link href="/" className="md:hidden text-xs tracking-widest uppercase text-zinc-400 hover:text-black transition-colors">
            ← Home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-16 pb-10 border-b border-zinc-100">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-400 mb-4">BrowBoss · La Jolla</p>
            <h1 className="text-5xl md:text-6xl font-serif font-light mb-4">Before & After</h1>
            <div className="w-8 h-px bg-black mx-auto mb-5" />
            <p className="text-sm text-zinc-500 font-light max-w-xs mx-auto leading-relaxed">
              Real clients. Real results. Every transformation crafted by our specialists in La Jolla.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="py-6 border-b border-zinc-100 sticky top-16 z-40 bg-white/95 backdrop-blur">
        <div className="container mx-auto px-4 flex items-center gap-3 flex-wrap justify-center">
          {treatments.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`px-5 py-2 text-[11px] tracking-[0.25em] uppercase transition-colors ${
                active === t
                  ? "bg-black text-white"
                  : "bg-transparent text-zinc-500 border border-zinc-200 hover:border-black hover:text-black"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            key={active}
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 max-w-5xl mx-auto"
          >
            {filtered.map((pair) => (
              <motion.div key={pair.id} variants={fadeUp}>
                {/* Treatment badge */}
                <p className="text-[10px] tracking-[0.35em] uppercase text-zinc-400 mb-4">
                  {pair.treatment}
                </p>

                {/* Side-by-side photos */}
                <div className="grid grid-cols-2 gap-1">
                  <div className="relative">
                    <div className="aspect-square overflow-hidden bg-zinc-100">
                      <img
                        src={pair.before}
                        alt={`${pair.treatment} before`}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <p className="absolute bottom-2 left-2 text-[9px] tracking-[0.3em] uppercase text-white bg-black/60 px-2 py-1">
                      Before
                    </p>
                  </div>
                  <div className="relative">
                    <div className="aspect-square overflow-hidden bg-zinc-100">
                      <img
                        src={pair.after}
                        alt={`${pair.treatment} after`}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <p className="absolute bottom-2 right-2 text-[9px] tracking-[0.3em] uppercase text-white bg-black/80 px-2 py-1 font-medium">
                      After
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-center text-zinc-400 text-sm py-20">No results for this treatment yet.</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-zinc-100 bg-zinc-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-400 mb-4">Ready for your transformation?</p>
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-8">Book Your Appointment</h2>
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black text-white px-10 py-4 text-xs tracking-[0.25em] uppercase hover:bg-zinc-800 transition-colors"
            >
              Book Now <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-zinc-100">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] tracking-widest uppercase text-zinc-400">
          <span>BrowBoss · La Jolla, San Diego</span>
          <span>1150 Silverado St Suite 308, La Jolla CA 92037</span>
          <a href="tel:8583220010" className="hover:text-black transition-colors">(858) 322-0010</a>
        </div>
      </footer>
    </div>
  );
}
