import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

function Hero() {
  const [resumeUrl, setResumeUrl] = useState("");
  const [heroMediaUrl, setHeroMediaUrl] = useState("");
  const [heroMediaType, setHeroMediaType] = useState("");
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const docRef = doc(db, "content", "resume");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setResumeUrl(docSnap.data().url || "");
        }
      } catch (err) {
        console.error("Error fetching resume:", err);
      }
    };

    const fetchHeroMedia = async () => {
      try {
        const docRef = doc(db, "content", "heroMedia");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setHeroMediaUrl(docSnap.data().url || "");
          setHeroMediaType(docSnap.data().type || "");
        }
      } catch (err) {
        console.error("Error fetching hero media:", err);
      }
    };

    fetchResume();
    fetchHeroMedia();
  }, []);

  const AvatarCircle = ({ className }) => (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-purple-900 blur-2xl opacity-40 animate-pulse"></div>
      <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-purple-600 to-gray-800 flex items-center justify-center border-4 border-purple-500/40 shadow-2xl shadow-purple-900/50">
        {heroMediaUrl ? (
          heroMediaType === "video" ? (
            <video
              src={heroMediaUrl}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img src={heroMediaUrl} alt="Abdul Hadi Akram" className="w-full h-full object-cover" />
          )
        ) : (
          <p className="text-gray-300 text-center px-2 text-xs md:text-base">
            🎙️ AI Avatar<br className="md:hidden" /><span className="hidden md:inline"> Video</span><br />
            <span className="text-[10px] md:text-sm text-gray-400">(coming soon)</span>
          </p>
        )}
      </div>
      {heroMediaUrl && heroMediaType === "video" && (
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute bottom-2 right-2 w-9 h-9 flex items-center justify-center rounded-full bg-gray-900/90 hover:bg-gray-900 text-white transition z-10 border border-purple-500/40"
        >
          {isMuted ? <FaVolumeMute size={14} /> : <FaVolumeUp size={14} />}
        </button>
      )}
    </div>
  );

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-12 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-800/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">

        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>

          <div className="flex md:block items-center justify-between gap-4 mb-4">
            <div>
              <p className="text-purple-400 mb-2 font-medium tracking-wide">Hi, I'm</p>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Abdul Hadi Akram</h1>
            </div>
            <AvatarCircle className="w-20 h-20 sm:w-24 sm:h-24 md:hidden flex-shrink-0" />
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-400 mb-6">Software Engineering Student & Developer</h2>
          <p className="text-gray-400 mb-8 leading-relaxed max-w-lg">I build fast, scalable applications using modern web technologies. Specializing in AI & Data Science, passionate about creating impactful digital experiences.</p>

          <div className="flex gap-4 flex-wrap">
            <a href="#projects" className="bg-purple-600 hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-600/30 px-6 py-3 rounded-full transition-all duration-300 font-medium">View My Work</a>
            <a href="#contact" className="border border-gray-600 hover:border-purple-500 hover:text-purple-400 px-6 py-3 rounded-full transition-all duration-300 font-medium">Contact Me</a>
            {resumeUrl && (
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer" download className="border border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white px-6 py-3 rounded-full transition-all duration-300 font-medium">
                Download Resume
              </a>
            )}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="hidden md:flex justify-center">
          <AvatarCircle className="w-96 h-96" />
        </motion.div>

      </div>
    </section>
  );
}

export default Hero;