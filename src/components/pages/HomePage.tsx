// HPI 1.6-V
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { ArrowRight, Check, X, Terminal, Cpu, Layers } from 'lucide-react';

// --- UTILITY COMPONENTS (MANDATORY SAFE PATTERNS) ---

type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  delay?: string;
};

const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, className, threshold = 0.1, delay = '0ms' }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add('is-visible');
        observer.unobserve(element); // Stop observing after reveal
      }
    }, { threshold });

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div 
      ref={ref} 
      className={`opacity-0 translate-y-8 transition-all duration-1000 ease-out ${className || ''}`}
      style={{ transitionDelay: delay }}
    >
      {children}
    </div>
  );
};

// --- CUSTOM CSS FOR SCOPED EFFECTS ---
const CustomStyles = () => (
  <style>{`
    .is-visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    
    .hero-clip-path {
      clip-path: inset(0 0 0 0 round 3rem 0 0 3rem);
    }
    
    @media (max-width: 1024px) {
      .hero-clip-path {
        clip-path: inset(0 0 0 0);
      }
    }

    .text-stroke {
      -webkit-text-stroke: 1px rgba(0, 0, 0, 0.1);
      color: transparent;
    }

    .grid-bg {
      background-size: 40px 40px;
      background-image: linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
    }

    .marquee-container {
      overflow: hidden;
      white-space: nowrap;
    }
    
    .marquee-content {
      display: inline-block;
      animation: marquee 20s linear infinite;
    }
    
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
  `}</style>
);

// --- MAIN PAGE COMPONENT ---

export default function HomePage() {
  // Canonical Data Sources (Preserved from original)
  const heroData = {
    title: "STOP WASTING TIME",
    subtitle: "Most people aren't ready to learn coding. Not because they lack intelligence, but because they haven't confronted the reality of what it actually requires.",
    statTitle: "3 MINUTES",
    statDesc: "That's all it takes to find out if you're approaching this the right way—or setting yourself up for frustration."
  };

  const truthData = [
    {
      id: 1,
      text: "Coding bootcamps won't tell you this: most beginners fail not because the material is too hard, but because they never developed the right mindset.",
      icon: <Terminal className="w-6 h-6 text-primary" />
    },
    {
      id: 2,
      text: "They chase syntax and frameworks without understanding that technology is fundamentally about structured thinking and problem decomposition.",
      icon: <Cpu className="w-6 h-6 text-primary" />
    },
    {
      id: 3,
      text: "The industry needs people who can think systematically, not just memorize code patterns. This assessment reveals which category you fall into.",
      icon: <Layers className="w-6 h-6 text-primary" />
    }
  ];

  const comparisonData = {
    whatItIs: [
      "A diagnostic tool that evaluates your readiness based on mindset, not prior knowledge.",
      "An honest filter that saves you months of frustration by revealing whether you're approaching this correctly.",
      "A reality check that prioritizes clarity over motivation, substance over hype."
    ],
    whatItIsnt: [
      "Not a course. Not a tutorial. Not a motivational speech disguised as education.",
      "Not designed to make you feel good. Designed to make you think clearly.",
      "Not for everyone. And that's exactly the point."
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden font-sans selection:bg-primary selection:text-white">
      <CustomStyles />
      <Header />

      {/* --- HERO SECTION --- */}
      {/* Layout inspired by "The Angelo": Split screen, left text/wireframe, right rounded image */}
      <section className="relative w-full min-h-[95vh] flex flex-col lg:flex-row items-center overflow-hidden pt-20 lg:pt-0">
        
        {/* Background Grid Texture */}
        <div className="absolute inset-0 grid-bg pointer-events-none opacity-50" />

        {/* Left Column: Content & Wireframe Visual */}
        <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-6 lg:px-24 py-12 lg:py-0 z-10 relative">
          <AnimatedElement className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-bold tracking-widest uppercase text-primary">Readiness Assessment Protocol</span>
            </div>
          </AnimatedElement>

          <AnimatedElement delay="100ms">
            <h1 className="font-heading text-6xl lg:text-8xl text-foreground mb-8 leading-[0.9] tracking-tight">
              {heroData.title.split(' ').map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h1>
          </AnimatedElement>

          <AnimatedElement delay="200ms">
            <p className="font-paragraph text-lg lg:text-xl text-secondary-foreground mb-10 leading-relaxed max-w-lg border-l-2 border-primary pl-6">
              {heroData.subtitle}
            </p>
          </AnimatedElement>

          <AnimatedElement delay="300ms" className="flex flex-wrap gap-6 items-center">
            <Link to="/quiz">
              <Button className="bg-foreground text-background hover:bg-primary hover:text-white transition-all duration-300 font-paragraph px-10 py-7 h-auto text-lg rounded-none tracking-wide group">
                Take The Assessment
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <span className="text-sm text-neutral-500 font-medium">
              ~ {heroData.statTitle} duration
            </span>
          </AnimatedElement>

          {/* Abstract Wireframe Visual (Replacing the building wireframe from inspiration) */}
          <div className="mt-16 lg:mt-24 relative w-64 h-64 hidden lg:block opacity-60">
             {/* CSS-only Schematic Representation */}
             <div className="absolute inset-0 border border-wireframestroke/30 transform translate-x-4 translate-y-4" />
             <div className="absolute inset-0 border border-wireframestroke/50 transform translate-x-2 translate-y-2" />
             <div className="absolute inset-0 border border-wireframestroke bg-white/50 backdrop-blur-sm flex flex-col justify-between p-4">
                <div className="w-full h-px bg-wireframestroke/50" />
                <div className="w-full h-px bg-wireframestroke/50" />
                <div className="w-full h-px bg-wireframestroke/50" />
                <div className="absolute bottom-4 right-4 font-mono text-xs text-wireframestroke">FIG. 1.0 // LOGIC</div>
             </div>
          </div>
        </div>

        {/* Right Column: The "Angelo" Style Image */}
        <div className="w-full lg:w-[55%] h-[60vh] lg:h-[90vh] relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 pl-6 lg:pl-0">
          <div className="w-full h-full relative hero-clip-path overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-primary/10 z-10 mix-blend-multiply pointer-events-none" />
            <Image
              src="https://static.wixstatic.com/media/b80d6d_c4e4f09f2834470297f3d2e928b98e37~mv2.png?originWidth=1600&originHeight=896"
              alt="Abstract representation of structured thinking and growth"
              className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-[2s] ease-out"
              width={1600}
            />
            
            {/* Floating Stat Card */}
            <div className="absolute bottom-8 left-8 lg:bottom-16 lg:left-16 bg-white/90 backdrop-blur-md p-8 max-w-xs z-20 border-l-4 border-primary shadow-lg">
              <p className="font-heading text-4xl text-foreground mb-2 leading-none">
                {heroData.statTitle}
              </p>
              <p className="font-paragraph text-sm text-secondary-foreground leading-relaxed">
                {heroData.statDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- MARQUEE DIVIDER --- */}
      <div className="w-full bg-foreground text-background py-4 overflow-hidden border-y border-neutral-800">
        <div className="marquee-container">
          <div className="marquee-content font-heading text-xl tracking-widest uppercase opacity-80">
            Logic • Structure • Clarity • Mindset • Discipline • Architecture • Logic • Structure • Clarity • Mindset • Discipline • Architecture • Logic • Structure • Clarity • Mindset • Discipline • Architecture •
          </div>
        </div>
      </div>

      {/* --- THE UNCOMFORTABLE TRUTH (Sticky Scroll) --- */}
      <section className="w-full bg-secondary py-24 lg:py-32 relative">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Sticky Header */}
            <div className="lg:w-1/3">
              <div className="sticky top-32">
                <AnimatedElement>
                  <h2 className="font-heading text-5xl lg:text-7xl text-foreground mb-8 leading-none">
                    THE<br/>UNCOMFORTABLE<br/><span className="text-primary">TRUTH</span>
                  </h2>
                </AnimatedElement>
                <AnimatedElement delay="100ms">
                  <p className="font-paragraph text-lg text-secondary-foreground mb-8 max-w-sm">
                    The industry is filled with noise. We're here to cut through it. Read carefully.
                  </p>
                </AnimatedElement>
                <div className="hidden lg:block w-24 h-1 bg-foreground mt-8" />
              </div>
            </div>

            {/* Scrolling Cards */}
            <div className="lg:w-2/3 space-y-12">
              {truthData.map((item, index) => (
                <AnimatedElement key={item.id} delay={`${index * 100}ms`} className="w-full">
                  <div className="group relative bg-background p-8 lg:p-12 border border-neutralborder hover:border-primary transition-colors duration-500 shadow-sm hover:shadow-xl">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="font-heading text-6xl text-primary">{`0${item.id}`}</span>
                    </div>
                    <div className="mb-6 p-3 bg-secondary w-fit rounded-full group-hover:bg-primary/10 transition-colors">
                      {item.icon}
                    </div>
                    <p className="font-paragraph text-xl lg:text-2xl text-foreground leading-relaxed relative z-10">
                      {item.text}
                    </p>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- WHAT THIS IS / ISN'T (Magazine Layout) --- */}
      <section className="w-full bg-background py-24 lg:py-32 overflow-hidden">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-neutralborder">
            
            {/* Column 1: What This Is */}
            <div className="p-12 lg:p-20 border-b lg:border-b-0 lg:border-r border-neutralborder bg-primary/5 relative group">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              
              <AnimatedElement>
                <div className="flex items-center gap-4 mb-12">
                  <div className="p-2 bg-primary text-white rounded-full">
                    <Check className="w-6 h-6" />
                  </div>
                  <h2 className="font-heading text-3xl lg:text-4xl text-foreground tracking-tight">
                    WHAT THIS IS
                  </h2>
                </div>
              </AnimatedElement>

              <div className="space-y-8">
                {comparisonData.whatItIs.map((text, i) => (
                  <AnimatedElement key={i} delay={`${i * 100}ms`}>
                    <div className="flex gap-6">
                      <div className="w-12 h-px bg-primary mt-4 shrink-0" />
                      <p className="font-paragraph text-lg text-foreground leading-relaxed">
                        {text}
                      </p>
                    </div>
                  </AnimatedElement>
                ))}
              </div>
            </div>

            {/* Column 2: What This Isn't */}
            <div className="p-12 lg:p-20 bg-background relative group">
              <div className="absolute top-0 right-0 w-full h-1 bg-neutral-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-right" />

              <AnimatedElement>
                <div className="flex items-center gap-4 mb-12">
                  <div className="p-2 bg-neutral-200 text-neutral-600 rounded-full">
                    <X className="w-6 h-6" />
                  </div>
                  <h2 className="font-heading text-3xl lg:text-4xl text-neutral-500 tracking-tight">
                    WHAT THIS ISN'T
                  </h2>
                </div>
              </AnimatedElement>

              <div className="space-y-8">
                {comparisonData.whatItIsnt.map((text, i) => (
                  <AnimatedElement key={i} delay={`${i * 100}ms`}>
                    <div className="flex gap-6">
                      <div className="w-12 h-px bg-neutral-300 mt-4 shrink-0" />
                      <p className="font-paragraph text-lg text-secondary-foreground leading-relaxed">
                        {text}
                      </p>
                    </div>
                  </AnimatedElement>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- VISUAL BREATHER / PARALLAX --- */}
      <section className="w-full h-[60vh] relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-black z-0">
           <Image 
             src="https://static.wixstatic.com/media/b80d6d_41c59d9f560c484193ad5d2f2a75254c~mv2.png?originWidth=1920&originHeight=576"
             alt="Abstract digital landscape"
             className="w-full h-full object-cover opacity-40"
             width={1920}
           />
        </div>
        <div className="relative z-10 text-center px-6">
          <AnimatedElement>
            <h3 className="font-heading text-5xl lg:text-8xl text-white opacity-20 select-none">
              CLARITY IS POWER
            </h3>
          </AnimatedElement>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="w-full bg-foreground text-background py-32 lg:py-48 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px]" />
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <AnimatedElement>
            <h2 className="font-heading text-5xl lg:text-8xl mb-8 leading-none tracking-tight">
              READY FOR <span className="text-primary">CLARITY?</span>
            </h2>
          </AnimatedElement>
          
          <AnimatedElement delay="100ms">
            <p className="font-paragraph text-xl lg:text-2xl text-neutral-400 mb-16 max-w-2xl mx-auto leading-relaxed">
              The assessment takes three minutes. The insights could save you three years of wandering in the wrong direction.
            </p>
          </AnimatedElement>
          
          <AnimatedElement delay="200ms">
            <Link to="/quiz">
              <Button className="bg-primary text-white hover:bg-white hover:text-foreground transition-all duration-300 font-paragraph px-12 py-8 h-auto text-xl rounded-full tracking-wide shadow-[0_0_40px_rgba(0,122,51,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)]">
                Begin Assessment
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}