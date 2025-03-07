
import { Code2, Database, Figma, Globe, Layers, Terminal } from "lucide-react";

export const Skills = () => {
  const skills = [
    { name: "Frontend", icon: <Layers className="h-6 w-6" />, items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"] },
    { name: "Backend", icon: <Database className="h-6 w-6" />, items: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Firebase"] },
    { name: "Languages", icon: <Code2 className="h-6 w-6" />, items: ["JavaScript", "TypeScript", "Python", "Java", "C++"] },
    { name: "Tools", icon: <Terminal className="h-6 w-6" />, items: ["Git", "GitHub", "VS Code", "Figma", ] },
    { name: "Design", icon: <Figma className="h-6 w-6" />, items: ["UI/UX Design", "Wireframing", "Prototyping"] },
    { name: "Other", icon: <Globe className="h-6 w-6" />, items: ["SEO", "Responsive Design", "Performance Optimization"] }
  ];

  return (
    <section 
      id="skills" 
      className="py-24 px-6 md:px-10 bg-secondary/50 dark:bg-secondary/10" 
      data-section
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary dark:bg-primary/20 animate-fade-in opacity-0">
            My Expertise
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mt-3 opacity-0 animate-slide-in-from-right animation-delay-200">
            Skills & Technologies
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4 opacity-0 animate-slide-in-from-right animation-delay-300">
            I've worked with a variety of technologies and frameworks to create responsive, user-friendly applications.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-0 animate-fade-in animation-delay-500">
          {skills.map((category, idx) => (
            <div key={idx} className="p-6 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300 dark:bg-card/20 dark:backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary dark:bg-primary/20">
                  {category.icon}
                </div>
                <h3 className="text-xl font-medium">{category.name}</h3>
              </div>
              <ul className="space-y-2">
                {category.items.map((skill, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/70"></div>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
