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
      prompt: "Identify any mention of future returns, performance expectations, or forward-looking statements about investment outcomes. Look for words like 'will', 'expect', 'aim', 'target', 'project', 'forecast'.",
      disclaimer: "Past performance does not guarantee future returns",
      recall: 94.2,
      specificity: 89.7,
      version: "2.2",
      dateSaved: "2024-01-15",
      remarks: "Enhanced version with improved trigger words for future-oriented investment language"
    },
    {
      id: 2,
      name: "Insurance Status Checker v1.5",
      prompt: "Look for language suggesting deposits, investments, or products are insured, protected, or guaranteed by FDIC or government agencies when they are not.",
      disclaimer: "Not FDIC insured",
      recall: 89.7,
      specificity: 92.1,
      version: "1.5",
      dateSaved: "2024-01-10",
      remarks: "Detect mentions of insured or protected status without proper disclaimers"
    },
    {
      id: 3,
      name: "Investment Advice Filter v3.1",
      prompt: "Detect content that provides specific investment recommendations, tells users what they should do with investments, or gives personalized financial guidance.",
      disclaimer: "No investment advice",
      recall: 91.3,
      specificity: 88.5,
      version: "3.1",
      dateSaved: "2024-01-08",
      remarks: "Identify language that could be construed as investment advice"
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
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">v{prompt.version}</Badge>
                    <span className="text-sm text-gray-500">{prompt.dateSaved}</span>
                  </div>
                </div>
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
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Metrics</h4>
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-gray-500">Recall:</span>
                      <Badge 
                        className={
                          prompt.recall >= 90 
                            ? "bg-green-100 text-green-800" 
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {prompt.recall}%
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-500">Specificity:</span>
                      <Badge 
                        className={
                          prompt.specificity >= 90 
                            ? "bg-green-100 text-green-800" 
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {prompt.specificity}%
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Remarks</h4>
                  <p className="text-sm text-gray-600">{prompt.remarks}</p>
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
                        <DialogTitle>Edit Prompt - Remarks Only</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="edit-name">Name (Read-only)</Label>
                          <Input 
                            id="edit-name" 
                            defaultValue={prompt.name} 
                            readOnly 
                            className="bg-gray-50 cursor-not-allowed"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="edit-prompt">Prompt (Read-only)</Label>
                          <Textarea 
                            id="edit-prompt" 
                            defaultValue={prompt.prompt}
                            rows={4}
                            readOnly
                            className="bg-gray-50 cursor-not-allowed"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="edit-disclaimer">Disclaimer (Read-only)</Label>
                          <Input 
                            id="edit-disclaimer" 
                            defaultValue={prompt.disclaimer} 
                            readOnly
                            className="bg-gray-50 cursor-not-allowed"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="edit-recall">Recall % (Read-only)</Label>
                            <Input 
                              id="edit-recall" 
                              type="number" 
                              defaultValue={prompt.recall}
                              readOnly
                              className="bg-gray-50 cursor-not-allowed"
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-specificity">Specificity % (Read-only)</Label>
                            <Input 
                              id="edit-specificity" 
                              type="number" 
                              defaultValue={prompt.specificity}
                              readOnly
                              className="bg-gray-50 cursor-not-allowed"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="edit-version">Version (Read-only)</Label>
                          <Input 
                            id="edit-version" 
                            defaultValue={prompt.version} 
                            readOnly
                            className="bg-gray-50 cursor-not-allowed"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="edit-remarks">Remarks (Editable)</Label>
                          <Textarea 
                            id="edit-remarks" 
                            defaultValue={prompt.remarks}
                            rows={3}
                            placeholder="Enter your remarks here..."
                          />
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button className="flex-1">
                            <Save className="h-4 w-4 mr-2" />
                            Save Remarks
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
