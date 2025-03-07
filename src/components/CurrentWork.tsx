
import { ArrowRight, Calendar, Clock, Code } from "lucide-react";

export const CurrentWork = () => {
  return (
    <section 
      id="current-work" 
      className="py-24 px-6 md:px-10" 
      data-section
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary dark:bg-primary/20 animate-fade-in opacity-0">
            In Progress
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mt-3 opacity-0 animate-slide-in-from-right animation-delay-200">
            What I'm Working On
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4 opacity-0 animate-slide-in-from-right animation-delay-300">
            Current projects and initiatives I'm focused on developing.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center opacity-0 animate-fade-in animation-delay-500">
          <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 p-8 border border-primary/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full -ml-12 -mb-12"></div>
            
            <h3 className="text-2xl font-semibold mb-4 relative z-10">Fashion Feel</h3>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 relative z-10">
              <Clock className="h-4 w-4" />
              <span>Estimated completion: July 2025</span>
            </div>
            
            <p className="mb-6 relative z-10">
              I'm currently developing Fashion Feel, an innovative search engine that utilizes AI to help users find and compare lifestyle accessories, sneakers, and sunglasses from various providers. This platform aggregates prices from 200+ online and offline stores, enabling users to choose the best deal and purchase through the provider’s website.           
            </p>
            
            <div className="space-y-3 mb-8 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-16 text-sm font-medium">Progress</div>
                <div className="flex-1 h-2 bg-secondary dark:bg-secondary/30 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[25%] rounded-full"></div>
                </div>
                <div className="text-sm font-medium">25%</div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-16 text-sm font-medium">Stage</div>
                <div className="text-sm">Beta Development</div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-16 text-sm font-medium">Focus</div>
                <div className="text-sm">Adaptive Shopping & Price Intelligence</div>
              </div>
            </div>
            
            <a href="https://docs.google.com/document/d/1cRaSrGWwUqBt6sTtnlMUc4tink-AbzRcCRX1PCEdyk4/edit?usp=sharing" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
              <span>Learn more about this project</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          
          <div className="space-y-6">
            <div className="text-xl font-semibold mb-4">Other Active Projects</div>
            
            {[
              // {
              //   title: "Open Source Contributions",
              //   description: "Contributing to React ecosystem libraries and improving documentation.",
              //   progress: 40,
              //   timeline: "Ongoing"
              // },
              {
                title: "Personal Blog Redesign",
                description: "Modernizing my technical blog with Next.js and MDX for improved content management.",
                progress: 75, 
                timeline: "Completing next month"
              },
              {
                title: "Community Workshop Series",
                description: "Developing content for a series of workshops on modern web development.",
                progress: 30,
                timeline: "Planning phase"
              }
            ].map((project, idx) => (
              <div key={idx} className="p-5 rounded-xl border border-border bg-card hover:shadow-sm transition-all duration-300 dark:bg-card/20 dark:backdrop-blur-sm">
                <div className="flex justify-between mb-2">
                  <h4 className="font-medium">{project.title}</h4>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{project.timeline}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-secondary dark:bg-secondary/30 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${project.progress}%` }}></div>
                  </div>
                  <div className="text-xs font-medium">{project.progress}%</div>
                </div>
              </div>
            ))}
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Code className="h-4 w-4" />
              <span>Always experimenting with new technologies and approaches</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
