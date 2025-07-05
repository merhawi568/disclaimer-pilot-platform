
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, Search, Plus, ArrowLeft, ArrowRight, Play } from 'lucide-react';
import { TestResults } from './TestResults';

export const TestDisclaimer = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [documents, setDocuments] = useState([]);
  const [testName, setTestName] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [disclaimer, setDisclaimer] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [progress, setProgress] = useState(0);

  const mockPrompts = [
    {
      id: 1,
      name: "Future Returns Detection",
      description: "Identifies mentions of future returns or performance expectations",
      prompt: "Identify any mention of future returns, performance expectations, or forward-looking statements about investment outcomes. Look for words like 'will', 'expect', 'aim', 'target', 'project', 'forecast'.",
      recall: 94.8,
      specificity: 85.3
    },
    {
      id: 2,
      name: "FDIC Insurance Disclaimer",
      description: "Checks for proper FDIC insurance disclosures",
      prompt: "Look for mentions of FDIC insurance, deposit protection, or bank guarantees without proper disclaimers about coverage limits and conditions.",
      recall: 89.2,
      specificity: 92.1
    },
    {
      id: 3,
      name: "Investment Advice Warning",
      description: "Detects investment advice without proper disclaimers",
      prompt: "Identify instances of investment advice, recommendations, or suggestions without appropriate disclaimers about risks, qualifications, or regulatory status.",
      recall: 91.5,
      specificity: 87.8
    }
  ];

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newDocuments = files.map((file, index) => ({
      id: documents.length + index + 1,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString()
    }));
    setDocuments([...documents, ...newDocuments]);
  };

  const removeDocument = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const handlePromptSelect = (prompt) => {
    setSelectedPrompt(prompt.prompt);
    setCustomPrompt(prompt.prompt);
  };

  const handleRunTest = async () => {
    setIsRunning(true);
    setProgress(0);
    
    // Simulate test progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          setShowResults(true);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const handleBackToTest = () => {
    setShowResults(false);
    setCurrentStep(1);
    setProgress(0);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return testName.trim() !== '';
      case 2:
        return documents.length > 0;
      case 3:
        return disclaimer.trim() !== '';
      case 4:
        return customPrompt.trim() !== '';
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Show test results using the same component as the sidebar
  if (showResults) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={handleBackToTest}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Test Setup
          </Button>
        </div>
        <TestResults />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Test a Disclaimer</h1>
          <p className="text-gray-600 mt-1">Set up and run compliance tests on your documents</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">Step {currentStep} of 4</Badge>
        </div>
      </div>

      {/* Progress Bar */}
      {isRunning && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Running test...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>
                {currentStep === 1 && "Test Configuration"}
                {currentStep === 2 && "Document Upload"}
                {currentStep === 3 && "Disclaimer Setup"}
                {currentStep === 4 && "Prompt Selection"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Test Name */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="test-name">Test Name</Label>
                    <Input
                      id="test-name"
                      placeholder="Enter a name for your test..."
                      value={testName}
                      onChange={(e) => setTestName(e.target.value)}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Choose a descriptive name to identify this test
                    </p>
                  </div>
                </div>
              )}

              {/* Step 2: Document Upload */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Upload Documents</h3>
                    <p className="text-gray-500 mb-4">
                      Drag and drop files here, or click to browse
                    </p>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                      accept=".pdf,.doc,.docx,.txt"
                    />
                    <Button asChild>
                      <label htmlFor="file-upload">
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Files
                      </label>
                    </Button>
                  </div>

                  {documents.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium">Uploaded Documents ({documents.length})</h4>
                      {documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="font-medium text-sm">{doc.name}</p>
                              <p className="text-xs text-gray-500">
                                {(doc.size / 1024).toFixed(1)} KB
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeDocument(doc.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Disclaimer */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="disclaimer">Disclaimer Text</Label>
                    <Textarea
                      id="disclaimer"
                      placeholder="Enter the disclaimer text that should be present..."
                      value={disclaimer}
                      onChange={(e) => setDisclaimer(e.target.value)}
                      rows={4}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      This is the disclaimer text that should appear in your documents
                    </p>
                  </div>
                </div>
              )}

              {/* Step 4: Prompt Selection */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <Search className="h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Search for prompts..."
                      className="border-0 bg-transparent"
                    />
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Available Prompts</h4>
                    <div className="grid gap-3">
                      {mockPrompts.map((prompt) => (
                        <div
                          key={prompt.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedPrompt === prompt.prompt
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:bg-gray-50'
                          }`}
                          onClick={() => handlePromptSelect(prompt)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-medium">{prompt.name}</h5>
                            <div className="flex space-x-2">
                              <Badge variant="outline" className="text-xs">
                                R: {prompt.recall}%
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                S: {prompt.specificity}%
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{prompt.description}</p>
                          <p className="text-xs text-gray-500 bg-gray-100 p-2 rounded">
                            {prompt.prompt}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <h4 className="font-medium">Write Your Own Prompt</h4>
                    </div>
                    <Textarea
                      placeholder="Enter your custom prompt here..."
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                {currentStep < 4 ? (
                  <Button
                    onClick={nextStep}
                    disabled={!canProceed()}
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleRunTest}
                    disabled={!canProceed() || isRunning}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {isRunning ? 'Running Test...' : 'Run Test'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Summary */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Test Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Test Name</Label>
                <p className="text-sm">{testName || 'Not specified'}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-500">Documents</Label>
                <p className="text-sm">{documents.length} files uploaded</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-500">Disclaimer</Label>
                <p className="text-sm text-gray-600 truncate">
                  {disclaimer || 'Not specified'}
                </p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-500">Prompt</Label>
                <p className="text-sm text-gray-600 truncate">
                  {customPrompt || 'Not specified'}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center space-x-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        step < currentStep
                          ? 'bg-green-500'
                          : step === currentStep
                          ? 'bg-blue-500'
                          : 'bg-gray-300'
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        step <= currentStep ? 'text-gray-900' : 'text-gray-500'
                      }`}
                    >
                      {step === 1 && 'Configuration'}
                      {step === 2 && 'Upload Documents'}
                      {step === 3 && 'Set Disclaimer'}
                      {step === 4 && 'Select Prompt'}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
