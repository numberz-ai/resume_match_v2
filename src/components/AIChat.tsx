import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Send, Bot, User } from 'lucide-react';

interface AIChatProps {
  candidateId: string;
  candidateName: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function AIChat({ candidateId, candidateName }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hi! I'm your AI recruitment assistant. I can help you with insights about ${candidateName}. Feel free to ask me anything about their qualifications, experience, training needs, or fit for specific roles.`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestedQuestions = [
    'What are the biggest strengths of this candidate?',
    'How much training would they need?',
    'Are there any concerns I should be aware of?',
    'How does this candidate compare to our top performers?',
    'What makes this candidate unique?',
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const generateAIResponse = (question: string): string => {
    const q = question.toLowerCase();
    
    if (q.includes('strength') || q.includes('best')) {
      return `${candidateName}'s top strengths include:\n\n1. **Ph.D. in Computer Science** - Brings deep research expertise and can contribute to advanced ML initiatives\n2. **Strong Publication Record** - 15+ papers in top-tier conferences demonstrate thought leadership\n3. **Production ML Experience** - 8 years building scalable ML systems, not just research\n4. **Open Source Contributions** - Active contributor with respected projects (5k+ GitHub stars)\n5. **Leadership Potential** - Has mentored junior engineers and shows strong communication skills\n\nThese strengths make them an exceptional candidate who can both execute on technical work and elevate the team's capabilities.`;
    }
    
    if (q.includes('training') || q.includes('ramp') || q.includes('onboard')) {
      return `Based on my analysis, ${candidateName} would need minimal training:\n\n**Estimated Ramp-up Time: 6-8 weeks**\n\n**What they need to learn:**\n- Internal ML platform and tools (2 weeks)\n- Product domain knowledge (3 weeks)\n- Team workflows and processes (1 week)\n\n**What they already excel at:**\n- Core ML/AI technical skills (exceeds requirements)\n- Research and experimentation\n- Production system development\n\n**Recommendation:** Their technical foundation is excellent. Focus onboarding on company-specific tools and domain knowledge. They could contribute to research initiatives immediately while ramping up on product systems.`;
    }
    
    if (q.includes('concern') || q.includes('weakness') || q.includes('risk')) {
      return `I've analyzed potential concerns and here's what I found:\n\n**Minimal Concerns Detected:**\n\n1. **Product Focus** - Coming from research background, may need guidance on balancing research quality with product shipping timelines. *Mitigation: Pair with product-focused mentor initially.*\n\n2. **Company-Specific Tools** - No experience with our internal platform. *Low risk: They've shown ability to quickly learn new tools in past roles.*\n\n**No Concerns About:**\n- Technical skills (exceeds requirements)\n- Cultural fit (strong indicators)\n- Work authorization\n- Background check flags\n\nOverall risk assessment: **Low**. This is a high-quality candidate with strong fundamentals.`;
    }
    
    if (q.includes('compare') || q.includes('top performer')) {
      return `Comparing ${candidateName} to your top ML engineers:\n\n**Technical Depth: ★★★★★**\nMatches or exceeds your best ML engineers. Ph.D. and research background bring unique expertise.\n\n**Experience Level: ★★★★☆**\n8 years is solid mid-senior level. Some top performers have 10+ years, but quality of experience is exceptional.\n\n**Leadership: ★★★★☆**\nShows strong potential. Has mentorship experience but hasn't been formal people manager yet.\n\n**Innovation: ★★★★★**\nPublications and open source work indicate strong innovation capabilities, potentially exceeding current team.\n\n**Summary:** This candidate would likely be in your top 20% of ML engineers and has potential to reach top 10% within a year.`;
    }
    
    if (q.includes('unique') || q.includes('stand out') || q.includes('different')) {
      return `What makes ${candidateName} unique:\n\n🎓 **Rare Combination:** Ph.D. research expertise + 8 years production engineering. Most candidates are either research-focused OR product-focused, not both.\n\n📚 **Thought Leadership:** Active publications, blog posts, and conference talks. Can represent company in technical community.\n\n🌟 **Open Source Impact:** Meaningful contributions to major frameworks. Shows ability to work in public, collaborate globally.\n\n🔬 **Research to Production:** Track record of taking research ideas and deploying them to production at scale.\n\n💡 **Future Potential:** Strong indicators for technical leadership roles. Could grow into Staff Engineer or Research Lead.\n\nThis combination is rare in the market and valuable for companies wanting to stay at cutting edge of ML.`;
    }
    
    return `That's a great question about ${candidateName}. Based on my analysis of their profile, experience, and skills, I can provide detailed insights. Could you be more specific about what aspect you'd like to know more about? For example:\n\n- Technical capabilities and skills\n- Cultural and team fit\n- Training and onboarding needs\n- Career growth potential\n- Specific role suitability\n\nFeel free to ask anything!`;
  };

  const handleSuggestionClick = (question: string) => {
    setInput(question);
  };

  return (
    <Card className="p-6 flex flex-col h-[600px]">
      <div className="flex items-center gap-2 mb-4">
        <Bot className="size-5 text-blue-600" />
        <h3 className="text-gray-900">AI Assistant</h3>
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSuggestionClick(question)}
                className="text-xs"
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <Avatar className="size-8">
                <AvatarFallback className="bg-blue-100">
                  <Bot className="size-4 text-blue-600" />
                </AvatarFallback>
              </Avatar>
            )}
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm whitespace-pre-line">{message.content}</p>
            </div>
            {message.role === 'user' && (
              <Avatar className="size-8">
                <AvatarFallback className="bg-gray-200">
                  <User className="size-4 text-gray-600" />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3">
            <Avatar className="size-8">
              <AvatarFallback className="bg-blue-100">
                <Bot className="size-4 text-blue-600" />
              </AvatarFallback>
            </Avatar>
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex gap-1">
                <div className="size-2 bg-gray-400 rounded-full animate-bounce animate-delay-0" />
                <div className="size-2 bg-gray-400 rounded-full animate-bounce animate-delay-150" />
                <div className="size-2 bg-gray-400 rounded-full animate-bounce animate-delay-300" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <Input
          placeholder="Ask me anything about this candidate..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button onClick={handleSend} disabled={!input.trim()}>
          <Send className="size-4" />
        </Button>
      </div>
    </Card>
  );
}