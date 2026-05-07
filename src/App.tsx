/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  ChevronRight, 
  Search, 
  Menu, 
  Calendar, 
  Newspaper, 
  GraduationCap, 
  FlaskConical, 
  Users, 
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  Phone,
  BookOpen
} from "lucide-react";
import { useState } from "react";
import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

import profNolanImg from "./assets/images/regenerated_image_1778148321924.jpg";
import eleonoraRossiImg from "./assets/images/regenerated_image_1778131939252.jpg";

// --- Constants ---

const RESEARCH_AREAS = [
  { name: "Olefin Metathesis", desc: "Ruthenium-mediated reactions and development." },
  { name: "C-C & C-N Bonding", desc: "Palladium catalysed cross-coupling reactions." },
  { name: "Hydrogenation", desc: "Iridium-mediated homogeneous systems." },
  { name: "Ketone Reduction", desc: "Copper-catalysed reduction methodologies." },
  { name: "Gold Transformations", desc: "Exploring gold-mediated catalytic pathways." },
  { name: "NHC Design", desc: "Synthesizing novel N-heterocyclic carbene ligands." },
  { name: "Organocatalysis", desc: "Using NHCs as efficient organocatalysts." },
  { name: "Bond Energetics", desc: "Fundamental studies of metal-ligand systems." },
];

const TEAM_CATEGORIES = [
  {
    title: "Academic Staff",
    members: [
      { name: "Prof. Steven P. Nolan", role: "Principal Investigator", image: profNolanImg }
    ]
  },
  {
    title: "Postdoctoral Researchers",
    members: [
      { name: "Dr. Leandros Pillement", role: "Postdoctoral Researcher", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop" },
      { name: "Dr. Maria Schmidt", role: "Postdoctoral Researcher", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop" }
    ]
  },
  {
    title: "PhD Candidates",
    members: [
      { name: "Eleonora Rossi", role: "PhD Researcher", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop" },
      { name: "Junying Wang", role: "PhD Researcher", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" },
      { name: "Jan de Smet", role: "PhD Researcher", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop" }
    ]
  }
];

const PUBLICATIONS = [
  {
    title: "Gold(I)-Catalyzed Intermolecular Hydroamination of Alkynes",
    intro: "This study explores a highly efficient catalytic system for the addition of amines to alkynes, utilizing novel gold-NHC complexes.",
    image: "https://images.unsplash.com/photo-1628172030239-497cdaee13cd?q=80&w=800&auto=format&fit=crop",
    date: "Journal of the American Chemical Society, 2024",
    doi: "10.1021/jacs.4c00000"
  },
  {
    title: "Sustainable Suzuki-Miyaura Cross-Coupling in Aqueous Media",
    intro: "Development of robust palladium pre-catalysts that allow for carbon-carbon bond formation in water, minimizing environmental impact.",
    image: "https://images.unsplash.com/photo-1603126727585-6d5171d2c94d?q=80&w=800&auto=format&fit=crop",
    date: "Angewandte Chemie International Edition, 2023",
    doi: "10.1002/anie.202300000"
  },
  {
    title: "Mechanistic Insights into Ruthenium-Mediated Olefin Metathesis",
    intro: "A detailed investigation into the activation pathways of ruthenium-alkylidene complexes and their performance in ring-closing metathesis.",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800&auto=format&fit=crop",
    date: "Organometallics, 2023",
    doi: "10.1021/acs.organomet.3c00000"
  },
  {
    title: "Electronic and Steric Tuning of N-Heterocyclic Carbene Ligands",
    intro: "Mapping the buried volume and electronic parameters of a library of NHC ligands to facilitate rational catalyst design.",
    image: "https://images.unsplash.com/photo-1532187875605-2fe359041cd2?q=80&w=800&auto=format&fit=crop",
    date: "Chemical Reviews, 2022",
    doi: "10.1021/acs.chemrev.2c00000"
  }
];

// --- Components ---

const Navbar = ({ currentView, setCurrentView, setIsSearchOpen }: { currentView: string, setCurrentView: (v: "home" | "members" | "publications" | "contact" | "opportunities") => void, setIsSearchOpen: (v: boolean) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", id: "home" },
    { name: "Members", id: "members" },
    { name: "Publications", id: "publications" },
    { name: "Opportunities", id: "opportunities" },
    { name: "Contact", id: "contact" }
  ];

  return (
    <nav className="sticky top-0 z-50 flex flex-col">
      <div className="bg-[#1E64B4] h-1.5 w-full"></div>
      <div className="bg-white border-b border-slate-200">
        <div className="container-wide py-5 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-6 cursor-pointer" onClick={() => setCurrentView("home")}>
              <img 
                src="https://www.ugent.be/++theme++ugent/static/images/logo_ugent_en.svg" 
                alt="Ghent University" 
                className="h-12 md:h-16 w-auto"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col border-l border-slate-300 pl-6">
                <span className="font-bold text-2xl text-[#1E64B4] tracking-tight leading-none uppercase">Nolan</span>
                <span className="font-bold text-2xl text-[#1E64B4] tracking-tight -mt-0.5 leading-none uppercase">Group</span>
              </div>
              <div className="hidden md:flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-0.5">Organometallic</span>
                <span className="text-lg font-semibold text-slate-800 leading-none">Chemistry & Catalysis</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <button 
                  key={item.name} 
                  onClick={() => item.id !== "#" && setCurrentView(item.id as any)}
                  className={`text-sm font-semibold transition-colors cursor-pointer ${
                    (item.id === currentView) 
                      ? "text-[#1E64B4] border-b-2 border-[#1E64B4] py-1" 
                      : "text-slate-600 hover:text-[#1E64B4]"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <Search size={18} />
              </button>
              <button 
                className="lg:hidden p-2 text-slate-600"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 p-6 absolute top-[calc(100%)] w-full shadow-2xl z-40">
          <div className="flex flex-col gap-6">
            {navItems.map((item) => (
              <button 
                key={item.name} 
                onClick={() => {
                  if (item.id !== "#") setCurrentView(item.id as any);
                  setIsOpen(false);
                }}
                className={`text-lg font-bold border-b border-slate-100 pb-2 text-left ${item.id === currentView ? "text-ugent-blue" : "text-slate-800"}`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = ({ setCurrentView }: { setCurrentView: (v: "home" | "members" | "publications" | "contact" | "opportunities") => void }) => {
  return (
    <section className="relative h-[480px] bg-[#1E64B4] flex items-center overflow-hidden">
      {/* Geometric Grid Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="grid grid-cols-12 h-full w-full">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border-r border-white/30 h-full"></div>
          ))}
        </div>
      </div>
      
      {/* Circle Accent */}
      <div className="absolute -right-20 -bottom-20 w-[400px] h-[400px] bg-[#FFD200]/10 flex items-center justify-center rounded-full pointer-events-none">
        <div className="w-[300px] h-[300px] border-[12px] border-white/5 rounded-full flex items-center justify-center">
          <div className="w-[220px] h-[220px] border-4 border-white/10 rounded-full"></div>
        </div>
      </div>

      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
            The Nolan Group <br className="hidden md:block" />
            Organometallic Chemistry.
          </h1>
          <p className="text-xl md:text-2xl text-blue-50/90 mb-10 max-w-2xl font-medium leading-relaxed">
            Developing novel organometallic complexes capable of mediating homogeneous catalytic reactions at Ghent University.
          </p>
          <div className="flex flex-wrap gap-5">
            <button 
              onClick={() => setCurrentView("publications")}
              className="bg-[#FFD200] text-slate-900 font-bold px-10 py-4 rounded-sm shadow-xl hover:brightness-105 active:scale-95 transition-all uppercase tracking-wider text-sm cursor-pointer"
            >
              Recent Publications
            </button>
            <button 
              onClick={() => setCurrentView("members")}
              className="bg-white/10 text-white border border-white/30 font-bold px-10 py-4 rounded-sm hover:bg-white/20 active:scale-95 transition-all uppercase tracking-wider text-sm backdrop-blur-sm cursor-pointer"
            >
              Meet the Team
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const QuickAccess = () => {
  const cards = [
    { label: "Research", title: "Ligand Design", desc: "Investigating steric and electronic ligand characteristics to design more efficient catalytic systems.", link: "View properties" },
    { label: "Focus", title: "NHC Catalysis", desc: "Exploring the potential of N-heterocyclic carbenes in homogeneous catalysis.", link: "Learn more" },
    { label: "Projects", title: "Active Reactions", desc: "From olefin metathesis to iridium-mediated hydrogenation and gold transformations.", link: "See projects" },
    { label: "Contact", title: "Collaboration", desc: "Looking for opportunities or partnership? Connect with the Nolan Group.", link: "Get in touch" },
  ];

  return (
    <section className="bg-white border-b border-slate-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={`p-10 flex flex-col justify-between group cursor-pointer hover:bg-slate-50 transition-colors border-slate-100 ${idx < 3 ? "lg:border-r" : ""} ${idx % 2 === 0 ? "md:border-r lg:border-r-0" : ""} border-b md:border-b-0`}
          >
            <div>
              <span className="text-[#1E64B4] font-bold text-[10px] uppercase tracking-[0.25em] mb-5 block">
                {card.label}
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-[#1E64B4] transition-colors tracking-tight">
                {card.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                {card.desc}
              </p>
            </div>
            <span className="text-[#1E64B4] font-bold text-sm flex items-center gap-2 group-hover:gap-4 transition-all uppercase tracking-widest">
              {card.link} <ChevronRight size={16} />
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Disciplines = () => {
  return (
    <section className="py-24 bg-slate-50 border-b border-slate-200" id="research-areas">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h3 className="text-3xl font-bold mb-4 tracking-tight">Our Research Areas</h3>
            <p className="text-slate-600 leading-relaxed font-medium">Investigating fundamental complex properties to design efficient and robust catalytic systems at the Department of Chemistry.</p>
          </div>
          <a href="#" className="text-ugent-blue font-bold flex items-center gap-2 hover:gap-3 transition-all tracking-wide text-sm uppercase">
            All Research <ChevronRight size={18} />
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {RESEARCH_AREAS.map((field, idx) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group cursor-pointer bg-white p-8 border border-slate-200 hover:border-ugent-blue transition-all"
              id={`area-${field.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="w-10 h-10 bg-slate-50 text-ugent-blue flex items-center justify-center mb-6 group-hover:bg-ugent-blue group-hover:text-white transition-colors">
                <FlaskConical size={20} />
              </div>
              <h4 className="text-xl font-bold group-hover:text-ugent-blue transition-colors mb-3 tracking-tight">{field.name}</h4>
              <p className="text-sm text-slate-500 leading-relaxed">{field.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const NewsAndAgenda = () => {
  const news = [
    {
      title: "Eleonora joined the team as a PhD student: welcome!",
      date: "04 May 2026",
      category: "Group News",
      image: eleonoraRossiImg
    },
    {
      title: "Leandros joins the group as postdoctoral researcher",
      date: "01 May 2026",
      category: "Group News",
      image: "https://images.unsplash.com/photo-1532187875605-2fe359041cd2?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Junying Wang joins the group as PhD candidate",
      date: "28 April 2026",
      category: "Group News",
      image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=800&auto=format&fit=crop"
    }
  ];

  const sidebarLinks = [
    { title: "Department of Chemistry", url: "https://www.chemistry.ugent.be/" },
    { title: "Faculty of sciences", url: "https://www.ugent.be/we/en" },
    { title: "Ghent University Home", url: "https://www.ugent.be" }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          {/* News Column */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-end mb-10 pb-4 border-b border-slate-100">
              <h3 className="text-2xl font-bold flex items-center gap-3 tracking-tight">
                <Newspaper className="text-ugent-blue" size={24} /> Group News
              </h3>
              <a href="#" className="text-xs font-bold text-ugent-blue uppercase tracking-widest hover:underline transition-all">All News</a>
            </div>
            
            <div className="space-y-12">
              {news.map((item, idx) => (
                <div key={idx} className="flex flex-col md:flex-row gap-8 group cursor-pointer">
                  <div className="w-full md:w-72 h-44 overflow-hidden bg-slate-50 flex-shrink-0 border border-slate-100">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-slate-100 text-slate-500 px-2 py-0.5 border border-slate-200">
                        {item.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.date}</span>
                    </div>
                    <h4 className="text-xl font-bold group-hover:text-ugent-blue transition-colors mb-3 leading-tight tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-slate-500 line-clamp-2 text-sm leading-relaxed">
                      We are thrilled to welcome our newest members to the Nolan Research Group at Ghent University.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Column */}
          <div>
            <div className="flex justify-between items-end mb-10 pb-4 border-b border-slate-100">
              <h3 className="text-2xl font-bold flex items-center gap-3 tracking-tight">
                <Globe className="text-ugent-blue" size={24} /> Useful Links
              </h3>
            </div>
            
            <div className="space-y-8">
              {sidebarLinks.map((item, idx) => (
                <a key={idx} href={item.url} target="_blank" rel="noopener noreferrer" className="flex gap-6 group cursor-pointer pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                  <div className="flex-shrink-0 w-16 h-16 bg-slate-50 border border-slate-200 flex flex-col items-center justify-center text-slate-400 group-hover:bg-ugent-blue group-hover:text-white group-hover:border-ugent-blue transition-all">
                    <span className="text-2xl font-bold leading-none mb-0.5">{idx + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-base group-hover:text-ugent-blue transition-colors mb-1.5 tracking-tight">
                      {item.title}
                    </h4>
                    <div className="flex flex-col gap-1.5 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-2 hover:underline transition-all">Visit website <ChevronRight size={12} className="text-slate-300" /></span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            
            <div className="mt-12 p-8 bg-slate-900 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-ugent-blue/20 -mr-8 -mt-8 rounded-full transition-transform group-hover:scale-125 duration-700"></div>
              <h4 className="font-bold text-xl mb-3 tracking-tight relative z-10">Contact Us</h4>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed relative z-10">
                Are you looking for a PhD or Postdoc position? Or interested in collaboration?
              </p>
              <a href="#" className="text-xs font-bold bg-[#FFD200] text-slate-900 px-6 py-2.5 inline-block hover:brightness-110 transition-all uppercase tracking-widest relative z-10">
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const QuickLinks = () => {
  const links = [
    { title: "Toekomstige studenten", icon: <GraduationCap size={32} />, desc: "Alles over starten aan de faculteit", color: "bg-blue-600" },
    { title: "Onderzoekimpact", icon: <FlaskConical size={32} />, desc: "Wetenschap die de wereld beïnvloedt", color: "bg-indigo-600" },
    { title: "Dienstverlening", icon: <Users size={32} />, desc: "Onze expertise ter beschikking gesteld", color: "bg-ugent-blue" },
  ];

  return (
    <section className="py-20 bg-ugent-blue-dark text-white overflow-hidden">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {links.map((link, idx) => (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, x: idx === 0 ? -20 : idx === 2 ? 20 : 0, y: idx === 1 ? 20 : 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              className="relative p-8 border border-white/10 hover:bg-white/5 transition-colors group cursor-pointer"
            >
              <div className="mb-6 text-ugent-yellow">{link.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{link.title}</h3>
              <p className="text-white/60 mb-6 leading-relaxed">{link.desc}</p>
              <div className="flex items-center gap-2 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                Ontdek meer <ExternalLink size={14} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-100 border-t border-slate-200">
      <div className="container-wide">
        <div className="py-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img 
              src="https://www.ugent.be/++theme++ugent/static/images/logo_ugent_en.svg" 
              alt="Ghent University" 
              className="h-10 w-auto opacity-70 hover:opacity-100 transition-opacity"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-wrap gap-8 text-xs text-slate-500 font-bold uppercase tracking-[0.1em]">
              <span className="text-slate-400">&copy; 2026 Universiteit Gent</span>
              <a href="#" className="hover:text-ugent-blue transition-colors">Privacybeleid</a>
              <a href="#" className="hover:text-ugent-blue transition-colors">Cookiebeleid</a>
              <a href="#" className="hover:text-ugent-blue transition-colors">Toegankelijkheid</a>
            </div>
          </div>
          <div className="flex gap-4">
            {["FB", "TW", "IN", "YT"].map(icon => (
              <div key={icon} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 text-[10px] font-bold hover:border-ugent-blue hover:text-ugent-blue transition-all cursor-pointer">
                {icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [currentView, setCurrentView] = useState<"home" | "members" | "publications" | "contact" | "opportunities">("home");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans flex flex-col bg-slate-50">
      <Navbar currentView={currentView} setCurrentView={setCurrentView} setIsSearchOpen={setIsSearchOpen} />
      <main className="flex-grow">
        {currentView === "home" ? (
          <>
            <Hero setCurrentView={setCurrentView} />
            <QuickAccess />
            <Disciplines />
            <NewsAndAgenda />
            <div className="py-24 bg-white">
              <div className="container-wide">
                <div className="bg-slate-100 p-12 flex flex-col lg:flex-row items-center justify-between gap-10 border border-slate-200">
                  <div className="max-w-2xl">
                    <span className="text-ugent-blue font-bold text-xs uppercase tracking-widest mb-4 block">Careers</span>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight leading-none">Interested in a PhD or Postdoc?</h3>
                    <p className="text-slate-600 leading-relaxed font-medium">
                      We are always looking for motivated researchers to join our chemistry group. Explore current opportunities and start your scientific journey.
                    </p>
                  </div>
                  <button onClick={() => setCurrentView("members")} className="btn-primary whitespace-nowrap shadow-xl">
                    View Opportunities
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : currentView === "members" ? (
          <MembersPage />
        ) : currentView === "publications" ? (
          <PublicationsPage />
        ) : currentView === "opportunities" ? (
          <OpportunitiesPage />
        ) : (
          <ContactPage />
        )}
      </main>
      <Footer />
      {isSearchOpen && (
        <SearchOverlay 
          onClose={() => setIsSearchOpen(false)} 
          onSelect={(view, anchor) => {
            setCurrentView(view as any);
            setIsSearchOpen(false);
            if (anchor) {
              setTimeout(() => {
                const el = document.getElementById(anchor);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }
          }}
        />
      )}
    </div>
  );
}

const OpportunitiesPage = () => {
  const opportunities = [
    {
      title: "Postdoctoral Applicants",
      description: "Funded positions will be advertised when available. Researchers who wish to apply for independent funding should contact Steve well in advance of their anticipated start-date with a list of the fellowships for which they are eligible. Outstanding candidates will receive assistance with fellowship applications.",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800&auto=format&fit=crop",
      badge: "Open Inquiries"
    },
    {
      title: "PhD Applicants",
      description: "No funded positions are currently available but this situation changes regularly. Opportunities exist via the FWO (www.fwo.be) and other external funding bodies. We welcome motivated students with a strong background in synthetic chemistry.",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800&auto=format&fit=crop",
      badge: "Regular Intake"
    },
    {
      title: "Masters and Visiting Students",
      description: "M.Sc. and visiting students are always welcome. Visiting students are encouraged to stay for periods of minimum 4 months or longer. Projects and summer research are available in the broad areas of organic / organometallic synthesis and catalysis. Please contact Steve early to discuss project details.",
      image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=800&auto=format&fit=crop",
      badge: "Always Open"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="py-20">
        <div className="container-wide">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <span className="text-ugent-blue font-bold text-xs uppercase tracking-widest mb-4 block">Join the Group</span>
            <h2 className="text-5xl font-bold text-slate-900 tracking-tight leading-tight">Opportunities</h2>
            <div className="h-1.5 w-24 bg-[#FFD200] mt-8"></div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mb-20"
          >
            <p className="text-2xl text-slate-700 leading-relaxed font-medium">
              We are always looking for passionate researchers to join our team in Ghent. Explore the different pathways to become part of the Nolan Group.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {opportunities.map((opp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white border border-slate-200 flex flex-col group hover:shadow-xl transition-all h-full"
              >
                <div className="h-56 overflow-hidden relative">
                  <img src={opp.image} alt={opp.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-ugent-blue text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                    {opp.badge}
                  </div>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">{opp.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-8 flex-grow">
                    {opp.description}
                  </p>
                  <a 
                    href="mailto:Steven.Nolan@UGent.be" 
                    className="flex items-center gap-2 text-ugent-blue font-bold text-xs uppercase tracking-widest hover:gap-3 transition-all"
                  >
                    Inquire Now <ChevronRight size={14} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 p-10 bg-ugent-blue text-white flex flex-col md:flex-row items-center justify-between gap-8 rounded-sm"
          >
            <div className="max-w-xl">
              <h4 className="text-2xl font-bold mb-2">Ready to start your research journey?</h4>
              <p className="text-white/80 font-medium">Contact Prof. Steven Nolan for more details on current openings and project availability.</p>
            </div>
            <a href="mailto:Steven.Nolan@UGent.be" className="bg-[#FFD200] text-slate-900 font-bold px-10 py-4 rounded-sm hover:brightness-105 transition-all uppercase tracking-widest text-sm whitespace-nowrap shadow-lg">
              Contact Steve
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || "";
  const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';
  
  const center = { lat: 51.02272, lng: 3.70932 };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="py-20">
        <div className="container-wide">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <span className="text-ugent-blue font-bold text-xs uppercase tracking-widest mb-4 block">Get in touch</span>
            <h2 className="text-5xl font-bold text-slate-900 tracking-tight leading-tight">Contact Us</h2>
            <div className="h-1.5 w-24 bg-[#FFD200] mt-8"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white border border-slate-200 p-10 md:p-16 h-full flex flex-col justify-between shadow-sm">
                <div>
                  <div className="mb-10">
                    <span className="text-ugent-blue font-bold text-xs uppercase tracking-widest mb-2 block">Principal Investigator</span>
                    <h3 className="text-3xl font-bold text-slate-900 tracking-tight leading-tight">Prof. dr. Steven P. Nolan</h3>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="flex gap-6">
                      <div className="w-12 h-12 bg-slate-50 flex items-center justify-center text-ugent-blue border border-slate-100 flex-shrink-0">
                        <MapPin size={22} />
                      </div>
                      <div>
                        <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">Location</p>
                        <p className="text-slate-700 font-medium leading-relaxed">
                          Department of Chemistry<br />
                          Krijgslaan 281 - building S3 (Campus Sterre)<br />
                          9000 Gent, Belgium
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-6">
                      <div className="w-12 h-12 bg-slate-50 flex items-center justify-center text-ugent-blue border border-slate-100 flex-shrink-0">
                        <Mail size={22} />
                      </div>
                      <div>
                        <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">Email</p>
                        <a href="mailto:Steven.Nolan@UGent.be" className="text-ugent-blue font-bold hover:underline transition-all">
                          Steven.Nolan@UGent.be
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-6">
                      <div className="w-12 h-12 bg-slate-50 flex items-center justify-center text-ugent-blue border border-slate-100 flex-shrink-0">
                        <Phone size={22} />
                      </div>
                      <div>
                        <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">Phone</p>
                        <p className="text-slate-700 font-bold tracking-tight">+32-9-2644458</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-16 pt-10 border-t border-slate-100">
                   <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                     For inquiries regarding PhD vacancies, postdoctoral positions, or research collaborations, please reach out via email.
                   </p>
                   <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
                     <a href="mailto:Steven.Nolan@UGent.be" className="btn-primary inline-flex items-center justify-center">Send Email</a>
                     <div className="flex gap-4">
                       {["FB", "TW", "IN"].map(icon => (
                         <div key={icon} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 text-xs font-bold hover:text-ugent-blue hover:border-ugent-blue transition-all cursor-pointer">
                           {icon}
                         </div>
                       ))}
                     </div>
                   </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="h-[500px] lg:h-auto min-h-[600px] border border-slate-200 overflow-hidden bg-slate-100 shadow-sm"
            >
              {!hasValidKey ? (
                 <div className="h-full flex items-center justify-center p-12 bg-slate-50">
                   <div className="text-center max-w-md">
                     <h2 className="text-xl font-bold mb-4">Google Map</h2>
                     <p className="text-sm text-slate-600 mb-6">Interactive map of Krijgslaan 281, Building S3.</p>
                     <div className="bg-slate-200 aspect-video mb-6 flex items-center justify-center">
                        <MapPin size={48} className="text-slate-400 opacity-50" />
                     </div>
                     <p className="text-xs text-slate-400 italic">API Key missing from environment</p>
                   </div>
                 </div>
              ) : (
                <APIProvider apiKey={API_KEY} version="weekly">
                  <Map
                    defaultCenter={center}
                    defaultZoom={15}
                    mapId="NOLAN_GROUP_MAP"
                    internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                    style={{ width: '100%', height: '100%' }}
                  >
                    <AdvancedMarker position={center} title="The Nolan Group - building S3">
                      <Pin background="#1E64B4" glyphColor="#fff" borderColor="#FFD200" />
                    </AdvancedMarker>
                  </Map>
                </APIProvider>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchOverlay = ({ onClose, onSelect }: { onClose: () => void, onSelect: (view: string, anchor?: string) => void }) => {
  const [query, setQuery] = useState("");

  const searchResults = (() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    
    const results: any[] = [];

    // Search Research Areas
    RESEARCH_AREAS.forEach(area => {
      if (area.name.toLowerCase().includes(q) || area.desc.toLowerCase().includes(q)) {
        results.push({ type: "Research Area", title: area.name, sub: area.desc, view: "home", anchor: `area-${area.name.toLowerCase().replace(/\s+/g, '-')}` });
      }
    });

    // Search Team
    TEAM_CATEGORIES.forEach(cat => {
      cat.members.forEach(m => {
        if (m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q)) {
          results.push({ type: "Group Member", title: m.name, sub: m.role, view: "members" });
        }
      });
    });

    // Search Publications
    PUBLICATIONS.forEach(pub => {
      if (pub.title.toLowerCase().includes(q) || pub.intro.toLowerCase().includes(q) || pub.date.toLowerCase().includes(q)) {
        results.push({ type: "Publication", title: pub.title, sub: pub.date, view: "publications" });
      }
    });

    if ("contact".includes(q)) {
      results.push({ type: "Page", title: "Contact Us", sub: "Get in touch with the Nolan Group", view: "contact" });
    }

    if ("opportunities".includes(q) || "jobs".includes(q) || "phd".includes(q) || "postdoc".includes(q)) {
      results.push({ type: "Page", title: "Opportunities", sub: "PhD, Postdoc, and Visiting positions", view: "opportunities" });
    }

    return results;
  })();

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 md:p-10">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="bg-white w-full max-w-2xl shadow-2xl overflow-hidden relative z-10 rounded-sm"
      >
        <div className="p-6 border-b border-slate-100 flex items-center gap-4">
          <Search size={24} className="text-slate-400" />
          <input 
            type="text" 
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search group members, publications, and research areas..."
            className="flex-grow text-xl outline-none text-slate-800 placeholder:text-slate-300"
          />
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded transition-colors text-slate-400">
             <Menu size={20} className="rotate-45" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {searchResults.length > 0 ? (
            <div className="divide-y divide-slate-50">
              {searchResults.map((res, idx) => (
                <button 
                  key={idx}
                  onClick={() => onSelect(res.view, res.anchor)}
                  className="w-full p-6 text-left hover:bg-slate-50 transition-colors flex flex-col gap-1 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-ugent-blue uppercase tracking-widest">{res.type}</span>
                    <ChevronRight size={14} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">{res.title}</h4>
                  <p className="text-sm text-slate-500 line-clamp-1">{res.sub}</p>
                </button>
              ))}
            </div>
          ) : query ? (
            <div className="p-20 text-center flex flex-col items-center justify-center">
              <FlaskConical size={48} className="text-slate-100 mb-4" />
              <p className="text-slate-400 font-medium whitespace-pre-wrap">No results found for "{query}"</p>
            </div>
          ) : (
            <div className="p-10 text-center">
               <p className="text-slate-400 text-sm font-medium">Type to search for group members, research topics, or latest publications.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const MembersPage = () => {
  return (
    <div className="py-20 bg-slate-50">
      <div className="container-wide">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <span className="text-ugent-blue font-bold text-xs uppercase tracking-widest mb-4 block">Team</span>
          <h2 className="text-5xl font-bold text-slate-900 tracking-tight">Group Members</h2>
          <div className="h-1.5 w-24 bg-ugent-blue mt-8"></div>
        </motion.div>

        <div className="space-y-24">
          {TEAM_CATEGORIES.map((cat, idx) => (
            <section key={idx}>
              <h3 className="text-2xl font-bold text-slate-800 mb-10 pb-4 border-b border-slate-200 flex items-center gap-3">
                <Users size={20} className="text-ugent-blue" />
                {cat.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {cat.members.map((member, mIdx) => (
                  <motion.div
                    key={mIdx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-white border border-ugent-blue p-6 group hover:border-slate-200 transition-all"
                  >
                    <div className="aspect-square mb-6 overflow-hidden bg-slate-100 grayscale-0 group-hover:grayscale transition-all duration-500">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 group-hover:text-ugent-blue transition-colors mb-1">{member.name}</h4>
                    <p className="text-sm text-slate-500 font-medium">{member.role}</p>
                    <div className="mt-4 pt-4 border-t border-slate-100 flex gap-3">
                       <Mail size={16} className="text-slate-300 hover:text-ugent-blue cursor-pointer transition-colors" />
                       <Globe size={16} className="text-slate-300 hover:text-ugent-blue cursor-pointer transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

const PublicationsPage = () => {
  return (
    <div className="py-20 bg-slate-50">
      <div className="container-wide">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <span className="text-ugent-blue font-bold text-xs uppercase tracking-widest mb-4 block">Research</span>
          <h2 className="text-5xl font-bold text-slate-900 tracking-tight">Recent Publications</h2>
          <div className="h-1.5 w-24 bg-ugent-blue mt-8"></div>
        </motion.div>

        <div className="space-y-12">
          {PUBLICATIONS.map((pub, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-slate-200 overflow-hidden flex flex-col md:flex-row group hover:border-ugent-blue transition-all"
            >
              <div className="w-full md:w-80 lg:w-96 h-64 md:h-auto overflow-hidden bg-slate-100 flex-shrink-0">
                <img 
                  src={pub.image} 
                  alt={pub.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale-[0.3] group-hover:grayscale-0" 
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen size={16} className="text-ugent-blue" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{pub.date}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-ugent-blue transition-colors mb-4 tracking-tight leading-snug">
                  {pub.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6 font-medium">
                  {pub.intro}
                </p>
                <div className="flex items-center gap-6">
                   <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-ugent-blue uppercase tracking-widest flex items-center gap-2 border-b border-transparent hover:border-ugent-blue transition-all">
                     View Publication <ChevronRight size={14} />
                   </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
