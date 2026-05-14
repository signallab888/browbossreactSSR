import { Link } from "wouter";
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
  artist: string;
  artistImage: string;
  price: string;
  duration: string;
  bookingUrl: string;
}

interface ServiceGroup {
  category: string;
  description: string;
  services: Service[];
}

const serviceGroups: ServiceGroup[] = [
  {
    category: "Lash Lift",
    description: "YUMI Keratin formula. Natural lashes lifted, curled, and nourished. Results last 8 to 12 weeks.",
    services: [
      { name: "Lash Lift", artist: "Marwa", artistImage: "/images/team-fabiola.jpg", price: "$175", duration: "30 mins",  bookingUrl: "https://book.squareup.com/appointments/c78e9dd5-847e-4392-8044-cd3f13e26abe/location/2H4Q2RWG1Q1QF/services/GGTIWGA2IEEEUY3KOR3Z66PZ" },
      { name: "Lash Lift", artist: "Diana",   artistImage: "/images/team-diana.jpg",   price: "$175", duration: "30 mins+", bookingUrl: "https://book.squareup.com/appointments/c78e9dd5-847e-4392-8044-cd3f13e26abe/location/2H4Q2RWG1Q1QF/services/HTMH3AJUPH3BHK3ZDOULE26M" },
    ],
  },
  {
    category: "Lash Tint",
    description: "Enhances and defines your lashes. Pairs perfectly with a lift. Results last 3 to 6 weeks.",
    services: [
      { name: "Lash Tint", artist: "Marwa",   artistImage: "/images/team-fabiola.jpg",  price: "$49", duration: "30 mins", bookingUrl: "https://book.squareup.com/appointments/c78e9dd5-847e-4392-8044-cd3f13e26abe/location/2H4Q2RWG1Q1QF/services/HIGK2SWJSSRKYVOOWXQT3ZGA" },
      { name: "Lash Tint", artist: "Diana",   artistImage: "/images/team-diana.jpg",   price: "$49", duration: "30 mins", bookingUrl: "https://book.squareup.com/appointments/c78e9dd5-847e-4392-8044-cd3f13e26abe/location/2H4Q2RWG1Q1QF/services/TBIVOYOHMSORZ3WM6WE73SY3" },
    ],
  },
  {
    category: "Fuller Lash Line",
    description: "Semi-permanent enhancement that defines the natural beauty of your eyes with a thin, precise line effect.",
    services: [
      { name: "Fuller Lash Line", artist: "Marisol", artistImage: "/images/team-marisol.jpg", price: "$550", duration: "1 hr", bookingUrl: bookingBase },
    ],
  },
];

function gridCols(count: number) {
  if (count === 1) return "grid-cols-1 max-w-xs";
  if (count === 2) return "grid-cols-1 sm:grid-cols-2 max-w-xl";
  return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
}

export default function BookLashLift() {
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
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] tracking-[0.2em] uppercase">
            <Link href="/" className="hover:opacity-60 transition-opacity">Services</Link>
            <Link href="/gallery" className="hover:opacity-60 transition-opacity">Gallery</Link>
            <a href="tel:8583220010" className="flex items-center gap-2 text-zinc-500 hover:text-black transition-colors">
              <Phone className="w-3.5 h-3.5" /> (858) 322-0010
            </a>
          </nav>
          {/* Mobile: phone icon */}
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
              <Link href="/lash-lift" className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-zinc-400 hover:text-black transition-colors">
                <ArrowLeft className="w-3 h-3" /> Lash Lift
              </Link>
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-serif text-4xl md:text-6xl font-light leading-tight mb-3">
              Book your lash lift.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-sm text-zinc-500 max-w-sm">
              Choose a service and artist. Each card books directly into that appointment.
            </motion.p>
          </motion.div>
        </div>
      </section>

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
                    <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-400">{group.services.length} {group.services.length === 1 ? "artist" : "artists"}</span>
                  </div>
                  <p className="text-sm text-zinc-500 mt-1 max-w-xl">{group.description}</p>
                </div>

                {/* Artist cards */}
                <div className={`grid gap-4 ${gridCols(group.services.length)}`}>
                  {group.services.map((svc) => (
                    <motion.div
                      key={`${svc.name}-${svc.artist}`}
                      variants={fadeUp}
                      className="group border border-zinc-100 bg-white hover:border-zinc-300 transition-all duration-300 hover:shadow-sm"
                    >
                      {/* Artist photo */}
                      <div className="aspect-[4/3] overflow-hidden bg-zinc-100">
                        <img
                          src={svc.artistImage}
                          alt={svc.artist}
                          className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      </div>

                      {/* Info */}
                      <div className="p-4 md:p-5">
                        <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 mb-1">{svc.name}</p>
                        <p className="font-serif text-xl font-light mb-4">{svc.artist}</p>

                        <div className="flex items-center justify-between mb-4">
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
          <p className="text-sm text-zinc-500">Not sure which service or artist is right for you?</p>
          <a href="tel:8583220010" className="inline-flex items-center gap-2 border border-zinc-300 bg-white text-black px-6 py-3 text-[10px] tracking-[0.25em] uppercase hover:border-black transition-colors whitespace-nowrap">
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
