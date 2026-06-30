import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-brand-jet text-white">
      <div className="container mx-auto px-4 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-brand-orange">
                <span className="font-heading text-xl font-black text-brand-jet">D</span>
              </div>
              <span className="font-heading text-xl font-bold">DIAMOND CHEM INDIA</span>
            </div>
            <p className="text-sm text-white/70 max-w-md leading-relaxed">
              Manufacturer of premium automotive care chemicals. Trusted by dealers across India for bulk, wholesale and OEM supply.
            </p>
          </div>

          <div>
            <div className="label-tech mb-4 text-brand-orange">Contact</div>

            <ul className="space-y-4 text-sm">

              <li>
                <a
                  href="tel:+919927873632"
                  className="flex items-center gap-2 hover:text-brand-orange transition-colors"
                >
                  <Phone className="h-4 w-4 text-brand-orange" />
                  +91 9927873632
                </a>
              </li>

              <li>
                <a
                  href="mailto:kunaldhariwal0007@gmail.com"
                  className="flex items-center gap-2 hover:text-brand-orange transition-colors break-all"
                >
                  <Mail className="h-4 w-4 text-brand-orange" />
                  kunaldhariwal0007@gmail.com
                </a>
              </li>

              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-brand-orange mt-1" />
                <span>Industrial Area, Jarothi Village, India</span>
              </li>

            </ul>

            <a
              href="https://wa.me/919927873632"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-sm bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp Us
            </a>
          </div>

          <div>
            <div className="label-tech mb-4 text-brand-orange">Business Hours</div>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Mon - Sat: 9:00 - 19:00</li>
              <li>Sunday: Closed</li>
              <li className="text-white">Bulk orders 24×7 via portal</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/50">
          <p>
            © {new Date().getFullYear()} Diamond Chem India · All rights reserved.
          </p>

          <p>
            Designed &amp; Developed by{" "}
            <span className="font-medium text-white/80">
              Kunal Dhariwal
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
