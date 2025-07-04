import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, Filter, ThumbsUp, ThumbsDown, ZoomIn, FileText, Bot, User } from 'lucide-react';

export const TestResults = () => {
  const [zoomedImage, setZoomedImage] = useState(null);
  const [feedback, setFeedback] = useState({});
  const [feedbackDialog, setFeedbackDialog] = useState({ open: false, itemId: null });
  const [feedbackComment, setFeedbackComment] = useState('');

  // Default test result data
  const testResult = {
    id: 1,
    name: "Future Returns Detection Test",
    disclaimer: "Past performance does not guarantee future returns",
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
      pageImage: "/api/placeholder/600/800",
      flagged: true,
      reason: "Contains future performance prediction without disclaimer",
      citation: "Our strategies aim to deliver strong returns over the long term, targeting annual growth between 8-12%",
      confidenceScore: 94.2
    },
    {
      id: 2,
      documentName: "Investment_Guide_APAC.pdf",
      documentId: "DOC-002",
      pageNumber: 15,
      pageImage: "/api/placeholder/600/800",
      flagged: false,
      reason: "Contains appropriate disclaimer",
      citation: "Past performance does not guarantee future results. Investments may lose value.",
      confidenceScore: 87.5
    },
    {
      id: 3,
      documentName: "LandingPage_EMEA.html",
      documentId: "DOC-003",
      pageNumber: 1,
      pageImage: "/api/placeholder/800/600",
      flagged: true,
      reason: "Guaranteed return statement without proper risk disclosure",
      citation: null,
      confidenceScore: 96.8
    },
    {
      id: 4,
      documentName: "Portfolio_Summary.pdf",
      documentId: "DOC-004",
      pageNumber: 7,
      pageImage: null,
      flagged: false,
      reason: null,
      citation: "Risk warning: Your capital is at risk when investing",
      confidenceScore: null
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
      confidence: 96.5
    },
    {
      id: 2,
      recommendation: "Medium Risk - Review Suggested",
      severity: "medium",
      pattern: "Missing FDIC Disclaimer",
      documents: ["DOC-002"],
      suggestion: "Add FDIC insurance disclaimer for deposit products",
      confidence: 82.3
    },
    {
      id: 3,
      recommendation: "Low Risk - Monitor",
      severity: "low",
      pattern: "Vague Performance Claims",
      documents: ["DOC-004"],
      suggestion: "Consider adding more specific risk warnings",
      confidence: 71.8
    }
  ];

  const handleFeedback = (itemId, type, reason = '') => {
    setFeedback(prev => ({
      ...prev,
      [itemId]: { type, reason }
    }));
  };

  const handleNegativeFeedback = (itemId) => {
    setFeedbackDialog({ open: true, itemId });
    setFeedbackComment('');
  };

  const submitNegativeFeedback = () => {
    if (feedbackDialog.itemId && feedbackComment.trim()) {
      handleFeedback(feedbackDialog.itemId, 'down', feedbackComment);
      setFeedbackDialog({ open: false, itemId: null });
      setFeedbackComment('');
    }
  };

  const openImageZoom = (imageUrl) => {
    setZoomedImage(imageUrl);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Test Results</h1>
          <p className="text-gray-600 mt-1">Review and analyze your disclaimer testing results</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{testResult.name}</CardTitle>
          <p className="text-gray-600">Test metrics and performance analysis</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
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
                        {mockAnalysisData.map((item) => (
                          <TableRow key={item.id}>
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
                                    onClick={() => openImageZoom(item.pageImage)}
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
                                  onClick={() => handleNegativeFeedback(item.id)}
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
                    {mockAiAnalysis.map((analysis) => (
                      <Card key={analysis.id} className="border-l-4 border-l-blue-500">
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-lg">{analysis.recommendation}</h4>
                            <Badge 
                              variant={
                                analysis.severity === 'high' ? 'destructive' : 
                                analysis.severity === 'medium' ? 'secondary' : 'default'
                              }
                            >
                              {analysis.severity.toUpperCase()}
                            </Badge>
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
          </div>
        </CardContent>
      </Card>

      {/* Image Zoom Modal */}
      {zoomedImage && (
        <Dialog open={!!zoomedImage} onOpenChange={() => setZoomedImage(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Document Page</DialogTitle>
            </DialogHeader>
            <div className="max-h-[70vh] overflow-auto">
              <img 
                src={zoomedImage} 
                alt="Document page" 
                className="w-full h-auto"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Negative Feedback Dialog */}
      <AlertDialog open={feedbackDialog.open} onOpenChange={(open) => setFeedbackDialog({ open, itemId: null })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Provide Feedback</AlertDialogTitle>
            <AlertDialogDescription>
              Please share your thoughts on why you disagree with this analysis. Your feedback helps improve our system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Enter your feedback here..."
              value={feedbackComment}
              onChange={(e) => setFeedbackComment(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setFeedbackDialog({ open: false, itemId: null })}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={submitNegativeFeedback}
              disabled={!feedbackComment.trim()}
            >
              Submit Feedback
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
