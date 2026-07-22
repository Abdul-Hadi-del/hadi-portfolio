import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

function Footer() {
  const [social, setSocial] = useState({ githubUrl: "", linkedinUrl: "", emailAddress: "" });

  useEffect(() => {
    const fetchSocial = async () => {
      try {
        const docRef = doc(db, "content", "social");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSocial(docSnap.data());
        }
      } catch (err) {
        console.error("Error fetching social:", err);
      }
    };
    fetchSocial();
  }, []);

  return (
    <footer className="border-t border-gray-800 py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-sm">© 2026 Abdul Hadi Akram. Built with React & Tailwind CSS.</p>
        <div className="flex gap-4 text-gray-400">
          {social.githubUrl && (
            <a href={social.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">
              <FaGithub size={18} />
            </a>
          )}
          {social.linkedinUrl && (
            <a href={social.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">
              <FaLinkedin size={18} />
            </a>
          )}
          {social.emailAddress && (
            <a href={`mailto:${social.emailAddress}`} className="hover:text-purple-400 transition-colors">
              <FaEnvelope size={18} />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;