import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function RefundPolicy() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-brand-jet text-white border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8 py-16 md:py-20">

          {/* Back Button */}
          <Link
            to="/"
            className="label-tech text-brand-orange inline-flex items-center gap-2 mb-10 hover:text-orange-300 transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </Link>

          <div className="text-brand-orange uppercase tracking-[0.3em] text-sm font-semibold">
            Diamond Chem India
          </div>

          <h1 className="mt-4 text-4xl md:text-6xl font-black">
            Refund & Cancellation Policy
          </h1>

          <p className="mt-5 max-w-3xl text-white/70 leading-8">
            We strive to provide premium quality automotive care products.
            Please read our Refund & Cancellation Policy carefully before
            placing an order.
          </p>

        </div>
      </section>

      {/* Content */}

      <section className="bg-white">
        <div className="container mx-auto max-w-5xl px-4 md:px-8 py-16">

          <div className="rounded-3xl border border-gray-200 bg-white shadow-xl p-8 md:p-12 space-y-10">

            {/* Order Cancellation */}

            <div>
              <h2 className="text-2xl font-bold mb-4">
                Order Cancellation
              </h2>

              <p className="text-gray-600 leading-8">
                Orders can be cancelled only before they are processed for
                dispatch. Once an order has been shipped, cancellation is no
                longer possible.
              </p>
            </div>

            {/* Damaged Products */}

            <div>
              <h2 className="text-2xl font-bold mb-4">
                Damaged or Incorrect Products
              </h2>

              <p className="text-gray-600 leading-8">
                If you receive a damaged, defective, or incorrect product,
                please contact our support team within
                <strong> 48 hours</strong> of delivery with clear photographs
                and your order details.
              </p>
            </div>

            {/* Refund Eligibility */}

            <div>
              <h2 className="text-2xl font-bold mb-4">
                Refund Eligibility
              </h2>

              <p className="text-gray-600 leading-8">
                Refunds are processed only after our team verifies the reported
                issue. Once approved, the refund will be credited to your
                original payment method.
              </p>
            </div>

            {/* Refund Time */}

            <div>
              <h2 className="text-2xl font-bold mb-4">
                Refund Processing Time
              </h2>

              <p className="text-gray-600 leading-8">
                Approved refunds are usually processed within
                <strong> 5–7 business days</strong>. The final credit time may
                vary depending on your bank or payment provider.
              </p>
            </div>

            {/* Non Refund */}

            <div>
              <h2 className="text-2xl font-bold mb-4">
                Non-Refundable Situations
              </h2>

              <ul className="space-y-3 text-gray-600 leading-7">
                <li>• Products damaged due to improper usage.</li>

                <li>• Orders cancelled after dispatch.</li>

                <li>
                  • Minor packaging variations that do not affect product
                  quality.
                </li>

                <li>
                  • Products purchased during promotional offers unless found
                  defective.
                </li>
              </ul>
            </div>

            {/* Contact */}

            <div>
              <h2 className="text-2xl font-bold mb-4">
                Contact Support
              </h2>

              <p className="text-gray-600 leading-8 mb-6">
                If you have any questions regarding refunds or cancellations,
                please feel free to contact our support team.
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