import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";

function About() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const docRef = doc(db, "content", "about");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAbout(docSnap.data());
        }
      } catch (err) {
        console.error("Error fetching about:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  if (loading) {
    return (
      <section id="about" className="py-24 px-6">
        <p className="text-center text-gray-400">Loading...</p>
      </section>
    );
  }

  if (!about) {
    return (
      <section id="about" className="py-24 px-6">
        <p className="text-center text-gray-400">About content not added yet.</p>
      </section>
    );
  }

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">About <span className="text-purple-500">Me</span></h2>
          <p className="text-gray-400 text-center mb-12">Get to know me a little better</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-purple-500/50 transition-colors duration-300">
          <p className="text-gray-300 leading-relaxed mb-4">{about.paragraph1}</p>
          <p className="text-gray-300 leading-relaxed">{about.paragraph2}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-500">{about.stat1Value}</p>
              <p className="text-gray-400 text-sm">{about.stat1Label}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-500">{about.stat2Value}</p>
              <p className="text-gray-400 text-sm">{about.stat2Label}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-500">{about.stat3Value}</p>
              <p className="text-gray-400 text-sm">{about.stat3Label}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-500">{about.stat4Value}</p>
              <p className="text-gray-400 text-sm">{about.stat4Label}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;