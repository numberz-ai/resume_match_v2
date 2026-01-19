import { useState, useRef, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  X, Sparkles, Send, Zap, Target, Users, 
  Calendar, Search, FileText, BarChart3, 
  MessageSquare, ChevronRight, Lightbulb,
  CheckCircle, Play, BookOpen, TrendingUp,
  Settings, Building2, Bot, Wand2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AgenticAIProps {
  onClose: () => void;
}

export function AgenticAI({ onClose }: AgenticAIProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [userMessage, setUserMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      type: 'ai',
      message: "👋 Hi! I'm your AI recruitment assistant. I can help you navigate the platform, automate tasks, and provide insights. What would you like to do?",
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const quickActions = [
    { 
      icon: Target, 
      label: 'Find Best Candidates', 
      color: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
      action: 'search'
    },
    { 
      icon: FileText, 
      label: 'Create Job Post', 
      color: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
      action: 'create'
    },
    { 
      icon: Calendar, 
      label: 'Schedule Interviews', 
      color: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200',
      action: 'schedule'
    },
    { 
      icon: BarChart3, 
      label: 'View Analytics', 
      color: 'bg-amber-100 text-amber-700 hover:bg-amber-200',
      action: 'analytics'
    },
    { 
      icon: Wand2, 
      label: 'AI Auto-Match', 
      color: 'bg-pink-100 text-pink-700 hover:bg-pink-200',
      action: 'automatch'
    },
    { 
      icon: Users, 
      label: 'Team Management', 
      color: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200',
      action: 'team'
    }
  ];

  const walkthroughSteps = [
    {
      title: 'Welcome to RecruiX',
      description: 'Your AI-powered recruitment platform. Let me show you around!',
      actions: ['Start Tour', 'Skip']
    },
    {
      title: 'Post a Job',
      description: 'Create compelling job descriptions with AI assistance. I can auto-generate JDs from templates.',
      actions: ['Try It', 'Next']
    },
    {
      title: 'AI Matching',
      description: 'Our AI automatically matches candidates to jobs based on skills, experience, and cultural fit.',
      actions: ['See Matches', 'Next']
    },
    {
      title: 'Interview Pipeline',
      description: 'Manage the complete interview process with automated scheduling and feedback collection.',
      actions: ['View Pipeline', 'Next']
    },
    {
      title: 'Analytics Dashboard',
      description: 'Track hiring metrics, team performance, and get AI-powered insights.',
      actions: ['Open Dashboard', 'Finish']
    }
  ];

  const handleQuickAction = (action: string) => {
    const responses: { [key: string]: string } = {
      search: "🔍 I'll help you find the best candidates. I'm analyzing your open positions and candidate pool...\n\n✅ Found 12 high-match candidates for 'Senior ML Engineer'\n✅ 8 candidates ready for immediate interview\n✅ 3 candidates with 90%+ match score\n\nWould you like me to:\n1. Send automated outreach messages\n2. Schedule screening interviews\n3. Generate comparison reports",
      create: "📝 Let's create a new job post! I can:\n\n1. Generate JD from templates\n2. Write compelling job descriptions\n3. Auto-suggest requirements based on similar roles\n4. Optimize for ATS and SEO\n\nWhich position would you like to create?",
      schedule: "📅 I can schedule interviews automatically! I'll:\n\n1. Check interviewer availability\n2. Find optimal time slots\n3. Send calendar invites\n4. Set up video links\n5. Send prep materials\n\nWhich candidates would you like to schedule?",
      analytics: "📊 Here's your recruitment analytics:\n\n• Time to hire: 18 days (↓ 22% from last month)\n• Offer acceptance: 87% (↑ 15%)\n• Pipeline velocity: 3.2 days/stage\n• Top source: LinkedIn (42% of hires)\n\nWould you like deeper insights?",
      automatch: "🎯 AI Auto-Match activated! I'm:\n\n1. Scanning 1,247 candidates\n2. Analyzing skills & experience\n3. Checking cultural fit\n4. Calculating match scores\n\n✨ Found 23 excellent matches! Would you like me to prioritize them?",
      team: "👥 Team Management Dashboard:\n\n• 5 active recruiters\n• 12 hiring managers\n• 8 interviewers\n\nI can help with:\n- Role assignments\n- Workload balancing\n- Performance tracking"
    };

    setChatMessages(prev => [
      ...prev,
      { type: 'user', message: quickActions.find(a => a.action === action)?.label || '', timestamp: new Date() },
      { type: 'ai', message: responses[action], timestamp: new Date() }
    ]);
  };

  const handleSendMessage = () => {
    if (!userMessage.trim()) return;

    setChatMessages(prev => [
      ...prev,
      { type: 'user', message: userMessage, timestamp: new Date() }
    ]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = "I understand you want help with that. Let me assist you...\n\nI can:\n1. Walk you through the process step-by-step\n2. Automate this task for you\n3. Provide relevant examples\n\nWhich would you prefer?";
      
      setChatMessages(prev => [
        ...prev,
        { type: 'ai', message: aiResponse, timestamp: new Date() }
      ]);
    }, 1000);

    setUserMessage('');
  };

  const handleWalkthroughAction = (action: string) => {
    if (action === 'Skip' || action === 'Finish') {
      setCurrentStep(0);
    } else if (action === 'Next') {
      setCurrentStep(prev => Math.min(prev + 1, walkthroughSteps.length - 1));
    } else {
      // Simulate action
      setChatMessages(prev => [
        ...prev,
        { 
          type: 'ai', 
          message: `Great! I'm taking you to ${walkthroughSteps[currentStep].title}. Let me guide you through it...`, 
          timestamp: new Date() 
        }
      ]);
      setCurrentStep(prev => Math.min(prev + 1, walkthroughSteps.length - 1));
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 bg-black/40 z-50"
            onClick={() => {
              setIsOpen(false);
              setTimeout(onClose, 200);
            }}
          />
          
          {/* Sidebar Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
            className="fixed right-0 top-0 h-screen w-full max-w-2xl bg-white shadow-2xl z-50 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="size-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
                    <Bot className="size-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-gray-900 mb-1">AI Assistant</h2>
                    <div className="flex items-center gap-2">
                      <div className="size-2 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-sm text-gray-600">Online</span>
                    </div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleClose}
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  <X className="size-5" />
                </Button>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-3 gap-2">
                {quickActions.map((action, idx) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={idx}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction(action.action)}
                      className="flex flex-col h-auto py-3 gap-1 hover:bg-blue-50 hover:border-blue-300"
                    >
                      <Icon className="size-5 text-gray-700" />
                      <span className="text-xs text-gray-600">{action.label.split(' ')[0]}</span>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
              {chatMessages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${msg.type === 'user' ? 'order-2' : 'order-1'}`}>
                    {msg.type === 'ai' && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className="size-7 bg-blue-500 rounded-lg flex items-center justify-center shadow-sm">
                          <Sparkles className="size-4 text-white" />
                        </div>
                        <span className="text-xs text-gray-600">AI Assistant</span>
                      </div>
                    )}
                    <Card className={`p-4 shadow-sm ${
                      msg.type === 'user' 
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : 'bg-white border-gray-200'
                    }`}>
                      <p className={`text-sm leading-relaxed whitespace-pre-line ${
                        msg.type === 'user' ? 'text-white' : 'text-gray-700'
                      }`}>
                        {msg.message}
                      </p>
                    </Card>
                    <p className={`text-xs text-gray-500 mt-1 ${
                      msg.type === 'user' ? 'text-right' : 'text-left'
                    }`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Walkthrough Card */}
              {currentStep < walkthroughSteps.length && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Card className="p-5 bg-purple-50 border-2 border-purple-300">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="size-10 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Play className="size-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-gray-900 mb-1">{walkthroughSteps[currentStep].title}</h4>
                        <p className="text-sm text-gray-700">{walkthroughSteps[currentStep].description}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {walkthroughSteps[currentStep].actions.map((action, idx) => (
                        <Button
                          key={idx}
                          size="sm"
                          variant={idx === 0 ? 'default' : 'outline'}
                          onClick={() => handleWalkthroughAction(action)}
                          className={idx === 0 ? 'bg-purple-600 hover:bg-purple-700' : ''}
                        >
                          {action}
                          {idx === 0 && <ChevronRight className="size-4 ml-1" />}
                        </Button>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 mt-4">
                      {walkthroughSteps.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-1.5 flex-1 rounded-full transition-colors ${
                            idx === currentStep ? 'bg-purple-600' : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Suggested Prompts */}
              <Card className="p-4 bg-amber-50 border-2 border-amber-200">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="size-4 text-amber-600" />
                  <h4 className="text-sm text-gray-900">Try asking me:</h4>
                </div>
                <div className="space-y-2">
                  {[
                    "Show me top candidates for Senior ML Engineer",
                    "Schedule interviews for next week",
                    "Generate a job description for Product Manager",
                    "What's our average time to hire?",
                    "Send outreach to candidates with 90%+ match"
                  ].map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setUserMessage(prompt)}
                      className="w-full text-left p-2 bg-white hover:bg-amber-100 rounded-lg border border-amber-200 text-sm text-gray-700 transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </Card>

              {/* Capabilities */}
              <Card className="p-4 bg-white border-2 border-gray-200">
                <h4 className="text-sm text-gray-900 mb-3">What I Can Do:</h4>
                <div className="space-y-2">
                  {[
                    { icon: Search, text: 'Smart candidate search & filtering' },
                    { icon: Zap, text: 'Automate repetitive tasks' },
                    { icon: MessageSquare, text: 'Generate outreach messages' },
                    { icon: Calendar, text: 'Schedule interviews automatically' },
                    { icon: BarChart3, text: 'Provide analytics insights' },
                    { icon: FileText, text: 'Create job descriptions' }
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="size-4 text-emerald-600 flex-shrink-0" />
                        <Icon className="size-4 text-gray-500 flex-shrink-0" />
                        <span>{item.text}</span>
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Scroll anchor */}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t bg-white">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask me anything or describe what you need..."
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="size-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                AI assistant powered by advanced ML models • Always learning
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}