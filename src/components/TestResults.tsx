import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Download, Filter, ThumbsUp, ThumbsDown, ZoomIn, ZoomOut, FileText } from 'lucide-react';
import { DocumentViewer } from './DocumentViewer';

export const TestResults = () => {
  const [selectedResult, setSelectedResult] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [feedback, setFeedback] = useState({});

  const testResults = [
    {
      id: 1,
      name: "Future Returns Detection Test",
      disclaimer: "Past performance does not guarantee future returns",
      date: "2024-01-15",
      accuracy: 94.2,
      precision: 89.1,
      recall: 94.8,
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
    },
    {
      id: 2,
      name: "FDIC Insurance Check",
      disclaimer: "Not FDIC insured",
      date: "2024-01-14",
      accuracy: 87.5,
      precision: 85.2,
      recall: 91.3,
      documents: 16,
      tp: 12,
      fp: 2,
      fn: 1,
      tn: 1,
      status: "Completed"
    },
    {
      id: 3,
      name: "Investment Advice Filter",
      disclaimer: "No investment advice",
      date: "2024-01-13",
      accuracy: 91.7,
      precision: 88.9,
      recall: 94.1,
      documents: 32,
      tp: 24,
      fp: 3,
      fn: 2,
      tn: 3,
      status: "In Progress"
    },
  ];

  const mockAnalysisData = [
    {
      id: 1,
      documentName: "Q1_Brochure_US.pdf",
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
      pageNumber: 7,
      pageImage: null,
      flagged: false,
      reason: null,
      citation: "Risk warning: Your capital is at risk when investing",
      confidenceScore: null
    }
  ];

  const handleFeedback = (itemId, type, reason = '') => {
    setFeedback(prev => ({
      ...prev,
      [itemId]: { type, reason }
    }));
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Results List */}
        <div className="lg:col-span-1 space-y-4">
          {testResults.map((result) => (
            <Card 
              key={result.id} 
              className={`cursor-pointer transition-all ${
                selectedResult?.id === result.id ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedResult(result)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base">{result.name}</CardTitle>
                  <Badge variant={result.status === 'Completed' ? 'default' : 'secondary'}>
                    {result.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{result.date}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Accuracy</span>
                    <span className="font-medium">{result.accuracy}%</span>
                  </div>
                  <Progress value={result.accuracy} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{result.documents} docs</span>
                    <span>TP: {result.tp} FP: {result.fp}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed View */}
        <div className="lg:col-span-2">
          {selectedResult ? (
            <Card>
              <CardHeader>
                <CardTitle>{selectedResult.name}</CardTitle>
                <p className="text-gray-600">Test metrics and performance analysis</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Metrics Overview */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Performance Rates</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm">True Positive Rate</span>
                            <span className="text-sm font-bold">{selectedResult.tpRate}%</span>
                          </div>
                          <Progress value={selectedResult.tpRate} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm">True Negative Rate</span>
                            <span className="text-sm font-bold">{selectedResult.tnRate}%</span>
                          </div>
                          <Progress value={selectedResult.tnRate} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm">False Positive Rate</span>
                            <span className="text-sm font-bold text-red-600">{selectedResult.fpRate}%</span>
                          </div>
                          <Progress value={selectedResult.fpRate} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm">False Negative Rate</span>
                            <span className="text-sm font-bold text-orange-600">{selectedResult.fnRate}%</span>
                          </div>
                          <Progress value={selectedResult.fnRate} className="h-2" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium">Test Summary</h4>
                      <div className="text-sm space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Documents:</span>
                          <span className="font-medium">{selectedResult.documents}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date:</span>
                          <span>{selectedResult.date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <Badge variant={selectedResult.status === 'Completed' ? 'default' : 'secondary'}>
                            {selectedResult.status}
                          </Badge>
                        </div>
                        <div className="mt-4">
                          <p className="text-gray-600 text-xs">Disclaimer:</p>
                          <p className="text-sm italic">"{selectedResult.disclaimer}"</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Analysis Button */}
                  <div className="pt-4 border-t">
                    <Dialog open={isAnalysisOpen} onOpenChange={setIsAnalysisOpen}>
                      <DialogTrigger asChild>
                        <Button className="w-full">
                          <Eye className="mr-2 h-4 w-4" />
                          View Detailed Analysis
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-6xl h-[80vh]">
                        <DialogHeader>
                          <DialogTitle>Detailed Analysis - {selectedResult.name}</DialogTitle>
                        </DialogHeader>
                        <div className="overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Document</TableHead>
                                <TableHead>Page</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead>Flagged</TableHead>
                                <TableHead>Reason</TableHead>
                                <TableHead>Citation</TableHead>
                                <TableHead>Confidence</TableHead>
                                <TableHead>Feedback</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {mockAnalysisData.map((item) => (
                                <TableRow key={item.id}>
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
                                    {item.confidenceScore ? (
                                      <span className="text-sm font-medium">{item.confidenceScore}%</span>
                                    ) : '-'}
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center space-x-1">
                                      <Button
                                        size="sm"
                                        variant={feedback[item.id]?.type === 'up' ? 'default' : 'outline'}
                                        onClick={() => {
                                          if (feedback[item.id]?.type === 'up') {
                                            const reason = prompt('Please provide your feedback reason:');
                                            if (reason) handleFeedback(item.id, 'up', reason);
                                          } else {
                                            handleFeedback(item.id, 'up');
                                          }
                                        }}
                                      >
                                        <ThumbsUp className="h-3 w-3" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant={feedback[item.id]?.type === 'down' ? 'destructive' : 'outline'}
                                        onClick={() => {
                                          if (feedback[item.id]?.type === 'down') {
                                            const reason = prompt('Please provide your feedback reason:');
                                            if (reason) handleFeedback(item.id, 'down', reason);
                                          } else {
                                            handleFeedback(item.id, 'down');
                                          }
                                        }}
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
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a test result</h3>
                <p className="text-gray-600">Choose a test from the list to view detailed metrics and analysis</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

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
    </div>
  );
};
