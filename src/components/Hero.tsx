
import { cn } from '@/lib/utils';

export const Hero = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center pt-20 pb-16 px-6 md:px-10 overflow-hidden"
      data-section
    >
      {/* Abstract background shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl opacity-70 animate-pulse-subtle" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl opacity-60" />
        <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-3xl opacity-50" />
      </div>
      
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary animate-fade-in opacity-0">
                Simply Exceptional
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight text-balance opacity-0 animate-slide-in-from-left animation-delay-200">
                Designed for the future
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mt-4 text-balance opacity-0 animate-slide-in-from-left animation-delay-300">
                Creating a harmony between form and function, delivering experiences that are intuitive, beautiful, and meaningful.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in animation-delay-500">
              <a
                href="#features"
                className="inline-flex items-center justify-center h-12 px-8 text-base font-medium transition-all rounded-full bg-primary text-primary-foreground hover:opacity-90 active:scale-95"
              >
                Explore
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center h-12 px-8 text-base font-medium transition-all rounded-full border border-input bg-transparent hover:bg-secondary active:scale-95"
              >
                Learn More
              </a>
            </div>
            
            {/* Trust indicators */}
            <div className="pt-8 opacity-0 animate-fade-in animation-delay-700">
              <p className="text-sm text-muted-foreground mb-4">Trusted by innovative companies</p>
              <div className="flex flex-wrap items-center gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "h-8 w-24 rounded-md bg-muted/50 animate-pulse-subtle",
                      i === 2 ? "animation-delay-200" : 
                      i === 3 ? "animation-delay-400" : 
                      i === 4 ? "animation-delay-600" : ""
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative opacity-0 animate-fade-in animation-delay-300">
            <div className="absolute -inset-px bg-gradient-to-tr from-primary/10 to-transparent rounded-2xl blur-lg opacity-50 animate-pulse-subtle" />
            <div className="aspect-square max-w-lg mx-auto rounded-2xl glass p-6 relative">
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                <div className="w-full h-full bg-muted animate-float opacity-90" />
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="p-6 glass rounded-xl">
                  <div className="w-1/2 h-3 bg-primary/10 rounded-full mb-3" />
                  <div className="w-3/4 h-3 bg-muted rounded-full" />
                  <div className="flex justify-end mt-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
