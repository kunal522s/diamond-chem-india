import { motion } from "framer-motion";

export default function AnimatedText({
  text,
  className = "",
  glow = false,
}) {
  return (
    <motion.span
      className={`inline-block ${className}`}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.03,
          },
        },
      }}
    >
      {text.split("").map((letter, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: {
              opacity: 0,
              y: 28,
              filter: "blur(8px)",
            },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            },
          }}
          transition={{
            duration: 0.45,
            ease: "easeOut",
          }}
          className={`relative inline-block ${
            glow ? "animated-orange-letter" : ""
          }`}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
}