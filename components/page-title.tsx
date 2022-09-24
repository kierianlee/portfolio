import { motion } from "framer-motion";

const PageTitle = ({ title }: { title: string }) => {
  return (
    <motion.h1
      className="my-4 text-3xl font-semibold"
      initial={{
        transform: "translateY(20%)",
      }}
      animate={{
        transform: "translateY(0%)",
        transition: {
          duration: 0.5,
          ease: "easeInOut",
        },
      }}
    >
      {title}
    </motion.h1>
  );
};

export default PageTitle;
