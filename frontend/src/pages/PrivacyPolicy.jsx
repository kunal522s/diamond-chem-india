import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-brand-jet text-white border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8 py-16 md:py-20">

          {/* Back Button */}
          <Link
            to="/"
            className="label-tech text-brand-orange inline-flex items-center gap-2 mb-10 hover:translate-x-[-2px] transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </Link>

          <div className="text-brand-orange uppercase tracking-[0.3em] text-sm font-semibold">
            Diamond Chem India
          </div>

          <h1 className="mt-4 text-4xl md:text-6xl font-black">
            Privacy Policy
          </h1>

          <p className="mt-5 max-w-3xl text-white/70 leading-8">
            Your privacy is important to us. This Privacy Policy explains how
            Diamond Chem India collects, uses, stores and protects your
            personal information when you visit our website or place an order.
          </p>

        </div>
      </section>

      {/* Content */}
      <section className="bg-white">
        <div className="container mx-auto max-w-5xl px-4 md:px-8 py-16">

          <div className="rounded-3xl border border-gray-200 bg-white shadow-xl p-8 md:p-12 space-y-10">

            <div>
              <h2 className="text-2xl font-bold mb-4">
                Information We Collect
              </h2>

              <ul className="space-y-2 text-gray-600">
                <li>• Name</li>
                <li>• Mobile Number</li>
                <li>• Email Address</li>
                <li>• Delivery Address</li>
                <li>• Order Details</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">
                How We Use Your Information
              </h2>

              <ul className="space-y-2 text-gray-600">
                <li>• Processing and confirming your orders.</li>
                <li>• Providing customer support.</li>
                <li>• Sharing delivery and order updates.</li>
                <li>• Improving our products and website experience.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">
                Data Security
              </h2>

              <p className="text-gray-600 leading-8">
                We implement industry-standard security practices to protect
                your personal information against unauthorized access, misuse,
                alteration or disclosure. Your information is never sold or
                rented to third parties.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">
                Information Sharing
              </h2>

              <p className="text-gray-600 leading-8">
                We may share necessary information only with trusted courier,
                logistics or payment partners for the purpose of processing
                your orders. We do not sell your personal information to any
                third party.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">
                Policy Updates
              </h2>

              <p className="text-gray-600 leading-8">
                Diamond Chem India reserves the right to update this Privacy
                Policy at any time. Any changes will be published on this page
                with immediate effect.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">
                Contact Us
              </h2>

              <p className="text-gray-600 leading-8 mb-6">
                If you have any questions regarding this Privacy Policy, please
                contact us.
              </p>

              <div className="space-y-4">

                <div>
                  <p className="font-semibold text-gray-900">
                    Diamond Chem India
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-brand-orange text-lg shrink-0">
                    📧
                  </span>

                  <a
                    href="mailto:diamondchemindia@gmail.com"
                    className="text-gray-700 hover:text-brand-orange transition break-all"
                  >
                    diamondchemindia@gmail.com
                  </a>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-brand-orange text-lg shrink-0">
                    📞
                  </span>

                  <a
                    href="tel:+917060882911"
                    className="text-gray-700 hover:text-brand-orange transition"
                  >
                    +91 7060882911
                  </a>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}