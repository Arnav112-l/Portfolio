
import { ExternalLink, Github } from "lucide-react";

export const Projects = () => {
  const projects = [
    {
      title: "Portfolio Website",
      description: "A modern portfolio website built with React and Tailwind CSS showcasing my projects and skills.",
      tags: ["React", "Tailwind CSS", "TypeScript"],
      image: "bg-gradient-to-br from-blue-500/20 to-purple-500/20",
      github: "#",
      demo: "#"
    },
    {
      title: "E-commerce Platform",
      description: "A full-stack e-commerce application with payment processing and inventory management.",
      tags: ["Next.js", "PostgreSQL", "Stripe", "Redux"],
      image: "bg-gradient-to-br from-green-500/20 to-teal-500/20",
      github: "#",
      demo: "#"
    },
    {
      title: "Task Management App",
      description: "A productivity app allowing users to organize tasks, set deadlines and track progress.",
      tags: ["React", "Firebase", "React Query", "Styled Components"],
      image: "bg-gradient-to-br from-orange-500/20 to-red-500/20",
      github: "#",
      demo: "#"
    },
    {
      title: "Weather App",
      description: "A weather dashboard that displays current and forecast weather data using a weather API.",
      tags: ["JavaScript", "RESTful APIs", "CSS Grid", "Chart.js"],
      image: "bg-gradient-to-br from-sky-500/20 to-indigo-500/20",
      github: "https://github.com/Arnav112-l/Weather-App",
      demo: "https://arnav112-l.github.io/Weather-App/"
    },
  ];

  return (
    <section 
      id="projects" 
      className="py-24 px-6 md:px-10 overflow-hidden" 
      data-section
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary dark:bg-primary/20 animate-fade-in opacity-0 transform transition-all duration-700">
            My Work
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mt-3 opacity-0 animate-slide-in-from-right animation-delay-200 transform transition-all duration-700">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4 opacity-0 animate-slide-in-from-right animation-delay-300 transform transition-all duration-700">
            Here are some of my recent projects I've worked on, showcasing my skills and experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <div 
              key={idx} 
              className="group rounded-xl overflow-hidden border border-border bg-card hover:shadow-xl transition-all duration-500 dark:bg-card/20 dark:backdrop-blur-sm opacity-0 animate-fade-in transform hover:-translate-y-2"
              style={{ animationDelay: `${idx * 150 + 500}ms` }}
            >
              <div 
                className={`h-48 ${project.image} flex items-center justify-center relative overflow-hidden group-hover:scale-[1.05] transition-transform duration-700 ease-in-out`}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 dark:to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <h3 className="text-2xl font-semibold px-6 text-center relative z-10 transition-transform duration-700 group-hover:scale-110">
                  {project.title}
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-muted-foreground transform transition-all duration-500 group-hover:translate-x-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 text-xs rounded-full bg-secondary dark:bg-secondary/30 transition-all duration-500 hover:scale-110 hover:bg-primary/10 dark:hover:bg-primary/20"
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 pt-2">
                  <a 
                    href={project.github} 
                    className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors duration-300 group"
                    aria-label={`View code for ${project.title}`}
                  >
                    <Github className="h-4 w-4 transition-transform duration-500 group-hover:rotate-12" />
                    <span className="transition-all duration-500 group-hover:translate-x-1">Code</span>
                  </a>
                  <a 
                    href={project.demo} 
                    className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors duration-300 group"
                    aria-label={`View live demo for ${project.title}`}
                  >
                    <ExternalLink className="h-4 w-4 transition-transform duration-500 group-hover:scale-110" />
                    <span className="transition-all duration-500 group-hover:translate-x-1">Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center opacity-0 animate-fade-in animation-delay-1000">
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center h-12 px-8 text-base font-medium transition-all duration-500 rounded-full bg-primary text-primary-foreground hover:opacity-90 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
          >
            Have a project in mind? Let's talk!
          </a>
        </div>
      </div>
    </section>
  );
};
