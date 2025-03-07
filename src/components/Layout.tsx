
import React, { useEffect } from 'react';
import { NavBar } from './NavBar';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  // Enhanced Intersection Observer for smoother scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add staggered animation to children elements
            entry.target.classList.add('is-visible');
            
            // Get all elements with animation classes and animate them with staggered delay
            const animatedElements = entry.target.querySelectorAll('[class*="animate-"]');
            animatedElements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('is-animated');
              }, index * 150); // Stagger effect
            });
          } else {
            // Optional: remove classes when out of viewport for re-animation when scrolling back
            // entry.target.classList.remove('is-visible');
            // const animatedElements = entry.target.querySelectorAll('[class*="animate-"]');
            // animatedElements.forEach(el => el.classList.remove('is-animated'));
          }
        });
      },
      { 
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -100px 0px' // Adjust the trigger area
      }
    );

    // Target all sections and elements with animation classes
    const sections = document.querySelectorAll('[data-section]');
    sections.forEach((section) => observer.observe(section));

    // Add smooth scroll behavior to the entire page
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-500">
      <NavBar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};
