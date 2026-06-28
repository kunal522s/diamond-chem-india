import { Mail, Phone, MapPin } from "lucide-react";

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
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2"><Phone className="h-4 w-4 text-brand-orange" /> +91 98765 43210</li>
              <li className="flex gap-2"><Mail className="h-4 w-4 text-brand-orange" /> sales@diamondchemindia.com</li>
              <li className="flex gap-2"><MapPin className="h-4 w-4 text-brand-orange mt-0.5" /> Industrial Area, Phase II, India</li>
            </ul>
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
        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/50">
          © {new Date().getFullYear()} Diamond Chem India · All rights reserved
        </div>
      </div>
    </footer>
  );
}
