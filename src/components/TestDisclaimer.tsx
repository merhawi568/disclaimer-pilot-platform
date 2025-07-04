import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, ChevronLeft, Search, Filter, Play, Save } from 'lucide-react';
import { DocumentViewer } from './DocumentViewer';

export const TestDisclaimer = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDisclaimer, setSelectedDisclaimer] = useState('');
  const [loading, setLoading] = useState(false);
  const [testProgress, setTestProgress] = useState(0);

  const disclaimers = [
    "Past performance does not guarantee future returns",
    "Not FDIC insured", 
    "No investment advice",
    "Risk of loss",
    "Hypothetical performance",
  ];

  const mockDocument = {
    name: "Q1_Brochure_US.pdf",
    type: 'pdf' as const,
    pages: 12,
    currentPage: 3,
    matches: [
      { page: 3, text: "Our strategies aim to deliver strong returns", highlighted: true },
      { page: 7, text: "Historical data demonstrates consistent performance", highlighted: true }
    ]
  };

  const mockDocuments = [
    { name: "Q1_Brochure_US.pdf", pages: 12, matches: 3 },
    { name: "LandingPage_EMEA.html", pages: 1, matches: 1 },
    { name: "Investment_Guide_APAC.pdf", pages: 24, matches: 7 },
  ];

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const simulateTest = () => {
    setLoading(true);
    setTestProgress(0);
    
    const interval = setInterval(() => {
      setTestProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          handleNext();
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">1</span>
                Select Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="disclaimer-select">Choose a disclaimer to test</Label>
                <Select value={selectedDisclaimer} onValueChange={setSelectedDisclaimer}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select disclaimer..." />
                  </SelectTrigger>
                  <SelectContent>
                    {disclaimers.map((disclaimer, index) => (
                      <SelectItem key={index} value={disclaimer}>
                        {disclaimer}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="custom-disclaimer">Or add custom disclaimer</Label>
                <Input placeholder="Enter your custom disclaimer text..." />
              </div>

              <Button 
                onClick={handleNext} 
                disabled={!selectedDisclaimer}
                className="w-full"
              >
                Next: Document Filter <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</span>
                Document Filter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Region</Label>
                  <Select defaultValue="us">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">US</SelectItem>
                      <SelectItem value="emea">EMEA</SelectItem>
                      <SelectItem value="apac">APAC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Line of Business</Label>
                  <Select defaultValue="private-bank">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private-bank">Private Bank</SelectItem>
                      <SelectItem value="asset-mgmt">Asset Management</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Date Range</Label>
                  <Select defaultValue="3months">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3months">Last 3 months</SelectItem>
                      <SelectItem value="ytd">YTD</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Document Type</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="brochure">Brochure</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="landing">Landing Page</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleBack}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={handleNext} className="flex-1">
                  Start Reduction <Filter className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">3</span>
                Reduction Review
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-medium">Found 11 matches across 3 documents</p>
                <p className="text-green-600 text-sm">Ready for review</p>
              </div>

              <div className="space-y-3">
                {mockDocuments.map((doc, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-gray-500">{doc.pages} pages • {doc.matches} matches</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">✅ 2 Correct</Badge>
                        <Badge variant="destructive">❌ 1 Incorrect</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">Keyboard shortcuts:</p>
                <div className="flex space-x-4 text-xs">
                  <span className="bg-white px-2 py-1 rounded">← → Navigate</span>
                  <span className="bg-white px-2 py-1 rounded">T Toggle Correct</span>
                  <span className="bg-white px-2 py-1 rounded">F Toggle Incorrect</span>
                  <span className="bg-white px-2 py-1 rounded">C Comment</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleBack}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button variant="outline">Approve All</Button>
                <Button onClick={handleNext} className="flex-1">
                  Next: Prompt Selection <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">4</span>
                Prompt Selection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Search Prompt Library</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search prompts for this disclaimer..." className="pl-10" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="border-2 border-blue-200 bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900">Future Returns Detection v2.1</h4>
                  <p className="text-sm text-blue-700 mt-1">Identify any mention of future returns or performance expectations</p>
                  <Badge className="mt-2 bg-blue-100 text-blue-800">94% Accuracy</Badge>
                </div>
                
                <div className="border rounded-lg p-4 hover:bg-gray-50">
                  <h4 className="font-medium">Investment Performance Classifier</h4>
                  <p className="text-sm text-gray-600 mt-1">Detect language referring to past or future investment performance</p>
                  <Badge variant="secondary" className="mt-2">89% Accuracy</Badge>
                </div>
              </div>

              <div>
                <Label>Or write custom prompt</Label>
                <Textarea 
                  placeholder="Describe what content should trigger this disclaimer..." 
                  rows={4}
                />
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleBack}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={simulateTest} className="flex-1">
                  Run Test <Play className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">5</span>
                Test Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-sm text-gray-600">Running test...</p>
                  <Progress value={testProgress} className="mt-4" />
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <DocumentViewer 
                      document={mockDocument}
                      showHighlights={true}
                    />
                    
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">AI Analysis</h4>
                        <Badge className="bg-green-100 text-green-800 mb-2">True Positive</Badge>
                        <p className="text-sm text-gray-600">
                          High confidence match: Text discusses future investment expectations without proper disclaimer.
                        </p>
                        <p className="text-xs text-blue-600 mt-2 cursor-pointer hover:underline">
                          View citation →
                        </p>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Classification</h4>
                        <div className="flex space-x-2">
                          <Badge className="bg-green-100 text-green-800 cursor-pointer">TP</Badge>
                          <Badge variant="outline" className="cursor-pointer">FP</Badge>
                          <Badge variant="outline" className="cursor-pointer">FN</Badge>
                          <Badge variant="outline" className="cursor-pointer">TN</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-2">Command Palette (⌘K):</p>
                    <div className="flex space-x-4 text-xs">
                      <span className="bg-white px-2 py-1 rounded">Jump to prompt</span>
                      <span className="bg-white px-2 py-1 rounded">View result</span>
                      <span className="bg-white px-2 py-1 rounded">Navigate document</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={handleBack}>
                      <ChevronLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button onClick={handleNext} className="flex-1">
                      View Analysis <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        );

      case 6:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">6</span>
                Post-Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">89.2%</div>
                  <div className="text-sm text-gray-600">Precision</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">94.1%</div>
                  <div className="text-sm text-gray-600">Recall</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">91.7%</div>
                  <div className="text-sm text-gray-600">Specificity</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">3</div>
                  <div className="text-sm text-gray-600">False Negatives</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-3">False Positive Clusters</h4>
                  <div className="space-y-2 text-sm">
                    <div className="bg-red-50 p-2 rounded">
                      "Historical performance data shows..."
                    </div>
                    <div className="bg-red-50 p-2 rounded">
                      "Market trends indicate potential..."
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-3">Missed Content (FN)</h4>
                  <div className="space-y-2 text-sm">
                    <div className="bg-yellow-50 p-2 rounded">
                      "Expected growth of 8% annually"
                    </div>
                    <div className="bg-yellow-50 p-2 rounded">
                      "Aiming for superior outcomes"
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">AI Suggestions</h4>
                <p className="text-blue-800 text-sm">
                  Consider adding trigger words like 'aim', 'expect', 'target', and 'project' to improve recall for future-oriented language.
                </p>
                <Button className="mt-3 bg-blue-600 hover:bg-blue-700">
                  Apply Suggested Prompt
                </Button>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleBack}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button variant="outline">Edit Prompt</Button>
                <Button onClick={handleNext} className="flex-1">
                  Save Results <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 7:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">7</span>
                Save Prompt
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="prompt-name">Prompt Name</Label>
                <Input 
                  id="prompt-name" 
                  defaultValue="Future Returns Detection v2.2"
                  placeholder="Enter prompt name..."
                />
              </div>

              <div>
                <Label htmlFor="prompt-description">Description</Label>
                <Textarea 
                  id="prompt-description"
                  defaultValue="Enhanced version with improved trigger words for future-oriented investment language"
                  placeholder="Describe this prompt..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="prompt-tags">Tags (optional)</Label>
                <Input 
                  id="prompt-tags" 
                  placeholder="performance, returns, investment..."
                />
              </div>

              <div>
                <Label>Linked Disclaimer</Label>
                <Input 
                  value={selectedDisclaimer}
                  disabled
                  className="bg-gray-50"
                />
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-green-900">Test Results Saved</p>
                    <p className="text-sm text-green-700">Accuracy: 92.1% • 11 documents tested</p>
                  </div>
                  <Save className="h-6 w-6 text-green-600" />
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleBack}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={() => setCurrentStep(1)} className="flex-1">
                  Save & Start New Test
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Test a Disclaimer</h1>
          <p className="text-gray-600 mt-1">Step-by-step disclaimer testing workflow</p>
        </div>
        <Badge variant="outline">Step {currentStep} of 7</Badge>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
          style={{ width: `${(currentStep / 7) * 100}%` }}
        ></div>
      </div>

      {renderStepContent()}
    </div>
  );
};
