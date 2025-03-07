
import { Award, BookOpen, Cpu, Lightbulb, Users } from "lucide-react";

export const Achievements = () => {
  const achievements = [
    {
      icon: <Award className="h-6 w-6" />,
      title: "Hackathon Winner",
      description: "First place at the 2023 Tech Innovators Hackathon for developing an AI-powered accessibility tool."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Team Leadership",
      description: "Led a team of 4 developers to successfully deliver a complex e-commerce platform on time and under budget."
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "Performance Optimization",
      description: "Improved application load time by 70% through code splitting, lazy loading, and server-side rendering techniques."
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Technical Writing",
      description: "Published a series of articles on modern web development best practices with over 50,000 combined views."
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Innovation Award",
      description: "Received innovation award for developing a novel approach to real-time data synchronization in distributed systems."
    }
  ];

  return (
    <section 
      id="achievements" 
      className="py-24 px-6 md:px-10 bg-gradient-to-b from-transparent to-secondary/30 dark:to-secondary/10" 
      data-section
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary dark:bg-primary/20 animate-fade-in opacity-0">
            Accomplishments
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mt-3 opacity-0 animate-slide-in-from-right animation-delay-200">
            Achievements & Recognition
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4 opacity-0 animate-slide-in-from-right animation-delay-300">
            Highlights of my professional journey and notable accomplishments.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-0 animate-fade-in animation-delay-500">
          {achievements.map((achievement, idx) => (
            <div key={idx} className="p-6 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300 dark:bg-card/20 dark:backdrop-blur-sm">
              <div className="p-3 rounded-lg bg-primary/10 text-primary dark:bg-primary/20 inline-block mb-4">
                {achievement.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{achievement.title}</h3>
              <p className="text-muted-foreground">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
