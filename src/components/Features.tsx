
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  index: number;
}

const FeatureCard = ({ title, description, icon, index }: FeatureCardProps) => {
  const delay = `animation-delay-${index * 100}`;
  
  return (
    <div 
      className={cn(
        "opacity-0 animate-scale-in p-8 rounded-2xl transition-all duration-300",
        "hover:shadow-xl hover:-translate-y-1 bg-white border border-border",
        delay
      )}
    >
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
        <div className="text-lg font-semibold text-primary">{icon}</div>
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export const Features = () => {
  const features = [
    {
      title: "Intuitive Design",
      description: "Clean interfaces that provide a seamless user experience with no unnecessary elements.",
      icon: "✧"
    },
    {
      title: "Functional Beauty",
      description: "Every design element serves a purpose, combining aesthetics with practical functionality.",
      icon: "◯"
    },
    {
      title: "Cutting Edge",
      description: "Incorporating the latest technologies and design innovations for peak performance.",
      icon: "△"
    },
    {
      title: "Thoughtful Details",
      description: "Carefully crafted with attention to small details that elevate the overall experience.",
      icon: "◇"
    },
    {
      title: "Purposeful Innovation",
      description: "Innovative features that enhance functionality rather than just for novelty.",
      icon: "□"
    },
    {
      title: "Sustainable Approach",
      description: "Designed with longevity in mind, avoiding trendy elements that quickly become outdated.",
      icon: "⬡"
    }
  ];

  return (
    <section 
      id="features" 
      className="py-24 px-6 md:px-10 bg-secondary/30" 
      data-section
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary animate-fade-in opacity-0">
            Key Features
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Exceptional attention to detail
          </h2>
          <p className="text-muted-foreground">
            Every aspect is meticulously crafted to create an experience that is intuitive, beautiful, and meaningful.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
