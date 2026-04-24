import { useEffect, useState } from "react";
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
  ArrowRight
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
          isScrolled ? "bg-white/95 backdrop-blur-sm border-b border-border py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 z-50">
            <img 
              src="https://browboss.com/img/logo.svg" 
              alt="BrowBoss Logo" 
              className={`h-12 w-auto transition-all duration-300 ${!isScrolled ? "brightness-0 invert" : "brightness-0"}`}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = document.createElement('span');
                fallback.className = `font-serif font-bold text-2xl tracking-[0.2em] ${!isScrolled ? 'text-white' : 'text-black'}`;
                fallback.textContent = 'BROWBOSS';
                e.currentTarget.parentElement?.appendChild(fallback);
              }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className={`hidden md:flex items-center gap-8 ${!isScrolled ? "text-white" : "text-foreground"}`}>
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
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className={`w-6 h-6 ${!isScrolled ? "text-white" : "text-foreground"}`} />
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
      <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden bg-black">
        {/* Full photo background */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://admin.browboss.com/public/images/banner/1584479041.jpg')" }}
        />
        {/* Fallback second photo if first fails */}
        <img 
          src="https://admin.browboss.com/public/images/banner/1584479041.jpg"
          className="hidden"
          onError={(e) => {
            const hero = e.currentTarget.closest('section');
            const bg = hero?.querySelector<HTMLElement>('[style*="background-image"]');
            if (bg) bg.style.backgroundImage = "url('https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2074&auto=format&fit=crop')";
          }}
          alt=""
        />
        {/* Dark overlay — 50% so photo is clearly visible but text stays readable */}
        <div className="absolute inset-0 z-[1] bg-black/50" />
        
        <div className="container relative z-10 mx-auto px-4 text-center text-white max-w-4xl" style={{zIndex: 10}}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.p variants={fadeIn} className="text-xs md:text-sm font-medium tracking-[0.3em] uppercase mb-6 text-zinc-300">
              LA JOLLA • SAN DIEGO
            </motion.p>
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl lg:text-8xl font-serif mb-8 leading-tight">
              Effortless Beauty,<br />Every Day
            </motion.h1>
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-zinc-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              San Diego's premier studio for microblading, permanent makeup, lash lifts, and brows that wake up with you.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-col items-center gap-4">
              <Button asChild size="lg" className="bg-white text-black hover:bg-zinc-200 h-14 px-8 text-base tracking-wide uppercase font-medium rounded-none">
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer" data-testid="button-hero-book">
                  Book Your Free Consultation
                </a>
              </Button>
              <p className="text-sm text-zinc-400 font-light">
                Pay over time with Cherry, Afterpay or Klarna — as low as $50/month
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-zinc-900 text-white py-4 border-b border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xs md:text-sm tracking-wider uppercase text-center font-medium">
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 fill-white" /> 4.9 on Google (500+ Reviews)</span>
            <span className="hidden md:inline text-zinc-700">•</span>
            <span>Licensed & Insured</span>
            <span className="hidden md:inline text-zinc-700">•</span>
            <span>Featured in BarChart & Globe and Mail</span>
            <span className="hidden md:inline text-zinc-700">•</span>
            <span>10+ Years of Experience</span>
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
      <section className="py-24 md:py-32 bg-black text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Loved by 500+ Women Across San Diego</h2>
            <div className="w-12 h-px bg-white mx-auto"></div>
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
                className="bg-zinc-900 p-8 md:p-10 border border-zinc-800 flex flex-col h-full"
              >
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-white text-white" />
                  ))}
                </div>
                <p className="text-lg font-serif italic font-light leading-relaxed mb-8 flex-grow">
                  "{review.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center font-serif text-lg tracking-widest text-zinc-400">
                    {review.initials}
                  </div>
                  <div>
                    <p className="font-serif text-lg">{review.name}</p>
                    <p className="text-xs uppercase tracking-wider text-zinc-500">{review.role}</p>
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
      <footer className="bg-black text-zinc-400 py-16 md:py-24 font-light text-sm">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 border-b border-zinc-800 pb-16 mb-12">
            <div className="md:col-span-1">
              <img 
                src="https://browboss.com/img/logo.svg" 
                alt="BrowBoss" 
                className="h-8 invert mb-6 opacity-80"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement?.insertAdjacentHTML('beforeend', '<span class="font-serif font-bold text-2xl tracking-wider text-white">BROWBOSS</span>');
                }}
              />
              <p className="mb-6 max-w-xs">
                San Diego's premier destination for effortless beauty and permanent makeup.
              </p>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/browbosslajolla" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium tracking-widest uppercase mb-6 text-xs">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>La Jolla<br />San Diego, CA</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 shrink-0" />
                  <a href="tel:8583220010" className="hover:text-white transition-colors">(858) 322-0010</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 shrink-0" />
                  <a href="mailto:INFO@BROWBOSS.COM" className="hover:text-white transition-colors uppercase">INFO@BROWBOSS.COM</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium tracking-widest uppercase mb-6 text-xs">Hours</h4>
              <ul className="space-y-4">
                <li className="flex justify-between">
                  <span>Mon - Sat</span>
                  <span>9:00 AM - 7:00 PM</span>
                </li>
                <li className="flex justify-between text-zinc-500">
                  <span>Sunday</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium tracking-widest uppercase mb-6 text-xs">Links</h4>
              <ul className="space-y-4 uppercase tracking-wider text-xs">
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#gallery" className="hover:text-white transition-colors">Gallery</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-white font-medium">Book Appointment</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600 uppercase tracking-widest">
            <p>© 2025 BrowBoss Brow & Beauty. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}