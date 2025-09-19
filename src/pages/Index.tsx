import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import OlympiadQuiz from '@/components/OlympiadQuiz';

const subjects = [
  { id: 'math', name: 'Математика', icon: 'Calculator' },
  { id: 'russian', name: 'Русский язык', icon: 'BookOpen' },
  { id: 'english', name: 'Английский язык', icon: 'Globe' },
  { id: 'reading', name: 'Чтение', icon: 'Book' },
  { id: 'pdd', name: 'ПДД', icon: 'Car' },
  { id: 'informatics', name: 'Информатика', icon: 'Monitor' },
  { id: 'logic', name: 'Логика', icon: 'Brain' },
  { id: 'environment', name: 'Окружающий мир', icon: 'Leaf' },
  { id: 'meta', name: 'Метапредметная', icon: 'Network' }
];

const grades = [
  { id: 'preschool', name: 'Дошкольная группа', color: 'bg-pink-100 text-pink-800' },
  { id: 'grade1', name: '1 класс', color: 'bg-blue-100 text-blue-800' },
  { id: 'grade2', name: '2 класс', color: 'bg-green-100 text-green-800' },
  { id: 'grade3', name: '3 класс', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'grade4', name: '4 класс', color: 'bg-purple-100 text-purple-800' }
];

const mockResults = [
  { name: 'Анна Иванова', grade: '3 класс', subject: 'Математика', score: 95, place: 1 },
  { name: 'Петр Смирнов', grade: '3 класс', subject: 'Математика', score: 92, place: 2 },
  { name: 'Мария Козлова', grade: '3 класс', subject: 'Математика', score: 89, place: 3 },
  { name: 'Елена Петрова', grade: '4 класс', subject: 'Русский язык', score: 98, place: 1 },
  { name: 'Сергей Волков', grade: '2 класс', subject: 'Логика', score: 87, place: 1 }
];

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    grade: '',
    teacherName: '',
    teacherEmail: ''
  });
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuizSubject, setCurrentQuizSubject] = useState('');
  const [currentQuizGrade, setCurrentQuizGrade] = useState('');

  const handleLogin = () => {
    setCurrentUser({
      name: 'Анна Иванова',
      email: loginForm.email,
      grade: '3 класс',
      results: [
        { subject: 'Математика', score: 95, place: 1, certificate: 'Диплом I степени' },
        { subject: 'Русский язык', score: 88, place: 5, certificate: 'Диплом участника' }
      ]
    });
    setIsLoggedIn(true);
  };

  const handleRegister = () => {
    setCurrentUser({
      name: registerForm.name,
      email: registerForm.email,
      grade: registerForm.grade,
      results: []
    });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setActiveTab('home');
  };

  const startOlympiad = (subjectId: string, gradeName: string) => {
    setCurrentQuizSubject(subjectId);
    setCurrentQuizGrade(gradeName);
    setShowQuiz(true);
  };

  const handleQuizComplete = (score: number, totalQuestions: number) => {
    const newResult = {
      subject: subjects.find(s => s.id === currentQuizSubject)?.name || currentQuizSubject,
      score: score,
      place: Math.floor(Math.random() * 10) + 1,
      certificate: score >= 45 ? 'Диплом I степени' : score >= 35 ? 'Диплом II степени' : 'Диплом участника'
    };
    
    setCurrentUser({
      ...currentUser,
      results: [...(currentUser?.results || []), newResult]
    });
    
    setShowQuiz(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Trophy" className="text-white" size={24} />
                </div>
                <h1 className="text-2xl font-heading font-bold text-gray-900">За скобками</h1>
              </div>
              <div className="flex space-x-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Войти</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Вход в личный кабинет</DialogTitle>
                      <DialogDescription>
                        Введите ваш email и пароль для входа
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={loginForm.email}
                          onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="password">Пароль</Label>
                        <Input
                          id="password"
                          type="password"
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                        />
                      </div>
                      <Button onClick={handleLogin} className="w-full">
                        Войти
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Регистрация</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Регистрация участника</DialogTitle>
                      <DialogDescription>
                        Заполните форму для участия в олимпиадах
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">ФИО ученика</Label>
                        <Input
                          id="name"
                          value={registerForm.name}
                          onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                          placeholder="Иванов Иван Иванович"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email-reg">Email</Label>
                        <Input
                          id="email-reg"
                          type="email"
                          value={registerForm.email}
                          onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="grade">Класс</Label>
                        <Select onValueChange={(value) => setRegisterForm({...registerForm, grade: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите класс" />
                          </SelectTrigger>
                          <SelectContent>
                            {grades.map((grade) => (
                              <SelectItem key={grade.id} value={grade.name}>
                                {grade.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="teacher-name">ФИО педагога-куратора</Label>
                        <Input
                          id="teacher-name"
                          value={registerForm.teacherName}
                          onChange={(e) => setRegisterForm({...registerForm, teacherName: e.target.value})}
                          placeholder="Петрова Елена Сергеевна"
                        />
                      </div>
                      <div>
                        <Label htmlFor="teacher-email">Email педагога</Label>
                        <Input
                          id="teacher-email"
                          type="email"
                          value={registerForm.teacherEmail}
                          onChange={(e) => setRegisterForm({...registerForm, teacherEmail: e.target.value})}
                          placeholder="teacher@school.ru"
                        />
                      </div>
                      <div>
                        <Label htmlFor="password-reg">Пароль</Label>
                        <Input
                          id="password-reg"
                          type="password"
                          value={registerForm.password}
                          onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                        />
                      </div>
                      <Button onClick={handleRegister} className="w-full">
                        Зарегистрироваться
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-5xl font-heading font-bold text-gray-900 leading-tight mb-6">
                  Открой мир знаний с олимпиадами 
                  <span className="text-primary"> "За скобками"</span>
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Участвуй в образовательных олимпиадах, развивай свои способности и получай заслуженные награды. 
                  Автоматическая выдача сертификатов и дипломов для участников и педагогов.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="lg" className="font-heading font-semibold">
                        Начать участие
                        <Icon name="ArrowRight" className="ml-2" size={20} />
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                  <Button variant="outline" size="lg" className="font-heading font-semibold">
                    Узнать больше
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="/img/fa3f97b2-0f71-4456-8a25-1551eafe2364.jpg"
                  alt="Образовательные олимпиады"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Олимпиады по классам */}
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-heading font-bold text-gray-900 mb-4">
                Олимпиады по классам
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Выберите подходящую возрастную категорию и предмет для участия в олимпиаде
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {grades.map((grade) => (
                <Card key={grade.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-heading">{grade.name}</CardTitle>
                      <Badge className={grade.color}>{grade.name}</Badge>
                    </div>
                    <CardDescription>
                      Олимпиады для учащихся {grade.name.toLowerCase()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                      {subjects.slice(0, 6).map((subject) => (
                        <div key={subject.id} className="flex flex-col items-center p-2 rounded-lg bg-gray-50 group-hover:bg-primary/10 transition-colors">
                          <Icon name={subject.icon as any} size={20} className="text-primary mb-1" />
                          <span className="text-xs text-center">{subject.name}</span>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      Выбрать олимпиады
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Результаты олимпиад */}
        <div className="py-20 bg-gradient-to-br from-orange-50 to-yellow-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-heading font-bold text-gray-900 mb-4">
                Результаты олимпиад
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Победители и призеры последних олимпиад
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Таблица лидеров</CardTitle>
                <CardDescription>Лучшие результаты участников</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockResults.map((result, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                          result.place === 1 ? 'bg-yellow-500' : 
                          result.place === 2 ? 'bg-gray-400' : 
                          result.place === 3 ? 'bg-orange-600' : 'bg-gray-300'
                        }`}>
                          {result.place}
                        </div>
                        <div>
                          <p className="font-semibold">{result.name}</p>
                          <p className="text-sm text-gray-600">{result.grade} • {result.subject}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{result.score} баллов</p>
                        <Badge variant="outline">
                          {result.place === 1 ? 'Победитель' : 
                           result.place <= 3 ? 'Призер' : 'Участник'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* О проекте */}
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-4xl font-heading font-bold text-gray-900 mb-6">
                  О проекте "За скобками"
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  Образовательный проект "За скобками" создан для развития интеллектуальных способностей детей 
                  через систему онлайн-олимпиад по различным предметам.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="CheckCircle" className="text-primary mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold">Автоматические сертификаты</h4>
                      <p className="text-gray-600">Мгновенная выдача дипломов участникам и благодарственных писем педагогам</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon name="CheckCircle" className="text-primary mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold">Разнообразие предметов</h4>
                      <p className="text-gray-600">9 различных предметов от математики до правил дорожного движения</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon name="CheckCircle" className="text-primary mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold">Возрастные категории</h4>
                      <p className="text-gray-600">От дошкольной группы до 4 класса включительно</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Card className="text-center p-6">
                    <Icon name="Users" className="mx-auto text-primary mb-2" size={32} />
                    <h4 className="font-bold text-2xl">5000+</h4>
                    <p className="text-gray-600">Участников</p>
                  </Card>
                  <Card className="text-center p-6">
                    <Icon name="Award" className="mx-auto text-primary mb-2" size={32} />
                    <h4 className="font-bold text-2xl">1200+</h4>
                    <p className="text-gray-600">Сертификатов выдано</p>
                  </Card>
                </div>
                <div className="space-y-4 mt-8">
                  <Card className="text-center p-6">
                    <Icon name="BookOpen" className="mx-auto text-primary mb-2" size={32} />
                    <h4 className="font-bold text-2xl">9</h4>
                    <p className="text-gray-600">Предметов</p>
                  </Card>
                  <Card className="text-center p-6">
                    <Icon name="School" className="mx-auto text-primary mb-2" size={32} />
                    <h4 className="font-bold text-2xl">150+</h4>
                    <p className="text-gray-600">Школ-партнеров</p>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="Trophy" className="text-white" size={20} />
                  </div>
                  <h4 className="text-lg font-heading font-bold">За скобками</h4>
                </div>
                <p className="text-gray-400">
                  Образовательные олимпиады для развития потенциала каждого ребенка
                </p>
              </div>
              <div>
                <h5 className="font-semibold mb-4">Олимпиады</h5>
                <ul className="space-y-2 text-gray-400">
                  <li>Математика</li>
                  <li>Русский язык</li>
                  <li>Английский язык</li>
                  <li>Логика</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-4">Информация</h5>
                <ul className="space-y-2 text-gray-400">
                  <li>О проекте</li>
                  <li>Правила участия</li>
                  <li>FAQ</li>
                  <li>Контакты</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-4">Контакты</h5>
                <div className="space-y-2 text-gray-400">
                  <p>info@zaskobkami.ru</p>
                  <p>+7 (800) 123-45-67</p>
                  <div className="flex space-x-4 mt-4">
                    <Icon name="Mail" size={20} />
                    <Icon name="Phone" size={20} />
                    <Icon name="MessageCircle" size={20} />
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 За скобками. Все права защищены.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Header для залогиненных пользователей */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Trophy" className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-heading font-bold text-gray-900">За скобками</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Добро пожаловать, {currentUser?.name}</span>
              <Button variant="outline" onClick={handleLogout}>
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Навигация */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="home">Олимпиады</TabsTrigger>
              <TabsTrigger value="profile">Профиль</TabsTrigger>
              <TabsTrigger value="results">Мои результаты</TabsTrigger>
              <TabsTrigger value="certificates">Сертификаты</TabsTrigger>
            </TabsList>

            <TabsContent value="home" className="py-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {grades.map((grade) => (
                  <Card key={grade.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="font-heading">{grade.name}</CardTitle>
                        <Badge className={grade.color}>{grade.name}</Badge>
                      </div>
                      <CardDescription>
                        Доступные олимпиады для {grade.name.toLowerCase()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {subjects.slice(0, 6).map((subject) => (
                          <div 
                            key={subject.id} 
                            className="flex flex-col items-center p-2 rounded-lg bg-gray-50 hover:bg-primary/10 transition-colors cursor-pointer"
                            onClick={() => startOlympiad(subject.id, grade.name)}
                          >
                            <Icon name={subject.icon as any} size={20} className="text-primary mb-1" />
                            <span className="text-xs text-center">{subject.name}</span>
                          </div>
                        ))}
                      </div>
                      <Button 
                        className="w-full"
                        onClick={() => startOlympiad('math', grade.name)}
                      >
                        Участвовать
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="profile" className="py-8">
              <Card className="max-w-2xl">
                <CardHeader>
                  <CardTitle className="font-heading">Профиль участника</CardTitle>
                  <CardDescription>Ваша личная информация</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>ФИО</Label>
                      <Input value={currentUser?.name} disabled />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input value={currentUser?.email} disabled />
                    </div>
                    <div>
                      <Label>Класс</Label>
                      <Input value={currentUser?.grade} disabled />
                    </div>
                    <div>
                      <Label>Дата регистрации</Label>
                      <Input value="15 сентября 2024" disabled />
                    </div>
                  </div>
                  <Button variant="outline">
                    Редактировать профиль
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="results" className="py-8">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">Мои результаты</CardTitle>
                  <CardDescription>История участия в олимпиадах</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentUser?.results?.map((result: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                            result.place === 1 ? 'bg-yellow-500' : 
                            result.place <= 3 ? 'bg-gray-400' : 'bg-gray-300'
                          }`}>
                            {result.place}
                          </div>
                          <div>
                            <p className="font-semibold">{result.subject}</p>
                            <p className="text-sm text-gray-600">{currentUser.grade}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">{result.score} баллов</p>
                          <Badge variant={result.place === 1 ? "default" : "outline"}>
                            {result.certificate}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="certificates" className="py-8">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading flex items-center">
                      <Icon name="Award" className="mr-2 text-primary" size={24} />
                      Дипломы участника
                    </CardTitle>
                    <CardDescription>Ваши заслуженные награды</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {currentUser?.results?.map((result: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-semibold">{result.certificate}</p>
                            <p className="text-sm text-gray-600">{result.subject}</p>
                          </div>
                          <Button size="sm" variant="outline">
                            <Icon name="Download" size={16} className="mr-1" />
                            Скачать
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading flex items-center">
                      <Icon name="Heart" className="mr-2 text-primary" size={24} />
                      Благодарственные письма
                    </CardTitle>
                    <CardDescription>Для педагогов-кураторов</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-semibold">Благодарственное письмо</p>
                          <p className="text-sm text-gray-600">За подготовку призера по математике</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Icon name="Download" size={16} className="mr-1" />
                          Скачать
                        </Button>
                      </div>
                      <div className="text-center py-4 text-gray-500">
                        <Icon name="FileText" size={32} className="mx-auto mb-2 opacity-50" />
                        <p>Новые письма появятся после участия в олимпиадах</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Компонент олимпиады */}
      {showQuiz && (
        <div className="fixed inset-0 bg-white z-50 overflow-auto">
          <OlympiadQuiz
            subject={currentQuizSubject}
            grade={currentQuizGrade}
            onComplete={handleQuizComplete}
            onClose={() => setShowQuiz(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Index;