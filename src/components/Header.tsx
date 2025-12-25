import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Header() {
  const location = useLocation();
  
  return (
    <header className="w-full bg-background border-b border-neutralborder">
      <div className="max-w-[120rem] mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-heading text-xl tracking-wider">
            REALITY CHECK
          </Link>
          
          <nav className="hidden md:flex items-center gap-12">
            <Link 
              to="/" 
              className={`font-paragraph text-base transition-colors ${
                location.pathname === '/' ? 'text-foreground' : 'text-secondary-foreground hover:text-foreground'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/quiz" 
              className={`font-paragraph text-base transition-colors ${
                location.pathname === '/quiz' ? 'text-foreground' : 'text-secondary-foreground hover:text-foreground'
              }`}
            >
              Assessment
            </Link>
          </nav>
          
          <Link to="/quiz">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-paragraph px-6 py-2 h-auto rounded-md">
              Start Now
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
