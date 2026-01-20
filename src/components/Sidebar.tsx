import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Home, Users, Shield, Settings as SettingsIcon, ChevronLeft, ChevronRight, Brain, Calendar, BarChart3, Mail, Briefcase, TrendingUp } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Logo } from './Logo';

interface SidebarProps {
  activeView?: string;
  onViewChange?: (view: string) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  // Legacy props for backward compatibility
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export function Sidebar({ 
  activeView, 
  onViewChange, 
  collapsed, 
  onToggleCollapse,
  currentPage,
  onNavigate 
}: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine current page from either prop or location
  const getCurrentPage = () => {
    if (currentPage) return currentPage;
    if (activeView) return activeView;
    const path = location.pathname;
    if (path === '/' || path === '/dashboard') return 'dashboard';
    if (path.startsWith('/candidates')) return 'candidates';
    if (path.startsWith('/jobs')) return 'jobs';
    if (path.startsWith('/calendar')) return 'calendar';
    if (path.startsWith('/analytics')) return 'analytics';
    if (path.startsWith('/forecast')) return 'forecast';
    if (path.startsWith('/settings')) return 'settings';
    if (path.startsWith('/bias')) return 'bias';
    return 'dashboard';
  };

  const handleNavigation = (id: string) => {
    // Use legacy handler if provided
    if (onNavigate) {
      onNavigate(id);
      return;
    }
    
    // Use new handler if provided
    if (onViewChange) {
      onViewChange(id);
      return;
    }
    
    // Default to React Router navigation
    const routes: Record<string, string> = {
      dashboard: '/',
      candidates: '/candidates',
      jobs: '/jobs',
      calendar: '/calendar',
      analytics: '/analytics',
      forecast: '/forecast',
      settings: '/settings',
      bias: '/bias',
    };
    
    navigate(routes[id] || '/');
  };

  const current = getCurrentPage();
  
  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: Home },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'candidates', label: 'Candidates', icon: Users },
    { id: 'calendar', label: 'Interviews', icon: Calendar },
    { id: 'analytics', label: 'Talent Insights', icon: BarChart3 },
    { id: 'forecast', label: 'Forecast', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  const bottomNavItems = [
    { id: 'bias', label: 'Bias & Fairness', icon: Shield },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen bg-white border-r border-border transition-all duration-200 z-40 w-56">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="px-4 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Logo size={32} className="flex-shrink-0" />
            <div>
              <h1 className="text-base font-medium text-foreground">RecruiX</h1>
              <p className="text-xs text-muted-foreground">Powered by Ensylon</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = current === item.id;
            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                className={`w-full justify-start gap-2 transition-all h-9 text-sm ${
                  isActive
                    ? 'bg-primary/10 text-primary hover:bg-primary/15'
                    : 'text-foreground hover:bg-muted'
                } px-3`}
                onClick={() => handleNavigation(item.id)}
              >
                <Icon className="size-4" />
                <span>{item.label}</span>
              </Button>
            );
          })}
        </nav>

        {/* Bottom Navigation */}
        <nav className="px-2 py-4 space-y-0.5 border-t border-border">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = current === item.id;
            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                className={`w-full justify-start gap-2 transition-all h-9 text-sm ${
                  isActive
                    ? 'bg-primary/10 text-primary hover:bg-primary/15'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                } px-3`}
                onClick={() => handleNavigation(item.id)}
              >
                <Icon className="size-4" />
                <span>{item.label}</span>
              </Button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}