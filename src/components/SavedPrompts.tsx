
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Edit, Save, Trash, Copy, Play, History } from 'lucide-react';

export const SavedPrompts = () => {
  const [editingPrompt, setEditingPrompt] = useState(null);

  const savedPrompts = [
    {
      id: 1,
      name: "Future Returns Detection v2.2",
      description: "Enhanced version with improved trigger words for future-oriented investment language",
      prompt: "Identify any mention of future returns, performance expectations, or forward-looking statements about investment outcomes. Look for words like 'will', 'expect', 'aim', 'target', 'project', 'forecast'.",
      disclaimer: "Past performance does not guarantee future returns",
      tags: ["performance", "returns", "investment"],
      accuracy: 94.2,
      lastUsed: "2 hours ago",
      createdDate: "2024-01-15",
      versions: 3,
      tests: 45
    },
    {
      id: 2,
      name: "Insurance Status Checker v1.5",
      description: "Detect mentions of insured or protected status without proper disclaimers",
      prompt: "Look for language suggesting deposits, investments, or products are insured, protected, or guaranteed by FDIC or government agencies when they are not.",
      disclaimer: "Not FDIC insured",
      tags: ["FDIC", "insurance", "protection"],
      accuracy: 89.7,
      lastUsed: "5 hours ago",
      createdDate: "2024-01-10",
      versions: 2,
      tests: 38
    },
    {
      id: 3,
      name: "Investment Advice Filter v3.1",
      description: "Identify language that could be construed as investment advice",
      prompt: "Detect content that provides specific investment recommendations, tells users what they should do with investments, or gives personalized financial guidance.",
      disclaimer: "No investment advice",
      tags: ["advice", "recommendations", "guidance"],
      accuracy: 91.3,
      lastUsed: "1 day ago",
      createdDate: "2024-01-08",
      versions: 4,
      tests: 29
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Saved Prompts</h1>
          <p className="text-gray-600 mt-1">Manage your custom disclaimer detection prompts</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Create New Prompt
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {savedPrompts.map((prompt) => (
          <Card key={prompt.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{prompt.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{prompt.description}</p>
                </div>
                <Badge 
                  className={
                    prompt.accuracy >= 90 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }
                >
                  {prompt.accuracy}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Prompt</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded border line-clamp-3">
                    {prompt.prompt}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Disclaimer</h4>
                  <p className="text-sm text-gray-600 italic">"{prompt.disclaimer}"</p>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {prompt.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Created: {prompt.createdDate}</span>
                  <span>v{prompt.versions}</span>
                </div>
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Last used: {prompt.lastUsed}</span>
                  <span>{prompt.tests} tests</span>
                </div>
                
                <div className="flex space-x-1 pt-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Edit Prompt</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="edit-name">Name</Label>
                          <Input id="edit-name" defaultValue={prompt.name} />
                        </div>
                        
                        <div>
                          <Label htmlFor="edit-description">Description</Label>
                          <Input id="edit-description" defaultValue={prompt.description} />
                        </div>
                        
                        <div>
                          <Label htmlFor="edit-prompt">Prompt</Label>
                          <Textarea 
                            id="edit-prompt" 
                            defaultValue={prompt.prompt}
                            rows={4}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="edit-tags">Tags</Label>
                          <Input 
                            id="edit-tags" 
                            defaultValue={prompt.tags.join(', ')}
                            placeholder="Separate with commas"
                          />
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button className="flex-1">
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </Button>
                          <Button variant="outline">
                            <History className="h-4 w-4 mr-2" />
                            Version History
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button size="sm" variant="outline">
                    <Copy className="h-3 w-3" />
                  </Button>
                  
                  <Button size="sm">
                    <Play className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bulk Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Bulk Operations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Button variant="outline">Export All Prompts</Button>
            <Button variant="outline">Import Prompts</Button>
            <Button variant="outline">Backup Library</Button>
            <Button variant="destructive">
              <Trash className="h-4 w-4 mr-2" />
              Delete Selected
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
