import whatsappLogo from "@/assets/whatsapp-logo.png";

export default function WhatsAppFloat() {
  return (
    <a
  href="https://wa.me/919927873632"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Chat with us on WhatsApp"
  className="fixed bottom-6 right-6 z-50 group"
>
  <img
    src={whatsappLogo}
    alt="WhatsApp"
    className="
      w-16 h-16
      md:w-20 md:h-20
      transition-all
      duration-300
      group-hover:scale-110
      drop-shadow-2xl
    "
  />
</a>
  );
}