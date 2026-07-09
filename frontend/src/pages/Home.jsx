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

export default function Home() {
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
    if (location.state?.scrollTo) {
      setTimeout(() => {
        document.getElementById(location.state.scrollTo)?.scrollIntoView({
          behavior: "smooth",
        });

        // state clear kar do
        navigate(location.pathname, { replace: true, state: {} });
      }, 100);
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <CartDrawer />

      {/* HERO */}
      <section className="relative overflow-hidden bg-brand-slate text-white">
        <div className="absolute inset-0">

          {/* Desktop Image */}
          <img
            src="https://images.pexels.com/photos/26954168/pexels-photo-26954168.jpeg"
            alt="Hero"
            className="hidden md:block h-full w-full object-cover object-center"
          />

          {/* Mobile Image */}
          <img
            src="/images/bg image mobile.png"
            alt="Hero Mobile"
            className="block md:hidden h-full w-full object-cover object-center"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/65 to-black/80 md:bg-gradient-to-r md:from-black/75 md:via-black/40 md:to-transparent"></div>

        </div>
        <div className="relative container mx-auto px-4 md:px-8 py-24 md:py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="inline-flex items-center gap-2 border border-brand-orange/40 bg-brand-orange/10 px-3 py-1 rounded-sm mb-6">
              <span className="h-1.5 w-1.5 bg-brand-orange rounded-full" />
              <span className="label-tech text-brand-orange">B2B Dealer Portal · India</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.05] uppercase tracking-tight">
              Industrial-grade<br />
              <span className="text-brand-orange">car & bike</span><br />
              care chemicals
            </h1>
            <p className="mt-6 text-lg text-white/90 max-w-xl">
              Wholesale supply of dashboard polish, tyre polish, car polish and interior cleaners — built for detailing studios, fleet workshops and retail dealers.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/products"
                data-testid="hero-shop-btn"
                className="group inline-flex items-center gap-2 bg-brand-orange px-6 py-3.5 rounded-sm font-semibold transition-all hover:bg-brand-orangeDark"
              >
                Browse Catalog
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#about"
                data-testid="hero-about-btn"
                className="inline-flex items-center gap-2 border border-white/30 px-6 py-3.5 rounded-sm font-semibold hover:bg-white hover:text-brand-jet transition-all"
              >
                Learn More
              </a>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-6 max-w-xl border-t border-white/15 pt-8">
              <div>
                <div className="font-heading text-3xl font-bold">20+</div>
                <div className="label-tech text-white/60 mt-1">Years</div>
              </div>
              <div>
                <div className="font-heading text-3xl font-bold">800+</div>
                <div className="label-tech text-white/60 mt-1">Dealers</div>
              </div>
              <div>
                <div className="font-heading text-3xl font-bold">40+</div>
                <div className="label-tech text-white/60 mt-1">Products</div>
              </div>
            </div>
          </div>
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
        className="bg-[#101010] text-white py-24 overflow-hidden"
      >
        <div className="container mx-auto px-4 md:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_.7fr_430px] gap-10 items-start">

            {/* LEFT */}

            <div>

              <div className="flex items-center gap-3 mb-6">

                <div className="w-14 h-[2px] bg-brand-orange"></div>

                <span className="label-tech tracking-[0.25em] text-brand-orange">
                  ABOUT DIAMOND CHEM INDIA
                </span>

              </div>

              <h2 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-black uppercase leading-[0.95]">
                Manufacturing
                <br />
                Excellence
                <br />
                <span className="text-brand-orange">
                  Since 2006
                </span>
              </h2>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">

                <div className="border border-white/10 rounded-lg p-4 sm:p-5 text-center">
                  <div className="font-heading text-3xl sm:text-4xl font-black text-brand-orange">
                    20+
                  </div>
                  <div className="label-tech mt-2 text-white/60">
                    YEARS OF EXPERIENCE
                  </div>
                </div>

                <div className="border border-white/10 rounded-lg p-4 sm:p-5 text-center">
                  <div className="font-heading text-3xl sm:text-4xl font-black text-brand-orange">
                    800+
                  </div>
                  <div className="label-tech mt-2 text-white/60">
                    DEALERS
                  </div>
                </div>

                <div className="border border-white/10 rounded-lg p-4 sm:p-5 text-center">
                  <div className="font-heading text-3xl sm:text-4xl font-black text-brand-orange">
                    40+
                  </div>
                  <div className="label-tech mt-2 text-white/60">
                    PRODUCTS
                  </div>
                </div>

                <div className="border border-white/10 rounded-lg p-4 sm:p-5 text-center">
                  <div className="font-heading text-3xl sm:text-4xl font-black text-brand-orange">
                    5T+
                  </div>
                  <div className="label-tech mt-2 text-white/60">
                    MONTHLY OUTPUT
                  </div>
                </div>

              </div>

              <p className="mt-8 text-white/70 text-sm sm:text-base leading-7">

                Diamond Chem India is a leading manufacturer of premium
                automotive care chemicals supplying detailing studios,
                distributors, workshops and OEM partners across India.

              </p>

              <p className="mt-6 text-white/60 text-sm sm:text-base leading-7">

                Every formulation is manufactured using carefully selected
                raw materials and strict quality standards to deliver
                consistent shine, protection and long-lasting performance.

              </p>

              <p className="mt-6 text-white/60 text-sm sm:text-base leading-7">

                With two decades of manufacturing experience we continue
                expanding our dealer network while maintaining reliable
                production capacity and nationwide supply.

              </p>

            </div>

            {/* TIMELINE */}

            <div className="relative pt-2 lg:pt-4">

              <div className="absolute left-[11px] top-0 bottom-0 w-px bg-brand-orange/40"></div>

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
              ].map((item) => (
                <div
                  key={item.year}
                  className="relative pl-10 pb-10"
                >
                  <div className="absolute left-0 top-1 h-6 w-6 rounded-full border-2 border-brand-orange bg-[#101010] flex items-center justify-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-brand-orange"></div>
                  </div>

                  <div className="font-heading text-3xl sm:text-4xl font-black text-brand-orange leading-none">
                    {item.year}
                  </div>

                  <div className="font-semibold mt-1">
                    {item.title}
                  </div>

                  <p className="text-white/55 text-sm leading-6 mt-2">
                    {item.desc}
                  </p>

                </div>
              ))}

            </div>

            {/* RIGHT IMAGE */}

            <div className="w-full lg:max-w-[430px] xl:max-w-[460px] justify-self-end">

              <div className="relative overflow-hidden border border-white/10 rounded-lg">

                <img
                  src="https://images.pexels.com/photos/20042055/pexels-photo-20042055.jpeg"
                  alt="Professional Car Detailing"
                  className="h-[360px] sm:h-[550px] lg:h-[670px] xl:h-[720px] w-full object-cover"
                />
                <div className="absolute top-5 left-5 bg-black/75 backdrop-blur-lg border border-white/20 rounded-lg px-4 py-3">

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
                      className="bg-brand-orange flex flex-col items-center justify-center gap-2 py-3 lg:py-4 border border-white/10"
                    >
                      <item.icon className="h-5 w-5 lg:h-6 lg:w-6 text-white" />

                      <div className="text-xs lg:text-sm font-semibold">
                        {item.title}
                      </div>

                      <div className="hidden lg:block text-[11px] text-white/80">
                        {item.sub}
                      </div>

                    </div>
                  ))}

                </div>

              </div>

            </div> {/* grid end */}
          </div>

        </div> {/* container end */}

      </section>

      <Footer />
    </div>
  );
}
