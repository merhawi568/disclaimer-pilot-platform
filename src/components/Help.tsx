
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, Library } from 'lucide-react';
import { PromptLibrary } from '@/components/PromptLibrary';
import { HelpQuickActions } from '@/components/help/HelpQuickActions';
import { HelpFAQ } from '@/components/help/HelpFAQ';
import { HelpTutorials } from '@/components/help/HelpTutorials';
import { HelpDocumentation } from '@/components/help/HelpDocumentation';
import { HelpSupport } from '@/components/help/HelpSupport';

export const Help = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
          <p className="text-gray-600 mt-1">Get help, tutorials, and documentation</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <MessageCircle className="h-4 w-4 mr-2" />
          Contact Support
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <HelpQuickActions />

        <div className="lg:col-span-3">
          <Tabs defaultValue="faq" className="space-y-6">
            <TabsList>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
              <TabsTrigger value="documentation">Documentation</TabsTrigger>
              <TabsTrigger value="prompt-library">
                <Library className="h-4 w-4 mr-2" />
                Prompt Library
              </TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>

            <TabsContent value="faq" className="space-y-6">
              <HelpFAQ />
            </TabsContent>

            <TabsContent value="tutorials" className="space-y-6">
              <HelpTutorials />
            </TabsContent>

            <TabsContent value="documentation" className="space-y-6">
              <HelpDocumentation />
            </TabsContent>

            <TabsContent value="prompt-library" className="space-y-6">
              <PromptLibrary />
            </TabsContent>

            <TabsContent value="support" className="space-y-6">
              <HelpSupport />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
