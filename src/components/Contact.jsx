import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_jjzebma";
const EMAILJS_TEMPLATE_ID = "template_x6e3thp";
const EMAILJS_PUBLIC_KEY = "L075CX89aeH5Q_irP";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      // Save to Firestore
      await addDoc(collection(db, "messages"), {
        ...formData,
        createdAt: serverTimestamp(),
        read: false,
      });

      // Send email notification via EmailJS
      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
          },
          EMAILJS_PUBLIC_KEY
        );
      } catch (emailErr) {
        console.error("Email notification failed (message still saved):", emailErr);
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Error sending message:", err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 px-6">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In <span className="text-purple-500">Touch</span></h2>
        <p className="text-gray-400 mb-8">Have a project in mind? Let's talk.</p>

        <div className="flex justify-center gap-6 mb-12">
          {social.githubUrl && (
            <a href={social.githubUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800/50 border border-gray-700 hover:border-purple-500 hover:text-purple-400 hover:-translate-y-1 transition-all duration-300 text-xl">
              <FaGithub />
            </a>
          )}
          {social.linkedinUrl && (
            <a href={social.linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800/50 border border-gray-700 hover:border-purple-500 hover:text-purple-400 hover:-translate-y-1 transition-all duration-300 text-xl">
              <FaLinkedin />
            </a>
          )}
          {social.emailAddress && (
            <a href={`mailto:${social.emailAddress}`} className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800/50 border border-gray-700 hover:border-purple-500 hover:text-purple-400 hover:-translate-y-1 transition-all duration-300 text-xl">
              <FaEnvelope />
            </a>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="Your name" />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="your@email.com" />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Message</label>
            <textarea name="message" value={formData.message} onChange={handleChange} required rows="4" className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="Your message..."></textarea>
          </div>
          <button type="submit" disabled={status === "sending"} className="w-full bg-purple-600 hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-600/30 py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50">
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && <p className="text-green-400 text-sm text-center">Message sent successfully! ✅</p>}
          {status === "error" && <p className="text-red-400 text-sm text-center">Something went wrong. Try again.</p>}
        </form>
      </motion.div>
    </section>
  );
}

export default Contact;