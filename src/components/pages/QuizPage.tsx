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
      const updatedAnswers = {
        ...answers,
        [currentQuestion._id]: parseInt(selectedAnswer)
      };
      setAnswers(updatedAnswers);
      
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        const nextQuestion = questions[currentQuestionIndex + 1];
        setSelectedAnswer(updatedAnswers[nextQuestion._id]?.toString() || '');
      } else {
        // Use updatedAnswers for final calculation
        calculateAndNavigateToResults(updatedAnswers);
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

  const calculateAndNavigateToResults = async (finalAnswers: Record<string, number>) => {
    // Calculate average score across all answers
    const allAnswers = Object.values(finalAnswers);
    const averageScore = allAnswers.length > 0 
      ? allAnswers.reduce((a, b) => a + b, 0) / allAnswers.length 
      : 0;

    // Determine result category based on average score
    let resultCategory = 'Start Coding Now';
    if (averageScore >= 1 && averageScore < 2.5) {
      resultCategory = 'Start Coding Now';
    } else if (averageScore >= 2.5 && averageScore < 4) {
      resultCategory = 'Learn Tech Thinking First';
    } else {
      resultCategory = 'Coding Isn\'t the Right Starting Point';
    }

    navigate('/results', { 
      state: { 
        category: resultCategory,
        averageScore: averageScore,
        answers: finalAnswers
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 w-full">
        <div className="max-w-[100rem] mx-auto px-8 py-16 lg:py-24">
          {/* Question Counter */}
          <div className="mb-12">
            <p className="font-paragraph text-sm text-secondary-foreground mb-2">
              Question {currentQuestionIndex + 1} of {questions.length}
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
                {[
                  { value: '1', text: currentQuestion?.option1Text || 'Option 1' },
                  { value: '2', text: currentQuestion?.option2Text || 'Option 2' },
                  { value: '3', text: currentQuestion?.option3Text || 'Option 3' },
                  { value: '4', text: currentQuestion?.option4Text || 'Option 4' },
                  { value: '5', text: currentQuestion?.option5Text || 'Option 5' }
                ].map((option) => (
                  <div key={option.value} className="flex items-start space-x-4 p-6 border-2 border-neutralborder hover:border-primary transition-colors rounded-md cursor-pointer">
                    <RadioGroupItem value={option.value} id={`option-${option.value}`} className="mt-1" />
                    <Label htmlFor={`option-${option.value}`} className="font-paragraph text-lg text-foreground leading-relaxed cursor-pointer flex-1">
                      {option.text}
                    </Label>
                  </div>
                ))}
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
