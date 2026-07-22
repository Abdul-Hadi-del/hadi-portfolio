import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";
import {
  FaPython, FaJs, FaReact, FaGitAlt, FaDatabase, FaHtml5, FaCss3Alt, FaNodeJs, FaJava, FaPhp
} from "react-icons/fa";
import { SiFirebase, SiFlask, SiTailwindcss, SiMongodb, SiCplusplus, SiTypescript, SiMysql } from "react-icons/si";

// Skill name (lowercase match) -> Icon
const iconMap = {
  python: FaPython,
  javascript: FaJs,
  react: FaReact,
  git: FaGitAlt,
  github: FaGitAlt,
  sql: FaDatabase,
  "sql / databases": FaDatabase,
  html: FaHtml5,
  css: FaCss3Alt,
  node: FaNodeJs,
  "node.js": FaNodeJs,
  java: FaJava,
  php: FaPhp,
  firebase: SiFirebase,
  flask: SiFlask,
  "flask / backend": SiFlask,
  tailwind: SiTailwindcss,
  mongodb: SiMongodb,
  "c++": SiCplusplus,
  typescript: SiTypescript,
  mysql: SiMysql,
};

function getIcon(skillName) {
  const key = skillName?.toLowerCase().trim();
  return iconMap[key] || null;
}

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "skills"));
        const list = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSkills(list);
      } catch (err) {
        console.error("Error fetching skills:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return (
    <section id="skills" className="py-24 px-6 bg-gray-800/30">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">My <span className="text-purple-500">Skills</span></h2>
          <p className="text-gray-400 text-center mb-12">Technologies I work with</p>
        </motion.div>

        {loading ? (
          <p className="text-center text-gray-400">Loading skills...</p>
        ) : skills.length === 0 ? (
          <p className="text-center text-gray-400">No skills added yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((skill, index) => {
              const Icon = getIcon(skill.name);
              return (
                <motion.div key={skill.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.05 }}>
                  <div className="flex justify-between mb-2 items-center">
                    <span className="text-gray-200 font-medium flex items-center gap-2">
                      {Icon && <Icon className="text-purple-400" size={14} />}
                      {skill.name}
                    </span>
                    <span className="text-purple-400 text-sm">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-purple-500 h-2.5 rounded-full transition-all duration-1000" style={{ width: `${skill.level}%` }}></div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default Skills;