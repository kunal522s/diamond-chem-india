import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { X } from "lucide-react";


export default function AddProduct() {
    const navigate = useNavigate();
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        name: "",
        description: "",
        category: "",
        image: "",
        featured: false,

        amazon_url: "",
        flipkart_url: "",

        size: "",
        price: "",
    });
    const [imageFile, setImageFile] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const saveProduct = async (e) => {
        e.preventDefault();
        if (saving) return;

        setSaving(true);
        try {

            let imagePath = "";

            if (imageFile) {
                const data = new FormData();
                data.append("file", imageFile);

                const upload = await api.post("/upload", data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                imagePath = upload.data.image;
            }

            await api.post("/products", {
                name: form.name,
                description: form.description,
                category: form.category,
                image: imagePath,
                featured: form.featured,
                amazon_url: form.amazon_url,
                flipkart_url: form.flipkart_url,
                variants: [
                    {
                        size: form.size,
                        price: Number(form.price),
                    },
                ],
            });

            toast.success("Product Added Successfully");
            navigate("/admin");

        } catch (err) {
            console.log(err);
            toast.error("Failed to add product");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-secondary flex justify-center py-10">
            <div className="bg-white w-full max-w-3xl rounded-sm border border-border p-8">

                <div className="flex items-center justify-between mb-8">
                    <h1 className="font-heading text-3xl font-black">
                        Add Product
                    </h1>

                    <button
                        type="button"
                        onClick={() => navigate("/admin")}
                        className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-gray-100 transition"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={saveProduct} className="space-y-5">

                    <input
                        name="name"
                        placeholder="Product Name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border border-border p-3 rounded-sm"
                        required
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        rows={5}
                        value={form.description}
                        onChange={handleChange}
                        className="w-full border border-border p-3 rounded-sm"
                        required
                    />

                    <input
                        name="category"
                        placeholder="Category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full border border-border p-3 rounded-sm"
                        required
                    />

                    <div className="space-y-3">

                        <label className="block font-medium">
                            Product Image
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImageFile(e.target.files[0])}
                            className="w-full border border-border p-3 rounded-sm"
                        />

                        {imageFile && (
                            <img
                                src={URL.createObjectURL(imageFile)}
                                alt=""
                                className="w-48 rounded border"
                            />
                        )}

                    </div>

                    <input
                        type="text"
                        name="size"
                        placeholder="Enter Size (e.g. 300ml, 500ml, 1L, 5L)"
                        value={form.size}
                        onChange={handleChange}
                        className="w-full border border-border p-3 rounded-sm"
                        required
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={form.price}
                        onChange={handleChange}
                        className="w-full border border-border p-3 rounded-sm"
                        required
                    />

                    <div className="border rounded-sm p-5 space-y-4 bg-gray-50">
                        <h3 className="font-heading text-xl font-bold">
                            Marketplace Links
                        </h3>

                        <input
                            type="url"
                            name="amazon_url"
                            placeholder="Amazon Product URL"
                            value={form.amazon_url}
                            onChange={handleChange}
                            className="w-full border border-border p-3 rounded-sm"
                        />

                        <input
                            type="url"
                            name="flipkart_url"
                            placeholder="Flipkart Product URL"
                            value={form.flipkart_url}
                            onChange={handleChange}
                            className="w-full border border-border p-3 rounded-sm"
                        />
                    </div>

                    <label className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            name="featured"
                            checked={form.featured}
                            onChange={handleChange}
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

                        {saving ? "Saving Product..." : "Save Product"}
                    </button>

                </form>

            </div>
        </div>
    );
}