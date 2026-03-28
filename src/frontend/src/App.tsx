import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { HttpAgent } from "@icp-sdk/core/agent";
import {
  Camera,
  CheckCircle2,
  ChevronDown,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
  Target,
  X,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { loadConfig } from "./config";

import { useInternetIdentity } from "./hooks/useInternetIdentity";
import { StorageClient } from "./utils/StorageClient";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove("opacity-0", "translate-y-8");
          el.classList.add("opacity-100", "translate-y-0");
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function RevealSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className={`opacity-0 translate-y-8 transition-all duration-700 ease-out ${className}`}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-14 text-center">
      <span className="divider-line mx-auto" />
      <h2 className="font-headline text-4xl md:text-5xl text-foreground">
        {children}
      </h2>
    </div>
  );
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollTo(href.replace("#", ""));
    onClick?.();
  };
  return (
    <a
      href={href}
      onClick={handleClick}
      className="font-display text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer"
      data-ocid="nav.link"
    >
      {children}
    </a>
  );
}

const PROGRAMS = [
  {
    icon: <Target size={32} className="text-primary" />,
    title: "Beginner Boxing",
    desc: "Learn basic punches, footwork, defense and conditioning.",
    ocid: "training.item.1",
  },
  {
    icon: <ShieldCheck size={32} className="text-primary" />,
    title: "Advanced Fighter",
    desc: "Professional boxing drills, sparring and competition preparation.",
    ocid: "training.item.2",
  },
  {
    icon: <Zap size={32} className="text-primary" />,
    title: "Fitness Boxing",
    desc: "Boxing-based cardio training for weight loss and stamina.",
    ocid: "training.item.3",
  },
  {
    icon: <Star size={32} className="text-primary" />,
    title: "Youth Program",
    desc: "Training for young athletes to build discipline and confidence.",
    ocid: "training.item.4",
  },
];

const BENEFITS = [
  "Professional coaching from experienced fighters",
  "High energy training environment",
  "Improve stamina and strength",
  "Effective weight loss and fitness",
  "Build confidence and discipline",
];

const GALLERY_IMAGES = [
  {
    src: "/assets/generated/boxing-sparring.dim_800x600.jpg",
    alt: "Boxing sparring",
    ocid: "gallery.item.1",
  },
  {
    src: "/assets/generated/boxing-gloves.dim_800x600.jpg",
    alt: "Boxing gloves",
    ocid: "gallery.item.2",
  },
  {
    src: "/assets/generated/boxing-bag-workout.dim_800x600.jpg",
    alt: "Bag workout",
    ocid: "gallery.item.3",
  },
  {
    src: "/assets/generated/boxing-hand-wrap.dim_800x600.jpg",
    alt: "Hand wrapping",
    ocid: "gallery.item.4",
  },
  {
    src: "/assets/generated/boxing-ring.dim_800x600.jpg",
    alt: "Boxing ring",
    ocid: "gallery.item.5",
  },
];

const PLANS = [
  {
    name: "Beginner",
    price: "₹2,000 / month",
    desc: "Monthly boxing training for newcomers",
    features: [
      "2 classes per week",
      "Basic technique training",
      "Locker room access",
      "Community support",
    ],
    popular: false,
    ocid: "membership.item.1",
  },
  {
    name: "Advanced Fighter",
    price: "₹6,000 / quarter",
    desc: "Professional level training and competition prep",
    features: [
      "Unlimited classes",
      "Sparring sessions",
      "1-on-1 technique audit",
      "Training app access",
    ],
    popular: true,
    ocid: "membership.item.2",
  },
  {
    name: "Fitness Boxing",
    price: "₹5,000 / quarter",
    desc: "Boxing fitness workouts for all fitness goals",
    features: [
      "3 classes per week",
      "Cardio boxing",
      "Strength conditioning",
      "Progress tracking",
    ],
    popular: false,
    ocid: "membership.item.3",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "The coaching here is world-class. I went from zero boxing knowledge to competing in my first amateur bout within a year.",
    name: "Rahul M.",
    ocid: "testimonials.item.1",
  },
  {
    quote:
      "The environment is electric. Everyone pushes each other. Best fitness decision I ever made.",
    name: "Priya S.",
    ocid: "testimonials.item.2",
  },
  {
    quote:
      "My son joined the youth program and the discipline and confidence he gained is incredible.",
    name: "Amit T.",
    ocid: "testimonials.item.3",
  },
];

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#training", label: "Training" },
  { href: "#gallery", label: "Gallery" },
  { href: "#membership", label: "Membership" },
  { href: "#contact", label: "Contact" },
];

const DEFAULT_TRAINER_PHOTO =
  "/assets/uploads/screenshot_20260327_234831-019d3220-96e7-761a-bcf1-ca08e0c74bc4-1.jpg";

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [trainerPhotoURL, setTrainerPhotoURL] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { identity, login, clear, isLoginSuccess } = useInternetIdentity();

  const isLoggedIn = !!identity && !identity.getPrincipal().isAnonymous();

  useEffect(() => {
    const loadTrainerPhoto = async () => {
      const hash = localStorage.getItem("trainerPhotoHash");
      if (!hash) return;
      try {
        const config = await loadConfig();
        const agent = new HttpAgent({
          host: config.backend_host,
          identity: identity ?? undefined,
        });
        const storageClient = new StorageClient(
          config.bucket_name ?? "default-bucket",
          config.storage_gateway_url,
          config.backend_canister_id,
          config.project_id,
          agent,
        );
        const url = await storageClient.getDirectURL(hash);
        setTrainerPhotoURL(url);
      } catch {
        // ignore
      }
    };
    loadTrainerPhoto();
  }, [identity]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleTrainerPhotoUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setUploading(true);
      try {
        const config = await loadConfig();
        const agent = new HttpAgent({
          host: config.backend_host,
          identity: identity ?? undefined,
        });
        const storageClient = new StorageClient(
          config.bucket_name ?? "default-bucket",
          config.storage_gateway_url,
          config.backend_canister_id,
          config.project_id,
          agent,
        );
        const bytes = new Uint8Array(await file.arrayBuffer());
        const { hash } = await storageClient.putFile(bytes);
        localStorage.setItem("trainerPhotoHash", hash);
        const url = await storageClient.getDirectURL(hash);
        setTrainerPhotoURL(url);
        toast.success("Trainer photo updated!");
      } catch {
        toast.error("Upload failed. Please try again.");
      } finally {
        setUploading(false);
      }
    },
    [identity],
  );

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We\u2019ll get back to you shortly.");
    setFormData({ name: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster richColors position="top-right" />

      {/* NAV */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/95 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <button
              type="button"
              onClick={() => scrollTo("home")}
              className="flex items-baseline gap-2 cursor-pointer bg-transparent border-0 p-0"
            >
              <span className="font-headline text-xl md:text-2xl text-primary">
                SR PUNCH
              </span>
              <span className="font-display text-sm md:text-base text-foreground tracking-widest">
                BOXING CLUB
              </span>
            </button>
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((l) => (
                <NavLink key={l.href} href={l.href}>
                  {l.label}
                </NavLink>
              ))}
            </nav>
            <button
              type="button"
              className="md:hidden text-foreground p-2"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              data-ocid="nav.toggle"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-black/98 border-t border-border px-4 pb-6 pt-4 flex flex-col gap-5">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.65), rgba(0,0,0,0.82)), url('/assets/generated/boxing-hero.dim_1920x1080.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <p className="font-display text-primary tracking-[0.3em] text-xs md:text-sm mb-6 uppercase">
            SR Punch Boxing Club &middot; Vasai-Virar
          </p>
          <h1 className="font-headline text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-foreground leading-none mb-6">
            TRAIN LIKE A<br />
            <span className="text-primary">CHAMPION</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Professional boxing training at SR Punch Boxing Club in Vasai-Virar.
            Build strength, discipline and champion mindset.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => scrollTo("contact")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-display tracking-widest uppercase px-8 py-6 text-sm"
              data-ocid="hero.primary_button"
            >
              Join Training
            </Button>
            <Button
              onClick={() => scrollTo("training")}
              variant="outline"
              className="border-foreground text-foreground hover:bg-foreground/10 font-display tracking-widest uppercase px-8 py-6 text-sm"
              data-ocid="hero.secondary_button"
            >
              View Programs
            </Button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
          <span className="font-display text-xs tracking-widest uppercase">
            Scroll
          </span>
          <ChevronDown size={18} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealSection>
              <div className="relative">
                <img
                  src="/assets/generated/boxing-sparring.dim_800x600.jpg"
                  alt="Boxing sparring at SR Punch"
                  className="w-full rounded-sm object-cover aspect-[4/3]"
                />
                <div className="absolute -bottom-6 -right-6 bg-primary px-6 py-4 hidden md:block">
                  <p className="font-headline text-3xl text-primary-foreground">
                    10+
                  </p>
                  <p className="font-display text-xs tracking-widest uppercase text-primary-foreground/80">
                    Years of Excellence
                  </p>
                </div>
              </div>
            </RevealSection>
            <RevealSection>
              <span className="divider-line" />
              <h2 className="font-headline text-4xl md:text-5xl text-foreground mb-6">
                ABOUT SR PUNCH
                <br />
                <span className="text-primary">BOXING CLUB</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                SR Punch Boxing Club is a dedicated boxing training gym located
                in Vasai West, Maharashtra. The club provides professional
                training for beginners, fitness enthusiasts and competitive
                fighters.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-10">
                Our mission is to help athletes develop strength, discipline,
                endurance and professional boxing skills in a motivating
                training environment.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[
                  { value: "500+", label: "Members" },
                  { value: "10+", label: "Years" },
                  { value: "4", label: "Programs" },
                  { value: "100%", label: "Dedication" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="text-center border border-border rounded-sm p-4"
                  >
                    <p className="font-headline text-2xl text-primary">
                      {s.value}
                    </p>
                    <p className="font-display text-xs tracking-widest uppercase text-muted-foreground mt-1">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* TRAINING PROGRAMS */}
      <section id="training" className="py-24 md:py-32 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionTitle>TRAINING PROGRAMS</SectionTitle>
          </RevealSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROGRAMS.map((card) => (
              <RevealSection key={card.ocid}>
                <div
                  className="bg-background border border-border border-t-2 border-t-primary rounded-sm p-6 card-hover h-full"
                  data-ocid={card.ocid}
                >
                  <div className="mb-4">{card.icon}</div>
                  <h3 className="font-headline text-lg text-foreground mb-3">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealSection>
              <span className="divider-line" />
              <h2 className="font-headline text-4xl md:text-5xl text-foreground mb-10">
                WHY CHOOSE
                <br />
                <span className="text-primary">SR PUNCH</span>
              </h2>
              <ul className="space-y-5">
                {BENEFITS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2
                      size={20}
                      className="text-primary mt-0.5 shrink-0"
                    />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </RevealSection>
            <RevealSection>
              <div
                className="relative rounded-sm overflow-hidden aspect-[4/3]"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url('/assets/generated/boxing-bag-workout.dim_800x600.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <p className="font-headline text-5xl md:text-6xl text-primary mb-2">
                    NO EXCUSES.
                  </p>
                  <p className="font-headline text-5xl md:text-6xl text-foreground">
                    JUST RESULTS.
                  </p>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 md:py-32 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionTitle>GALLERY</SectionTitle>
          </RevealSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GALLERY_IMAGES.map((img) => (
              <RevealSection key={img.ocid}>
                <div
                  className="relative overflow-hidden rounded-sm aspect-[4/3] bg-muted group"
                  data-ocid={img.ocid}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </RevealSection>
            ))}

            {/* Trainer photo slot */}
            <RevealSection>
              <div
                className="relative overflow-hidden rounded-sm aspect-[4/3] bg-muted border border-border group"
                data-ocid="gallery.item.6"
              >
                <img
                  src={trainerPhotoURL || DEFAULT_TRAINER_PHOTO}
                  alt="Head Trainer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-4 py-2 text-center">
                  <p className="font-display text-xs tracking-widest uppercase text-foreground">
                    Our Head Trainer
                  </p>
                </div>
                {isLoggedIn && (
                  <button
                    type="button"
                    className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    data-ocid="gallery.upload_button"
                  >
                    <Camera size={28} className="text-primary" />
                    <span className="font-display text-sm tracking-widest uppercase text-foreground">
                      {uploading ? "Uploading..." : "Edit Photo"}
                    </span>
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleTrainerPhotoUpload}
                />
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* MEMBERSHIP */}
      <section id="membership" className="py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionTitle>MEMBERSHIP PLANS</SectionTitle>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PLANS.map((plan) => (
              <RevealSection key={plan.name}>
                <div
                  className={`relative bg-card rounded-sm p-8 border card-hover h-full flex flex-col ${
                    plan.popular
                      ? "border-primary red-glow scale-105"
                      : "border-border"
                  }`}
                  data-ocid={plan.ocid}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground font-display text-xs tracking-widest uppercase px-4 py-1 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <h3 className="font-headline text-2xl text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    {plan.desc}
                  </p>
                  <div className="mb-6">
                    <p className="font-headline text-2xl text-primary">
                      {plan.price}
                    </p>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle2
                          size={15}
                          className="text-primary shrink-0"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => scrollTo("contact")}
                    className={`w-full font-display tracking-widest uppercase ${
                      plan.popular
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                        : "bg-transparent border border-foreground/40 text-foreground hover:border-primary hover:text-primary"
                    }`}
                    data-ocid="membership.primary_button"
                  >
                    Join Now
                  </Button>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 md:py-32 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionTitle>WHAT OUR MEMBERS SAY</SectionTitle>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <RevealSection key={t.name}>
                <div
                  className="bg-background border border-border rounded-sm p-8 card-hover"
                  data-ocid={t.ocid}
                >
                  <p className="text-primary font-headline text-4xl leading-none mb-4">
                    &ldquo;
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6 italic">
                    {t.quote}
                  </p>
                  <p className="font-display text-sm tracking-widest uppercase text-foreground">
                    &mdash; {t.name}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionTitle>FIND US</SectionTitle>
          </RevealSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <RevealSection>
              <div className="rounded-sm overflow-hidden border border-border aspect-video">
                <iframe
                  title="SR Punch Boxing Club Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.5!2d72.8333!3d19.3667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7a9f0b2a44b43%3A0x9e0f3e1e2f3c4b5d!2sRP%20Wagh%20High%20School%2C%20Mahatma%20Gandhi%20Rd%2C%20Koliwada%2C%20Vasai%20West%2C%20Vasai-Virar%2C%20Maharashtra%20401201!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </RevealSection>
            <RevealSection>
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <MapPin size={24} className="text-primary shrink-0 mt-1" />
                  <div>
                    <p className="font-display text-sm tracking-widest uppercase text-muted-foreground mb-1">
                      Address
                    </p>
                    <p className="text-foreground leading-relaxed">
                      RP Wagh High School
                      <br />
                      Mahatma Gandhi Rd, Koliwada
                      <br />
                      Vasai West, Vasai-Virar
                      <br />
                      Maharashtra 401201
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone size={24} className="text-primary shrink-0 mt-1" />
                  <div>
                    <p className="font-display text-sm tracking-widest uppercase text-muted-foreground mb-1">
                      Phone
                    </p>
                    <a
                      href="tel:+917066881408"
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      070668 81408
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Instagram size={24} className="text-primary shrink-0 mt-1" />
                  <div>
                    <p className="font-display text-sm tracking-widest uppercase text-muted-foreground mb-1">
                      Instagram
                    </p>
                    <a
                      href="https://www.instagram.com/sr.punch"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      @sr.punch
                    </a>
                  </div>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 md:py-32 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionTitle>CONTACT US</SectionTitle>
          </RevealSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <RevealSection>
              <div className="flex flex-col gap-6">
                <p className="text-muted-foreground leading-relaxed">
                  Ready to start your boxing journey? Get in touch with us
                  today. We welcome all levels &mdash; beginners to competitive
                  fighters.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="tel:+917066881408" className="flex-1">
                    <Button
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display tracking-widest uppercase py-5"
                      data-ocid="contact.primary_button"
                    >
                      <Phone size={16} className="mr-2" /> Call Now
                    </Button>
                  </a>
                  <a
                    href="https://wa.me/917066881408"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-display tracking-widest uppercase py-5"
                      data-ocid="contact.secondary_button"
                    >
                      <MessageCircle size={16} className="mr-2" /> WhatsApp
                    </Button>
                  </a>
                  <a
                    href="https://www.instagram.com/sr.punch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button
                      className="w-full font-display tracking-widest uppercase py-5 text-white"
                      style={{
                        background:
                          "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
                      }}
                      data-ocid="contact.instagram_button"
                    >
                      <Instagram size={16} className="mr-2" /> Instagram
                    </Button>
                  </a>
                </div>
                <div className="border border-border rounded-sm p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-primary" />
                    <a
                      href="tel:+917066881408"
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      070668 81408
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Instagram size={18} className="text-primary" />
                    <a
                      href="https://www.instagram.com/sr.punch"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      @sr.punch
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin
                      size={18}
                      className="text-primary shrink-0 mt-0.5"
                    />
                    <span className="text-muted-foreground text-sm">
                      RP Wagh High School, Mahatma Gandhi Rd, Koliwada, Vasai
                      West, Maharashtra 401201
                    </span>
                  </div>
                </div>
              </div>
            </RevealSection>

            <RevealSection>
              <form
                onSubmit={handleContactSubmit}
                className="space-y-5"
                data-ocid="contact.modal"
              >
                <div>
                  <label
                    htmlFor="contact-name"
                    className="font-display text-xs tracking-widest uppercase text-muted-foreground block mb-2"
                  >
                    Your Name
                  </label>
                  <Input
                    id="contact-name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, name: e.target.value }))
                    }
                    required
                    className="bg-background border-border focus:border-primary"
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="font-display text-xs tracking-widest uppercase text-muted-foreground block mb-2"
                  >
                    Phone Number
                  </label>
                  <Input
                    id="contact-phone"
                    placeholder="Enter your phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, phone: e.target.value }))
                    }
                    required
                    className="bg-background border-border focus:border-primary"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="font-display text-xs tracking-widest uppercase text-muted-foreground block mb-2"
                  >
                    Message
                  </label>
                  <Textarea
                    id="contact-message"
                    placeholder="Tell us about your goals..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, message: e.target.value }))
                    }
                    rows={5}
                    required
                    className="bg-background border-border focus:border-primary resize-none"
                    data-ocid="contact.textarea"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display tracking-widest uppercase py-5"
                  data-ocid="contact.submit_button"
                >
                  Send Message
                </Button>
              </form>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-headline text-xl text-primary">
                  SR PUNCH
                </span>
                <span className="font-display text-sm text-foreground tracking-widest">
                  BOXING CLUB
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                The premier boxing training destination in Vasai-Virar,
                Maharashtra. Where champions are forged and limits are
                shattered.
              </p>
            </div>
            <div>
              <p className="font-display text-xs tracking-widest uppercase text-muted-foreground mb-4">
                Location
              </p>
              <p className="text-foreground text-sm leading-relaxed">
                RP Wagh High School
                <br />
                Mahatma Gandhi Rd, Koliwada
                <br />
                Vasai West, Vasai-Virar
                <br />
                Maharashtra 401201
              </p>
            </div>
            <div>
              <p className="font-display text-xs tracking-widest uppercase text-muted-foreground mb-4">
                Connect
              </p>
              <div className="space-y-3">
                <a
                  href="tel:+917066881408"
                  className="text-foreground hover:text-primary transition-colors text-sm flex items-center gap-2"
                >
                  <Phone size={14} className="text-primary" /> 070668 81408
                </a>
                <a
                  href="https://www.instagram.com/sr.punch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors text-sm flex items-center gap-2"
                >
                  <Instagram size={14} className="text-primary" /> @sr.punch
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-xs">
              &copy; {new Date().getFullYear()} SR Punch Boxing Club. All rights
              reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground text-xs transition-colors"
              >
                Built with &#10084; using caffeine.ai
              </a>
              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={clear}
                  className="text-muted-foreground hover:text-primary text-xs transition-colors font-display tracking-wider uppercase"
                  data-ocid="footer.button"
                >
                  Admin Logout
                </button>
              ) : (
                <button
                  type="button"
                  onClick={login}
                  className="text-muted-foreground hover:text-primary text-xs transition-colors font-display tracking-wider uppercase"
                  data-ocid="footer.button"
                >
                  Admin Login
                </button>
              )}
            </div>
          </div>

          {isLoginSuccess && (
            <p
              className="text-center text-primary text-xs mt-3 font-display tracking-widest uppercase"
              data-ocid="footer.success_state"
            >
              &#10003; Admin mode active &mdash; hover gallery slot 6 to upload
              trainer photo
            </p>
          )}
        </div>
      </footer>
    </div>
  );
}
