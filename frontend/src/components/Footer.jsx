import {
  Phone,
  MapPin,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";

import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-brand-jet text-white">
      <div className="container mx-auto px-4 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2 flex flex-col justify-between">

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-orange shadow-lg shadow-brand-orange/20">
                  <span className="font-heading text-2xl font-black text-brand-jet">
                    D
                  </span>
                </div>

                <div>
                  <h2 className="font-heading text-3xl font-black tracking-tight">
                    Diamond Chem India
                  </h2>

                  <p className="text-xs uppercase tracking-[0.35em] text-white/40">
                    Premium Automotive Care Chemicals
                  </p>
                </div>
              </div>

              <p className="max-w-lg leading-8 text-white/65">
                Manufacturing premium detailing chemicals trusted by workshops,
                dealerships, detailing studios and distributors across India.
              </p>
            </div>

            <div className="mt-10 flex gap-4">

              <a
                href="https://wa.me/919927873632"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-green-500 hover:bg-green-500"
              >
                <MessageCircle className="h-5 w-5 transition group-hover:scale-110" />
              </a>

              <a
                href="https://www.instagram.com/anujkumardhariwal/?utm_source=ig_web_button_share_sheet"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-pink-500 hover:bg-pink-500"
              >
                <FaInstagram className="h-5 w-5 transition group-hover:scale-110" />
              </a>

            </div>

          </div>

          <div>

            <div className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-brand-orange">
              CONTACT
            </div>

            <div className="space-y-5">

              <a
                href="tel:+917060882911"
                className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-brand-orange hover:bg-white/10"
              >
                <div>
                  <p className="text-xs text-white/40 uppercase">Phone</p>
                  <p className="mt-1 font-medium">+91 7060882911</p>
                </div>

                <Phone className="h-5 w-5 text-brand-orange group-hover:rotate-12 transition" />
              </a>

              <a
                href="https://www.google.com/maps/place/Diamond+Chem+India/@28.73747,77.8114062,17z/data=!3m1!4b1!4m6!3m5!1s0x390c85004d46efc3:0xcee6e40bbffa6909!8m2!3d28.73747!4d77.8114062!16s%2Fg%2F11vt5lvdt3?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-brand-orange hover:bg-white/10"
              >
                <div>
                  <p className="text-xs text-white/40 uppercase">Factory</p>

                  <p className="mt-1 text-sm leading-6">
                    Diamond Chem India,
                    <br />
                    Jarothi Village,
                    <br />
                    Hapur, Uttar Pradesh
                  </p>
                </div>

                <MapPin className="h-5 w-5 text-brand-orange" />
              </a>

            </div>

          </div>

          <div>

            <div className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-brand-orange">
              BUSINESS
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-6">

              <div className="flex justify-between py-3 border-b border-white/10">
                <span className="text-white/60">Monday – Saturday</span>
                <span>9:00 – 19:00</span>
              </div>

              <div className="flex justify-between py-3 border-b border-white/10">
                <span className="text-white/60">Sunday</span>
                <span>Closed</span>
              </div>

              <div className="pt-5">

                <a
                  href="https://wa.me/919927873632"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-5 py-3 font-semibold text-brand-jet transition hover:scale-105"
                >
                  Request Bulk Quote
                  <ArrowUpRight className="h-4 w-4" />
                </a>

              </div>

            </div>

          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">

          <p>
            © {new Date().getFullYear()} Diamond Chem India. All Rights Reserved.
          </p>

          <p className="tracking-[0.3em] uppercase">
            Made For Professional Detailing
          </p>

        </div>
      </div>
    </footer>
  );
}
