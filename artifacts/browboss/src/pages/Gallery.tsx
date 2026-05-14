import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

const bookingUrl =
  "https://square.site/appointments/book/2H4Q2RWG1Q1QF/browboss-brow-beauty-san-diego-ca";

// ── Same card as the home page ─────────────────────────────────────────────
function BeforeAfterCard({
  label,
  before,
  after,
  posB = "center",
  posA = "center",
}: {
  label: string;
  before: string;
  after: string;
  posB?: string;
  posA?: string;
}) {
  const [showAfter, setShowAfter] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="cursor-pointer select-none"
      onClick={() => setShowAfter((v) => !v)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100">
        <img
          src={before}
          alt={`${label} before`}
          className={`absolute inset-0 w-full h-full object-cover grayscale transition-opacity duration-500 ${
            showAfter ? "opacity-0" : "opacity-100"
          }`}
          style={{ objectPosition: posB }}
        />
        <img
          src={after}
          alt={`${label} after`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            showAfter ? "opacity-100" : "opacity-0"
          }`}
          style={{ objectPosition: posA }}
        />
        <div className="absolute bottom-0 left-0 right-0 flex">
          <div
            className={`flex-1 py-2 text-center text-[9px] tracking-[0.3em] uppercase font-medium transition-colors duration-300 ${
              !showAfter ? "bg-black text-white" : "bg-white/80 text-zinc-400"
            }`}
          >
            Before
          </div>
          <div
            className={`flex-1 py-2 text-center text-[9px] tracking-[0.3em] uppercase font-medium transition-colors duration-300 ${
              showAfter ? "bg-black text-white" : "bg-white/80 text-zinc-400"
            }`}
          >
            After
          </div>
        </div>
      </div>
      <p className="font-serif text-sm text-zinc-700 mt-4">{label}</p>
    </motion.div>
  );
}

// ── Data ───────────────────────────────────────────────────────────────────
const pairs = [
  {
    label: "Lash Lift",
    treatment: "Lash Lift",
    before: "/images/lash-before-1.jpg",
    after: "/images/lash-after-1.jpg",
    posB: "top",
    posA: "top",
  },
  {
    label: "Lash Lift",
    treatment: "Lash Lift",
    before: "/images/lash-before-2.jpg",
    after: "/images/lash-after-2.jpg",
    posB: "center",
    posA: "center",
  },
];

const treatments = ["All", ...Array.from(new Set(pairs.map((p) => p.treatment)))];

// ── Page ───────────────────────────────────────────────────────────────────
export default function Gallery() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? pairs : pairs.filter((p) => p.treatment === active);

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      {/* Header */}
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

          <nav className="hidden md:flex items-center gap-8 text-black">
            <a href="/#services" className="text-sm font-medium tracking-widest uppercase hover:opacity-70 transition-opacity">Services</a>
            <Link href="/gallery" className="text-sm font-medium tracking-widest uppercase border-b border-black pb-0.5">Gallery</Link>
            <a href="/#about" className="text-sm font-medium tracking-widest uppercase hover:opacity-70 transition-opacity">About</a>
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-400 mb-4">Real Results</p>
            <h1 className="text-5xl md:text-6xl font-serif font-light mb-4">Before & After</h1>
            <div className="w-8 h-px bg-black mx-auto mb-5" />
            <p className="text-sm text-zinc-400 tracking-wide">Tap any card to reveal</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
            {filtered.map((pair, i) => (
              <BeforeAfterCard key={i} {...pair} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-zinc-400 text-sm py-20">
              No results for this treatment yet.
            </p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-zinc-100 bg-zinc-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-400 mb-4">
              Ready for your transformation?
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-8">
              Book Your Appointment
            </h2>
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
          <a href="tel:8583220010" className="hover:text-black transition-colors">
            (858) 322-0010
          </a>
        </div>
      </footer>
    </div>
  );
}
