import { useEffect, useState, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  Star,
  CheckCircle2,
  MapPin,
  Clock,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Youtube,
  ArrowRight,
  Play,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  service: z.string({ required_error: "Please select a service" }),
  date: z.string().min(1, "Preferred date is required"),
  smsConsent: z.boolean().default(false),
});

const WORK_VIDEOS: { label: string; instagramUrl?: string; src?: string; poster?: string }[] = [
  { label: "Wake Up Beautiful",  src: "/videos/v6.mp4", poster: "/videos/v6-poster.jpg" },
  { label: "Lip Blushing & Lash Lift", src: "/videos/v7.mp4", poster: "/videos/v7-f26.jpg" },
  { label: "Skin Transformation",src: "/videos/v2.mp4", poster: "/videos/v2-poster.jpg" },
  { label: "The Process",        src: "/videos/v3.mp4", poster: "/videos/v3-poster.jpg" },
  { label: "Brow Results",       src: "/videos/v4.mp4", poster: "/videos/v4-poster.jpg" },
  { label: "Nano Blading",       src: "/videos/v5.mp4", poster: "/videos/v5-poster.jpg" },
  { label: "My Story",           src: "/videos/v1.mp4", poster: "/videos/v1-poster.jpg" },
];

const SERVICES = [
  { name: "Lash Lift",                  price: "from $95",  image: "/videos/v13-f1.jpg", objectPosition: "top" },
  { name: "Custom Facials",             price: "from $120", image: "/videos/v9-f4.jpg" },
  { name: "Brow Shaping",               price: "from $45",  image: "/videos/v11-f3.jpg", objectPosition: "top" },
  { name: "Brow Lamination",            price: "from $85",  image: "/videos/v7-f17.jpg" },
  { name: "Microblading & Shading",     price: "from $600", image: "/videos/v14-f35.jpg" },
  { name: "Ombre Powder Brows",          price: "from $650", image: "/images/powder-brows.jpg" },
  { name: "Lip Blushing",               price: "from $550", image: "/videos/v12-f1.jpg" },
  { name: "Scalp Micropigmentation SMP",price: "from $800", image: "/videos/v8-f5.jpg" },
];

const HERO_VIDEOS_DESKTOP = [
  "/videos/v2.mp4", // Skin Transformation
  "/videos/v4.mp4", // Brow Results
  "/videos/v5.mp4", // Nano Blading
  "/videos/v6.mp4", // Wake Up Beautiful
];

const HERO_POSTERS_MOBILE = [
  { src: "/videos/v5-poster.jpg",   pos: "65% 22%" }, // Nano Blading — shifted right to reveal more face
  { src: "/videos/v4-poster-a.jpg", pos: "62% 22%" }, // Brow Results — shifted right
  { src: "/videos/v6-poster.jpg",   pos: "center 22%" }, // Wake Up Beautiful — brow mapping (centered)
  { src: "/videos/v4-poster-b.jpg", pos: "62% 22%" }, // Brow Results — shifted right
];

function HeroSection({ bookingUrl }: { bookingUrl: string }) {
  const [deskIdx, setDeskIdx] = useState(0);
  const [deskNext, setDeskNext] = useState(1);
  const [mobIdx, setMobIdx] = useState(0);
  const [mobNext, setMobNext] = useState(1);
  const [deskFading, setDeskFading] = useState(false);
  const [mobFading, setMobFading] = useState(false);

  useEffect(() => {
    let st: ReturnType<typeof setTimeout>;
    const t = setInterval(() => {
      setDeskFading(true);
      st = setTimeout(() => {
        setDeskIdx(p => (p + 1) % HERO_VIDEOS_DESKTOP.length);
        setDeskNext(p => (p + 1) % HERO_VIDEOS_DESKTOP.length);
        setDeskFading(false);
      }, 1200);
    }, 6000);
    return () => { clearInterval(t); clearTimeout(st); };
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setMobFading(true);
      setTimeout(() => {
        setMobIdx(p => (p + 1) % HERO_POSTERS_MOBILE.length);
        setMobNext(p => (p + 1) % HERO_POSTERS_MOBILE.length);
        setMobFading(false);
      }, 1200);
    }, 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-[52vh] md:min-h-[calc(100dvh-72px)] flex items-center md:items-end overflow-hidden bg-white md:mt-[72px]" data-testid="hero-section">

      {/* ── MOBILE posters: static frames cycling ── */}
      <img
        key={`mob-a-${mobIdx}`}
        src={HERO_POSTERS_MOBILE[mobIdx].src}
        alt=""
        className="md:hidden absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms]"
        style={{ opacity: mobFading ? 0 : 1, objectPosition: HERO_POSTERS_MOBILE[mobIdx].pos }}
        aria-hidden="true"
      />
      <img
        key={`mob-b-${mobNext}`}
        src={HERO_POSTERS_MOBILE[mobNext].src}
        alt=""
        className="md:hidden absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms]"
        style={{ opacity: mobFading ? 1 : 0, objectPosition: HERO_POSTERS_MOBILE[mobNext].pos }}
        aria-hidden="true"
      />
      {/* Mobile gradient — left white for text, image more visible on right */}
      <div
        className="md:hidden absolute inset-0 pointer-events-none z-[1]"
        style={{ background: "linear-gradient(to right, white 0%, white 42%, rgba(255,255,255,0.40) 60%, rgba(255,255,255,0.04) 82%, rgba(255,255,255,0.0) 100%)" }}
      />

      {/* ── DESKTOP videos ── */}
      <video
        key={`desk-a-${deskIdx}`}
        src={HERO_VIDEOS_DESKTOP[deskIdx]}
        autoPlay muted loop playsInline preload="auto"
        className="hidden md:block absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms]"
        style={{ opacity: deskFading ? 0 : 1 }}
        aria-hidden="true"
        ref={(el) => { if (el) el.play().catch(() => {}); }}
      />
      <video
        key={`desk-b-${deskNext}`}
        src={HERO_VIDEOS_DESKTOP[deskNext]}
        autoPlay muted loop playsInline preload="auto"
        className="hidden md:block absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms]"
        style={{ opacity: deskFading ? 1 : 0 }}
        aria-hidden="true"
        ref={(el) => { if (el) el.play().catch(() => {}); }}
      />
      <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-[1]" />
      <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-white/60 pointer-events-none z-[1]" />

      {/* Desktop dots */}
      <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-20 gap-2">
        {HERO_VIDEOS_DESKTOP.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDeskIdx(i); setDeskNext((i + 1) % HERO_VIDEOS_DESKTOP.length); }}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === deskIdx ? "bg-black w-6" : "w-1.5 bg-black/30"}`}
            aria-label={`Video ${i + 1}`}
          />
        ))}
      </div>

      {/* Editorial content */}
      <div className="relative z-10 w-full pt-20 pb-8 md:pt-32 md:pb-28">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-2xl">

            <motion.div variants={fadeIn} className="flex items-center gap-3 mb-5 md:mb-10">
              <span className="block w-8 h-px bg-black/25" />
              <p className="text-[11px] font-medium tracking-[0.35em] uppercase text-zinc-500">
                La Jolla · San Diego
              </p>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="font-serif font-light text-black leading-[1.05] mb-5 md:mb-8"
              style={{ fontSize: "clamp(2.8rem, 8vw, 6.5rem)" }}
            >
              The Art<br />
              <em className="not-italic text-zinc-300">of</em> Perfect<br />
              Brows.
            </motion.h1>

            <motion.div variants={fadeIn} className="w-12 h-px bg-black/15 mb-5 md:mb-8" />

            <motion.p variants={fadeIn} className="hidden md:block text-base md:text-lg text-zinc-500 font-light leading-relaxed max-w-sm mb-7 md:mb-12">
              Microblading, permanent makeup, lash lifts, brow lamination, and lip blushing. Precision work, steady hands, and results that look unmistakably you. Crafted in the heart of La Jolla, San Diego.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-4 md:gap-5">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-hero-book"
                className="inline-flex items-center bg-black text-white px-7 py-3.5 md:px-8 md:py-4 text-[11px] tracking-[0.25em] uppercase font-semibold hover:bg-zinc-800 transition-colors duration-200"
              >
                Book a Consultation
              </a>
              <button
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 text-zinc-400 text-[11px] tracking-[0.25em] uppercase font-medium hover:text-black transition-colors duration-200 group"
              >
                See Services
                <span className="block w-5 h-px bg-current transition-all duration-300 group-hover:w-8" />
              </button>
            </motion.div>

            <motion.p variants={fadeIn} className="hidden md:block mt-4 md:mt-7 text-[10px] text-zinc-400 tracking-wider uppercase">
              Cherry · Afterpay · Klarna — from $50/mo
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint — desktop only */}
      <div className="absolute bottom-10 right-10 z-10 hidden md:flex flex-col items-center gap-2 opacity-30">
        <span className="text-[9px] tracking-[0.3em] uppercase text-black rotate-90 origin-center translate-y-3">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-black to-transparent"
        />
      </div>
    </section>
  );
}

function VideoCard({ label, instagramUrl, src, poster }: { label: string; instagramUrl?: string; src?: string; poster?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Build Instagram embed URL from the post URL
  const getEmbedUrl = (url: string) => {
    // Normalize: strip trailing slash, then append /embed/
    const base = url.replace(/\/$/, "");
    return `${base}/embed/`;
  };

  const handlePlay = () => {
    const vid = videoRef.current;
    if (!vid || !src) return;
    if (isPlaying) { vid.pause(); setIsPlaying(false); }
    else { vid.play(); setIsPlaying(true); }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const slug = label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div
      className="relative flex-shrink-0 w-[calc(100vw-56px)] md:w-[320px] aspect-[9/16] overflow-hidden bg-zinc-950 group border border-zinc-800"
      data-testid={`video-card-${slug}`}
    >
      {/* ── Instagram embed ── */}
      {instagramUrl ? (
        <iframe
          src={getEmbedUrl(instagramUrl)}
          className="absolute inset-0 w-full h-full border-none"
          scrolling="no"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
          title={`Instagram post — ${label}`}
        />
      ) : src ? (
        /* ── MP4 video — play only on explicit click ── */
        <div className="w-full h-full cursor-pointer" onClick={handlePlay}>
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            muted
            playsInline
            loop
            preload="none"
            className="w-full h-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
          {/* Cover overlay with play button — visible until user clicks play */}
          {!isPlaying && poster && (
            <div className="absolute inset-0">
              <img src={poster} alt={label} className="w-full h-full object-cover" />
            </div>
          )}
          {/* Play button */}
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none ${isPlaying ? "opacity-0" : "opacity-100"}`}>
            <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <Play className="w-5 h-5 text-white ml-0.5"/>
            </div>
          </div>
          {/* Unmute button while playing */}
          {isPlaying && (
            <button
              onClick={toggleMute}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center z-10"
              data-testid={`button-mute-${slug}`}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-white"/> : <Volume2 className="w-4 h-4 text-white"/>}
            </button>
          )}
        </div>
      ) : (
        /* ── Placeholder ── */
        <div className="w-full h-full bg-gradient-to-b from-zinc-800 to-zinc-950 flex items-center justify-center">
          <div className="text-center space-y-3 px-4">
            <div className="w-14 h-14 rounded-full border border-zinc-600 flex items-center justify-center mx-auto">
              <Play className="w-6 h-6 text-zinc-500 ml-1"/>
            </div>
            <p className="text-zinc-600 text-xs tracking-widest uppercase">Add Video</p>
          </div>
        </div>
      )}

      {/* Label badge — only shown for non-instagram (instagram has its own UI) */}
      {!instagramUrl && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-16 pb-4 px-4 pointer-events-none">
          <p className="text-white text-xs tracking-[0.2em] uppercase font-medium">{label}</p>
        </div>
      )}
    </div>
  );
}

function PreferredTimePicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const times = ["Morning 9–11am", "Midday 11am–2pm", "Afternoon 2–5pm", "Any Time"];
  const [selDays, setSelDays] = useState<string[]>([]);
  const [selTime, setSelTime] = useState("");

  const toggleDay = (d: string) => {
    setSelDays(prev => {
      const next = prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d];
      const parts = [];
      if (next.length) parts.push(next.join(", "));
      if (selTime) parts.push(selTime);
      onChange(parts.join(" · "));
      return next;
    });
  };
  const pickTime = (t: string) => {
    const next = t === selTime ? "" : t;
    setSelTime(next);
    const parts = [];
    if (selDays.length) parts.push(selDays.join(", "));
    if (next) parts.push(next);
    onChange(parts.join(" · "));
  };

  return (
    <div className="space-y-3 pt-1">
      <div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mb-2">Preferred Day</p>
        <div className="flex flex-wrap gap-2">
          {days.map(d => (
            <button key={d} type="button" onClick={() => toggleDay(d)}
              className={`px-3 py-1.5 text-xs tracking-wider border transition-colors select-none ${
                selDays.includes(d) ? "bg-black text-white border-black" : "bg-white text-zinc-600 border-zinc-300 hover:border-zinc-600"
              }`}>
              {d}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mb-2">Preferred Time</p>
        <div className="flex flex-wrap gap-2">
          {times.map(t => (
            <button key={t} type="button" onClick={() => pickTime(t)}
              className={`px-3 py-1.5 text-xs tracking-wider border transition-colors select-none ${
                selTime === t ? "bg-black text-white border-black" : "bg-white text-zinc-600 border-zinc-300 hover:border-zinc-600"
              }`}>
              {t}
            </button>
          ))}
        </div>
      </div>
      {value && (
        <p className="text-[10px] text-zinc-400 tracking-wide">✓ {value}</p>
      )}
    </div>
  );
}

function CountUp({ to, suffix = "", decimals = 0, from = 0 }: { to: number; suffix?: string; decimals?: number; from?: number }) {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1400;
        const steps = 60;
        const increment = (to - from) / steps;
        let current = from;
        const timer = setInterval(() => {
          current += increment;
          if (current >= to) { setCount(to); clearInterval(timer); }
          else { setCount(decimals > 0 ? parseFloat(current.toFixed(decimals)) : Math.round(current)); }
        }, duration / steps);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [to, from, decimals]);
  return <span ref={ref}>{decimals > 0 ? count.toFixed(decimals) : count}{suffix}</span>;
}

function BeforeAfterCard({ label, before, after, posB, posA }: { label: string; before: string; after: string; posB: string; posA: string }) {
  const [showAfter, setShowAfter] = useState(false);
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
      className="cursor-pointer select-none"
      onClick={() => setShowAfter((v) => !v)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100">
        <img
          src={before}
          alt={`${label} before`}
          className={`absolute inset-0 w-full h-full object-cover grayscale transition-opacity duration-500 ${showAfter ? "opacity-0" : "opacity-100"}`}
          style={{ objectPosition: posB }}
        />
        <img
          src={after}
          alt={`${label} after`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${showAfter ? "opacity-100" : "opacity-0"}`}
          style={{ objectPosition: posA }}
        />
        <div className="absolute bottom-0 left-0 right-0 flex">
          <div className={`flex-1 py-2 text-center text-[9px] tracking-[0.3em] uppercase font-medium transition-colors duration-300 ${!showAfter ? "bg-black text-white" : "bg-white/80 text-zinc-400"}`}>
            Before
          </div>
          <div className={`flex-1 py-2 text-center text-[9px] tracking-[0.3em] uppercase font-medium transition-colors duration-300 ${showAfter ? "bg-black text-white" : "bg-white/80 text-zinc-400"}`}>
            After
          </div>
        </div>
      </div>
      <p className="font-serif text-sm text-zinc-700 mt-4">{label}</p>
    </motion.div>
  );
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const galleryScrollRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const goToSlide = (index: number) => {
    const el = galleryScrollRef.current;
    if (!el) return;
    const card = el.children[index] as HTMLElement;
    if (!card) return;
    card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    setActiveSlide(index);
  };

  const scrollGallery = (dir: "left" | "right") => {
    const next = dir === "right"
      ? Math.min(activeSlide + 1, WORK_VIDEOS.length - 1)
      : Math.max(activeSlide - 1, 0);
    goToSlide(next);
  };

  const handleGalleryScroll = () => {
    const el = galleryScrollRef.current;
    if (!el) return;
    const centerX = el.scrollLeft + el.clientWidth / 2;
    let closest = 0;
    let minDist = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const card = child as HTMLElement;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(cardCenter - centerX);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setActiveSlide(closest);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      phone: "",
      service: "",
      date: "",
      smsConsent: false,
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Request Received",
      description: "We'll text or call you within 24 hours.",
    });
    form.reset();
  }

  const bookingUrl = "https://square.site/appointments/book/2H4Q2RWG1Q1QF/browboss-brow-beauty-san-diego-ca";

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-primary-foreground">

      {/* Mobile Sticky Call Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex border-t border-zinc-200 bg-white shadow-[0_-2px_16px_rgba(0,0,0,0.08)]">
        <a
          href="tel:+18583220010"
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-black text-white text-sm font-medium tracking-widest uppercase active:bg-zinc-800 transition-colors"
        >
          <Phone className="w-4 h-4" />
          Call Now
        </a>
        <a
          href="https://square.site/book/LF5CXE2RGFHEF/browboss-la-jolla-ca"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-white text-black text-sm font-medium tracking-widest uppercase border-l border-zinc-200 active:bg-zinc-50 transition-colors"
        >
          Book Now
        </a>
      </div>

      {/* Sticky Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-zinc-100 py-4 transition-all duration-300"
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 z-50">
            <img 
              src="https://browboss.com/img/logo.svg" 
              alt="BrowBoss Logo" 
              className="h-12 w-auto transition-all duration-300 brightness-0"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = document.createElement('span');
                fallback.className = 'font-serif font-bold text-2xl tracking-[0.2em] text-black';
                fallback.textContent = 'BROWBOSS';
                e.currentTarget.parentElement?.appendChild(fallback);
              }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-black">
            <a href="#services" className="text-sm font-medium tracking-widest uppercase hover:opacity-70 transition-opacity">Services</a>
            <a href="#gallery" className="text-sm font-medium tracking-widest uppercase hover:opacity-70 transition-opacity">Gallery</a>
            <a href="#about" className="text-sm font-medium tracking-widest uppercase hover:opacity-70 transition-opacity">About</a>
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium tracking-widest uppercase hover:opacity-70 transition-opacity">Book</a>
            <a href="tel:8583220010" className="text-sm font-medium tracking-widest uppercase hover:opacity-70 transition-opacity flex items-center gap-2">
              <Phone className="w-4 h-4" />
              (858) 322-0010
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-black" />
            ) : (
              <Menu className="w-6 h-6 text-black" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-8 pt-16">
          <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif tracking-widest uppercase">Services</a>
          <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif tracking-widest uppercase">Gallery</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif tracking-widest uppercase">About</a>
          <a href={bookingUrl} target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif tracking-widest uppercase">Book</a>
          <a href="tel:8583220010" className="text-xl font-medium tracking-widest uppercase mt-8 flex items-center gap-2">
            <Phone className="w-5 h-5" />
            (858) 322-0010
          </a>
        </div>
      )}

      {/* Hero Section */}
      <HeroSection bookingUrl={bookingUrl} />

      {/* Trust Bar */}
      <section className="bg-zinc-950 text-white border-b border-zinc-900 overflow-hidden">
        {/* Mobile: scrolling marquee */}
        <div className="md:hidden py-3 overflow-hidden">
          <div className="marquee-track text-[10px] tracking-[0.28em] uppercase font-medium text-zinc-300 whitespace-nowrap">
            {[0, 1].map(i => (
              <span key={i} className="flex items-center gap-0">
                <span className="flex items-center gap-2 px-6"><Star className="w-2.5 h-2.5 fill-zinc-300 shrink-0" />4.9 on Google</span>
                <span className="text-zinc-700 px-1">◆</span>
                <span className="px-6">500+ Reviews</span>
                <span className="text-zinc-700 px-1">◆</span>
                <span className="px-6">Licensed &amp; Insured</span>
                <span className="text-zinc-700 px-1">◆</span>
                <span className="px-6">10+ Years Experience</span>
                <span className="text-zinc-700 px-1">◆</span>
                <span className="px-6">8,000+ Procedures</span>
                <span className="text-zinc-700 px-1">◆</span>
                <span className="px-6">La Jolla, San Diego</span>
                <span className="text-zinc-700 px-1">◆</span>
              </span>
            ))}
          </div>
        </div>
        {/* Desktop: static row */}
        <div className="hidden md:block py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-x-8 text-[10px] md:text-xs tracking-[0.2em] uppercase text-center font-medium">
              <span className="flex items-center gap-1.5"><Star className="w-3 h-3 fill-white" /> 4.9 on Google · 500+ Reviews</span>
              <span className="text-zinc-700">|</span>
              <span>Licensed &amp; Insured</span>
              <span className="text-zinc-700">|</span>
              <span>10+ Years · 8,000+ Procedures</span>
              <span className="text-zinc-700">|</span>
              <span>La Jolla, San Diego</span>
            </div>
          </div>
        </div>
      </section>

      {/* Intro · Press · Stats — unified */}
      <div className="bg-white px-6 pt-10 pb-10 md:pt-14 md:pb-12">
        <div className="max-w-xl mx-auto text-center">

          {/* Service tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-7">
            {["Microblading", "Permanent Makeup", "Lash Lifts", "Brow Lamination", "Lip Blushing"].map(s => (
              <span key={s} className="text-[10px] tracking-[0.22em] uppercase text-zinc-400 border border-zinc-200 px-3 py-1.5 rounded-full">
                {s}
              </span>
            ))}
          </div>

          {/* Pull quote */}
          <p className="font-serif font-light text-zinc-800 text-2xl md:text-3xl leading-snug mb-5">
            Precision work, steady hands,<br className="hidden sm:block" /> and results that look{" "}
            <em className="not-italic text-black font-normal">unmistakably you.</em>
          </p>

          {/* Location */}
          <p className="text-[11px] tracking-[0.3em] uppercase text-zinc-400 flex items-center justify-center gap-2">
            <MapPin className="w-3 h-3" />
            La Jolla, San Diego
          </p>

          {/* Divider */}
          <div className="mt-10 mb-10 h-px bg-zinc-100 max-w-xs mx-auto" />

          {/* Stats — 2×2 mobile / 4-col desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-y md:divide-y-0 divide-zinc-100 border border-zinc-100">
            {[
              { to: 500,  from: 480, suffix: "+", label: "Clients Served",  sub: "",                      decimals: 0 },
              { to: 4.9,  from: 4.8, suffix: "",  label: "★★★★★",           sub: "Rated on Google",       decimals: 1 },
              { to: 10,   from: 0,   suffix: "+", label: "Years of Mastery", sub: "",                      decimals: 0 },
              { to: 8000, from: 7800,suffix: "+", label: "Procedures",       sub: "& counting",            decimals: 0 },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" } } }}
                className="flex flex-col items-center justify-center py-7 px-4 text-center gap-1"
              >
                <p className="font-serif text-4xl md:text-5xl font-light tracking-tight leading-none">
                  <CountUp to={item.to} from={item.from} suffix={item.suffix} decimals={item.decimals} />
                </p>
                <p className="text-[9px] uppercase tracking-[0.28em] text-zinc-800 mt-2 font-medium">{item.label}</p>
                {item.sub && <p className="text-[9px] tracking-[0.15em] text-zinc-400">{item.sub}</p>}
              </motion.div>
            ))}
          </div>

          {/* Location strip */}
          <div className="mt-10 -mx-6 bg-black py-2.5 px-6">
            <p className="text-center text-[9px] tracking-[0.35em] uppercase text-white">
              La Jolla&ensp;·&ensp;Del Mar&ensp;·&ensp;Pacific Beach&ensp;·&ensp;Carmel Valley&ensp;·&ensp;San Diego
            </p>
          </div>

        </div>
      </div>

      {/* Services Grid */}
      <section id="services" className="pt-10 pb-16 md:pt-12 md:pb-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-10"
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-400 mb-4">La Jolla Brow &amp; Beauty</p>
            <h2 className="text-5xl md:text-6xl font-serif font-light mb-3">Our Signature Treatments</h2>
            <p className="text-sm text-zinc-400 tracking-wide">Eight services. One studio. Crafted for you.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {SERVICES.map((service, index) => (
              <motion.div 
                key={service.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { delay: index * 0.1, duration: 0.5 } }
                }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100 mb-6">
                  <img 
                    src={service.image} 
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ objectPosition: (service as any).objectPosition ?? "center" }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <span className="text-white text-sm tracking-widest uppercase font-medium flex items-center gap-2">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
                <h3 className="font-serif text-xl mb-2">{service.name}</h3>
                <p className="text-sm tracking-widest text-zinc-500 uppercase">{service.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Showcase — Vertical Video Reels */}
      <section id="gallery" className="py-14 md:py-20 bg-white overflow-hidden border-t border-zinc-100">

        {/* Header */}
        <div className="container mx-auto px-6 md:px-10 mb-10 md:mb-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeIn}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-px bg-black/25" />
                <p className="text-[10px] tracking-[0.38em] uppercase text-zinc-400">Our Work</p>
              </div>
              <h2 className="text-4xl md:text-6xl font-serif text-black leading-[1.05]">
                See the<br />Transformation
              </h2>
            </div>

            <div className="flex flex-col gap-5 items-start md:items-end">
              <p className="text-zinc-400 text-sm max-w-[200px] leading-relaxed md:text-right font-light">
                Real procedures, real results.<br className="hidden md:block" /> Tap any clip to play.
              </p>
              {/* Desktop scroll arrows */}
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => scrollGallery("left")}
                  aria-label="Scroll left"
                  className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center hover:border-black transition-colors group"
                >
                  <ChevronLeft className="w-4 h-4 text-zinc-400 group-hover:text-black transition-colors" />
                </button>
                <button
                  onClick={() => scrollGallery("right")}
                  aria-label="Scroll right"
                  className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center hover:border-black transition-colors group"
                >
                  <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-black transition-colors" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scrollable strip with edge fades */}
        <div className="relative">
          {/* Edge fade — left (desktop only) */}
          <div className="hidden md:block absolute left-0 top-0 bottom-4 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          {/* Edge fade — right (desktop only) */}
          <div className="hidden md:block absolute right-0 top-0 bottom-4 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div
            ref={galleryScrollRef}
            onScroll={handleGalleryScroll}
            className="flex gap-4 px-7 md:px-16 overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {WORK_VIDEOS.map((video, i) => (
              <motion.div
                key={video.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.07, duration: 0.55, ease: "easeOut" }}
                className="snap-center"
              >
                <VideoCard {...video} />
              </motion.div>
            ))}
          </div>

          {/* Mobile prev/next floating arrows */}
          <button
            onClick={() => scrollGallery("left")}
            aria-label="Previous clip"
            className={`md:hidden absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 shadow-md border border-zinc-200 flex items-center justify-center transition-opacity duration-200 ${activeSlide === 0 ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          >
            <ChevronLeft className="w-4 h-4 text-black" />
          </button>
          <button
            onClick={() => scrollGallery("right")}
            aria-label="Next clip"
            className={`md:hidden absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 shadow-md border border-zinc-200 flex items-center justify-center transition-opacity duration-200 ${activeSlide === WORK_VIDEOS.length - 1 ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          >
            <ChevronRight className="w-4 h-4 text-black" />
          </button>
        </div>

        {/* Mobile dots pagination */}
        <div className="md:hidden flex items-center justify-center gap-1.5 mt-2 mb-2">
          {WORK_VIDEOS.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`Go to clip ${i + 1}`}
              className={`transition-all duration-300 rounded-full ${i === activeSlide ? "w-5 h-1.5 bg-black" : "w-1.5 h-1.5 bg-zinc-300"}`}
            />
          ))}
        </div>

        {/* Footer row */}
        <div className="container mx-auto px-6 md:px-10 mt-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-6 h-px bg-zinc-200" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-300">{WORK_VIDEOS.length} clips</span>
          </div>
          <a
            href="https://www.instagram.com/browbosslajolla"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-black text-[11px] tracking-[0.22em] uppercase transition-colors"
            data-testid="link-instagram-gallery"
          >
            <Instagram className="w-3.5 h-3.5" />
            @browbosslajolla
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* Quick Answers */}
      <section className="py-14 md:py-20 bg-[#F5F1EC]">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-light mb-3">Quick Answers Before You Book</h2>
            <p className="text-sm text-zinc-500 tracking-wide">The most common questions, answered in 10 seconds.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: "🌿",
                q: "Does it hurt?",
                a: "Most clients describe it as mild scratching. We use medical-grade numbing cream so you stay comfortable from start to finish.",
              },
              {
                icon: "⏳",
                q: "How long does it last?",
                a: "Microblading and permanent makeup last 1–3 years. Lash lifts last 6–8 weeks. Brow lamination lasts 4–6 weeks.",
              },
              {
                icon: "💳",
                q: "What does it cost?",
                a: "Services start at $45. Permanent makeup from $550. Pay over time from $50/month with Cherry, Afterpay, or Klarna.",
              },
              {
                icon: "🛡️",
                q: "Is it safe?",
                a: "Yes. California-licensed, fully insured, single-use disposable tools. Over 500 women have trusted us with their face.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.q}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" } } }}
                className="bg-white rounded-xl p-5 flex flex-col gap-3 shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
              >
                <span className="text-2xl">{item.icon}</span>
                <p className="font-semibold text-sm leading-snug">{item.q}</p>
                <p className="text-xs text-zinc-500 leading-relaxed">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Reframing */}
      <section className="py-16 md:py-24 bg-[#F5F1EC]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="relative aspect-[3/4] max-w-md mx-auto w-full"
            >
              <img 
                src="/images/value-model.jpg" 
                alt="Perfect microbladed brows" 
                className="w-full h-full object-cover"
                style={{ objectPosition: "top" }}
              />
            </motion.div>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="max-w-xl"
            >
              <motion.p variants={fadeIn} className="text-xs font-medium tracking-[0.2em] uppercase text-zinc-500 mb-4">
                THE REAL COST OF NOT DOING IT
              </motion.p>
              <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
                Stop Spending $1,200 a Year on Brow Pencils
              </motion.h2>
              <motion.p variants={fadeIn} className="text-lg text-zinc-600 mb-12 font-light leading-relaxed">
                The average woman spends 15 minutes a day drawing her brows and over $1,200 a year on pencils, pomades, and gels. Permanent makeup isn't an expense—it's an investment in your most valuable asset: your time. For just $0.55 a day, wake up with flawless brows for the next 3 years.
              </motion.p>
              
              <motion.div variants={fadeIn} className="divide-y divide-zinc-200 md:divide-y-0 border-t border-zinc-300 md:grid md:grid-cols-3 md:gap-8 md:pt-8">
                {[
                  { value: "$0.55/day", label: "Cost over 3 years" },
                  { value: "91 hours",  label: "Time saved per year" },
                  { value: "3 years",   label: "Of waking up ready" },
                ].map(({ value, label }) => (
                  <div key={label} className="flex items-center justify-between md:block py-5 md:py-0">
                    <p className="text-3xl font-serif md:mb-2">{value}</p>
                    <p className="text-xs uppercase tracking-wider text-zinc-500 text-right md:text-left">{label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Your BrowBoss Experience</h2>
            <div className="w-12 h-px bg-black mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              { num: "01", title: "Complimentary Consultation", desc: "15-30 min, no pressure. We discuss your goals, analyze your skin type, and recommend the best technique." },
              { num: "02", title: "Custom Design, Perfected", desc: "Using golden ratio mapping, we draw your ideal shape. We don't start until you approve every detail." },
              { num: "03", title: "Results That Last", desc: "Wake up ready for up to 3 years. Includes a complimentary 6-week touch-up session worth $150." }
            ].map((step, i) => (
              <motion.div 
                key={step.num}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { delay: i * 0.2, duration: 0.6 } }
                }}
                className="text-center"
              >
                <div className="text-6xl md:text-8xl font-serif text-zinc-100 mb-6">{step.num}</div>
                <h3 className="text-xl font-serif mb-4">{step.title}</h3>
                <p className="text-zinc-500 font-light leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-white border-t border-zinc-100" style={{ backgroundColor: "#FAFAF9" }}>
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-12 md:mb-16"
          >
            <p className="text-[10px] tracking-[0.35em] uppercase text-zinc-400 mb-3">Client Stories</p>
            <h2 className="text-4xl md:text-5xl font-serif text-black mb-4">Loved by Hundreds of Women Across San Diego</h2>
            <div className="w-12 h-px bg-black/20 mx-auto mb-6"></div>
            <p className="text-zinc-400 text-sm tracking-wide">4.9 ★ · 247 verified reviews on Yelp</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Charmi T.",
                location: "San Diego, CA",
                date: "January 2026",
                service: "Microblading",
                quote: "BrowBoss is absolutely amazing! From the moment you walk in, you're welcomed with professionalism, warmth, and genuine care. The attention to detail is unmatched — my brows have never looked better. Leslie is a master at her craft. I trust them completely and wouldn't let anyone else touch my brows.",
                initials: "CT"
              },
              {
                name: "Alison B.",
                location: "San Diego, CA",
                date: "April 2026",
                service: "Microblading",
                quote: "I'd been hesitant about microblading as a blonde — worried about being matched with the right color. Leslie completely exceeded my expectations! The shape is perfect, and the color matches my hair and skin beautifully. I feel more youthful and confident already. I cannot recommend her more highly.",
                initials: "AB"
              },
              {
                name: "Tiara N.",
                location: "San Jose, CA",
                date: "January 2025",
                service: "Microblading",
                quote: "Leslie took the consultation process very seriously, including looking at photos of how I normally fill in my eyebrows and offering advice on what brow shape would best suit my face. It's been a few weeks since my touch-up and I have never been more in love with my eyebrows. They look so natural.",
                initials: "TN"
              },
              {
                name: "Mur B.",
                location: "Santa Barbara, CA",
                date: "March 2026",
                service: "Brow Shaping",
                quote: "I was so nervous because I'm an artist and I know how one tiny shape could make it right or make it wrong. Leslie is the brow master and just a joy to work with. She listens, repeats back, reassures you then gets to work. Why didn't I do this sooner?",
                initials: "MB"
              },
              {
                name: "John E.",
                location: "San Diego, CA",
                date: "August 2025",
                service: "Brow Shaping",
                quote: "Fabiola assessed the facial shape, drew some lines before removing anything, and offered multiple opportunities for feedback and tweaking. I had no notes — she nailed it. I've been on the hunt for exactly this for years. Fellas: visit BrowBoss.",
                initials: "JE"
              },
            ].map((review, i) => (
              <motion.div 
                key={review.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { delay: (i % 3) * 0.15, duration: 0.6 } }
                }}
                className="bg-[#F5F1EC] p-8 md:p-10 flex flex-col h-full"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-black text-black" />
                    ))}
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-300">{review.service}</span>
                </div>
                <p className="text-base font-serif italic font-light leading-relaxed mb-8 flex-grow text-zinc-700">
                  "{review.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center font-serif text-sm tracking-widest text-zinc-400 bg-white flex-shrink-0">
                    {review.initials}
                  </div>
                  <div>
                    <p className="font-serif text-base text-black">{review.name}</p>
                    <p className="text-[10px] uppercase tracking-wider text-zinc-400">{review.location} · {review.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mt-12"
          >
            <a
              href="https://www.yelp.com/biz/browboss-brow-and-beauty-san-diego-2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-[0.25em] uppercase text-zinc-400 hover:text-black transition-colors border-b border-zinc-200 hover:border-black pb-0.5"
            >
              Read all 247 reviews on Yelp
            </a>
          </motion.div>
        </div>
      </section>

      {/* Meet Leslie */}
      <section id="about" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="order-2 md:order-1"
            >
              <motion.p variants={fadeIn} className="text-xs font-medium tracking-[0.2em] uppercase text-zinc-500 mb-4">
                MEET YOUR ARTIST
              </motion.p>
              <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
                Leslie Ritchie, Founder & Lead Artist
              </motion.h2>
              <motion.p variants={fadeIn} className="text-lg text-zinc-600 mb-6 font-light leading-relaxed">
                With over a decade of experience and 8,000+ procedures performed, Leslie is one of Southern California's most sought-after permanent makeup artists.
              </motion.p>
              <motion.p variants={fadeIn} className="text-lg text-zinc-600 mb-10 font-light leading-relaxed">
                Trained by the prestigious Phibrows Academy and having taught over 1,500 students her proprietary techniques, Leslie brings an unparalleled level of precision, artistry, and clinical safety to every face she touches.
              </motion.p>
              <motion.div variants={fadeIn}>
                <Button asChild size="lg" className="bg-black text-white hover:bg-zinc-800 rounded-none h-14 px-8 tracking-wider uppercase">
                  <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                    Book with Leslie <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </motion.div>
            </motion.div>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="order-1 md:order-2 relative aspect-[4/5]"
            >
              <img 
                src="/images/leslie-founder.jpg" 
                alt="Leslie Ritchie" 
                className="w-full h-full object-cover object-top"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-14 md:py-20 bg-zinc-50 border-t border-zinc-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-10 md:mb-14"
          >
            <p className="text-[10px] tracking-[0.35em] uppercase text-zinc-400 mb-3">The Artists</p>
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Our Team</h2>
            <div className="w-8 h-px bg-black mx-auto" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-6 md:gap-8"
          >
            {[
              { name: "Leslie Ritchie",     role: "Founder & Master Brow Specialist", img: "/images/leslie-founder.jpg",  pos: "top" },
              { name: "Marwa",              role: "Esthetician",                      img: "/images/team-fabiola.jpg",    pos: "top" },

              { name: "Marisol Murillo",    role: "Lip Blush Specialist",             img: "/images/team-marisol.jpg",    pos: "top" },
              { name: "Jackielou Tantay",   role: "Eyebrow Specialist",               img: "/images/team-jackielou.jpg",  pos: "top" },
            ].map((member) => (
              <motion.div key={member.name} variants={fadeIn} className="group w-[calc(50%-12px)] md:w-44">
                <div className="aspect-[3/4] overflow-hidden mb-4 bg-zinc-200">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    style={{ objectPosition: member.pos }}
                  />
                </div>
                <p className="font-serif text-sm md:text-base text-zinc-900">{member.name}</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-zinc-400 mt-1">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Before & After */}
      <section id="transformations" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-10 md:mb-14"
          >
            <p className="text-[10px] tracking-[0.35em] uppercase text-zinc-400 mb-3">Real Results</p>
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Before & After</h2>
            <div className="w-8 h-px bg-black mx-auto mb-4" />
            <p className="text-zinc-400 text-sm tracking-wide">Tap to reveal</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {[
              {
                label: "Microblading",
                before: "/images/ba-micro-before.jpg",
                after:  "/images/ba-micro-after.jpg",
                posB: "top", posA: "top",
              },
              {
                label: "Brow Shaping",
                before: "/images/ba-brow-before.jpg",
                after:  "/images/ba-brow-after.jpg",
                posB: "top", posA: "top",
              },
              {
                label: "Lash Lift",
                before: "/images/ba-lash-before.jpg",
                after:  "/images/ba-lash-after.jpg",
                posB: "center", posA: "top",
              },
              {
                label: "Alopecia · Brow Restoration",
                before: "/images/ba-alopecia-before.jpg",
                after:  "/images/ba-alopecia-after.jpg",
                posB: "top", posA: "top",
              },
            ].map((pair) => (
              <BeforeAfterCard key={pair.label} {...pair} />
            ))}
          </div>
        </div>
      </section>

      {/* Financing */}
      <section className="py-20 bg-[#F5F1EC] border-y border-zinc-200">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-3xl font-serif mb-12"
          >
            Beauty Within Reach
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-10">
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold tracking-tight mb-2">CHERRY</span>
              <span className="text-xs uppercase tracking-widest text-zinc-500">Pre-qualify in 60s • 0% APR</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold tracking-tight mb-2">afterpay<span className="text-[10px] align-super">®</span></span>
              <span className="text-xs uppercase tracking-widest text-zinc-500">4 interest-free payments</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold tracking-tight mb-2">Klarna.</span>
              <span className="text-xs uppercase tracking-widest text-zinc-500">Pay in 4 or over time</span>
            </div>
          </div>
          <p className="text-sm text-zinc-500 font-light tracking-wide">
            All services include a complimentary 6-week touch-up session.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-serif mb-4">Book Your Free Consultation</h2>
              <div className="w-12 h-px bg-black mx-auto mb-6"></div>
              <p className="text-zinc-600 font-light">Fill out the form below and our team will contact you to schedule your consultation.</p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-widest text-zinc-500">First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Jane" className="rounded-none border-zinc-300 focus-visible:ring-black h-12" {...field} />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-widest text-zinc-500">Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="(555) 000-0000" className="rounded-none border-zinc-300 focus-visible:ring-black h-12" {...field} />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-widest text-zinc-500">Service of Interest</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-none border-zinc-300 focus:ring-black h-12">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {SERVICES.map((s) => (
                              <SelectItem key={s.name} value={s.name}>{s.name}</SelectItem>
                            ))}
                            <SelectItem value="not-sure">Not sure yet</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-widest text-zinc-500">Preferred Day &amp; Time</FormLabel>
                        <FormControl>
                          <PreferredTimePicker value={field.value} onChange={field.onChange} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="smsConsent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="rounded-none border-zinc-300 data-[state=checked]:bg-black data-[state=checked]:text-white mt-1"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-light text-zinc-600">
                            I agree to receive SMS text messages regarding my appointment.
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full bg-black text-white hover:bg-zinc-800 rounded-none h-14 text-sm tracking-widest uppercase mt-4">
                    Get My Free Consultation
                  </Button>
                  <p className="text-center text-xs text-zinc-400 mt-4">
                    We'll text or call you within 24 hours. No spam, ever.
                  </p>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Instagram Feed Teaser */}
      <section id="gallery" className="py-24 bg-zinc-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl md:text-3xl font-serif mb-12 flex items-center justify-center gap-3">
              <Instagram className="w-6 h-6" />
              Follow Our Work <a href="https://www.instagram.com/browbosslajolla" target="_blank" rel="noopener noreferrer" className="underline decoration-1 underline-offset-4 hover:opacity-70">@browbosslajolla</a>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4 max-w-7xl mx-auto">
              {[
                "/videos/v14-f35.jpg",
                "/images/ba-brow-after.jpg",
                "/videos/v13-f3.jpg",
                "/videos/v12-f2.jpg",
                "/videos/v7-f17.jpg",
                "/images/leslie-founder.jpg"
              ].map((src, i) => (
                <a href="https://www.instagram.com/browbosslajolla" target="_blank" rel="noopener noreferrer" key={i} className="relative aspect-square overflow-hidden group block bg-zinc-200">
                  <img 
                    src={src} 
                    alt="Instagram Post" 
                    className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Instagram className="w-8 h-8 text-white" />
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-zinc-500 pt-16 pb-24 md:py-24 font-light text-sm border-t border-zinc-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 border-b border-zinc-100 pb-16 mb-12">
            <div className="md:col-span-1">
              <img 
                src="https://browboss.com/img/logo.svg" 
                alt="BrowBoss" 
                className="h-8 brightness-0 mb-6 opacity-70"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement?.insertAdjacentHTML('beforeend', '<span class="font-serif font-bold text-2xl tracking-wider text-black">BROWBOSS</span>');
                }}
              />
              <p className="mb-6 max-w-xs text-zinc-400">
                San Diego's premier destination for effortless beauty and permanent makeup.
              </p>
              <div className="flex gap-4 items-center">
                <a href="https://www.instagram.com/browbosslajolla" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-black transition-colors" aria-label="Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.facebook.com/browbosslajolla" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-black transition-colors" aria-label="Facebook">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://www.youtube.com/@browbosslajolla" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-black transition-colors" aria-label="YouTube">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="https://www.pinterest.com/browbosslajolla" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-black transition-colors" aria-label="Pinterest">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-black font-medium tracking-widest uppercase mb-6 text-xs">Contact</h4>
              <ul className="space-y-4 text-zinc-400">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <a href="https://maps.google.com/?q=1150+Silverado+Street+Suite+308+La+Jolla+CA+92037" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
                    1150 Silverado St Suite 308<br />La Jolla, CA 92037
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 shrink-0" />
                  <a href="tel:8583220010" className="hover:text-black transition-colors">(858) 322-0010</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 shrink-0" />
                  <a href="mailto:INFO@BROWBOSS.COM" className="hover:text-black transition-colors uppercase">INFO@BROWBOSS.COM</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-black font-medium tracking-widest uppercase mb-6 text-xs">Hours</h4>
              <ul className="space-y-3 text-zinc-400 text-sm">
                <li className="flex justify-between gap-6">
                  <span>Tue – Sat</span>
                  <span>9AM – 5PM</span>
                </li>
                <li className="flex justify-between gap-6">
                  <span>Monday</span>
                  <span className="tracking-wider text-xs">By Appt</span>
                </li>
                <li className="flex justify-between gap-6 text-zinc-300">
                  <span>Sunday</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-black font-medium tracking-widest uppercase mb-6 text-xs">Links</h4>
              <ul className="space-y-4 uppercase tracking-wider text-xs text-zinc-400">
                <li><a href="#services" className="hover:text-black transition-colors">Services</a></li>
                <li><a href="#gallery" className="hover:text-black transition-colors">Gallery</a></li>
                <li><a href="#about" className="hover:text-black transition-colors">About</a></li>
                <li><a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="text-black font-medium hover:opacity-60 transition-opacity">Book Appointment</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-300 uppercase tracking-widest">
            <p>© 2025 BrowBoss Brow & Beauty. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}