import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function ShippingPolicy() {
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
            Shipping & Delivery Policy
          </h1>

          <p className="mt-5 max-w-3xl text-white/70 leading-8">
            We are committed to delivering premium automotive care products
            safely and on time across India. Please read our shipping policy
            before placing an order.
          </p>

        </div>
      </section>

      {/* Content */}
      <section className="bg-white">
        <div className="container mx-auto max-w-5xl px-4 md:px-8 py-16">

          <div className="rounded-3xl border border-gray-200 bg-white shadow-xl p-8 md:p-12 space-y-10">

            <div>
              <h2 className="text-2xl font-bold mb-4">
                Order Processing
              </h2>

              <p className="text-gray-600 leading-8">
                Orders are usually processed within
                <strong> 1–2 business days </strong>
                after confirmation. Orders placed on Sundays or public holidays
                will be processed on the next working day.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">
                Shipping Coverage
              </h2>

              <p className="text-gray-600 leading-8">
                We currently deliver across most locations in India through
                trusted courier and transport partners. Delivery availability
                may vary depending on your location.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">
                Estimated Delivery Time
              </h2>

              <p className="text-gray-600 leading-8">
                Delivery generally takes
                <strong> 3–7 business days </strong>
                after dispatch. Delivery time may vary depending on destination,
                weather conditions, courier operations, or unforeseen
                circumstances.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">
                Shipping Charges
              </h2>

              <p className="text-gray-600 leading-8">
                Shipping charges, if applicable, will be displayed during
                checkout or communicated before order confirmation for bulk
                orders.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">
                Delivery Delays
              </h2>

              <p className="text-gray-600 leading-8">
                While we strive to deliver orders within the estimated time,
                Diamond Chem India shall not be held responsible for delays
                caused by courier services, natural disasters, strikes,
                government restrictions, or other events beyond our control.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">
                Order Tracking
              </h2>

              <p className="text-gray-600 leading-8">
                Once your order is dispatched, shipment details or tracking
                information will be shared whenever available.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">
                Contact Support
              </h2>

              <p className="text-gray-600 leading-8 mb-6">
                For any shipping or delivery related queries, please contact our
                support team.
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