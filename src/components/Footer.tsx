export default function Footer() {
  return (
    <footer className="w-full bg-secondary border-t border-neutralborder mt-auto">
      <div className="max-w-[120rem] mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-heading text-lg mb-4">REALITY CHECK</h3>
            <p className="font-paragraph text-sm text-secondary-foreground">
              Honest assessment for aspiring developers. No shortcuts, no false promises.
            </p>
          </div>
          
          <div>
            <h4 className="font-heading text-base mb-4">APPROACH</h4>
            <p className="font-paragraph text-sm text-secondary-foreground">
              We believe in clarity over comfort. This assessment helps you understand if you're ready for the reality of tech.
            </p>
          </div>
          
          <div>
            <h4 className="font-heading text-base mb-4">PHILOSOPHY</h4>
            <p className="font-paragraph text-sm text-secondary-foreground">
              Technology is about thinking, not just coding. Understanding this distinction is the first step.
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-neutralborder">
          <p className="font-paragraph text-xs text-secondary-foreground text-center">
            © {new Date().getFullYear()} Reality Check. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
