
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Search, Plus } from 'lucide-react';

export const PromptLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Prompt Library</h1>
          <p className="text-gray-600 mt-1">Search for existing prompts or create your own</p>
        </div>
      </div>

      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search for Prompt
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search existing prompts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {searchTerm && (
            <div className="text-sm text-gray-500">
              No prompts found matching "{searchTerm}"
            </div>
          )}
        </CardContent>
      </Card>

      {/* Write Custom Prompt Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Write Your Prompt
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Enter your custom prompt here..."
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            rows={6}
            className="resize-none"
          />
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setCustomPrompt('')}>
              Clear
            </Button>
            <Button 
              onClick={() => setSelectedPrompt(customPrompt)}
              disabled={!customPrompt.trim()}
            >
              Use This Prompt
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Selected Prompt Preview */}
      {selectedPrompt && (
        <Card>
          <CardHeader>
            <CardTitle>Selected Prompt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedPrompt}</p>
            </div>
            <div className="flex justify-end mt-4">
              <Button>
                Test This Prompt
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
