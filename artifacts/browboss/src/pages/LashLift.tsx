import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Phone, ChevronDown, Check, X } from "lucide-react";
import { BeforeAfterCard } from "@/components/BeforeAfterCard";

const bookingUrl =
  "https://square.site/appointments/book/2H4Q2RWG1Q1QF/browboss-brow-beauty-san-diego-ca";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className={`border border-zinc-200 bg-white transition-shadow duration-300 ${open ? "shadow-md" : "hover:shadow-sm"}`}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between px-6 py-5 text-left gap-4"
      >
        <span className="text-[11px] tracking-[0.18em] uppercase font-medium text-zinc-800 leading-relaxed">{q}</span>
        <span className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border border-zinc-300 flex items-center justify-center transition-all duration-300 ${open ? "bg-black border-black" : ""}`}>
          <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${open ? "rotate-180 text-white" : "text-zinc-400"}`} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-sm text-zinc-500 leading-relaxed px-6 pb-6">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function LashLift() {
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
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/#services" className="text-sm font-medium tracking-widest uppercase hover:opacity-70 transition-opacity">Services</Link>
            <Link href="/gallery" className="text-sm font-medium tracking-widest uppercase hover:opacity-70 transition-opacity">Gallery</Link>
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer"
              className="bg-black text-white px-5 py-2 text-xs tracking-[0.2em] uppercase hover:bg-zinc-800 transition-colors">
              Book Now
            </a>
            <a href="tel:8583220010" className="text-sm tracking-widest uppercase flex items-center gap-2 hover:opacity-70 transition-opacity">
              <Phone className="w-4 h-4" /> (858) 322-0010
            </a>
          </nav>
          <Link href="/" className="md:hidden text-xs tracking-widest uppercase text-zinc-400 hover:text-black transition-colors">
            ← Back
          </Link>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-end bg-zinc-900 overflow-hidden">
        <img
          src="/images/lash-hero-new.jpg"
          alt="Lash Lift treatment"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          style={{ objectPosition: "50% 40%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
        <div className="relative container mx-auto px-4 md:px-8 pb-16 md:pb-24">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-xl">
            <motion.p variants={fadeUp} className="text-[10px] tracking-[0.4em] uppercase text-white/60 mb-5">
              YUMI™ Keratin Lash Lift · La Jolla, San Diego
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-serif font-light text-white leading-[1.05] mb-6">
              Your lashes.<br />Lifted.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/70 text-base font-light mb-8 leading-relaxed max-w-sm">
              No extensions. No glue. No morning routine. Just your natural lashes, open, curled, and visible from the moment you wake up.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 text-xs tracking-[0.25em] uppercase hover:bg-zinc-100 transition-colors">
                Book My Appointment <ArrowRight className="w-4 h-4" />
              </a>
              <a href="tel:8583220010" className="text-white/70 text-sm tracking-widest uppercase hover:text-white transition-colors">
                Or call (858) 322-0010
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Trust bar ──────────────────────────────────────────────────── */}
      <div className="bg-black text-white py-4 overflow-hidden">
        <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap px-4 text-[10px] tracking-[0.3em] uppercase">
          <span>★★★★★ 4.9 on Google</span>
          <span className="text-white/30">·</span>
          <span>200+ Lash Clients Served</span>
          <span className="text-white/30">·</span>
          <span>YUMI™ Certified</span>
          <span className="text-white/30">·</span>
          <span>La Jolla · San Diego</span>
        </div>
      </div>

      {/* ── Hook ───────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-[10px] tracking-[0.4em] uppercase text-zinc-400 mb-6">The Point</motion.p>
            <motion.blockquote variants={fadeUp} className="font-serif text-2xl md:text-3xl font-light leading-relaxed text-zinc-800 mb-8">
              "You wake up. Lashes already curled. You skip the mascara, get in the ocean, and don't think about it again for two months."
            </motion.blockquote>
            <motion.div variants={fadeUp} className="w-8 h-px bg-black mx-auto mb-8" />
            <motion.p variants={fadeUp} className="text-sm text-zinc-500 leading-relaxed">
              That's why clients keep coming back. We use{" "}
              <strong className="text-black font-medium">YUMI™ Lashes Paris</strong>, a keratin-based system that lifts your natural
              lashes while nourishing them at the same time. No synthetic fibers. No adhesive. No damage.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Before & After ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-[#F5F1EC]">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-400 mb-3">Real Results</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light mb-4">Before & After</h2>
            <div className="w-8 h-px bg-black mx-auto mb-4" />
            <p className="text-sm text-zinc-400 tracking-wide">Tap any card to reveal</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            <BeforeAfterCard label="Lash Lift" before="/images/lash-before-1.jpg" after="/images/lash-after-1.jpg" posB="top" posA="top" />
            <BeforeAfterCard label="Lash Lift" before="/images/lash-before-2.jpg" after="/images/lash-after-2.jpg" posB="center" posA="center" />
            <BeforeAfterCard label="Lash Lift" before="/images/ba-lash-before.jpg" after="/images/ba-lash-after.jpg" posB="top" posA="top" />
          </div>
        </div>
      </section>

      {/* ── Video ──────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-400 mb-3">See It In Action</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light mb-4">The Treatment</h2>
            <div className="w-8 h-px bg-black mx-auto" />
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              "/videos/ll-reel-1.mp4",
              "/videos/ll-reel-2.mp4",
              "/videos/ll-reel-3.mp4",
              "/videos/ll-reel-4.mp4",
            ].map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative aspect-[9/16] bg-zinc-100 overflow-hidden group"
              >
                <video
                  src={src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why YUMI ───────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#F5F1EC]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.p variants={fadeUp} className="text-[10px] tracking-[0.4em] uppercase text-zinc-400 mb-4">Why YUMI, Not Just Any Lash Lift</motion.p>
              <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl font-light mb-6 leading-tight">
                The formula does more than curl.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-sm text-zinc-500 leading-relaxed mb-5">
                Most basic lash lift systems work like a perm. They force a curl and stop there. The curl holds, but the lash gets nothing back. Over time, lashes can feel brittle and dry.
              </motion.p>
              <motion.p variants={fadeUp} className="text-sm text-zinc-500 leading-relaxed mb-5">
                YUMI's formula is infused with <strong className="text-black font-medium">keratin proteins, vitamins, and natural oils</strong>. While it lifts, it nourishes. You get lashes that feel soft, move naturally, and look healthy through the entire 8–12 week cycle.
              </motion.p>
              <motion.p variants={fadeUp} className="text-sm text-zinc-500 leading-relaxed">
                YUMI customizes the curl to your eye shape. Rod size, placement, and lift angle are all chosen for you. The result looks like your lashes on their best day, not a copied curl from a photo.
              </motion.p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="aspect-[3/4] overflow-hidden bg-zinc-200"
            >
              <img src="/images/lash-after-2.jpg" alt="YUMI Lash Lift result" className="w-full h-full object-cover object-center" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-400 mb-3">Your Appointment</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light">What Happens Step by Step</h2>
            <div className="w-8 h-px bg-black mx-auto mt-5" />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "Lift",
                body: "Silicone pads are placed on your eyelids and your lashes are lifted and secured. A softening serum relaxes the lash from its natural position. Rod size and placement are chosen based on your eye shape, from subtle to dramatic.",
              },
              {
                num: "02",
                title: "Keratin Treatment",
                body: "The keratin formula sets the shape and bonds to the lash structure. This is the step most basic lift systems skip entirely. It's also what makes YUMI results last longer and leave lashes healthier after.",
              },
              {
                num: "03",
                title: "Tint (Optional)",
                body: "If you want darker lashes, we tint in the same appointment. Most clients add this. It's what makes mascara unnecessary. Total time: about 60 minutes.",
              },
            ].map((step) => (
              <motion.div key={step.num} variants={fadeUp} className="border-t border-zinc-200 pt-6">
                <p className="font-serif text-4xl font-light text-zinc-200 mb-4">{step.num}</p>
                <h3 className="font-medium text-sm tracking-widest uppercase mb-3">{step.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{step.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Results ────────────────────────────────────────────────────── */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-[10px] tracking-[0.4em] uppercase text-white/50 mb-4 text-center">What to Expect</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl font-light text-center mb-12">Results at a Glance</motion.h2>
            <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {[
                "Results last 8–12 weeks",
                "Works with straight, downward-pointing, and short lashes",
                "No maintenance between appointments",
                "Safe for contact lens wearers",
                "Safe during pregnancy",
                "Swimming & ocean-safe after 24 hours",
                "Mascara optional, water-based only after first 24 hours",
                "No glue, no extensions, no fills",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-white/50 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white/80">{item}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Is it right for you ────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-400 mb-3">Candidacy</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light">Is This Right for You?</h2>
            <div className="w-8 h-px bg-black mx-auto mt-5" />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid md:grid-cols-2 gap-8">
            <motion.div variants={fadeUp} className="border border-zinc-100 p-8">
              <p className="text-xs tracking-[0.3em] uppercase font-medium mb-6">Good Fit If...</p>
              <ul className="space-y-3">
                {[
                  "Your natural lashes grow straight or point downward",
                  "You're tired of using a curler every single morning",
                  "You swim, work out, or anything that destroys mascara",
                  "You've had extensions and want to give your lashes a break",
                  "You want the look without the upkeep",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-black flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-zinc-600">{item}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeUp} className="border border-zinc-100 p-8 bg-zinc-50">
              <p className="text-xs tracking-[0.3em] uppercase font-medium mb-6 text-zinc-400">Not the Right Time If...</p>
              <ul className="space-y-3">
                {[
                  "You have an active eye infection or irritation",
                  "You had eye surgery in the last 3 months",
                  "Your lashes are extremely short (we can assess this at the appointment)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <X className="w-4 h-4 text-zinc-300 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-zinc-400">{item}</p>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-zinc-400 mt-6 border-t border-zinc-200 pt-6">
                If you're unsure,{" "}
                <a href="tel:8583220010" className="text-black underline">call us</a>. We'll give you a straight answer.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Pricing ────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-[#F5F1EC]">
        <div className="container mx-auto px-4 max-w-lg">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-10">
              <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-400 mb-3">Investment</p>
              <h2 className="font-serif text-4xl font-light">Pricing</h2>
              <div className="w-8 h-px bg-black mx-auto mt-5" />
            </motion.div>
            <motion.div variants={fadeUp} className="bg-white border border-zinc-100">
              {[
                { service: "YUMI Keratin Lash Lift", price: "Call for pricing" },
                { service: "Lash Lift + Tint", price: "Call for pricing" },
              ].map((row, i) => (
                <div key={row.service} className={`flex items-center justify-between px-8 py-5 ${i > 0 ? "border-t border-zinc-100" : ""}`}>
                  <p className="text-sm font-medium">{row.service}</p>
                  <p className="text-sm text-zinc-500 tracking-wide">{row.price}</p>
                </div>
              ))}
              <div className="border-t border-zinc-100 px-8 py-5 bg-zinc-50">
                <p className="text-xs text-zinc-400">No hidden add-ons. No upsells at the table.</p>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="text-center mt-8">
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-black text-white px-10 py-4 text-xs tracking-[0.25em] uppercase hover:bg-zinc-800 transition-colors">
                Book Online <ArrowRight className="w-4 h-4" />
              </a>
              <p className="text-xs text-zinc-400 mt-4">or call <a href="tel:8583220010" className="text-black hover:underline">(858) 322-0010</a></p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Reviews ────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-400 mb-3">Client Reviews</p>
            <h2 className="font-serif text-4xl font-light">What Clients Say</h2>
            <div className="w-8 h-px bg-black mx-auto mt-5" />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid md:grid-cols-2 gap-6">
            {[
              {
                quote: "Kelly has been my lash fairy for the last couple of years. I love going to Browboss for my lash lifts but also the people. I appreciate them having my lash health in mind and being super careful with the procedure. I don't live in the area but it is worth the drive.",
                author: "Lynette Lopez",
              },
              {
                quote: "I am a first time lash lifter and I am in love! Kelly was my esthetician and her work was impeccable. Her application was very gentle. My eyes felt like they were in great hands. When she finished and gave me the mirror to see... I let out a very genuine 'oh my god, WOW!'",
                author: "Nicole Osorio Broadnax",
              },
              {
                quote: "I haven't had to wear mascara for months! I recommend purchasing the lash serum from Browboss as well. It has extended the life of the lash lift and made my lashes longer.",
                author: "Leslie Altherr",
              },
              {
                quote: "My lashes now have a natural and beautiful curl, eliminating the need for an eyelash curler.",
                author: "Joanna Garcia",
              },
            ].map((r) => (
              <motion.div key={r.author} variants={fadeUp} className="border-t border-zinc-200 pt-6">
                <p className="text-sm text-zinc-600 leading-relaxed mb-5 italic">"{r.quote}"</p>
                <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-400">— {r.author}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Aftercare ──────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-400 mb-3">After Your Appointment</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light">Aftercare</h2>
            <div className="w-8 h-px bg-black mx-auto mt-5" />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: "24h",
                title: "Keep Them Dry",
                body: "The first 24 hours are the most important. No water, no steam, no sweating, no mascara. Sleep on your back if you can. This is the window where the lift sets completely.",
              },
              {
                num: "48h",
                title: "Handle Gently",
                body: "No rubbing, no pulling, no eyelash curler for the first 48 hours. After that, use a non-oily makeup remover and avoid anything heavy around the eye area.",
              },
              {
                num: "8wk",
                title: "Wait Before Your Next Lift",
                body: "After the first week, you can condition your lashes with a small amount of castor or coconut oil. Wait at least 8 weeks before booking again. Going sooner risks over-processing.",
              },
            ].map((step) => (
              <motion.div key={step.num} variants={fadeUp} className="border-t border-zinc-200 pt-6">
                <p className="font-serif text-4xl font-light text-zinc-200 mb-4">{step.num}</p>
                <h3 className="font-medium text-sm tracking-widest uppercase mb-3">{step.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{step.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-32 bg-[#F5F1EC]">
        <div className="container mx-auto px-4 max-w-6xl">

          {/* Header */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <p className="text-[10px] tracking-[0.5em] uppercase text-zinc-400 mb-4">Everything You Need to Know</p>
            <h2 className="font-serif text-5xl md:text-6xl font-light mb-5">FAQ</h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-zinc-300" />
              <div className="w-1 h-1 rounded-full bg-zinc-400" />
              <div className="h-px w-12 bg-zinc-300" />
            </div>
          </motion.div>

          {/* Ella Keefe quote — near FAQ for the "afraid to ruin my lashes" concern */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="mb-10 border-l-2 border-black pl-6 max-w-2xl mx-auto"
          >
            <p className="text-sm text-zinc-600 leading-relaxed italic mb-3">
              "I was nervous for someone to touch my natural lashes but she did such an incredible job I couldn't believe it. If you are coming in for a lash lift and tint I highly recommend Diana."
            </p>
            <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-400">— Ella Keefe</p>
          </motion.div>

          {/* 2-column grid */}
          {(() => {
            const faqs = [
              { q: "Does a lash lift damage your natural lashes?", a: "No. The two main causes of damage are over-processing the lash and going back too soon. YUMI's keratin formula nourishes while it lifts. Our technicians are trained to time every step correctly." },
              { q: "Does it hurt?", a: "No. Most clients find it relaxing and some fall asleep. You may feel slight pressure from the silicone pad but there is no pain. The whole treatment is non-invasive from start to finish." },
              { q: "How long do results last?", a: "Most clients see a full lift for 8 to 10 weeks. Some go up to 12. The lift doesn't fall out. It grows out naturally with your lash cycle, so it fades gradually rather than all at once." },
              { q: "Is tint included?", a: "Tint is available as an add-on in the same appointment. Most clients include it. It's what makes mascara completely unnecessary. Just let us know when you book." },
              { q: "Can I wear mascara after?", a: "Wait 24 hours, then water-based mascara is fine. Most clients find they don't need it. If you want the darkest result, adding a tint at booking is the better call." },
              { q: "What's the difference between a lash lift and extensions?", a: "Extensions add synthetic fibers using adhesive and need fills every 2 to 3 weeks. A lash lift works with your own lashes only. No glue, no fibers, no fills. You book once and come back when the cycle is done." },
              { q: "I have short lashes. Will it still work?", a: "It depends on the actual length. Very short lashes may not give you a dramatic result. We assess before we start and won't go through with it if it won't make a visible difference. Most clients with short but present lashes do see a real change." },
              { q: "How soon can I book again?", a: "Wait at least 8 weeks. This gives the previous lift time to grow out and keeps your lashes from being over-processed. If the curl seems gone before 8 weeks, it's usually a faster lash growth cycle, not a reason to go sooner." },
              { q: "What do I need to do before the appointment?", a: "Come with clean lashes. No mascara, no eyelash curler in the 24 hours before. Remove contact lenses before we start. That's it." },
              { q: "Is it safe during pregnancy?", a: "The treatment is non-invasive and considered safe during pregnancy. If you're in your first trimester or have concerns, check with your doctor first. Call us and we'll answer any questions." },
              { q: "What if I don't like the result?", a: "The lift can't be reversed, so we take the consultation seriously. If you're nervous about going too dramatic, tell us before we start. We'll choose a subtle rod and a natural angle. We're not trying to overdo it." },
            ];
            const left = faqs.slice(0, 6);
            const right = faqs.slice(6);
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="flex flex-col gap-4">
                  {left.map((item, i) => <FaqItem key={item.q} {...item} index={i} />)}
                </div>
                <div className="flex flex-col gap-4">
                  {right.map((item, i) => <FaqItem key={item.q} {...item} index={i + 4} />)}
                </div>
              </div>
            );
          })()}

          {/* Bottom note */}
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-center text-xs text-zinc-400 tracking-widest uppercase mt-12"
          >
            Still have questions? <a href="tel:8583220010" className="underline underline-offset-4 hover:text-black transition-colors">(858) 322-0010</a>
          </motion.p>

        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white text-center">
        <div className="container mx-auto px-4 max-w-lg">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-[10px] tracking-[0.4em] uppercase text-zinc-400 mb-5">
              Ready to wake up with better lashes?
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl font-light mb-6 leading-tight">
              Book Your Lash Lift Today
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm text-zinc-500 mb-10 leading-relaxed">
              We're in La Jolla and serve clients from all over San Diego: Del Mar, Pacific Beach, UTC, Mission Hills, and beyond.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-black text-white px-10 py-4 text-xs tracking-[0.25em] uppercase hover:bg-zinc-800 transition-colors w-full sm:w-auto justify-center">
                Book My Appointment <ArrowRight className="w-4 h-4" />
              </a>
              <a href="tel:8583220010"
                className="inline-flex items-center gap-2 border border-zinc-200 text-black px-8 py-4 text-xs tracking-[0.25em] uppercase hover:border-black transition-colors w-full sm:w-auto justify-center">
                <Phone className="w-4 h-4" /> (858) 322-0010
              </a>
            </motion.div>
            <motion.p variants={fadeUp} className="text-xs text-zinc-400 mt-6">
              1150 Silverado St Suite 308, La Jolla CA 92037 · Tue–Sat 9–5
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="py-8 border-t border-zinc-100">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] tracking-widest uppercase text-zinc-400">
          <Link href="/" className="hover:text-black transition-colors">BrowBoss · La Jolla, San Diego</Link>
          <span>1150 Silverado St Suite 308, La Jolla CA 92037</span>
          <a href="tel:8583220010" className="hover:text-black transition-colors">(858) 322-0010</a>
        </div>
      </footer>

    </div>
  );
}
