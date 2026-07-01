import cloudinary
import cloudinary.uploader
import cloudinary.api

# -------------------------------
# Cloudinary Configuration
# -------------------------------
cloudinary.config(
    cloud_name="lw3ob7dp",
    api_key="989924354331375",
    api_secret="ulG_iD6bQQSUB1G4L9j34BXpTZg",
    secure=True
)

print("Uploading sample image...\n")

# Upload a sample image from Cloudinary demo
result = cloudinary.uploader.upload(
    "https://res.cloudinary.com/demo/image/upload/sample.jpg"
)

print("Secure URL:")
print(result["secure_url"])

print("\nPublic ID:")
print(result["public_id"])

# -------------------------------
# Fetch image metadata
# -------------------------------
info = cloudinary.api.resource(result["public_id"])

print("\nImage Details")
print("---------------------")
print("Width :", info["width"])
print("Height:", info["height"])
print("Format:", info["format"])
print("Bytes :", info["bytes"])

# -------------------------------
# Generate optimized URL
# f_auto  -> automatic image format
# q_auto  -> automatic quality
# -------------------------------
optimized_url = cloudinary.CloudinaryImage(
    result["public_id"]
).build_url(
    fetch_format="auto",
    quality="auto",
    secure=True
)

print("\nDone! Click link below to see optimized version of the image.")
print(optimized_url)