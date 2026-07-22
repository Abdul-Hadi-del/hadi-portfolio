import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaGithub, FaExternalLinkAlt } from "react-icons/fa";

function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gray-900 border border-gray-700 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header image */}
          {project.imageUrl && (
            <div className="relative h-64 w-full">
              <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover rounded-t-2xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-gray-900/70 hover:bg-gray-900 transition"
              >
                <FaTimes />
              </button>
            </div>
          )}

          <div className="p-8">
            {!project.imageUrl && (
              <button
                onClick={onClose}
                className="float-right w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition"
              >
                <FaTimes />
              </button>
            )}

            <h2 className="text-3xl font-bold mb-3">{project.title}</h2>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech?.map((tech) => (
                <span key={tech} className="text-xs bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full">{tech}</span>
              ))}
            </div>

            <p className="text-gray-300 leading-relaxed whitespace-pre-line mb-8">
              {project.fullDescription || project.description}
            </p>

            {/* Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="grid grid-cols-2 gap-3 mb-8">
                {project.gallery.map((imgUrl, i) => (
                  <img key={i} src={imgUrl} alt={`${project.title} screenshot ${i + 1}`} className="rounded-lg w-full h-40 object-cover border border-gray-700" />
                ))}
              </div>
            )}

            <div className="flex gap-3">
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-5 py-2.5 rounded-full text-sm font-medium transition">
                  <FaExternalLinkAlt size={12} /> Live Demo
                </a>
              )}
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-gray-600 hover:border-purple-500 px-5 py-2.5 rounded-full text-sm font-medium transition">
                  <FaGithub size={14} /> GitHub
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ProjectModal;