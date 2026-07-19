import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function TermsConditions() {
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
            Terms & Conditions
          </h1>

          <p className="mt-5 max-w-3xl text-white/70 leading-8">
            Please read these Terms & Conditions carefully before using the
            Diamond Chem India website or placing an order. By accessing our
            website, you agree to comply with these terms.
          </p>

        </div>
      </section>

      {/* Content */}
      <section className="bg-white">
        <div className="container mx-auto max-w-5xl px-4 md:px-8 py-16">

          <div className="rounded-3xl border border-gray-200 bg-white shadow-xl p-8 md:p-12 space-y-10">

            <div>
              <h2 className="text-2xl font-bold mb-4">
                Orders
              </h2>

              <p className="text-gray-600 leading-8">
                All orders placed through our website are subject to product
                availability and acceptance. Diamond Chem India reserves the
                right to refuse, cancel or limit any order at its sole
                discretion.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">
                Pricing
              </h2>

              <p className="text-gray-600 leading-8">
                Product prices displayed on the website are subject to change
                without prior notice. The price applicable at the time an order
                is successfully placed shall be considered final.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">
                Product Usage
              </h2>

              <p className="text-gray-600 leading-8">
                All Diamond Chem India products should be used strictly as per
                the recommended instructions. We shall not be responsible for
                damages arising from improper handling, misuse or incorrect
                application of any product.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">
                Intellectual Property
              </h2>

              <p className="text-gray-600 leading-8">
                All content on this website including text, product images,
                graphics, logos, branding and other materials are the property
                of Diamond Chem India and may not be copied, reproduced or used
                without prior written permission.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">
                Limitation of Liability
              </h2>

              <p className="text-gray-600 leading-8">
                Diamond Chem India shall not be liable for any indirect,
                incidental, special or consequential damages resulting from the
                use of our products or website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">
                Governing Law
              </h2>

              <p className="text-gray-600 leading-8">
                These Terms & Conditions shall be governed by the laws of India.
                Any disputes arising from the use of this website or our
                products shall be subject to the jurisdiction of the competent
                courts of Uttar Pradesh, India.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">
                Contact Us
              </h2>

              <p className="text-gray-600 leading-8 mb-6">
                If you have any questions regarding these Terms & Conditions,
                please contact us.
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