import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
}

interface OlympiadQuizProps {
  subject: string;
  grade: string;
  onComplete: (score: number, totalQuestions: number) => void;
  onClose: () => void;
}

const sampleQuestions: Record<string, Question[]> = {
  'math': [
    {
      id: 1,
      question: "Чему равно 15 + 27?",
      options: ["42", "41", "43", "40"],
      correctAnswer: 0,
      points: 10
    },
    {
      id: 2,
      question: "Какое число больше: 125 или 152?",
      options: ["125", "152", "Они равны", "Нельзя определить"],
      correctAnswer: 1,
      points: 10
    },
    {
      id: 3,
      question: "Сколько минут в двух часах?",
      options: ["100", "120", "110", "130"],
      correctAnswer: 1,
      points: 15
    },
    {
      id: 4,
      question: "У Маши было 20 яблок. Она съела 7 и подарила другу 5. Сколько яблок у неё осталось?",
      options: ["8", "9", "7", "10"],
      correctAnswer: 0,
      points: 15
    },
    {
      id: 5,
      question: "Какая фигура имеет 3 угла?",
      options: ["Квадрат", "Треугольник", "Круг", "Прямоугольник"],
      correctAnswer: 1,
      points: 10
    }
  ],
  'russian': [
    {
      id: 1,
      question: "Какое слово написано правильно?",
      options: ["Собака", "Сабака", "Собока", "Сабока"],
      correctAnswer: 0,
      points: 10
    },
    {
      id: 2,
      question: "Сколько букв в слове 'школа'?",
      options: ["4", "5", "6", "7"],
      correctAnswer: 1,
      points: 10
    },
    {
      id: 3,
      question: "Какой знак ставится в конце вопросительного предложения?",
      options: ["Точка", "Восклицательный знак", "Вопросительный знак", "Запятая"],
      correctAnswer: 2,
      points: 10
    },
    {
      id: 4,
      question: "Выберите слово, которое отвечает на вопрос 'что делает?'",
      options: ["Красивый", "Бежит", "Дом", "Быстро"],
      correctAnswer: 1,
      points: 15
    },
    {
      id: 5,
      question: "Сколько слогов в слове 'математика'?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 2,
      points: 15
    }
  ],
  'logic': [
    {
      id: 1,
      question: "Продолжите последовательность: 2, 4, 6, 8, ?",
      options: ["9", "10", "11", "12"],
      correctAnswer: 1,
      points: 15
    },
    {
      id: 2,
      question: "Что лишнее в группе: яблоко, груша, морковь, банан?",
      options: ["Яблоко", "Груша", "Морковь", "Банан"],
      correctAnswer: 2,
      points: 15
    },
    {
      id: 3,
      question: "Если все кошки - животные, а Мурка - кошка, то Мурка это:",
      options: ["Растение", "Животное", "Птица", "Рыба"],
      correctAnswer: 1,
      points: 20
    },
    {
      id: 4,
      question: "Какая фигура получится, если сложить квадрат пополам?",
      options: ["Треугольник", "Прямоугольник", "Круг", "Ромб"],
      correctAnswer: 1,
      points: 10
    },
    {
      id: 5,
      question: "У Пети больше конфет, чем у Маши. У Маши больше конфет, чем у Коли. У кого больше всего конфет?",
      options: ["У Пети", "У Маши", "У Коли", "Поровну"],
      correctAnswer: 0,
      points: 20
    }
  ]
};

const OlympiadQuiz: React.FC<OlympiadQuizProps> = ({ subject, grade, onComplete, onClose }) => {
  const [questions] = useState<Question[]>(sampleQuestions[subject] || sampleQuestions['math']);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [timeLeft, setTimeLeft] = useState(1800); // 30 минут
  const [isCompleted, setIsCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (timeLeft > 0 && !isCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isCompleted) {
      handleComplete();
    }
  }, [timeLeft, isCompleted]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let totalScore = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        totalScore += question.points;
      }
    });
    return totalScore;
  };

  const handleComplete = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setIsCompleted(true);
    setShowResults(true);
    onComplete(finalScore, questions.length);
  };

  const getGrade = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return { text: 'Отлично!', color: 'bg-green-500', certificate: 'Диплом I степени' };
    if (percentage >= 70) return { text: 'Хорошо!', color: 'bg-blue-500', certificate: 'Диплом II степени' };
    if (percentage >= 50) return { text: 'Удовлетворительно', color: 'bg-yellow-500', certificate: 'Диплом III степени' };
    return { text: 'Нужно подтянуть знания', color: 'bg-gray-500', certificate: 'Диплом участника' };
  };

  const maxScore = questions.reduce((sum, q) => sum + q.points, 0);
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const gradeInfo = getGrade(score, maxScore);

  if (showResults) {
    return (
      <Dialog open={showResults} onOpenChange={() => setShowResults(false)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-heading">
              <Icon name="Trophy" className="mx-auto mb-4 text-primary" size={48} />
              Олимпиада завершена!
            </DialogTitle>
            <DialogDescription className="text-center text-lg">
              {subject === 'math' ? 'Математика' : subject === 'russian' ? 'Русский язык' : 'Логика'} • {grade}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="text-center">
              <div className={`inline-flex items-center px-6 py-3 rounded-full text-white font-bold text-xl ${gradeInfo.color}`}>
                <Icon name="Star" className="mr-2" size={24} />
                {gradeInfo.text}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary">{score}</div>
                  <div className="text-gray-600">из {maxScore} баллов</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary">
                    {Math.round((score / maxScore) * 100)}%
                  </div>
                  <div className="text-gray-600">правильных ответов</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-center font-heading">
                  <Icon name="Award" className="mx-auto mb-2 text-primary" size={32} />
                  {gradeInfo.certificate}
                </CardTitle>
                <CardDescription className="text-center">
                  Поздравляем с успешным завершением олимпиады!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Время прохождения:</span>
                    <span className="font-semibold">{formatTime(1800 - timeLeft)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Правильных ответов:</span>
                    <span className="font-semibold">
                      {selectedAnswers.filter((answer, index) => answer === questions[index].correctAnswer).length} из {questions.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Сертификат:</span>
                    <Badge variant="outline">{gradeInfo.certificate}</Badge>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <Button className="flex-1" onClick={() => {
                    setShowResults(false);
                    onClose();
                  }}>
                    <Icon name="Download" className="mr-2" size={20} />
                    Скачать диплом
                  </Button>
                  <Button variant="outline" onClick={onClose}>
                    Завершить
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="font-heading">
                {subject === 'math' ? 'Математика' : subject === 'russian' ? 'Русский язык' : 'Логика'}
              </CardTitle>
              <CardDescription>{grade} • Вопрос {currentQuestion + 1} из {questions.length}</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{formatTime(timeLeft)}</div>
              <div className="text-sm text-gray-600">времени осталось</div>
            </div>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl">
            {questions[currentQuestion].question}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Icon name="Star" className="text-primary" size={16} />
            <span className="text-sm text-gray-600">
              {questions[currentQuestion].points} баллов
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left border rounded-lg transition-all hover:shadow-md ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-primary bg-primary/10 text-primary font-semibold'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-primary bg-primary text-white'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswers[currentQuestion] === index && (
                      <Icon name="Check" size={14} />
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          <Icon name="ChevronLeft" className="mr-2" size={20} />
          Назад
        </Button>

        <div className="flex space-x-2">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`w-8 h-8 rounded-full text-sm font-semibold transition-colors ${
                index === currentQuestion
                  ? 'bg-primary text-white'
                  : selectedAnswers[index] !== -1
                  ? 'bg-green-200 text-green-800'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {currentQuestion === questions.length - 1 ? (
          <Button
            onClick={handleComplete}
            disabled={selectedAnswers[currentQuestion] === -1}
            className="bg-green-600 hover:bg-green-700"
          >
            Завершить олимпиаду
            <Icon name="CheckCircle" className="ml-2" size={20} />
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === -1}
          >
            Далее
            <Icon name="ChevronRight" className="ml-2" size={20} />
          </Button>
        )}
      </div>

      <div className="mt-6 text-center">
        <Button variant="ghost" onClick={onClose} className="text-gray-500">
          <Icon name="X" className="mr-2" size={16} />
          Выйти из олимпиады
        </Button>
      </div>
    </div>
  );
};

export default OlympiadQuiz;