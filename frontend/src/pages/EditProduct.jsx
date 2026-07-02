import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { X } from "lucide-react";

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        name: "",
        description: "",
        category: "",
        image: "",
        featured: false,
        variants: [
            {
                size: "",
                price: "",
            },
        ],
    });

    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState("");

    useEffect(() => {
        loadProduct();
    }, []);

    const loadProduct = async () => {
        try {
            const res = await api.get(`/products/${id}`);

            setForm(res.data);
            setPreview(res.data.image);
        } catch {
            toast.error("Product not found");
            navigate("/admin");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleVariant = (field, value) => {
        const variants = [...form.variants];

        variants[0][field] = value;

        setForm({
            ...form,
            variants,
        });
    };

    const save = async (e) => {
        e.preventDefault();
        if (saving) return;
        setSaving(true);
        try {
            let image = form.image;

            if (imageFile) {
                const fd = new FormData();
                fd.append("file", imageFile);

                const upload = await api.post("/upload", fd);

                image = upload.data.image;
            }

            await api.put(`/products/${id}`, {
                ...form,
                image,
                variants: form.variants.map((v) => ({
                    ...v,
                    price: Number(v.price),
                })),
            });

            toast.success("Product Updated");
            navigate("/admin");
        } catch (err) {
            console.log(err.response?.data);
            toast.error("Update Failed");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="p-10 text-center">
                Loading...
            </div>
        );
    }

    const imageSrc =
        preview?.startsWith("blob:")
            ? preview
            : preview?.startsWith("http")
                ? preview
                : preview?.startsWith("/uploads")
                    ? `http://127.0.0.1:8000${preview}`
                    : preview;

    return (
        <div className="min-h-screen bg-secondary flex justify-center py-10">
            <div className="bg-white w-full max-w-3xl rounded-sm border border-border p-8">

                <div className="flex items-center justify-between mb-8">
                    <h1 className="font-heading text-3xl font-black">
                        Edit Product
                    </h1>

                    <button
                        type="button"
                        onClick={() => navigate("/admin")}
                        className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-gray-100 transition"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={save} className="space-y-5">

                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-sm"
                    />

                    <textarea
                        rows={5}
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-sm"
                    />

                    <input
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-sm"
                    />

                    <div>
                        <label className="font-semibold mb-2 block">
                            Current Image
                        </label>

                        <img
                            src={imageSrc}
                            alt={form.name}
                            className="h-48 w-48 object-cover rounded border mb-4"
                        />

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];

                                if (!file) return;

                                setImageFile(file);
                                setPreview(URL.createObjectURL(file));
                            }}
                        />

                        <p className="text-xs text-gray-500 mt-2">
                            Leave empty to keep current image.
                        </p>
                    </div>

                    <input
                        type="text"
                        placeholder="Enter Size (e.g. 300ml, 500ml, 1L, 5L)"
                        value={form.variants[0].size}
                        onChange={(e) => handleVariant("size", e.target.value)}
                        className="w-full border p-3 rounded-sm"
                    />

                    <input
                        type="text"
                        inputMode="numeric"
                        placeholder="Enter Price"
                        value={form.variants[0].price}
                        onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, "");
                            handleVariant("price", value);
                        }}
                        className="w-full border p-3 rounded-sm"
                    />

                    <label className="flex gap-3 items-center">
                        <input
                            type="checkbox"
                            checked={form.featured}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    featured: e.target.checked,
                                })
                            }
                        />
                        Featured Product
                    </label>

                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-brand-orange text-white px-6 py-3 rounded-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {saving && (
                            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        )}

                        {saving ? "Saving Changes..." : "Save Changes"}
                    </button>

                </form>

            </div>
        </div>
    );
}