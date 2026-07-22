import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";
import ProjectModal from "./ProjectModal";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projectsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectsList);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">My <span className="text-purple-500">Projects</span></h2>
          <p className="text-gray-400 text-center mb-12">Things I've built</p>
        </motion.div>

        {loading ? (
          <p className="text-center text-gray-400">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-center text-gray-400">No projects added yet.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project, index) => {
              const visibleTech = project.tech?.slice(0, 3) || [];
              const extraTechCount = (project.tech?.length || 0) - visibleTech.length;

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedProject(project)}
                  className="group relative rounded-2xl overflow-hidden border border-gray-800 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] flex flex-col h-80 cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_40px_rgba(147,51,234,0.25)] ring-1 ring-white/5"
                  style={{
                    backgroundImage: project.imageUrl ? `url(${project.imageUrl})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                  {project.imageUrl && (
                    <>
                      <div className="absolute inset-0 bg-gray-950/40"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/90 via-60% to-transparent"></div>
                    </>
                  )}
                  {!project.imageUrl && (
                    <div className="absolute inset-0 bg-gray-800/50"></div>
                  )}
                  <div className="relative flex flex-col h-full p-6">
                    <div className="flex-grow flex flex-col justify-end">
                      <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {visibleTech.map((tech) => (
                          <span key={tech} className="text-xs bg-purple-600/30 backdrop-blur-sm text-purple-200 px-3 py-1 rounded-full">{tech}</span>
                        ))}
                        {extraTechCount > 0 && (
                          <span className="text-xs bg-gray-700/50 backdrop-blur-sm text-gray-300 px-3 py-1 rounded-full">+{extraTechCount} more</span>
                        )}
                      </div>
                    </div>
                    <p className="text-purple-400 text-sm font-medium">View Case Study →</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}

export default Projects;