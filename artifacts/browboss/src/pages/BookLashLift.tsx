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
    description: "YUMI Keratin Lash Lift. Your natural lashes lifted, curled, and nourished. Results last 8 to 12 weeks.",
    services: [
      {
        name: "Lash Lift",
        artist: "Fabiola",
        artistImage: "/images/team-fabiola.jpg",
        price: "$175",
        duration: "30 mins",
        bookingUrl: bookingBase,
      },
      {
        name: "Lash Lift",
        artist: "Diana",
        artistImage: "/images/team-diana.jpg",
        price: "$175",
        duration: "30 mins+",
        bookingUrl: bookingBase,
      },
    ],
  },
  {
    category: "Lash Tint",
    description: "Lash tint enhances and defines your lashes. Pairs perfectly with a lash lift. Results last 3 to 6 weeks.",
    services: [
      {
        name: "Lash Tint",
        artist: "Marwa",
        artistImage: "/images/team-marwa.jpg",
        price: "$50",
        duration: "30 mins",
        bookingUrl: bookingBase,
      },
      {
        name: "Lash Tint",
        artist: "Fabiola",
        artistImage: "/images/team-fabiola.jpg",
        price: "$49",
        duration: "30 mins",
        bookingUrl: bookingBase,
      },
      {
        name: "Lash Tint",
        artist: "Diana",
        artistImage: "/images/team-diana.jpg",
        price: "$49",
        duration: "30 mins",
        bookingUrl: bookingBase,
      },
    ],
  },
  {
    category: "Fuller Lash Line",
    description: "Semi-permanent lash enhancement that defines and highlights the natural beauty of your eyes. Creates a thin, precise line effect.",
    services: [
      {
        name: "Fuller Lash Line",
        artist: "Marisol",
        artistImage: "/images/team-marisol.jpg",
        price: "$550",
        duration: "1 hr",
        bookingUrl: bookingBase,
      },
    ],
  },
];

export default function BookLashLift() {
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
          <nav className="hidden md:flex items-center gap-8 text-[11px] tracking-[0.2em] uppercase">
            <Link href="/" className="hover:opacity-60 transition-opacity">Services</Link>
            <Link href="/gallery" className="hover:opacity-60 transition-opacity">Gallery</Link>
            <a href="tel:8583220010" className="flex items-center gap-2 text-zinc-500 hover:text-black transition-colors">
              <Phone className="w-3.5 h-3.5" /> (858) 322-0010
            </a>
          </nav>
        </div>
      </header>

      {/* Page intro */}
      <section className="bg-[#F5F1EC] py-14 md:py-20 border-b border-zinc-200">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="mb-4">
              <Link href="/lash-lift" className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-zinc-400 hover:text-black transition-colors">
                <ArrowLeft className="w-3 h-3" /> Back to Lash Lift
              </Link>
            </motion.div>
            <motion.p variants={fadeUp} className="text-[10px] tracking-[0.4em] uppercase text-zinc-400 mb-3">
              YUMI Keratin Lash Lift · La Jolla, San Diego
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-serif text-4xl md:text-6xl font-light leading-tight mb-4">
              Choose your service.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-sm text-zinc-500 max-w-md">
              Select a treatment and artist below. Each booking goes directly to your confirmed appointment.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Service groups */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="space-y-16 md:space-y-24"
          >
            {serviceGroups.map((group) => (
              <motion.div key={group.category} variants={fadeUp}>
                {/* Category header */}
                <div className="mb-8 pb-5 border-b border-zinc-100">
                  <h2 className="font-serif text-3xl md:text-4xl font-light mb-2">{group.category}</h2>
                  <p className="text-sm text-zinc-500 max-w-xl">{group.description}</p>
                </div>

                {/* Artist cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {group.services.map((svc) => (
                    <motion.div
                      key={`${svc.category}-${svc.artist}`}
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
                      <div className="p-5">
                        <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 mb-1">{svc.name}</p>
                        <p className="font-serif text-xl font-light mb-4">{svc.artist}</p>

                        <div className="flex items-center justify-between mb-5">
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

      {/* Footer strip */}
      <footer className="border-t border-zinc-100 py-8 bg-white">
        <div className="container mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] tracking-[0.2em] uppercase text-zinc-400">
          <span>1150 Silverado St Suite 308, La Jolla CA 92037</span>
          <span>Tue–Sat 9–5 · <a href="tel:8583220010" className="hover:text-black transition-colors">(858) 322-0010</a></span>
        </div>
      </footer>

    </div>
  );
}
