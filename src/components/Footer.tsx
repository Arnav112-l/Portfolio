
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 px-6 md:px-10 border-t border-border bg-secondary/30 dark:bg-secondary/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <a href="#" className="text-xl font-semibold tracking-tight">
              Portfolio
            </a>
            <p className="text-muted-foreground max-w-md">
              Creating innovative digital experiences with a focus on performance, 
              accessibility, and beautiful design.
            </p>
            <div className="flex space-x-4 pt-2">
              <a 
                href="https://github.com/Arnav112-l" 
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://x.com/Arnav_Singh_1" 
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/singh-1502-arnav/" 
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="singharnav7763809@gmail.com" 
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Quick Links
            </div>
            <ul className="space-y-2">
              {['Home', 'Projects', 'Skills', 'Achievements', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-4">
            <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Contact
            </div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href="singharnav7763809@gmail.com" className="hover:text-foreground transition-colors">
                  singharnav7763809@gmail.com
                </a>
              </li>
              <li className="text-sm text-muted-foreground">
                Available for freelance opportunities and collaborations
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © {currentYear} Portfolio. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
