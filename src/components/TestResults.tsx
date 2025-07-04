import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Download, Filter } from 'lucide-react';
import { DocumentViewer } from './DocumentViewer';

export const TestResults = () => {
  const [selectedResult, setSelectedResult] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);

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

  const mockDocuments = [
    {
      name: "Q1_Brochure_US.pdf",
      type: 'pdf' as const,
      pages: 12,
      matches: [
        { page: 3, text: "Our strategies aim to deliver strong returns", highlighted: true },
        { page: 7, text: "Historical data demonstrates consistent performance", highlighted: true }
      ]
    },
    {
      name: "LandingPage_EMEA.html",
      type: 'image' as const,
      pages: 1,
      matches: [
        { page: 1, text: "Guaranteed 15% Returns", highlighted: true }
      ]
    },
    {
      name: "Investment_Guide_APAC.pdf",
      type: 'pdf' as const,
      pages: 24,
      matches: [
        { page: 15, text: "Expected growth of 8% annually", highlighted: true }
      ]
    }
  ];

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
                <p className="text-gray-600">Detailed analysis and metrics</p>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="metrics">Metrics</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                    <TabsTrigger value="errors">Errors</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Test Information</h4>
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Date:</span>
                            <span>{selectedResult.date}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Documents:</span>
                            <span>{selectedResult.documents}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Status:</span>
                            <Badge variant={selectedResult.status === 'Completed' ? 'default' : 'secondary'}>
                              {selectedResult.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium">Disclaimer</h4>
                        <p className="text-sm text-gray-600 italic">
                          "{selectedResult.disclaimer}"
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="metrics" className="space-y-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Precision</span>
                            <span className="text-sm font-bold">{selectedResult.precision}%</span>
                          </div>
                          <Progress value={selectedResult.precision} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Recall</span>
                            <span className="text-sm font-bold">{selectedResult.recall}%</span>
                          </div>
                          <Progress value={selectedResult.recall} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Accuracy</span>
                            <span className="text-sm font-bold">{selectedResult.accuracy}%</span>
                          </div>
                          <Progress value={selectedResult.accuracy} className="h-2" />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-medium">Confusion Matrix</h4>
                        <div className="grid grid-cols-2 gap-2 text-center">
                          <div className="bg-green-100 p-4 rounded">
                            <div className="text-2xl font-bold text-green-800">{selectedResult.tp}</div>
                            <div className="text-xs text-green-600">True Positive</div>
                          </div>
                          <div className="bg-red-100 p-4 rounded">
                            <div className="text-2xl font-bold text-red-800">{selectedResult.fp}</div>
                            <div className="text-xs text-red-600">False Positive</div>
                          </div>
                          <div className="bg-orange-100 p-4 rounded">
                            <div className="text-2xl font-bold text-orange-800">{selectedResult.fn}</div>
                            <div className="text-xs text-orange-600">False Negative</div>
                          </div>
                          <div className="bg-blue-100 p-4 rounded">
                            <div className="text-2xl font-bold text-blue-800">{selectedResult.tn}</div>
                            <div className="text-xs text-blue-600">True Negative</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="documents" className="space-y-4">
                    <div className="space-y-3">
                      {mockDocuments.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-sm text-gray-500">{doc.pages} pages • {doc.matches?.length || 0} matches</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="default">Reviewed</Badge>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setSelectedDocument(doc)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {selectedDocument && (
                      <div className="mt-6">
                        <DocumentViewer 
                          document={selectedDocument}
                          showHighlights={true}
                        />
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="errors" className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-3">False Positives ({selectedResult.fp})</h4>
                        <div className="space-y-2">
                          <div className="bg-red-50 border border-red-200 rounded p-3">
                            <p className="text-sm">
                              "Historical data demonstrates consistent performance across market cycles..."
                            </p>
                            <p className="text-xs text-red-600 mt-1">
                              Document: Q1_Brochure_US.pdf, Page 7
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-3">False Negatives ({selectedResult.fn})</h4>
                        <div className="space-y-2">
                          <div className="bg-orange-50 border border-orange-200 rounded p-3">
                            <p className="text-sm">
                              "Our strategy targets annual returns of 8-12% based on market projections..."
                            </p>
                            <p className="text-xs text-orange-600 mt-1">
                              Document: Investment_Guide_APAC.pdf, Page 15
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a test result</h3>
                <p className="text-gray-600">Choose a test from the list to view detailed analysis</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
