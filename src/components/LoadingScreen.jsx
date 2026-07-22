import { motion } from "framer-motion";
import profilePic from "../assets/profile.jpeg";

function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center z-[100] overflow-hidden"
    >
      <div className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-purple-500/50 shadow-lg shadow-purple-900/40 mb-6"
      >
        <img src={profilePic} alt="Hadi" className="w-full h-full object-cover" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="relative text-4xl md:text-5xl font-bold tracking-wide"
      >
        Hadi<span className="text-purple-500">.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative text-gray-500 text-sm mt-3 tracking-[0.3em] uppercase"
      >
        Portfolio
      </motion.p>

      <div className="relative w-48 h-[2px] bg-gray-800 rounded-full mt-8 overflow-hidden">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity }}
          className="h-full w-1/2 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
        ></motion.div>
      </div>
    </motion.div>
  );
}

export default LoadingScreen;