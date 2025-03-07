
import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Achievements } from "@/components/Achievements";
import { CurrentWork } from "@/components/CurrentWork";
import { Contact } from "@/components/Contact";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Projects />
      <Skills />
      <section 
        id="about" 
        className="py-24 px-6 md:px-10" 
        data-section
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto rounded-2xl bg-muted overflow-hidden dark:bg-muted/20">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/10" />
                <div className="h-full w-full mask-linear-fade">
                  <div className="h-full w-full bg-secondary animate-pulse-subtle dark:bg-secondary/30" />
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary dark:bg-primary/20 animate-fade-in opacity-0">
                  My Approach
                </p>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight opacity-0 animate-slide-in-from-right animation-delay-200">
                  Where Function Meets Impact
                </h2>
                <p className="text-muted-foreground max-w-xl opacity-0 animate-slide-in-from-right animation-delay-300">
                  I believe in the power of experience. By embracing real-world challenges and continuous learning, I build solutions that are impactful, efficient, and built to last.                
                  </p>
              </div>
              
              <ul className="space-y-4 opacity-0 animate-fade-in animation-delay-500">
                {[
                  "Engineered for Real-World Impact",
                  "Designed for Clarity and Functionality",
                  "Developed with Performance in Mind.",
                  "Driven by Continuous Learning",
                  "Built to Withstand Time"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 dark:bg-primary/20">
                      <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Achievements />
      <CurrentWork />
      <Contact />
    </Layout>
  );
};

export default Index;
