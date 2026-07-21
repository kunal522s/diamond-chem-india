import { useEffect, useState } from "react";
import {
    Clock3,
    Package,
    Truck,
    House,
    CheckCircle2,
    CreditCard,
    ChevronUp,
    CheckCircle,
    CircleDashed,
    Box,
} from "lucide-react";
import { api } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const STATUS_COLOR = {
    Pending: "bg-yellow-100 text-yellow-700",
    Packed: "bg-blue-100 text-blue-700",
    Dispatched: "bg-purple-100 text-purple-700",
    Delivered: "bg-green-100 text-green-700",
};

const PAYMENT_COLOR = {
    Paid: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Failed: "bg-red-100 text-red-700",
};

const STEPS = [
    {
        title: "Pending",
        icon: Clock3,
    },
    {
        title: "Packed",
        icon: Package,
    },
    {
        title: "Dispatched",
        icon: Truck,
    },
    {
        title: "Delivered",
        icon: House,
    },
];

export default function MyOrders() {
    const [phone, setPhone] = useState("");

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(false);
    const [openOrder, setOpenOrder] = useState(null);

    const fetchOrders = async () => {

        if (!phone) return;

        setLoading(true);

        try {

            const res = await api.get(`/my-orders/${phone}`);

            setOrders(res.data);

        } catch (err) {

            console.log(err);

            setOrders([]);

        } finally {

            setLoading(false);

        }

    };

    const searchOrders = async () => {

        if (!phone) return;

        localStorage.setItem("customerPhone", phone);

        await fetchOrders();

        setPhone(""); // Search ke baad input clear

    };

    useEffect(() => {

        const savedPhone = localStorage.getItem("customerPhone");

        if (savedPhone) {

            setLoading(true);

            api.get(`/my-orders/${savedPhone}`)
                .then((res) => setOrders(res.data))
                .catch(() => setOrders([]))
                .finally(() => setLoading(false));

        }

    }, []);

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-secondary py-10">

                <div className="container mx-auto max-w-5xl px-4">

                    <h1 className="font-heading text-4xl font-black mb-8">
                        My Orders
                    </h1>

                    <div className="bg-white rounded-sm border p-6 flex gap-3 flex-col md:flex-row">

                        <input
                            type="text"
                            placeholder="Enter Mobile Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    searchOrders();
                                }
                            }}
                            className="border rounded-sm px-4 py-3 flex-1"
                        />

                        <button
                            onClick={searchOrders}
                            className="bg-brand-orange text-white px-6 rounded-sm"
                        >
                            Search
                        </button>

                    </div>

                    {loading && (
                        <p className="mt-8">Loading...</p>
                    )}

                    {!loading && orders.length > 0 && (

                        <div className="mt-8 space-y-6">

                            {orders.map((order) => {

                                const current = STEPS.findIndex(
                                    (step) => step.title === order.status
                                );

                                return (

                                    <div
                                        key={order.id}
                                        className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                                    >

                                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">

                                            {/* Order Icon */}
                                            <div className="flex items-center gap-5">

                                                <div className="h-16 w-16 rounded-2xl bg-orange-50 flex items-center justify-center">

                                                    <Package className="w-8 h-8 text-brand-orange" />

                                                </div>

                                                <div>

                                                    <p className="text-sm text-gray-500">
                                                        Order ID
                                                    </p>

                                                    <h3 className="font-bold text-lg break-all">
                                                        #{order.id.slice(-8).toUpperCase()}
                                                    </h3>

                                                    <p className="text-gray-500 mt-2 text-sm">
                                                        {new Date(order.date).toLocaleDateString("en-GB", {
                                                            day: "numeric",
                                                            month: "long",
                                                            year: "numeric",
                                                        })}
                                                    </p>

                                                </div>

                                            </div>

                                            {/* Dealer */}
                                            <div className="lg:border-l lg:pl-6">

                                                <p className="text-gray-500 text-sm">
                                                    Dealer
                                                </p>

                                                <h2 className="font-bold text-xl mt-1">
                                                    {order.dealer_name}
                                                </h2>

                                                <p className="text-gray-500 mt-2">
                                                    {order.phone}
                                                </p>

                                            </div>

                                            {/* Amount */}
                                            <div className="lg:border-l lg:pl-6">

                                                <p className="text-gray-500 text-sm">
                                                    Total Amount
                                                </p>

                                                <h2 className="text-[30px] font-bold text-green-600 mt-1">
                                                    ₹ {order.total_amount}
                                                </h2>

                                                <p className="text-gray-500 mt-2">
                                                    {order.products.length} Item(s)
                                                </p>

                                            </div>

                                            {/* Status */}
                                            <div className="flex flex-col gap-3">

                                                <div
                                                    className={`inline-flex justify-center items-center rounded-xl px-5 py-3 font-semibold
${order.status === "Pending"
                                                            ? "bg-yellow-50 text-yellow-700"
                                                            : order.status === "Packed"
                                                                ? "bg-blue-50 text-blue-700"
                                                                : order.status === "Dispatched"
                                                                    ? "bg-purple-50 text-purple-700"
                                                                    : "bg-green-50 text-green-700"
                                                        }`}
                                                >

                                                    {order.status === "Pending" ? (
                                                        <Clock3 size={18} className="mr-2" />
                                                    ) : order.status === "Packed" ? (
                                                        <Box size={18} className="mr-2" />
                                                    ) : order.status === "Dispatched" ? (
                                                        <Truck size={18} className="mr-2" />
                                                    ) : (
                                                        <CheckCircle size={18} className="mr-2" />
                                                    )}

                                                    {order.status}

                                                </div>

                                                <div
                                                    className={`inline-flex justify-center items-center rounded-xl px-5 py-3 font-semibold
${order.payment_status === "Paid"
                                                            ? "bg-green-50 text-green-700"
                                                            : order.payment_status === "Pending"
                                                                ? "bg-yellow-50 text-yellow-700"
                                                                : "bg-red-50 text-red-700"
                                                        }`}
                                                >

                                                    {order.payment_status === "Paid" ? (
                                                        <CheckCircle size={18} className="mr-2" />
                                                    ) : order.payment_status === "Pending" ? (
                                                        <Clock3 size={18} className="mr-2" />
                                                    ) : (
                                                        <CircleDashed size={18} className="mr-2" />
                                                    )}

                                                    {order.payment_status}

                                                </div>

                                            </div>

                                            {/* Expand */}
                                            <div className="flex justify-end items-center">

                                                <button
                                                    onClick={() =>
                                                        setOpenOrder(openOrder === order.id ? null : order.id)
                                                    }
                                                    className="text-gray-600 hover:text-brand-orange transition"
                                                >

                                                    <svg
                                                        className={`w-7 h-7 transition-transform ${openOrder === order.id ? "rotate-180" : ""
                                                            }`}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        viewBox="0 0 24 24"
                                                    >

                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M19 9l-7 7-7-7"
                                                        />

                                                    </svg>

                                                </button>

                                            </div>

                                        </div>

                                        {openOrder === order.id && (

                                            <div className="mt-8 border-t pt-8 bg-gray-50 rounded-xl p-6">

                                                <div className="grid lg:grid-cols-2 gap-10 items-start">

                                                    {/* LEFT */}

                                                    <div className="lg:border-r lg:pr-8">

                                                        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-5">
                                                            ORDER ITEMS ({order.products.length})
                                                        </h3>

                                                        <div className="space-y-5 max-h-[340px] overflow-y-auto pr-2">

                                                            {order.products.map((item, i) => (

                                                                <div
                                                                    key={i}
                                                                    className="flex justify-between items-center border-b pb-5"
                                                                >

                                                                    <div className="flex gap-4">

                                                                        <img
                                                                            src={item.product_image}
                                                                            alt={item.product_name}
                                                                            className="w-20 h-20 rounded-xl border object-cover"
                                                                        />

                                                                        <div>

                                                                            <h4 className="text-base font-semibold text-gray-900">
                                                                                {item.product_name}
                                                                            </h4>

                                                                            <p className="text-sm text-gray-500 mt-1">
                                                                                {item.variant_size}
                                                                            </p>

                                                                        </div>

                                                                    </div>

                                                                    <div className="text-right">

                                                                        <p className="text-sm text-gray-500">
                                                                            Qty : {item.quantity}
                                                                        </p>

                                                                        <p className="text-2xl font-bold text-green-600 mt-1">
                                                                            ₹ {Number(item.variant_price) * Number(item.quantity)}
                                                                        </p>

                                                                    </div>

                                                                </div>

                                                            ))}

                                                        </div>

                                                        <div className="mt-8 rounded-2xl bg-orange-50/40 border p-6 flex justify-between items-center">

                                                            <div>

                                                                <p className="text-gray-500">
                                                                    Total Items
                                                                </p>

                                                                <h2 className="text-4xl font-bold">
                                                                    {order.products.length}
                                                                </h2>

                                                            </div>

                                                            <div className="border-l pl-8">

                                                                <p className="text-gray-500">
                                                                    Total Amount
                                                                </p>

                                                                <h2 className="text-4xl font-bold text-green-600">
                                                                    ₹ {order.total_amount}
                                                                </h2>

                                                            </div>

                                                        </div>

                                                    </div>

                                                    <div className="lg:pl-8">

                                                        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-5">
                                                            DELIVERY PROGRESS
                                                        </h3>

                                                        <div className="relative mb-10">

                                                            <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 rounded-full"></div>

                                                            <div
                                                                className="absolute top-5 left-0 h-1 bg-green-600 rounded-full"
                                                                style={{
                                                                    width: `${(current / (STEPS.length - 1)) * 100}%`,
                                                                }}
                                                            ></div>

                                                            <div className="relative grid grid-cols-4 gap-4">

                                                                {STEPS.map((step, index) => {

                                                                    const Icon = step.icon;
                                                                    const active = index <= current;

                                                                    return (

                                                                        <div
                                                                            key={step.title}
                                                                            className="flex flex-col items-center"
                                                                        >

                                                                            <div
                                                                                className={`w-12 h-12 rounded-full flex items-center justify-center border-2
                            ${active
                                                                                        ? "bg-green-600 border-green-600 text-white"
                                                                                        : "bg-white border-gray-300 text-gray-400"
                                                                                    }`}
                                                                            >

                                                                                {active ? (
                                                                                    <CheckCircle2 size={20} />
                                                                                ) : (
                                                                                    <Icon size={20} />
                                                                                )}

                                                                            </div>

                                                                            <p
                                                                                className={`mt-3 font-medium text-sm ${active
                                                                                    ? "text-green-700"
                                                                                    : "text-gray-500"
                                                                                    }`}
                                                                            >
                                                                                {step.title}
                                                                            </p>

                                                                            <span className="text-xs text-gray-400 mt-1">

                                                                                {active
                                                                                    ? new Date(order.date).toLocaleDateString()
                                                                                    : "Waiting"}

                                                                            </span>

                                                                        </div>

                                                                    );

                                                                })}

                                                            </div>

                                                        </div>

                                                        <h3 className="font-bold tracking-widest text-sm mb-4">
                                                            DELIVERY ADDRESS
                                                        </h3>

                                                        <div className="border rounded-xl p-5 bg-white text-sm text-gray-600 leading-6">

                                                            {order.address}

                                                        </div>

                                                        <button
                                                            onClick={() => setOpenOrder(null)}
                                                            className="mt-8 w-full h-14 border-2 border-brand-orange rounded-xl text-brand-orange font-medium hover:bg-brand-orange hover:text-white transition flex items-center justify-center gap-2"
                                                        >

                                                            <ChevronUp size={18} />

                                                            Hide Details

                                                        </button>

                                                    </div>

                                                </div>

                                            </div>

                                        )}

                                    </div>

                                );

                            })}

                        </div>

                    )}

                    {!loading && phone && orders.length === 0 && (

                        <div className="mt-10 bg-white border rounded-sm p-10 text-center">

                            No Orders Found

                        </div>

                    )}

                </div>

            </div>

            <Footer />
        </>
    );
}