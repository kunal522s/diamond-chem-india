import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ProductCard from "@/components/ProductCard";
import {
  ArrowRight,
  Shield,
  Truck,
  Award,
  Factory,
  CheckCircle,
  FlaskConical,
  BadgeCheck,
  Users,
  Calendar,
  Building2,
  MapPinned,
  PackageCheck,
  BadgeDollarSign,
  Headset,
} from "lucide-react";
import { motion } from "framer-motion";
import AnimatedText from "@/components/AnimatedText";

export default function Home() {

  const heroImages = [
    "/images/hero1.webp",
    "/images/hero6.webp",
    "/images/hero2.webp",
    "/images/hero3.webp",
    "/images/hero4.webp",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  const [featured, setFeatured] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/products").then((r) => {
      console.log("HOME API:", r.data);
      setFeatured(r.data.filter((p) => p.featured));
    });
  }, []);

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentImage((prev) => {

        if (prev === heroImages.length - 1) return 0;

        return prev + 1;

      });

    }, 4500);

    return () => clearInterval(interval);

  }, []);

  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        document.getElementById(location.state.scrollTo)?.scrollIntoView({
          behavior: "smooth",
        });
        navigate(location.pathname, { replace: true, state: {} });
      }, 100);
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <CartDrawer />

      {/* HERO */}
      <section className="relative overflow-hidden bg-brand-slate text-white min-h-screen flex items-center">
        <div className="absolute inset-0">

          {/* Desktop Slideshow */}

          <div className="hidden md:block absolute inset-0 overflow-hidden">

            {heroImages.map((image, index) => (

              <img
                key={image}
                src={image}
                alt="Hero"
                className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-[1800ms] ease-in-out
      ${currentImage === index
                    ? "opacity-100 scale-110 animate-heroZoom"
                    : "opacity-0 scale-100"
                  }`}
              />

            ))}

          </div>

          {/* Mobile Image */}
          <img
            src="/images/bg image mobile.png"
            alt="Hero Mobile"
            className="block md:hidden h-full w-full object-cover object-center"
          />
          <div className="absolute -top-32 -left-20 h-[420px] w-[420px] rounded-full bg-brand-orange/20 blur-[150px] animate-heroGlow"></div>

          <div className="absolute bottom-0 right-0 h-[380px] w-[380px] rounded-full bg-orange-500/20 blur-[170px] animate-heroGlow"></div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10"></div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          {[...Array(10)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-white/20"
              style={{
                width: Math.random() * 4 + 2,
                height: Math.random() * 4 + 2,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-10, -40],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 4,
              }}
            />
          ))}
        </div>
        <div className="relative container mx-auto px-4 md:px-8 py-20 md:py-24">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .9 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .2 }}
              className="inline-flex items-center gap-2 border border-brand-orange/40 bg-brand-orange/10 backdrop-blur-xl px-4 py-2 rounded-full mb-6 shadow-[0_0_30px_rgba(249,115,22,.25)]"
            >
              <span className="h-1.5 w-1.5 bg-brand-orange rounded-full" />
              <span className="label-tech text-brand-orange">B2B Dealer Portal · India</span>
            </motion.div>
            <motion.h1
              className="font-heading text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.05] uppercase tracking-tight"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.035,
                  },
                },
              }}
            >
              {"Industrial-Grade".split("").map((char, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 35,
                      filter: "blur(10px)",
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                    },
                  }}
                  transition={{
                    duration: 0.45,
                  }}
                  className="inline-block will-change-transform"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}

              <br />

              <span className="text-brand-orange drop-shadow-[0_0_18px_#ff7a12]">

                {"CAR & BIKE".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: {
                        opacity: 0,
                        y: 35,
                        filter: "blur(10px)",
                      },
                      visible: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                      },
                    }}
                    transition={{
                      duration: 0.45,
                    }}
                    className="inline-block will-change-transform"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}

              </span>

              <br />

              {"CARE CHEMICALS".split("").map((char, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 35,
                      filter: "blur(10px)",
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                    },
                  }}
                  transition={{
                    duration: 0.45,
                  }}
                  className="inline-block will-change-transform"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>
            <p className="mt-6 text-lg text-white/90 max-w-xl">
              Wholesale supply of dashboard polish, tyre polish, car polish and interior cleaners — built for detailing studios, fleet workshops and retail dealers.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/products"
                data-testid="hero-shop-btn"
                className="group relative overflow-hidden inline-flex items-center gap-2 bg-brand-orange px-7 py-4 rounded-xl font-semibold transition-all duration-500 hover:scale-105 hover:bg-brand-orangeDark hover:shadow-[0_18px_50px_rgba(249,115,22,.55)] active:scale-95"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></span>
                <span className="relative z-10">
                  Browse Catalog
                </span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-all duration-500 group-hover:translate-x-2 group-hover:scale-110" />
              </Link>
              <a
                href="#about"
                data-testid="hero-about-btn"
                className="group relative overflow-hidden inline-flex items-center gap-2 border border-white/30 bg-white/5 backdrop-blur-md px-7 py-4 rounded-xl font-semibold transition-all duration-500 hover:bg-white hover:text-brand-jet hover:scale-105 active:scale-95"
              >

                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></span>

                <span className="relative z-10">
                  Learn More
                </span>

              </a>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-6 max-w-xl border-t border-white/15 pt-8">
              <div className="transition-all duration-500 hover:-translate-y-2">
                <div className="font-heading text-3xl font-bold text-white drop-shadow-[0_0_12px_rgba(249,115,22,.45)]">20+</div>
                <div className="label-tech text-white/60 mt-1">Years</div>
              </div>
              <div className="transition-all duration-500 hover:-translate-y-2">
                <div className="font-heading text-3xl font-bold text-white drop-shadow-[0_0_12px_rgba(249,115,22,.45)]">800+</div>
                <div className="label-tech text-white/60 mt-1">Dealers</div>
              </div>
              <div className="transition-all duration-500 hover:-translate-y-2">
                <div className="font-heading text-3xl font-bold text-white drop-shadow-[0_0_12px_rgba(249,115,22,.45)]">40+</div>
                <div className="label-tech text-white/60 mt-1">Products</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-border bg-secondary">
        <div className="container mx-auto px-4 md:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Factory, t: "In-house Manufacturing", d: "ISO certified facility" },
            { icon: Truck, t: "Pan-India Dispatch", d: "Bulk freight available" },
            { icon: Shield, t: "Quality Assured", d: "Batch tested formulae" },
            { icon: Award, t: "Dealer Pricing", d: "Tiered wholesale rates" },
          ].map((f, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="h-10 w-10 flex items-center justify-center bg-brand-jet rounded-sm">
                <f.icon className="h-5 w-5 text-brand-orange" />
              </div>
              <div>
                <div className="font-semibold text-sm">{f.t}</div>
                <div className="label-tech text-muted-foreground mt-0.5">{f.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="container mx-auto px-4 md:px-8 py-20" data-testid="featured-section">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <div className="label-tech text-brand-orange mb-2">Catalog · Top Sellers</div>
            <h2 className="font-heading text-3xl md:text-5xl font-bold uppercase tracking-tight">Featured Products</h2>
          </div>
          <Link
            to="/products"
            data-testid="view-all-products-btn"
            className="inline-flex items-center gap-2 text-sm font-semibold border-b-2 border-brand-jet hover:border-brand-orange hover:text-brand-orange transition-colors pb-0.5"
          >
            View All Products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="relative bg-[#101010] text-white py-24 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,#ffffff_1px,transparent_1px)] bg-[length:28px_28px]" />
        <div className="relative container mx-auto px-4 md:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_.7fr_430px] gap-10 items-start">

            {/* LEFT */}

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >

              <div className="flex items-center gap-3 mb-6">

                <div className="w-14 h-[2px] bg-brand-orange"></div>

                <span className="label-tech tracking-[0.25em] text-brand-orange">
                  ABOUT DIAMOND CHEM INDIA
                </span>

              </div>

              <motion.h2
                className="font-heading text-4xl sm:text-5xl lg:text-7xl font-black uppercase leading-[0.95]"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: .8, delay: .15 }}
                viewport={{ once: true }}
              >
                Manufacturing
                <br />
                Excellence
                <br />
                <span className="bg-gradient-to-r from-brand-orange via-orange-400 to-yellow-300 bg-clip-text text-transparent">
                  Since 2006
                </span>
              </motion.h2>

              <motion.div
                className="mt-8 grid grid-cols-2 gap-3 sm:gap-4"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: .7, delay: .25 }}
                viewport={{ once: true }}
              >

                <div className="group border border-white/10 rounded-xl p-5 text-center transition-all duration-500 hover:border-brand-orange hover:-translate-y-2 hover:bg-white/[0.03] hover:shadow-[0_15px_35px_rgba(255,106,0,.18)]">
                  <div className="font-heading text-3xl sm:text-4xl font-black text-brand-orange transition-all duration-500 group-hover:scale-110 group-hover:text-white group-hover:drop-shadow-[0_0_18px_#ff7a12]">
                    20+
                  </div>
                  <div className="label-tech mt-2 text-white/60">
                    YEARS OF EXPERIENCE
                  </div>
                </div>

                <div className="group border border-white/10 rounded-xl p-5 text-center transition-all duration-500 hover:border-brand-orange hover:-translate-y-2 hover:bg-white/[0.03] hover:shadow-[0_15px_35px_rgba(255,106,0,.18)]">
                  <div className="font-heading text-3xl sm:text-4xl font-black text-brand-orange transition-all duration-500 group-hover:scale-110 group-hover:text-white group-hover:drop-shadow-[0_0_18px_#ff7a12]">
                    800+
                  </div>
                  <div className="label-tech mt-2 text-white/60">
                    DEALERS
                  </div>
                </div>

                <div className="group border border-white/10 rounded-xl p-5 text-center transition-all duration-500 hover:border-brand-orange hover:-translate-y-2 hover:bg-white/[0.03] hover:shadow-[0_15px_35px_rgba(255,106,0,.18)]">
                  <div className="font-heading text-3xl sm:text-4xl font-black text-brand-orange transition-all duration-500 group-hover:scale-110 group-hover:text-white group-hover:drop-shadow-[0_0_18px_#ff7a12]">
                    40+
                  </div>
                  <div className="label-tech mt-2 text-white/60">
                    PRODUCTS
                  </div>
                </div>

                <div className="group border border-white/10 rounded-xl p-5 text-center transition-all duration-500 hover:border-brand-orange hover:-translate-y-2 hover:bg-white/[0.03] hover:shadow-[0_15px_35px_rgba(255,106,0,.18)]">
                  <div className="font-heading text-3xl sm:text-4xl font-black text-brand-orange transition-all duration-500 group-hover:scale-110 group-hover:text-white group-hover:drop-shadow-[0_0_18px_#ff7a12]">
                    5T+
                  </div>
                  <div className="label-tech mt-2 text-white/60">
                    MONTHLY OUTPUT
                  </div>
                </div>

              </motion.div>

              <motion.p
                className="mt-8 text-white/65 text-[15px] leading-8 max-w-xl"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: .8, delay: .35 }}
                viewport={{ once: true }}
              >

                Diamond Chem India is a leading manufacturer of premium
                automotive care chemicals supplying detailing studios,
                distributors, workshops and OEM partners across India.

              </motion.p>

              <motion.p
                className="mt-8 text-white/65 text-[15px] leading-8 max-w-xl"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: .8, delay: .45 }}
                viewport={{ once: true }}
              >

                Every formulation is manufactured using carefully selected
                raw materials and strict quality standards to deliver
                consistent shine, protection and long-lasting performance.

              </motion.p>

              <motion.p
                className="mt-8 text-white/65 text-[15px] leading-8 max-w-xl"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: .8, delay: .55 }}
                viewport={{ once: true }}
              >

                With two decades of manufacturing experience we continue
                expanding our dealer network while maintaining reliable
                production capacity and nationwide supply.

              </motion.p>

            </motion.div>

            {/* TIMELINE */}

            <div className="relative pt-2 lg:pt-4">

              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                transition={{ duration: 1.3 }}
                viewport={{ once: true }}
                className="absolute left-[11px] top-0 w-px bg-gradient-to-b from-brand-orange via-brand-orange/50 to-transparent"
              />

              {[
                {
                  year: "2006",
                  title: "Company Established",
                  desc: "Started our journey with a vision to deliver premium automotive chemicals.",
                },
                {
                  year: "2012",
                  title: "Manufacturing Unit",
                  desc: "Expanded production facility and increased manufacturing capacity.",
                },
                {
                  year: "2017",
                  title: "Nationwide Expansion",
                  desc: "Built dealer network across multiple Indian states.",
                },
                {
                  year: "2025",
                  title: "800+ Dealers",
                  desc: "Trusted by detailing studios and distributors nationwide.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.year}
                  className="group relative pl-10 pb-10"
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: .6,
                    delay: index * .15
                  }}
                  viewport={{ once: true }}
                >
                  <div className="absolute left-0 top-1 h-6 w-6 rounded-full border-2 border-brand-orange bg-[#101010] flex items-center justify-center transition-all duration-500 group-hover:scale-125 group-hover:shadow-[0_0_20px_rgba(255,106,0,.7)]">
                    <div className="h-2.5 w-2.5 rounded-full bg-brand-orange"></div>
                  </div>

                  <div className="font-heading text-3xl sm:text-4xl font-black text-brand-orange leading-none transition-all duration-300 group-hover:text-white">
                    {item.year}
                  </div>

                  <div className="font-semibold mt-1 transition-colors duration-300 group-hover:text-brand-orange">
                    {item.title}
                  </div>

                  <p className="text-white/55 text-sm leading-6 mt-2 transition-colors duration-300 group-hover:text-white/80">
                    {item.desc}
                  </p>

                </motion.div>
              ))}

            </div>

            {/* RIGHT IMAGE */}

            <div className="w-full lg:max-w-[430px] xl:max-w-[460px] justify-self-end">

              <motion.div
                initial={{ opacity: 0, x: 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: .9 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,.45)] transition-all duration-500 hover:border-brand-orange/40 hover:-translate-y-3 hover:shadow-[0_40px_90px_rgba(255,106,0,.25)]"
              >

                <img
                  src="https://images.pexels.com/photos/20042055/pexels-photo-20042055.jpeg"
                  alt="Professional Car Detailing"
                  className="h-[360px] sm:h-[550px] lg:h-[670px] xl:h-[720px] w-full object-cover transition-transform duration-[2000] ease-out group-hover:scale-110"
                />
                <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-orange/20 blur-[120px] animate-pulse"></div>

                <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-orange-500/10 blur-[140px] animate-pulse"></div>
                <div className="hidden sm:block absolute top-5 left-5 bg-black/75 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-3 transition-all duration-500 group-hover:bg-black/90">

                  <div className="font-heading text-3xl font-black text-brand-orange leading-none">
                    20+
                  </div>

                  <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-white/80">
                    Years Experience
                  </div>

                </div>

                <div className="grid grid-cols-2">

                  {[
                    {
                      icon: Shield,
                      title: "ISO Certified",
                      sub: "Quality Assured",
                    },
                    {
                      icon: Factory,
                      title: "Made in India",
                      sub: "Proudly Manufactured",
                    },
                    {
                      icon: Truck,
                      title: "Fast Dispatch",
                      sub: "Pan India Delivery",
                    },
                    {
                      icon: Headset,
                      title: "Dealer Support",
                      sub: "Always Here to Help",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="group bg-brand-orange flex flex-col items-center justify-center gap-2 py-3 lg:py-4 border border-white/10 transition-all duration-300 hover:bg-[#ff7a12] hover:-translate-y-1"
                    >
                      <item.icon className="h-5 w-5 lg:h-6 lg:w-6 text-white transition-transform duration-300 group-hover:scale-125 group-hover:-translate-y-1" />

                      <div className="text-xs lg:text-sm font-semibold transition-all duration-300 group-hover:tracking-wide">
                        {item.title}
                      </div>

                      <div className="hidden lg:block text-[11px] text-white/80">
                        {item.sub}
                      </div>

                    </div>
                  ))}

                </div>

              </motion.div>

            </div> {/* grid end */}
          </div>

        </div> {/* container end */}

      </section>

      <Footer />
    </div>
  );
}
