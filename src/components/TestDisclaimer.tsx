import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  ArrowLeft, 
  ArrowRight, 
  Upload, 
  FileText, 
  Play, 
  Save,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  Bot,
  User,
  Send
} from 'lucide-react';

export const TestDisclaimer = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    prompt: '',
    disclaimer: '',
    file: null,
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [mockResults, setMockResults] = useState({
    recall: 85.0,
    specificity: 78.0,
  });
  const [analysisData, setAnalysisData] = useState([
    { id: 1, documentName: "Q1_Brochure_US.pdf", flagged: true, reason: "Contains future performance prediction without disclaimer" },
    { id: 2, documentName: "Investment_Guide_APAC.pdf", flagged: false, reason: "Contains appropriate disclaimer" },
    { id: 3, documentName: "LandingPage_EMEA.html", flagged: true, reason: "Guaranteed return statement without proper risk disclosure" }
  ]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [savePromptDialog, setSavePromptDialog] = useState(false);
  const [promptName, setPromptName] = useState('');
  const [promptRemarks, setPromptRemarks] = useState('');
  const [promptStatus, setPromptStatus] = useState('');

  const handleNext = () => {
    setStep(prevStep => Math.min(prevStep + 1, 6));
  };

  const handlePrevious = () => {
    setStep(prevStep => Math.max(prevStep - 1, 1));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file: file });
  
    // Mock upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 100);
  };

  const handleSubmit = () => {
    // Mock submission logic
    console.log('Form Data:', formData);
    alert('Form submitted! Check console for data.');
  };

  const handleTest = () => {
    // Mock test execution
    console.log('Testing Disclaimer...');
    alert('Disclaimer test initiated! Check console for details.');
  };

  const handleSavePrompt = () => {
    setSavePromptDialog(true);
    setPromptName('');
    setPromptRemarks('');
    setPromptStatus('');
  };

  const handleSelectItem = (itemId: number, checked: boolean) => {
    if (checked) {
      setSelectedItems(prev => [...prev, itemId]);
    } else {
      setSelectedItems(prev => prev.filter(id => id !== itemId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(analysisData.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSubmitForReview = () => {
    const selectedResults = analysisData.filter(item => selectedItems.includes(item.id));
    console.log('Submitting for review:', selectedResults);
    alert(`${selectedItems.length} items submitted for review!`);
  };

  const submitSavePrompt = () => {
    if (promptName.trim() && promptStatus) {
      console.log('Saving prompt:', {
        name: promptName,
        prompt: formData.prompt,
        disclaimer: formData.disclaimer,
        recall: mockResults.recall,
        specificity: mockResults.specificity,
        status: promptStatus,
        remarks: promptRemarks,
        dateSaved: new Date().toISOString().split('T')[0]
      });
      
      setSavePromptDialog(false);
      setPromptName('');
      setPromptRemarks('');
      setPromptStatus('');
      
      alert('Prompt saved successfully!');
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Enter Prompt and Disclaimer</CardTitle>
          <p className="text-gray-600">Define the prompt and disclaimer you want to test</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="prompt">Prompt</Label>
              <Textarea 
                id="prompt" 
                name="prompt" 
                placeholder="Enter your prompt here..." 
                value={formData.prompt}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="disclaimer">Disclaimer</Label>
              <Input 
                type="text" 
                id="disclaimer" 
                name="disclaimer" 
                placeholder="Enter the disclaimer to test against..." 
                value={formData.disclaimer}
                onChange={handleChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Documents</CardTitle>
          <p className="text-gray-600">Upload the documents you want to test against the prompt and disclaimer</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="file">Select File</Label>
              <Input 
                type="file" 
                id="file" 
                name="file" 
                onChange={handleFileChange}
              />
            </div>
            {formData.file && (
              <Progress value={uploadProgress} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Run Test</CardTitle>
          <p className="text-gray-600">Initiate the test to analyze documents against the prompt and disclaimer</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>Click the button below to start the test.</p>
            <Button onClick={handleTest}>
              <Play className="h-4 w-4 mr-2" />
              Start Test
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Review Analysis</CardTitle>
          <p className="text-gray-600">Review the analysis results and flagged documents</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="select-all"
                  checked={selectedItems.length === analysisData.length && analysisData.length > 0}
                  onCheckedChange={handleSelectAll}
                />
                <Label htmlFor="select-all" className="text-sm font-medium">
                  Select All ({selectedItems.length} of {analysisData.length} selected)
                </Label>
              </div>
              <Button 
                onClick={handleSubmitForReview}
                disabled={selectedItems.length === 0}
                className="flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                Submit for Review ({selectedItems.length})
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Select</TableHead>
                    <TableHead>Document Name</TableHead>
                    <TableHead>Flagged</TableHead>
                    <TableHead>Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analysisData.map(item => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedItems.includes(item.id)}
                          onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                        />
                      </TableCell>
                      <TableCell>{item.documentName}</TableCell>
                      <TableCell>
                        <Badge variant={item.flagged ? "destructive" : "secondary"}>
                          {item.flagged ? "Yes" : "No"}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.reason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Evaluate Metrics</CardTitle>
          <p className="text-gray-600">Evaluate the recall and specificity metrics to assess the effectiveness</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Recall</Label>
                <Input 
                  type="text" 
                  value={`${mockResults.recall}%`} 
                  readOnly 
                  className="cursor-not-allowed" 
                />
              </div>
              <div>
                <Label>Specificity</Label>
                <Input 
                  type="text" 
                  value={`${mockResults.specificity}%`} 
                  readOnly 
                  className="cursor-not-allowed" 
                />
              </div>
            </div>
            <BarChart3 className="w-full h-48" />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStep6 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Save className="h-5 w-5" />
            Save Prompt
          </CardTitle>
          <p className="text-gray-600">Save your tested prompt for future use</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">Test Complete!</h3>
              <p className="text-green-700">
                Your prompt has been successfully tested. You can now save it to your prompt library.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{mockResults.recall}%</div>
                <div className="text-sm text-gray-600">Final Recall</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{mockResults.specificity}%</div>
                <div className="text-sm text-gray-600">Final Specificity</div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button onClick={handleSavePrompt} size="lg">
                <Save className="h-4 w-4 mr-2" />
                Save to Prompt Library
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Test a Disclaimer</h1>
          <p className="text-gray-600 mt-1">Test your disclaimers against various documents</p>
        </div>
        <div className="space-x-2">
          <Badge variant="secondary">Step {step} of 6</Badge>
        </div>
      </div>

      <Progress value={(step / 6) * 100} className="h-1.5" />

      {/* Main Content */}
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
      {step === 4 && renderStep4()}
      {step === 5 && renderStep5()}
      {step === 6 && renderStep6()}

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={step === 1}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        <Button 
          onClick={handleNext}
          disabled={step === 6}
        >
          Next
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* Save Prompt Dialog */}
      <Dialog open={savePromptDialog} onOpenChange={setSavePromptDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Save Prompt to Library</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="prompt-name">Prompt Name *</Label>
              <Input 
                id="prompt-name"
                value={promptName}
                onChange={(e) => setPromptName(e.target.value)}
                placeholder="Enter a name for this prompt..."
              />
            </div>
            
            <div>
              <Label htmlFor="prompt-status">Status *</Label>
              <Select value={promptStatus} onValueChange={setPromptStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in-progress">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                      In Progress
                    </div>
                  </SelectItem>
                  <SelectItem value="under-review">
                    <div className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-blue-500" />
                      Under Review
                    </div>
                  </SelectItem>
                  <SelectItem value="approved">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Approved/Completed
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="prompt-text">Prompt (Read-only)</Label>
              <Textarea 
                id="prompt-text"
                value={formData.prompt}
                readOnly
                className="bg-gray-50 cursor-not-allowed"
                rows={4}
              />
            </div>
            
            <div>
              <Label htmlFor="disclaimer-text">Disclaimer (Read-only)</Label>
              <Input 
                id="disclaimer-text"
                value={formData.disclaimer}
                readOnly
                className="bg-gray-50 cursor-not-allowed"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="recall-metric">Recall % (Read-only)</Label>
                <Input 
                  id="recall-metric"
                  value={mockResults.recall}
                  readOnly
                  className="bg-gray-50 cursor-not-allowed"
                />
              </div>
              <div>
                <Label htmlFor="specificity-metric">Specificity % (Read-only)</Label>
                <Input 
                  id="specificity-metric"
                  value={mockResults.specificity}
                  readOnly
                  className="bg-gray-50 cursor-not-allowed"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="prompt-remarks">Remarks</Label>
              <Textarea 
                id="prompt-remarks"
                value={promptRemarks}
                onChange={(e) => setPromptRemarks(e.target.value)}
                placeholder="Enter any remarks or comments about this prompt..."
                rows={3}
              />
            </div>
            
            <div className="flex space-x-2 pt-4">
              <Button 
                onClick={submitSavePrompt}
                disabled={!promptName.trim() || !promptStatus}
                className="flex-1"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Prompt
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setSavePromptDialog(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
