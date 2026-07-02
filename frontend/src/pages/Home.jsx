import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ProductCard from "@/components/ProductCard";
import { ArrowRight, Shield, Truck, Award, Factory } from "lucide-react";

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    api.get("/products").then((r) => {
      console.log("HOME API:", r.data);
      setFeatured(r.data.filter((p) => p.featured));
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <CartDrawer />

      {/* HERO */}
      <section className="relative overflow-hidden bg-brand-slate text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/26954168/pexels-photo-26954168.jpeg"
            alt="Workshop"
            className="h-full w-full object-cover"
          />
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
            <p className="mt-6 text-lg text-white/70 max-w-xl">
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
      <section id="about" className="bg-brand-jet text-white py-20">
        <div className="container mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="label-tech text-brand-orange mb-3">Who We Are</div>
            <h2 className="font-heading text-3xl md:text-5xl font-bold uppercase leading-tight">
              Manufacturing<br />precision since 2006
            </h2>
            <p className="mt-6 text-white/70 leading-relaxed">
              Diamond Chem India is a leading manufacturer of premium car & bike care chemicals. We supply detailing studios, workshops, OEMs and dealers across India with batch-tested formulations engineered for the Indian climate.
            </p>
            <p className="mt-4 text-white/70 leading-relaxed">
              Our products are made in our ISO-certified facility and trusted by 800+ dealers nationwide. Every bottle is built for performance, profitability and repeat business.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-6 max-w-md">
              <div>
                <div className="font-heading text-4xl font-bold text-brand-orange">98%</div>
                <div className="label-tech text-white/60 mt-1">Dealer Retention</div>
              </div>
              <div>
                <div className="font-heading text-4xl font-bold text-brand-orange">5T+</div>
                <div className="label-tech text-white/60 mt-1">Monthly Output</div>
              </div>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-white/10">
            <img
              src="https://images.pexels.com/photos/34337558/pexels-photo-34337558.jpeg"
              alt="Workshop"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-brand-orange/95 p-4 rounded-sm">
              <div className="label-tech text-brand-jet">Facility</div>
              <div className="font-heading font-bold text-brand-jet">Industrial Area, Jarothi Village, Hapur</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
