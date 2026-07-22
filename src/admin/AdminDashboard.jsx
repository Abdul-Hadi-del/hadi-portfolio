import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { uploadImage, uploadFile, uploadVideo } from "../utils/uploadImage";

function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("about");
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [tech, setTech] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [projectImage, setProjectImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [projects, setProjects] = useState([]);

  const [paragraph1, setParagraph1] = useState("");
  const [paragraph2, setParagraph2] = useState("");
  const [stat1Value, setStat1Value] = useState("");
  const [stat1Label, setStat1Label] = useState("");
  const [stat2Value, setStat2Value] = useState("");
  const [stat2Label, setStat2Label] = useState("");
  const [stat3Value, setStat3Value] = useState("");
  const [stat3Label, setStat3Label] = useState("");
  const [stat4Value, setStat4Value] = useState("");
  const [stat4Label, setStat4Label] = useState("");
  const [aboutSubmitting, setAboutSubmitting] = useState(false);

  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [skillSubmitting, setSkillSubmitting] = useState(false);
  const [skills, setSkills] = useState([]);

  const [messages, setMessages] = useState([]);

  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [socialSubmitting, setSocialSubmitting] = useState(false);

  const [resumeFile, setResumeFile] = useState(null);
  const [resumeUrl, setResumeUrl] = useState("");
  const [resumeUploading, setResumeUploading] = useState(false);

  const [heroMediaFile, setHeroMediaFile] = useState(null);
  const [heroMediaUrl, setHeroMediaUrl] = useState("");
  const [heroMediaType, setHeroMediaType] = useState("");
  const [heroMediaUploading, setHeroMediaUploading] = useState(false);

  const clipboardItemToFile = (item) => {
    const file = item.getAsFile();
    if (!file) return null;
    if (!file.name || file.name === "image.png") {
      const ext = file.type.split("/")[1] || "png";
      return new File([file], `pasted-image-${Date.now()}.${ext}`, { type: file.type });
    }
    return file;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchProjects();
        fetchAbout();
        fetchSkills();
        fetchMessages();
        fetchSocial();
        fetchResume();
        fetchHeroMedia();
      } else {
        navigate("/admin");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  const fetchProjects = async () => {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const list = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setProjects(list);
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let imageUrl = "";
      if (projectImage) {
        setUploading(true);
        imageUrl = await uploadImage(projectImage);
      }

      let galleryUrls = [];
      if (galleryImages.length > 0) {
        setUploading(true);
        galleryUrls = await Promise.all(
          Array.from(galleryImages).map((file) => uploadImage(file))
        );
      }
      setUploading(false);

      await addDoc(collection(db, "projects"), {
        title,
        description,
        fullDescription,
        tech: tech.split(",").map((t) => t.trim()),
        liveLink,
        githubLink,
        imageUrl,
        gallery: galleryUrls,
      });
      setTitle("");
      setDescription("");
      setFullDescription("");
      setTech("");
      setLiveLink("");
      setGithubLink("");
      setProjectImage(null);
      setGalleryImages([]);
      fetchProjects();
    } catch (err) {
      console.error("Error adding project:", err);
      alert("Project add karne mein error aaya.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Kya tum ye project delete karna chahte ho?")) return;
    try {
      await deleteDoc(doc(db, "projects", id));
      fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  const fetchAbout = async () => {
    try {
      const docRef = doc(db, "content", "about");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setParagraph1(data.paragraph1 || "");
        setParagraph2(data.paragraph2 || "");
        setStat1Value(data.stat1Value || "");
        setStat1Label(data.stat1Label || "");
        setStat2Value(data.stat2Value || "");
        setStat2Label(data.stat2Label || "");
        setStat3Value(data.stat3Value || "");
        setStat3Label(data.stat3Label || "");
        setStat4Value(data.stat4Value || "");
        setStat4Label(data.stat4Label || "");
      }
    } catch (err) {
      console.error("Error fetching about:", err);
    }
  };

  const handleSaveAbout = async (e) => {
    e.preventDefault();
    setAboutSubmitting(true);
    try {
      await setDoc(doc(db, "content", "about"), {
        paragraph1, paragraph2,
        stat1Value, stat1Label,
        stat2Value, stat2Label,
        stat3Value, stat3Label,
        stat4Value, stat4Label,
      });
      alert("About section update ho gaya!");
    } catch (err) {
      console.error("Error saving about:", err);
      alert("Save karne mein error aaya.");
    } finally {
      setAboutSubmitting(false);
    }
  };

  const fetchSkills = async () => {
    const querySnapshot = await getDocs(collection(db, "skills"));
    const list = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setSkills(list);
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    setSkillSubmitting(true);
    try {
      await addDoc(collection(db, "skills"), {
        name: skillName,
        level: Number(skillLevel),
      });
      setSkillName("");
      setSkillLevel("");
      fetchSkills();
    } catch (err) {
      console.error("Error adding skill:", err);
      alert("Skill add karne mein error aaya.");
    } finally {
      setSkillSubmitting(false);
    }
  };

  const handleDeleteSkill = async (id) => {
    if (!window.confirm("Kya tum ye skill delete karna chahte ho?")) return;
    try {
      await deleteDoc(doc(db, "skills", id));
      fetchSkills();
    } catch (err) {
      console.error("Error deleting skill:", err);
    }
  };

  const fetchMessages = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "messages"));
      const list = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      list.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      setMessages(list);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm("Ye message delete karna hai?")) return;
    try {
      await deleteDoc(doc(db, "messages", id));
      fetchMessages();
    } catch (err) {
      console.error("Error deleting message:", err);
    }
  };

  const fetchSocial = async () => {
    try {
      const docRef = doc(db, "content", "social");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setGithubUrl(data.githubUrl || "");
        setLinkedinUrl(data.linkedinUrl || "");
        setEmailAddress(data.emailAddress || "");
      }
    } catch (err) {
      console.error("Error fetching social:", err);
    }
  };

  const handleSaveSocial = async (e) => {
    e.preventDefault();
    setSocialSubmitting(true);
    try {
      await setDoc(doc(db, "content", "social"), {
        githubUrl,
        linkedinUrl,
        emailAddress,
      });
      alert("Social links update ho gaye!");
    } catch (err) {
      console.error("Error saving social:", err);
      alert("Save karne mein error aaya.");
    } finally {
      setSocialSubmitting(false);
    }
  };

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

  const handleUploadResume = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      alert("Pehle ek PDF file select karo.");
      return;
    }
    setResumeUploading(true);
    try {
      const url = await uploadFile(resumeFile);
      await setDoc(doc(db, "content", "resume"), { url });
      setResumeUrl(url);
      setResumeFile(null);
      alert("Resume upload ho gaya!");
    } catch (err) {
      console.error("Error uploading resume:", err);
      alert("Resume upload karne mein error aaya.");
    } finally {
      setResumeUploading(false);
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

  const handleUploadHeroMedia = async (e) => {
    e.preventDefault();
    if (!heroMediaFile) {
      alert("Pehle ek photo ya video file select karo.");
      return;
    }
    setHeroMediaUploading(true);
    try {
      const isVideo = heroMediaFile.type.startsWith("video");
      const url = isVideo ? await uploadVideo(heroMediaFile) : await uploadImage(heroMediaFile);
      const type = isVideo ? "video" : "image";

      await setDoc(doc(db, "content", "heroMedia"), { url, type });
      setHeroMediaUrl(url);
      setHeroMediaType(type);
      setHeroMediaFile(null);
      alert(`Hero ${isVideo ? "video" : "photo"} upload ho gaya!`);
    } catch (err) {
      console.error("Error uploading hero media:", err);
      alert("Upload karne mein error aaya.");
    } finally {
      setHeroMediaUploading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  const inputClass = "p-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 outline-none focus:border-purple-500 transition";

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="border-b border-gray-800 bg-gray-900/60 sticky top-0 backdrop-blur z-10">
        <div className="max-w-5xl mx-auto flex justify-between items-center px-6 py-4">
          <div>
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm">{user?.email}</p>
          </div>
          <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold transition text-sm">
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex gap-2 mb-8 border-b border-gray-800 flex-wrap">
          <button onClick={() => setActiveTab("about")} className={`px-5 py-3 font-semibold text-sm transition border-b-2 ${activeTab === "about" ? "border-purple-500 text-purple-400" : "border-transparent text-gray-400 hover:text-white"}`}>
            About Section
          </button>
          <button onClick={() => setActiveTab("skills")} className={`px-5 py-3 font-semibold text-sm transition border-b-2 ${activeTab === "skills" ? "border-purple-500 text-purple-400" : "border-transparent text-gray-400 hover:text-white"}`}>
            Skills
          </button>
          <button onClick={() => setActiveTab("projects")} className={`px-5 py-3 font-semibold text-sm transition border-b-2 ${activeTab === "projects" ? "border-purple-500 text-purple-400" : "border-transparent text-gray-400 hover:text-white"}`}>
            Projects
          </button>
          <button onClick={() => setActiveTab("social")} className={`px-5 py-3 font-semibold text-sm transition border-b-2 ${activeTab === "social" ? "border-purple-500 text-purple-400" : "border-transparent text-gray-400 hover:text-white"}`}>
            Social Links
          </button>
          <button onClick={() => setActiveTab("resume")} className={`px-5 py-3 font-semibold text-sm transition border-b-2 ${activeTab === "resume" ? "border-purple-500 text-purple-400" : "border-transparent text-gray-400 hover:text-white"}`}>
            Resume
          </button>
          <button onClick={() => setActiveTab("herovideo")} className={`px-5 py-3 font-semibold text-sm transition border-b-2 ${activeTab === "herovideo" ? "border-purple-500 text-purple-400" : "border-transparent text-gray-400 hover:text-white"}`}>
            Hero Media
          </button>
          <button onClick={() => setActiveTab("messages")} className={`px-5 py-3 font-semibold text-sm transition border-b-2 ${activeTab === "messages" ? "border-purple-500 text-purple-400" : "border-transparent text-gray-400 hover:text-white"}`}>
            Messages {messages.length > 0 && `(${messages.length})`}
          </button>
        </div>

        {activeTab === "about" && (
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 max-w-2xl">
            <h2 className="text-lg font-bold mb-1">Edit About Section</h2>
            <p className="text-gray-500 text-sm mb-5">Ye content public site ke About section pe show hoga.</p>
            <form onSubmit={handleSaveAbout} className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Paragraph 1</label>
                <textarea value={paragraph1} onChange={(e) => setParagraph1(e.target.value)} rows={3} required className={inputClass + " w-full"} />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Paragraph 2</label>
                <textarea value={paragraph2} onChange={(e) => setParagraph2(e.target.value)} rows={3} required className={inputClass + " w-full"} />
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-2">Stats (4 boxes shown on About section)</p>
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="Stat 1 Value (4th)" value={stat1Value} onChange={(e) => setStat1Value(e.target.value)} className={inputClass} />
                  <input placeholder="Stat 1 Label (Semester)" value={stat1Label} onChange={(e) => setStat1Label(e.target.value)} className={inputClass} />
                  <input placeholder="Stat 2 Value (5+)" value={stat2Value} onChange={(e) => setStat2Value(e.target.value)} className={inputClass} />
                  <input placeholder="Stat 2 Label (Projects)" value={stat2Label} onChange={(e) => setStat2Label(e.target.value)} className={inputClass} />
                  <input placeholder="Stat 3 Value (AI/DS)" value={stat3Value} onChange={(e) => setStat3Value(e.target.value)} className={inputClass} />
                  <input placeholder="Stat 3 Label (Specialization)" value={stat3Label} onChange={(e) => setStat3Label(e.target.value)} className={inputClass} />
                  <input placeholder="Stat 4 Value (MAJU)" value={stat4Value} onChange={(e) => setStat4Value(e.target.value)} className={inputClass} />
                  <input placeholder="Stat 4 Label (University)" value={stat4Label} onChange={(e) => setStat4Label(e.target.value)} className={inputClass} />
                </div>
              </div>
              <button type="submit" disabled={aboutSubmitting} className="p-3 rounded-lg bg-purple-600 hover:bg-purple-700 font-bold transition disabled:opacity-50 mt-2">
                {aboutSubmitting ? "Saving..." : "Save About Section"}
              </button>
            </form>
          </div>
        )}

        {activeTab === "skills" && (
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 flex-1 max-w-sm">
              <h2 className="text-lg font-bold mb-1">Add New Skill</h2>
              <p className="text-gray-500 text-sm mb-5">Naam aur level (0-100) daalo.</p>
              <form onSubmit={handleAddSkill} className="flex flex-col gap-3">
                <input placeholder="Skill Name (e.g. Python)" value={skillName} onChange={(e) => setSkillName(e.target.value)} required className={inputClass} />
                <input type="number" min="0" max="100" placeholder="Level % (e.g. 85)" value={skillLevel} onChange={(e) => setSkillLevel(e.target.value)} required className={inputClass} />
                <button type="submit" disabled={skillSubmitting} className="p-3 rounded-lg bg-purple-600 hover:bg-purple-700 font-bold transition disabled:opacity-50">
                  {skillSubmitting ? "Adding..." : "Add Skill"}
                </button>
              </form>
            </div>

            <div className="flex-1">
              <h2 className="text-lg font-bold mb-4">Existing Skills</h2>
              {skills.length === 0 ? (
                <p className="text-gray-500 text-sm">Koi skill nahi hai abhi.</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {skills.map((skill) => (
                    <div key={skill.id} className="bg-gray-900 border border-gray-800 p-4 rounded-xl flex justify-between items-center">
                      <span className="font-medium">{skill.name} <span className="text-purple-400 text-sm">({skill.level}%)</span></span>
                      <button onClick={() => handleDeleteSkill(skill.id)} className="bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition">
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 flex-1">
              <h2 className="text-lg font-bold mb-1">Add New Project</h2>
              <p className="text-gray-500 text-sm mb-5">Naya project add karo, turant public site pe dikhega.</p>
              <form onSubmit={handleAddProject} className="flex flex-col gap-3">
                <input placeholder="Project Title" value={title} onChange={(e) => setTitle(e.target.value)} required className={inputClass} />
                <textarea placeholder="Short Description (card pe dikhega)" value={description} onChange={(e) => setDescription(e.target.value)} required rows={2} className={inputClass} />
                <textarea
                  placeholder="Full Case Study Description (detailed — challenges, features, tech decisions)"
                  value={fullDescription}
                  onChange={(e) => setFullDescription(e.target.value)}
                  rows={6}
                  className={inputClass}
                />
                <input placeholder="Tech (comma separated: React, Firebase, Tailwind)" value={tech} onChange={(e) => setTech(e.target.value)} required className={inputClass} />
                <input placeholder="Live Demo Link" value={liveLink} onChange={(e) => setLiveLink(e.target.value)} className={inputClass} />
                <input placeholder="GitHub Link" value={githubLink} onChange={(e) => setGithubLink(e.target.value)} className={inputClass} />

                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Project Image (Card Background)</label>
                  <div
                    tabIndex={0}
                    onPaste={(e) => {
                      const item = Array.from(e.clipboardData.items).find((i) => i.type.startsWith("image"));
                      if (item) {
                        const file = clipboardItemToFile(item);
                        if (file) setProjectImage(file);
                      }
                    }}
                    className={inputClass + " w-full outline-none focus:ring-2 focus:ring-purple-500"}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setProjectImage(e.target.files[0])}
                      className="file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-purple-600 file:text-white file:text-xs text-xs w-full"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Tip: is box pe click karke Ctrl+V se bhi paste kar sakte ho.</p>
                  {projectImage && (
                    <p className="text-xs text-purple-400 mt-1">Selected: {projectImage.name}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Gallery Images (Multiple — for case study)</label>
                  <div
                    tabIndex={0}
                    onPaste={(e) => {
                      const item = Array.from(e.clipboardData.items).find((i) => i.type.startsWith("image"));
                      if (item) {
                        const file = clipboardItemToFile(item);
                        if (file) setGalleryImages((prev) => [...Array.from(prev), file]);
                      }
                    }}
                    className={inputClass + " w-full outline-none focus:ring-2 focus:ring-purple-500"}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => setGalleryImages((prev) => [...Array.from(prev), ...Array.from(e.target.files)])}
                      className="file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-purple-600 file:text-white file:text-xs text-xs w-full"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Tip: is box pe click karke Ctrl+V se bhi paste kar sakte ho (multiple baar paste kar sakte ho).</p>
                  {galleryImages.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {Array.from(galleryImages).map((file, idx) => (
                        <span key={idx} className="text-xs bg-purple-600/20 text-purple-300 px-2 py-1 rounded-full">
                          {file.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <button type="submit" disabled={submitting} className="p-3 rounded-lg bg-purple-600 hover:bg-purple-700 font-bold transition disabled:opacity-50">
                  {uploading ? "Uploading Images..." : submitting ? "Adding..." : "Add Project"}
                </button>
              </form>
            </div>

            <div className="flex-1">
              <h2 className="text-lg font-bold mb-4">Existing Projects</h2>
              {projects.length === 0 ? (
                <p className="text-gray-500 text-sm">Koi project nahi hai abhi.</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-gray-900 border border-gray-800 p-4 rounded-xl flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        {project.imageUrl && (
                          <img src={project.imageUrl} alt={project.title} className="w-12 h-12 rounded-lg object-cover" />
                        )}
                        <span className="font-medium">{project.title}</span>
                      </div>
                      <button onClick={() => handleDeleteProject(project.id)} className="bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition">
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "social" && (
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 max-w-xl">
            <h2 className="text-lg font-bold mb-1">Edit Social Links</h2>
            <p className="text-gray-500 text-sm mb-5">Ye links Contact aur Footer section mein show honge.</p>
            <form onSubmit={handleSaveSocial} className="flex flex-col gap-3">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">GitHub URL</label>
                <input placeholder="https://github.com/username" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} className={inputClass + " w-full"} />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">LinkedIn URL</label>
                <input placeholder="https://linkedin.com/in/username" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} className={inputClass + " w-full"} />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Email Address</label>
                <input placeholder="you@email.com" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} className={inputClass + " w-full"} />
              </div>
              <button type="submit" disabled={socialSubmitting} className="p-3 rounded-lg bg-purple-600 hover:bg-purple-700 font-bold transition disabled:opacity-50 mt-2">
                {socialSubmitting ? "Saving..." : "Save Social Links"}
              </button>
            </form>
          </div>
        )}

        {activeTab === "resume" && (
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 max-w-xl">
            <h2 className="text-lg font-bold mb-1">Upload Resume</h2>
            <p className="text-gray-500 text-sm mb-5">Ye PDF Hero section ke "Download Resume" button se milega.</p>

            {resumeUrl && (
              <div className="mb-5 p-4 bg-gray-800/50 border border-gray-700 rounded-lg flex justify-between items-center">
                <span className="text-sm text-gray-300">Current resume uploaded</span>
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="text-purple-400 text-sm hover:underline">
                  View PDF
                </a>
              </div>
            )}

            <form onSubmit={handleUploadResume} className="flex flex-col gap-3">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Resume PDF File</label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setResumeFile(e.target.files[0])}
                  className={inputClass + " w-full file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-purple-600 file:text-white file:text-xs"}
                />
              </div>
              <button type="submit" disabled={resumeUploading} className="p-3 rounded-lg bg-purple-600 hover:bg-purple-700 font-bold transition disabled:opacity-50">
                {resumeUploading ? "Uploading..." : "Upload Resume"}
              </button>
            </form>
          </div>
        )}

        {activeTab === "herovideo" && (
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 max-w-xl">
            <h2 className="text-lg font-bold mb-1">Upload Hero Avatar (Photo ya Video)</h2>
            <p className="text-gray-500 text-sm mb-5">
              Ye Hero section ke avatar circle mein show hoga. Video upload karo to speaker button automatically aayega; photo upload karo to sirf image dikhegi, koi speaker button nahi.
            </p>

            {heroMediaUrl && (
              <div className="mb-5">
                <p className="text-sm text-gray-300 mb-2">
                  Current {heroMediaType === "video" ? "video" : "photo"}:
                </p>
                {heroMediaType === "video" ? (
                  <video src={heroMediaUrl} controls className="w-full rounded-lg border border-gray-700 max-h-64" />
                ) : (
                  <img src={heroMediaUrl} alt="Hero avatar" className="w-full rounded-lg border border-gray-700 max-h-64 object-cover" />
                )}
              </div>
            )}

            <form onSubmit={handleUploadHeroMedia} className="flex flex-col gap-3">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Photo ya Video File</label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={(e) => setHeroMediaFile(e.target.files[0])}
                  className={inputClass + " w-full file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-purple-600 file:text-white file:text-xs"}
                />
                {heroMediaFile && (
                  <p className="text-xs text-gray-500 mt-1">
                    Selected: {heroMediaFile.type.startsWith("video") ? "🎥 Video" : "🖼️ Photo"} — {heroMediaFile.name}
                  </p>
                )}
              </div>
              <button type="submit" disabled={heroMediaUploading} className="p-3 rounded-lg bg-purple-600 hover:bg-purple-700 font-bold transition disabled:opacity-50">
                {heroMediaUploading ? "Uploading..." : "Upload"}
              </button>
            </form>
          </div>
        )}

        {activeTab === "messages" && (
          <div>
            <h2 className="text-lg font-bold mb-4">Contact Messages</h2>
            {messages.length === 0 ? (
              <p className="text-gray-500 text-sm">Koi message nahi aaya abhi.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {messages.map((msg) => (
                  <div key={msg.id} className="bg-gray-900 border border-gray-800 p-5 rounded-xl">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">{msg.name}</p>
                        <a href={`mailto:${msg.email}`} className="text-purple-400 text-sm hover:underline">{msg.email}</a>
                      </div>
                      <button onClick={() => handleDeleteMessage(msg.id)} className="bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition">
                        Delete
                      </button>
                    </div>
                    <p className="text-gray-300 text-sm mt-2">{msg.message}</p>
                    {msg.createdAt && (
                      <p className="text-gray-600 text-xs mt-3">{new Date(msg.createdAt.seconds * 1000).toLocaleString()}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;