import { cn } from '@/lib/utils';
import { 
  LayoutGrid, 
  TestTube, 
  Library, 
  FileText, 
  BookmarkPlus, 
  Settings, 
  HelpCircle,
  CheckSquare
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
  { id: 'test-disclaimer', label: 'Test a Disclaimer', icon: TestTube },
  { id: 'prompt-library', label: 'Prompt Library', icon: Library },
  { id: 'test-results', label: 'Test Results', icon: FileText },
  { id: 'saved-prompts', label: 'Saved Prompts', icon: BookmarkPlus },
  { id: 'review', label: 'Review', icon: CheckSquare },
  { id: 'admin', label: 'Admin', icon: Settings },
  { id: 'help', label: 'Help', icon: HelpCircle },
];

export const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Disclaimer Tester</h1>
        <p className="text-sm text-gray-500 mt-1">Enterprise Platform</p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors",
                    isActive 
                      ? "bg-blue-50 text-blue-700 border border-blue-200" 
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs font-medium text-gray-900">Pro Plan</p>
          <p className="text-xs text-gray-500">Unlimited tests</p>
        </div>
      </div>
    </div>
  );
};
