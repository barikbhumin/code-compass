import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { QuizResults } from '@/entities';
import { ArrowRight, RotateCcw } from 'lucide-react';

export default function ResultsPage() {
  const location = useLocation();
  const { category, mindsetScore } = location.state || {};
  const [result, setResult] = useState<QuizResults | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!category) {
      return;
    }
    loadResult();
  }, [category]);

  const loadResult = async () => {
    try {
      const { items } = await BaseCrudService.getAll<QuizResults>('quizresults');
      const matchedResult = items.find(r => r.resultCategory === category);
      setResult(matchedResult || null);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading results:', error);
      setIsLoading(false);
    }
  };

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-2xl px-8">
            <h1 className="font-heading text-4xl text-foreground mb-6">No Results Available</h1>
            <p className="font-paragraph text-lg text-secondary-foreground mb-8">
              Please complete the assessment first.
            </p>
            <Link to="/quiz">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-paragraph px-8 py-4 h-auto rounded-md">
                Take Assessment
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="font-paragraph text-xl text-secondary-foreground">Analyzing your responses...</p>
        </div>
        <Footer />
      </div>
    );
  }

  const getMindsetLevel = (score: number) => {
    if (score >= 4) return 'Strong';
    if (score >= 3) return 'Developing';
    return 'Needs Work';
  };

  const mindsetLevel = getMindsetLevel(mindsetScore || 0);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 w-full">
        {/* Results Header */}
        <section className="w-full bg-primary">
          <div className="max-w-[100rem] mx-auto px-8 py-16 lg:py-24">
            <div className="max-w-4xl">
              <p className="font-paragraph text-sm text-primary-foreground/80 mb-4 uppercase tracking-wider">
                Your Assessment Results
              </p>
              <h1 className="font-heading text-5xl lg:text-7xl text-primary-foreground mb-8 leading-tight">
                {result?.resultTitle || 'Results Ready'}
              </h1>
              <p className="font-paragraph text-xl text-primary-foreground leading-relaxed">
                {result?.shortDescription || 'Your assessment has been completed.'}
              </p>
            </div>
          </div>
        </section>
        
        {/* Mindset Score */}
        <section className="w-full bg-secondary">
          <div className="max-w-[100rem] mx-auto px-8 py-16">
            <div className="max-w-4xl">
              <h2 className="font-heading text-2xl text-foreground mb-6">MINDSET EVALUATION</h2>
              <div className="bg-background p-8 rounded-lg border border-neutralborder">
                <div className="flex items-center justify-between mb-4">
                  <p className="font-paragraph text-lg text-foreground">Current Level:</p>
                  <p className="font-heading text-3xl text-primary">{mindsetLevel}</p>
                </div>
                <div className="w-full bg-neutralborder h-3 rounded-full overflow-hidden">
                  <div 
                    className="bg-primary h-full transition-all duration-500"
                    style={{ width: `${((mindsetScore || 0) / 5) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Detailed Guidance */}
        <section className="w-full bg-background">
          <div className="max-w-[100rem] mx-auto px-8 py-16 lg:py-24">
            <div className="max-w-4xl">
              <h2 className="font-heading text-4xl lg:text-5xl text-foreground mb-12 leading-tight">
                WHAT THIS MEANS
              </h2>
              
              <div className="prose prose-lg max-w-none">
                <div className="bg-secondary p-10 rounded-lg mb-12">
                  <p className="font-paragraph text-xl text-foreground leading-relaxed whitespace-pre-line">
                    {result?.guidanceText || 'Based on your responses, we have identified your current readiness level.'}
                  </p>
                </div>
                
                {result?.recommendationTitle && (
                  <div className="border-l-4 border-primary pl-8 py-6">
                    <h3 className="font-heading text-2xl text-foreground mb-4">
                      RECOMMENDED PATH
                    </h3>
                    <p className="font-paragraph text-lg text-foreground mb-6 leading-relaxed">
                      {result.recommendationTitle}
                    </p>
                    {result.recommendationUrl && (
                      <a 
                        href={result.recommendationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                      >
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-paragraph px-6 py-3 h-auto rounded-md">
                          Explore This Path
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* Next Steps */}
        <section className="w-full bg-foreground">
          <div className="max-w-[100rem] mx-auto px-8 py-16 lg:py-24">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading text-4xl lg:text-5xl text-background mb-12 text-center leading-tight">
                NEXT STEPS
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-background/10 backdrop-blur-sm p-8 rounded-lg border border-background/20">
                  <h3 className="font-heading text-xl text-background mb-4">REFLECT</h3>
                  <p className="font-paragraph text-base text-background/80 leading-relaxed">
                    Take time to honestly assess whether the results align with your self-perception. Denial is the enemy of growth.
                  </p>
                </div>
                
                <div className="bg-background/10 backdrop-blur-sm p-8 rounded-lg border border-background/20">
                  <h3 className="font-heading text-xl text-background mb-4">ACT</h3>
                  <p className="font-paragraph text-base text-background/80 leading-relaxed">
                    Follow the recommended path. Ignore it at your own risk. The assessment is only valuable if you use it.
                  </p>
                </div>
              </div>
              
              <div className="text-center">
                <Link to="/quiz">
                  <Button 
                    variant="outline" 
                    className="bg-transparent border-2 border-background text-background hover:bg-background hover:text-foreground font-paragraph px-8 py-4 h-auto rounded-md"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Retake Assessment
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
