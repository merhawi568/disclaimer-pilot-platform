import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import { Dashboard } from '@/components/Dashboard';
import { TestDisclaimer } from '@/components/TestDisclaimer';
import { TestResults } from '@/components/TestResults';
import { SavedPrompts } from '@/components/SavedPrompts';
import { Review } from '@/components/Review';
import { Admin } from '@/components/Admin';
import { Help } from '@/components/Help';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveTab} />;
      case 'test-disclaimer':
        return <TestDisclaimer />;
      case 'test-results':
        return <TestResults />;
      case 'saved-prompts':
        return <SavedPrompts />;
      case 'review':
        return <Review />;
      case 'admin':
        return <Admin />;
      case 'help':
        return <Help />;
      default:
        return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
