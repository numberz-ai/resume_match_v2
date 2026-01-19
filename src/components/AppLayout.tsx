import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from './Sidebar';
import { AppRoutes } from '../routes';
import { useNavigation } from '../hooks';
import { AgenticAI } from './AgenticAI';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Mail, Bell, Bot } from 'lucide-react';

export function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAgenticAI, setShowAgenticAI] = useState(false);
  const { activeView, navigateToView, navigate, location } = useNavigation();

  return (
    <div className="flex min-h-screen bg-background overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar
        activeView={activeView}
        onViewChange={navigateToView}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-200 ${sidebarCollapsed ? 'ml-16' : 'ml-56'} min-w-0`}>
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-white border-b border-border px-6 py-3">
          <div className="flex items-center justify-end gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => navigate('/communication')}
            >
              <Mail className="size-5 text-muted-foreground" />
              <Badge className="absolute -top-1 -right-1 size-5 p-0 flex items-center justify-center bg-primary text-white border-2 border-white text-xs">
                2
              </Badge>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => navigate('/notifications')}
            >
              <Bell className="size-5 text-muted-foreground" />
              <Badge className="absolute -top-1 -right-1 size-5 flex items-center justify-center p-0 bg-destructive text-white text-xs border-2 border-white">
                3
              </Badge>
            </Button>
            <Button 
              onClick={() => setShowAgenticAI(true)}
              className="bg-primary hover:bg-primary/90 text-white"
              size="sm"
            >
              <Bot className="size-4 mr-2" />
              AI assistant
            </Button>
          </div>
        </div>

        {/* Page Content with Animation */}
        <div className="min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
            >
              <AppRoutes />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Agentic AI Assistant */}
      {showAgenticAI && (
        <AgenticAI onClose={() => setShowAgenticAI(false)} />
      )}
    </div>
  );
}