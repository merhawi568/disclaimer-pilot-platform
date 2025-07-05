import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronRight, ChevronLeft, Search, Filter, Play, Save, Eye, ZoomIn, ZoomOut, X, ThumbsUp, ThumbsDown, FileText, Bot, User } from 'lucide-react';
import { DocumentViewer } from './DocumentViewer';

export const TestDisclaimer = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDisclaimer, setSelectedDisclaimer] = useState('');
  const [customDisclaimer, setCustomDisclaimer] = useState('');
  const [loading, setLoading] = useState(false);
  const [testProgress, setTestProgress] = useState(0);
  const [reductionActive, setReductionActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageZoom, setImageZoom] = useState(100);
  const [feedback, setFeedback] = useState({});
  const [filterType, setFilterType] = useState('all');

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

  // Test result data that matches TestResults component
  const testResult = {
    id: 1,
    name: "Future Returns Detection Test",
    prompt: "Identify any mention of future returns, performance expectations, or forward-looking statements about investment outcomes. Look for words like 'will', 'expect', 'aim', 'target', 'project', 'forecast'.",
    disclaimer: selectedDisclaimer || "Past performance does not guarantee future returns",
    date: "2024-01-15",
    accuracy: 94.2,
    precision: 89.1,
    recall: 94.8,
    specificity: 85.3,
    documents: 24,
    tp: 18,
    fp: 2,
    fn: 1,
    tn: 3,
    tpRate: 94.7,
    tnRate: 60.0,
    fpRate: 40.0,
    fnRate: 5.3,
    status: "Completed"
  };

  const mockAnalysisData = [
    {
      id: 1,
      documentName: "Q1_Brochure_US.pdf",
      documentId: "DOC-001",
      pageNumber: 3,
      pageImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop",
      flagged: true,
      reason: "Contains future performance prediction without disclaimer",
      citation: "Our strategies aim to deliver strong returns over the long term, targeting annual growth between 8-12%",
      confidenceScore: 94.2,
      type: 'TP'
    },
    {
      id: 2,
      documentName: "Investment_Guide_APAC.pdf",
      documentId: "DOC-002",
      pageNumber: 15,
      pageImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
      flagged: false,
      reason: "Contains appropriate disclaimer",
      citation: "Past performance does not guarantee future results. Investments may lose value.",
      confidenceScore: 87.5,
      type: 'TN'
    },
    {
      id: 3,
      documentName: "LandingPage_EMEA.html",
      documentId: "DOC-003",
      pageNumber: 1,
      pageImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",
      flagged: true,
      reason: "Guaranteed return statement without proper risk disclosure",
      citation: "Guaranteed 15% annual returns on investment",
      confidenceScore: 96.8,
      type: 'TP'
    },
    {
      id: 4,
      documentName: "Portfolio_Summary.pdf",
      documentId: "DOC-004",
      pageNumber: 7,
      pageImage: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop",
      flagged: false,
      reason: null,
      citation: "Risk warning: Your capital is at risk when investing",
      confidenceScore: null,
      type: 'FP'
    },
    {
      id: 5,
      documentName: "Marketing_Material.pdf", 
      documentId: "DOC-005",
      pageNumber: 2,
      pageImage: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop",
      flagged: false,
      reason: "Missed risky language",
      citation: "We guarantee exceptional returns for all investors",
      confidenceScore: 45.2,
      type: 'FN'
    }
  ];

  const mockAiAnalysis = [
    {
      id: 1,
      recommendation: "High Risk - Immediate Action Required",
      severity: "high",
      pattern: "Guaranteed Returns Language",
      documents: ["DOC-001", "DOC-003"],
      suggestion: "Replace with compliant language that includes appropriate risk disclaimers",
      confidence: 96.5,
      type: 'TP'
    },
    {
      id: 2,
      recommendation: "Medium Risk - Review Suggested",
      severity: "medium", 
      pattern: "Missing FDIC Disclaimer",
      documents: ["DOC-002"],
      suggestion: "Add FDIC insurance disclaimer for deposit products",
      confidence: 82.3,
      type: 'TN'
    },
    {
      id: 3,
      recommendation: "Low Risk - Monitor",
      severity: "low",
      pattern: "Vague Performance Claims", 
      documents: ["DOC-004"],
      suggestion: "Consider adding more specific risk warnings",
      confidence: 71.8,
      type: 'FP'
    },
    {
      id: 4,
      recommendation: "Critical Issue - Missed Detection",
      severity: "high",
      pattern: "Undetected Guarantee Language",
      documents: ["DOC-005"],
      suggestion: "System failed to detect explicit guarantee statement - requires model retraining",
      confidence: 45.2,
      type: 'FN'
    }
  ];

  const mockReductionResults = [
    {
      id: 1,
      documentName: "Q1_Brochure_US.pdf",
      pageNumber: 3,
      screenshot: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop",
      matchText: "Our strategies aim to deliver strong returns over the long term"
    },
    {
      id: 2,
      documentName: "Q1_Brochure_US.pdf", 
      pageNumber: 7,
      screenshot: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
      matchText: "Historical data demonstrates consistent performance"
    },
    {
      id: 3,
      documentName: "LandingPage_EMEA.html",
      pageNumber: 1,
      screenshot: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",
      matchText: "Guaranteed 15% annual returns on investment"
    },
    {
      id: 4,
      documentName: "Investment_Guide_APAC.pdf",
      pageNumber: 12,
      screenshot: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop",
      matchText: "Expected growth trajectory of 8-12% annually"
    },
    {
      id: 5,
      documentName: "Investment_Guide_APAC.pdf",
      pageNumber: 18,
      screenshot: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop",
      matchText: "Projected returns based on market analysis"
    }
  ];

  const mockDocuments = [
    { name: "Q1_Brochure_US.pdf", pages: 12, matches: 3 },
    { name: "LandingPage_EMEA.html", pages: 1, matches: 1 },
    { name: "Investment_Guide_APAC.pdf", pages: 24, matches: 7 },
  ];

  const getFilteredAnalysisData = () => {
    if (filterType === 'all') return mockAnalysisData;
    return mockAnalysisData.filter(item => item.type === filterType);
  };

  const getFilteredAiAnalysis = () => {
    if (filterType === 'all') return mockAiAnalysis;
    return mockAiAnalysis.filter(item => item.type === filterType);
  };

  const handleFeedback = (itemId: number, type: string, reason = '') => {
    setFeedback(prev => ({
      ...prev,
      [itemId]: { type, reason }
    }));
  };

  const handleNext = () => {
    if (currentStep < 6) {
      // Skip step 6 and go directly to step 7 from step 5
      if (currentStep === 5) {
        setCurrentStep(7);
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      // Skip step 6 when going back from step 7
      if (currentStep === 7) {
        setCurrentStep(5);
      } else {
        setCurrentStep(currentStep - 1);
      }
    }
  };

  const handleDisclaimerChange = (disclaimer: string) => {
    setSelectedDisclaimer(disclaimer);
    if (disclaimer || customDisclaimer) {
      setReductionActive(true);
    }
  };

  const handleCustomDisclaimerChange = (value: string) => {
    setCustomDisclaimer(value);
    if (value || selectedDisclaimer) {
      setReductionActive(true);
    }
  };

  const simulateReduction = () => {
    setLoading(true);
    setTestProgress(0);
    
    const interval = setInterval(() => {
      setTestProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          setCurrentStep(4);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
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

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setImageZoom(100);
  };

  const handleZoomIn = () => {
    setImageZoom(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setImageZoom(prev => Math.max(prev - 25, 50));
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
                <Select value={selectedDisclaimer} onValueChange={handleDisclaimerChange}>
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
                <Input 
                  placeholder="Enter your custom disclaimer text..." 
                  value={customDisclaimer}
                  onChange={(e) => handleCustomDisclaimerChange(e.target.value)}
                />
              </div>

              {reductionActive && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-green-800 font-medium">Auto-Reduction Active</p>
                    <Badge className="bg-green-100 text-green-800">All Documents</Badge>
                  </div>
                  <p className="text-green-600 text-sm mb-3">
                    Searching across all available documents by default. Use document filter to narrow down.
                  </p>
                  {loading ? (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Reducing documents...</p>
                      <Progress value={testProgress} className="mb-2" />
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <Button onClick={simulateReduction} size="sm">
                        Start Reduction <Filter className="ml-2 h-4 w-4" />
                      </Button>
                      <Button variant="outline" onClick={() => setCurrentStep(2)} size="sm">
                        Configure Filter First
                      </Button>
                    </div>
                  )}
                </div>
              )}

              <Button 
                onClick={handleNext} 
                disabled={!selectedDisclaimer && !customDisclaimer}
                className="w-full"
              >
                Next: Prompt Selection
                <ChevronRight className="ml-2 h-4 w-4" />
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
                Document Filter (Optional)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <p className="text-blue-800 text-sm">
                  By default, all documents are included. Use filters below to narrow down the search.
                </p>
              </div>

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
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={() => setCurrentStep(1)} className="flex-1">
                  Apply Filter & Back to Start <Filter className="ml-2 h-4 w-4" />
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
                Reduction Review (Optional)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-medium">Found {mockReductionResults.length} matches across {mockDocuments.length} documents</p>
                <p className="text-green-600 text-sm">Ready for review</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <p className="text-blue-800 text-sm">
                  Review is optional - you can proceed directly to prompt selection or review the results first.
                </p>
              </div>

              <div className="space-y-4">
                {mockReductionResults.map((result) => (
                  <div key={result.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <div className="mb-3">
                          <p className="font-medium text-gray-900">{result.documentName}</p>
                          <p className="text-sm text-gray-500">Page {result.pageNumber} • ID: {result.id}</p>
                        </div>
                        <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-3">
                          <p className="text-sm text-gray-800">
                            "{result.matchText}"
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="cursor-pointer">✅ Correct</Badge>
                          <Badge variant="destructive" className="cursor-pointer">❌ Incorrect</Badge>
                        </div>
                      </div>
                      <div className="relative">
                        <img 
                          src={result.screenshot} 
                          alt={`Screenshot of ${result.documentName} page ${result.pageNumber}`}
                          className="w-full h-48 object-cover rounded border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => handleImageClick(result.screenshot)}
                        />
                        <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                          Page {result.pageNumber}
                        </div>
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
                <Button onClick={() => setCurrentStep(4)} className="flex-1">
                  Skip to Prompt Selection <ChevronRight className="ml-2 h-4 w-4" />
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
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-800 font-medium">Reduction Complete</p>
                    <p className="text-green-600 text-sm">Found {mockReductionResults.length} matches across {mockDocuments.length} documents</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setCurrentStep(3)}>
                    <Eye className="mr-2 h-4 w-4" /> View Results
                  </Button>
                </div>
              </div>

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
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
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
                <div className="space-y-6">
                  {/* Test Result Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{testResult.name}</h3>
                      <p className="text-gray-600">Test metrics and performance analysis</p>
                    </div>
                    <div className="flex space-x-2">
                      <Select value={filterType} onValueChange={setFilterType}>
                        <SelectTrigger className="w-48">
                          <Filter className="h-4 w-4 mr-2" />
                          <SelectValue placeholder="Filter by type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Results</SelectItem>
                          <SelectItem value="TP">True Positives (TP)</SelectItem>
                          <SelectItem value="TN">True Negatives (TN)</SelectItem>
                          <SelectItem value="FP">False Positives (FP)</SelectItem>
                          <SelectItem value="FN">False Negatives (FN)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Metrics Overview - Top Section */}
                  <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{testResult.recall}%</div>
                      <div className="text-sm text-gray-600">Recall</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{testResult.specificity}%</div>
                      <div className="text-sm text-gray-600">Specificity</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{testResult.precision}%</div>
                      <div className="text-sm text-gray-600">Precision</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{testResult.accuracy}%</div>
                      <div className="text-sm text-gray-600">Accuracy</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="text-center p-3 bg-green-50 rounded">
                      <div className="text-lg font-semibold text-green-700">{testResult.tp}</div>
                      <div className="text-green-600">True Positives</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded">
                      <div className="text-lg font-semibold text-blue-700">{testResult.tn}</div>
                      <div className="text-blue-600">True Negatives</div>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded">
                      <div className="text-lg font-semibold text-red-700">{testResult.fp}</div>
                      <div className="text-red-600">False Positives</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded">
                      <div className="text-lg font-semibold text-orange-700">{testResult.fn}</div>
                      <div className="text-orange-600">False Negatives</div>
                    </div>
                  </div>

                  <div className="text-center p-2 bg-gray-100 rounded">
                    <span className="text-lg font-semibold">Total Documents: {testResult.documents}</span>
                  </div>

                  {/* Analysis Section - Below Metrics */}
                  <div className="border-t pt-6">
                    <Tabs defaultValue="manual" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="manual" className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Manual Analysis
                        </TabsTrigger>
                        <TabsTrigger value="ai" className="flex items-center gap-2">
                          <Bot className="h-4 w-4" />
                          AI Analyst
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="manual" className="mt-4">
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Type</TableHead>
                                <TableHead>Document ID</TableHead>
                                <TableHead>Document Name</TableHead>
                                <TableHead>Page</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead>Flagged</TableHead>
                                <TableHead>Confidence</TableHead>
                                <TableHead>Reason</TableHead>
                                <TableHead>Citation</TableHead>
                                <TableHead>Feedback</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {getFilteredAnalysisData().map((item) => (
                                <TableRow key={item.id}>
                                  <TableCell>
                                    <Badge 
                                      variant={
                                        item.type === 'TP' ? 'default' :
                                        item.type === 'TN' ? 'secondary' :
                                        item.type === 'FP' ? 'destructive' : 'outline'
                                      }
                                    >
                                      {item.type}
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="font-mono text-sm">{item.documentId}</TableCell>
                                  <TableCell className="font-medium">{item.documentName}</TableCell>
                                  <TableCell>{item.pageNumber || '-'}</TableCell>
                                  <TableCell>
                                    {item.pageImage ? (
                                      <div className="relative">
                                        <img 
                                          src={item.pageImage} 
                                          alt={`Page ${item.pageNumber}`}
                                          className="w-16 h-20 object-cover rounded cursor-pointer hover:opacity-80"
                                          onClick={() => handleImageClick(item.pageImage)}
                                        />
                                        <ZoomIn className="absolute top-1 right-1 h-3 w-3 text-white bg-black bg-opacity-50 rounded" />
                                      </div>
                                    ) : (
                                      <div className="w-16 h-20 bg-gray-100 rounded flex items-center justify-center">
                                        <FileText className="h-6 w-6 text-gray-400" />
                                      </div>
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    {item.flagged !== null ? (
                                      <Badge variant={item.flagged ? 'destructive' : 'default'}>
                                        {item.flagged ? 'Yes' : 'No'}
                                      </Badge>
                                    ) : '-'}
                                  </TableCell>
                                  <TableCell>
                                    {item.confidenceScore ? (
                                      <span className="text-sm font-medium">{item.confidenceScore}%</span>
                                    ) : '-'}
                                  </TableCell>
                                  <TableCell className="max-w-48">
                                    <div className="text-sm text-gray-600 truncate" title={item.reason}>
                                      {item.reason || '-'}
                                    </div>
                                  </TableCell>
                                  <TableCell className="max-w-48">
                                    <div className="text-sm text-gray-600 truncate" title={item.citation}>
                                      {item.citation || '-'}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center space-x-1">
                                      <Button
                                        size="sm"
                                        variant={feedback[item.id]?.type === 'up' ? 'default' : 'outline'}
                                        onClick={() => handleFeedback(item.id, 'up')}
                                      >
                                        <ThumbsUp className="h-3 w-3" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant={feedback[item.id]?.type === 'down' ? 'destructive' : 'outline'}
                                        onClick={() => handleFeedback(item.id, 'down')}
                                      >
                                        <ThumbsDown className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="ai" className="mt-4">
                        <div className="space-y-4">
                          <div className="text-sm text-gray-600 mb-4">
                            AI-powered analysis and recommendations based on compliance patterns
                          </div>
                          {getFilteredAiAnalysis().map((analysis) => (
                            <Card key={analysis.id} className="border-l-4 border-l-blue-500">
                              <CardContent className="pt-4">
                                <div className="flex items-start justify-between mb-2">
                                  <h4 className="font-semibold text-lg">{analysis.recommendation}</h4>
                                  <div className="flex items-center gap-2">
                                    <Badge 
                                      variant={
                                        analysis.type === 'TP' ? 'default' :
                                        analysis.type === 'TN' ? 'secondary' :
                                        analysis.type === 'FP' ? 'destructive' : 'outline'
                                      }
                                    >
                                      {analysis.type}
                                    </Badge>
                                    <Badge 
                                      variant={
                                        analysis.severity === 'high' ? 'destructive' : 
                                        analysis.severity === 'medium' ? 'secondary' : 'default'
                                      }
                                    >
                                      {analysis.severity.toUpperCase()}
                                    </Badge>
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="font-medium text-gray-700">Pattern Detected:</span>
                                    <p className="text-gray-600">{analysis.pattern}</p>
                                  </div>
                                  <div>
                                    <span className="font-medium text-gray-700">Affected Documents:</span>
                                    <p className="text-gray-600">{analysis.documents.join(', ')}</p>
                                  </div>
                                  <div className="md:col-span-2">
                                    <span className="font-medium text-gray-700">Suggestion:</span>
                                    <p className="text-gray-600">{analysis.suggestion}</p>
                                  </div>
                                  <div>
                                    <span className="font-medium text-gray-700">AI Confidence:</span>
                                    <div className="flex items-center gap-2 mt-1">
                                      <Progress value={analysis.confidence} className="h-2 flex-1" />
                                      <span className="text-sm font-medium">{analysis.confidence}%</span>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={handleBack}>
                      <ChevronLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button onClick={handleNext} className="flex-1">
                      Save Results <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 7:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">6</span>
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
        <Badge variant="outline">Step {currentStep === 7 ? '6' : currentStep} of 6</Badge>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
          style={{ width: `${(currentStep === 7 ? 6 : currentStep) / 6 * 100}%` }}
        ></div>
      </div>

      {renderStepContent()}

      {/* Image Zoom Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Document Screenshot
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" onClick={handleZoomOut}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">{imageZoom}%</span>
                <Button size="sm" variant="outline" onClick={handleZoomIn}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => setSelectedImage(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="overflow-auto max-h-[calc(90vh-120px)]">
            {selectedImage && (
              <img 
                src={selectedImage} 
                alt="Zoomed document screenshot"
                className="w-full h-auto"
                style={{ transform: `scale(${imageZoom / 100})`, transformOrigin: 'top left' }}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
