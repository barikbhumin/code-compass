import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { QuizQuestions } from '@/entities';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function QuizPage() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<QuizQuestions[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const { items } = await BaseCrudService.getAll<QuizQuestions>('quizquestions');
      const sortedQuestions = items.sort((a, b) => (a.questionOrder || 0) - (b.questionOrder || 0));
      setQuestions(sortedQuestions);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading questions:', error);
      setIsLoading(false);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value);
  };

  const handleNext = () => {
    if (selectedAnswer && currentQuestion) {
      setAnswers({
        ...answers,
        [currentQuestion._id]: parseInt(selectedAnswer)
      });
      
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        const nextQuestion = questions[currentQuestionIndex + 1];
        setSelectedAnswer(answers[nextQuestion._id]?.toString() || '');
      } else {
        calculateAndNavigateToResults();
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const prevQuestion = questions[currentQuestionIndex - 1];
      setSelectedAnswer(answers[prevQuestion._id]?.toString() || '');
    }
  };

  const calculateAndNavigateToResults = async () => {
    const categoryScores: Record<string, number> = {};
    const mindsetScore = { total: 0, count: 0 };

    questions.forEach((question) => {
      const answer = answers[question._id] || 0;
      const weight = question.questionWeight || 1;
      const category = question.questionCategory || 'general';

      if (question.isMindsetQuestion) {
        mindsetScore.total += answer * weight;
        mindsetScore.count += 1;
      }

      if (!categoryScores[category]) {
        categoryScores[category] = 0;
      }
      categoryScores[category] += answer * weight;
    });

    const dominantCategory = Object.entries(categoryScores).reduce((a, b) => 
      a[1] > b[1] ? a : b
    )[0];

    const avgMindsetScore = mindsetScore.count > 0 ? mindsetScore.total / mindsetScore.count : 0;

    navigate('/results', { 
      state: { 
        category: dominantCategory,
        mindsetScore: avgMindsetScore,
        answers 
      } 
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="font-paragraph text-xl text-secondary-foreground">Loading assessment...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="font-paragraph text-xl text-secondary-foreground">No questions available.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 w-full">
        {/* Progress Bar */}
        <div className="w-full bg-secondary h-2">
          <div 
            className="bg-primary h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="max-w-[100rem] mx-auto px-8 py-16 lg:py-24">
          {/* Question Counter */}
          <div className="mb-12">
            <p className="font-paragraph text-sm text-secondary-foreground mb-2">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
            <p className="font-paragraph text-xs text-secondary-foreground uppercase tracking-wider">
              {currentQuestion?.questionCategory || 'Assessment'}
            </p>
          </div>
          
          {/* Question */}
          <div className="max-w-4xl">
            <h1 className="font-heading text-4xl lg:text-5xl text-foreground mb-16 leading-tight">
              {currentQuestion?.questionText}
            </h1>
            
            {/* Answer Options */}
            <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-6 border-2 border-neutralborder hover:border-primary transition-colors rounded-md cursor-pointer">
                  <RadioGroupItem value="5" id="option-5" className="mt-1" />
                  <Label htmlFor="option-5" className="font-paragraph text-lg text-foreground leading-relaxed cursor-pointer flex-1">
                    Strongly Agree
                  </Label>
                </div>
                
                <div className="flex items-start space-x-4 p-6 border-2 border-neutralborder hover:border-primary transition-colors rounded-md cursor-pointer">
                  <RadioGroupItem value="4" id="option-4" className="mt-1" />
                  <Label htmlFor="option-4" className="font-paragraph text-lg text-foreground leading-relaxed cursor-pointer flex-1">
                    Agree
                  </Label>
                </div>
                
                <div className="flex items-start space-x-4 p-6 border-2 border-neutralborder hover:border-primary transition-colors rounded-md cursor-pointer">
                  <RadioGroupItem value="3" id="option-3" className="mt-1" />
                  <Label htmlFor="option-3" className="font-paragraph text-lg text-foreground leading-relaxed cursor-pointer flex-1">
                    Neutral
                  </Label>
                </div>
                
                <div className="flex items-start space-x-4 p-6 border-2 border-neutralborder hover:border-primary transition-colors rounded-md cursor-pointer">
                  <RadioGroupItem value="2" id="option-2" className="mt-1" />
                  <Label htmlFor="option-2" className="font-paragraph text-lg text-foreground leading-relaxed cursor-pointer flex-1">
                    Disagree
                  </Label>
                </div>
                
                <div className="flex items-start space-x-4 p-6 border-2 border-neutralborder hover:border-primary transition-colors rounded-md cursor-pointer">
                  <RadioGroupItem value="1" id="option-1" className="mt-1" />
                  <Label htmlFor="option-1" className="font-paragraph text-lg text-foreground leading-relaxed cursor-pointer flex-1">
                    Strongly Disagree
                  </Label>
                </div>
              </div>
            </RadioGroup>
            
            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-16">
              <Button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                variant="outline"
                className="font-paragraph px-6 py-3 h-auto rounded-md"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!selectedAnswer}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-paragraph px-6 py-3 h-auto rounded-md"
              >
                {currentQuestionIndex === questions.length - 1 ? 'View Results' : 'Next'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
