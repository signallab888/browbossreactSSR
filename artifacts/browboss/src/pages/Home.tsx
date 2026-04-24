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
  ArrowRight,
  Play,
  Volume2,
  VolumeX
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
  { label: "My Story", src: "/videos/v1.mp4" },
  { label: "Skin Transformation", src: "/videos/v2.mp4" },
  { label: "The Process", src: "/videos/v3.mp4" },
  { label: "Brow Results", src: "/videos/v4.mp4" },
  { label: "Nano Blading", src: "/videos/v5.mp4" },
  { label: "Wake Up Beautiful", src: "/videos/v6.mp4" },
];

const SERVICES = [
  { name: "Microblading & Shading", price: "from $600", image: "/images/service-brows.png" },
  { name: "Ombre Powder Brows", price: "from $650", image: "/images/service-lashes.png" },
  { name: "Lip Blushing", price: "from $550", image: "/images/service-brows.png" },
  { name: "Lash Lift", price: "from $95", image: "/images/service-lashes.png" },
  { name: "Brow Lamination", price: "from $85", image: "/images/service-brows.png" },
  { name: "Brow Shaping", price: "from $45", image: "/images/service-lashes.png" },
  { name: "Scalp Micropigmentation SMP", price: "from $800", image: "/images/service-brows.png" },
  { name: "Custom Facials", price: "from $120", image: "/images/service-lashes.png" },
];

const HERO_VIDEOS_DESKTOP = [
  "/videos/v2.mp4", // Skin Transformation
  "/videos/v4.mp4", // Brow Results
  "/videos/v5.mp4", // Nano Blading
  "/videos/v6.mp4", // Wake Up Beautiful
];

const HERO_POSTERS_MOBILE = [
  "/videos/v5-poster.jpg", // Nano Blading
  "/videos/v6-poster.jpg", // Wake Up Beautiful
];

function HeroSection({ bookingUrl }: { bookingUrl: string }) {
  const [deskIdx, setDeskIdx] = useState(0);
  const [deskNext, setDeskNext] = useState(1);
  const [mobIdx, setMobIdx] = useState(0);
  const [mobNext, setMobNext] = useState(1);
  const [deskFading, setDeskFading] = useState(false);
  const [mobFading, setMobFading] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setDeskFading(true);
      setTimeout(() => {
        setDeskIdx(p => (p + 1) % HERO_VIDEOS_DESKTOP.length);
        setDeskNext(p => (p + 1) % HERO_VIDEOS_DESKTOP.length);
        setDeskFading(false);
      }, 1200);
    }, 6000);
    return () => clearInterval(t);
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
    <section className="relative md:min-h-[100dvh] flex items-center md:items-end overflow-hidden bg-white" data-testid="hero-section">

      {/* ── MOBILE posters: static frames cycling ── */}
      <img
        key={`mob-a-${mobIdx}`}
        src={HERO_POSTERS_MOBILE[mobIdx]}
        alt=""
        className="md:hidden absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms]"
        style={{ opacity: mobFading ? 0 : 1, objectPosition: "right center" }}
        aria-hidden="true"
      />
      <img
        key={`mob-b-${mobNext}`}
        src={HERO_POSTERS_MOBILE[mobNext]}
        alt=""
        className="md:hidden absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms]"
        style={{ opacity: mobFading ? 1 : 0, objectPosition: "right center" }}
        aria-hidden="true"
      />
      {/* Mobile gradient — left=white (text zone), right=image */}
      <div
        className="md:hidden absolute inset-0 pointer-events-none z-[1]"
        style={{ background: "linear-gradient(to right, white 0%, white 50%, rgba(255,255,255,0.55) 65%, rgba(255,255,255,0.08) 88%, rgba(255,255,255,0.0) 100%)" }}
      />

      {/* ── DESKTOP videos ── */}
      <video
        key={`desk-a-${deskIdx}`}
        src={HERO_VIDEOS_DESKTOP[deskIdx]}
        autoPlay muted loop playsInline
        className="hidden md:block absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms]"
        style={{ opacity: deskFading ? 0 : 1 }}
        aria-hidden="true"
      />
      <video
        key={`desk-b-${deskNext}`}
        src={HERO_VIDEOS_DESKTOP[deskNext]}
        autoPlay muted loop playsInline
        className="hidden md:block absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms]"
        style={{ opacity: deskFading ? 1 : 0 }}
        aria-hidden="true"
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

            <motion.p variants={fadeIn} className="text-base md:text-lg text-zinc-500 font-light leading-relaxed max-w-sm mb-7 md:mb-12">
              Precision microblading, permanent makeup &amp; luxury beauty treatments — crafted for faces that deserve the finest.
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

            <motion.p variants={fadeIn} className="mt-4 md:mt-7 text-[10px] text-zinc-400 tracking-wider uppercase">
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
      className="relative flex-shrink-0 w-[280px] md:w-[320px] aspect-[9/16] overflow-hidden bg-zinc-950 group border border-zinc-800"
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
        /* ── MP4 video — autoplay muted on hover, unmute on click ── */
        <div
          className="w-full h-full"
          onMouseEnter={() => { videoRef.current?.play(); setIsPlaying(true); }}
          onMouseLeave={() => { videoRef.current?.pause(); videoRef.current && (videoRef.current.currentTime = 0); setIsPlaying(false); }}
        >
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            muted
            playsInline
            loop
            preload="metadata"
            className="w-full h-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
          {/* Play indicator shown when not hovering */}
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

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

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
      {/* Sticky Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-sm border-b border-zinc-100 py-4"
            : "bg-white border-b border-zinc-100 py-4 md:bg-white/0 md:border-transparent md:py-6"
        }`}
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
      <section className="bg-zinc-950 text-white py-3 border-b border-zinc-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[10px] md:text-xs tracking-[0.2em] uppercase text-center font-medium">
            <span className="flex items-center gap-1.5"><Star className="w-3 h-3 fill-white" /> 4.9 on Google · 500+ Reviews</span>
            <span className="hidden md:inline text-zinc-700">|</span>
            <span>Licensed &amp; Insured</span>
            <span className="hidden md:inline text-zinc-700">|</span>
            <span>10+ Years · 8,000+ Procedures</span>
            <span className="hidden md:inline text-zinc-700">|</span>
            <span>La Jolla, San Diego</span>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Our Services</h2>
            <div className="w-12 h-px bg-black mx-auto"></div>
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
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale"
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
      <section id="gallery" className="py-20 md:py-28 bg-zinc-50 overflow-hidden border-t border-zinc-100">
        <div className="container mx-auto px-4 mb-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeIn}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4"
          >
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-zinc-400 mb-3">Our Work</p>
              <h2 className="text-4xl md:text-5xl font-serif text-black leading-tight">
                See the<br />Transformation
              </h2>
            </div>
            <p className="text-zinc-400 text-sm max-w-xs leading-relaxed">
              Real procedures, real results. Hover any clip to play.
            </p>
          </motion.div>
        </div>

        {/* Horizontally scrollable video strip */}
        <div className="flex gap-4 px-4 md:px-8 overflow-x-auto pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {WORK_VIDEOS.map((video, i) => (
            <motion.div
              key={video.label}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="snap-start"
            >
              <VideoCard {...video} />
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 mt-8">
          <a
            href="https://www.instagram.com/browbosslajolla"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-black text-sm tracking-widest uppercase transition-colors"
            data-testid="link-instagram-gallery"
          >
            <Instagram className="w-4 h-4" />
            Follow @browbosslajolla for more
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Value Reframing */}
      <section className="py-24 md:py-32 bg-[#F5F1EC]">
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
                src="/images/value-brows.png" 
                alt="Perfect Brows" 
                className="w-full h-full object-cover grayscale"
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
              
              <motion.div variants={fadeIn} className="grid grid-cols-3 gap-8 pt-8 border-t border-zinc-300">
                <div>
                  <p className="text-3xl font-serif mb-2">$0.55/day</p>
                  <p className="text-xs uppercase tracking-wider text-zinc-500">Cost over 3 years</p>
                </div>
                <div>
                  <p className="text-3xl font-serif mb-2">91 hours</p>
                  <p className="text-xs uppercase tracking-wider text-zinc-500">Time saved per year</p>
                </div>
                <div>
                  <p className="text-3xl font-serif mb-2">3 years</p>
                  <p className="text-xs uppercase tracking-wider text-zinc-500">Of waking up ready</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-20"
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
      <section className="py-24 md:py-32 bg-white border-t border-zinc-100">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-black mb-4">Loved by 500+ Women Across San Diego</h2>
            <div className="w-12 h-px bg-black/20 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Elda Lucero",
                role: "Microblading Client, La Jolla",
                quote: "If you are looking for a microblading artist to trust with your eyebrows, you found her! Leslie is AMAZING — meticulous and always making sure everything was extremely sanitary and painless.",
                initials: "EL"
              },
              {
                name: "Kathryn Saky",
                role: "Microblading Client, San Diego",
                quote: "Leslie is amazing! Her attention to detail is unparalleled. Her work is impeccable. If you are in the San Diego area and want amazing brows, this is the place.",
                initials: "KS"
              },
              {
                name: "Tiger Nguyen",
                role: "Nano Brows Client, San Diego",
                quote: "I absolutely LOVE my brows. Leslie was the best throughout this whole experience — informed me about the process, helped decide the best shape to flatter my face. Couldn't have asked for more perfect brows.",
                initials: "TN"
              }
            ].map((review, i) => (
              <motion.div 
                key={review.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { delay: i * 0.2, duration: 0.6 } }
                }}
                className="bg-zinc-50 p-8 md:p-10 border border-zinc-100 flex flex-col h-full"
              >
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-black text-black" />
                  ))}
                </div>
                <p className="text-lg font-serif italic font-light leading-relaxed mb-8 flex-grow text-zinc-700">
                  "{review.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center font-serif text-lg tracking-widest text-zinc-400 bg-white">
                    {review.initials}
                  </div>
                  <div>
                    <p className="font-serif text-lg text-black">{review.name}</p>
                    <p className="text-xs uppercase tracking-wider text-zinc-400">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Leslie */}
      <section id="about" className="py-24 md:py-32 bg-white">
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
                src="/images/leslie-portrait.png" 
                alt="Leslie Ritchie" 
                className="w-full h-full object-cover grayscale"
              />
            </motion.div>
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
      <section className="py-24 md:py-32 bg-white">
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
                        <FormLabel className="text-xs uppercase tracking-widest text-zinc-500">Preferred Date / Time</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Next Tuesday morning" className="rounded-none border-zinc-300 focus-visible:ring-black h-12" {...field} />
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
                "/images/insta-1.png",
                "/images/service-brows.png",
                "/images/insta-2.png",
                "/images/value-brows.png",
                "/images/service-lashes.png",
                "/images/insta-1.png"
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
      <footer className="bg-white text-zinc-500 py-16 md:py-24 font-light text-sm border-t border-zinc-100">
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
              <div className="flex gap-4">
                <a href="https://www.instagram.com/browbosslajolla" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-black transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-zinc-400 hover:text-black transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-black font-medium tracking-widest uppercase mb-6 text-xs">Contact</h4>
              <ul className="space-y-4 text-zinc-400">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>La Jolla<br />San Diego, CA</span>
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
              <ul className="space-y-4 text-zinc-400">
                <li className="flex justify-between">
                  <span>Mon - Sat</span>
                  <span>9:00 AM - 7:00 PM</span>
                </li>
                <li className="flex justify-between text-zinc-300">
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