import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { DocumentViewer } from '@/components/DocumentViewer';
import { CheckCircle, XCircle, Clock, MessageSquare, FileText, AlertTriangle } from 'lucide-react';

interface ReviewItem {
  id: string;
  prompt: string;
  disclaimer: string;
  documentName: string;
  pageNumber: number;
  result: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  comments?: string;
  citation: string;
  confidenceScore: number;
  classification: 'TP' | 'TN' | 'FP' | 'FN';
}

export const Review = () => {
  const [reviewItems, setReviewItems] = useState<ReviewItem[]>([
    {
      id: '1',
      prompt: 'Test prompt for financial disclaimer',
      disclaimer: 'Past performance does not guarantee future results. All investments carry risk of loss.',
      documentName: 'Investment_Strategy_Q1_2024.pdf',
      pageNumber: 3,
      result: 'Pass - Disclaimer meets compliance requirements',
      status: 'pending',
      submittedDate: '2024-01-15',
      citation: 'Page 3, Paragraph 2: "Our strategies aim to deliver strong returns over the long term"',
      confidenceScore: 0.92,
      classification: 'TP'
    },
    {
      id: '2',
      prompt: 'Investment risk warning validation',
      disclaimer: 'Investment involves risk. You may lose some or all of your invested capital.',
      documentName: 'Landing_Page_Screenshot.png',
      pageNumber: 1,
      result: 'Fail - Missing required risk statements',
      status: 'pending',
      submittedDate: '2024-01-14',
      citation: 'Main banner section: "Guaranteed 15% Returns" without risk disclosure',
      confidenceScore: 0.87,
      classification: 'FP'
    },
    {
      id: '3',
      prompt: 'General disclaimer compliance check',
      disclaimer: 'This information is for educational purposes only and should not be considered as investment advice.',
      documentName: 'Advisory_Services_Brochure.pdf',
      pageNumber: 1,
      result: 'Pass - All requirements satisfied',
      status: 'approved',
      submittedDate: '2024-01-13',
      comments: 'Approved after thorough review',
      citation: 'Footer section: Complete disclaimer text present',
      confidenceScore: 0.95,
      classification: 'TN'
    },
  ]);

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [comments, setComments] = useState('');

  const handleApprove = (itemId: string) => {
    setReviewItems(items =>
      items.map(item =>
        item.id === itemId
          ? { ...item, status: 'approved' as const, comments }
          : item
      )
    );
    setSelectedItem(null);
    setComments('');
  };

  const handleReject = (itemId: string) => {
    setReviewItems(items =>
      items.map(item =>
        item.id === itemId
          ? { ...item, status: 'rejected' as const, comments }
          : item
      )
    );
    setSelectedItem(null);
    setComments('');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
    }
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 0.9) return 'text-green-600';
    if (score >= 0.7) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getClassificationBadge = (classification: 'TP' | 'TN' | 'FP' | 'FN') => {
    const colors = {
      'TP': 'bg-green-100 text-green-800',
      'TN': 'bg-blue-100 text-blue-800',
      'FP': 'bg-red-100 text-red-800',
      'FN': 'bg-orange-100 text-orange-800'
    };
    
    const labels = {
      'TP': 'True Positive',
      'TN': 'True Negative',
      'FP': 'False Positive',
      'FN': 'False Negative'
    };

    return (
      <Badge className={`${colors[classification]} hover:${colors[classification]} font-medium`}>
        {classification} - {labels[classification]}
      </Badge>
    );
  };

  const selectedItemData = selectedItem ? reviewItems.find(item => item.id === selectedItem) : null;

  const pendingItems = reviewItems.filter(item => item.status === 'pending');
  const completedItems = reviewItems.filter(item => item.status !== 'pending');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Review Queue</h1>
        <div className="flex gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {pendingItems.length} Pending
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4 text-green-600" />
            {completedItems.filter(item => item.status === 'approved').length} Approved
          </span>
          <span className="flex items-center gap-1">
            <XCircle className="h-4 w-4 text-red-600" />
            {completedItems.filter(item => item.status === 'rejected').length} Rejected
          </span>
        </div>
      </div>

      {selectedItemData && (
        <Card className="border-2 border-blue-200 bg-blue-50/30">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Review Details</span>
              <Button
                onClick={() => {
                  setSelectedItem(null);
                  setComments('');
                }}
                variant="outline"
                size="sm"
              >
                Close Details
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Details */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Test Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Prompt:</span> {selectedItemData.prompt}</div>
                    <div><span className="font-medium">Document:</span> {selectedItemData.documentName}</div>
                    <div><span className="font-medium">Page:</span> {selectedItemData.pageNumber}</div>
                    <div><span className="font-medium">Result:</span> {selectedItemData.result}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Classification</h4>
                  {getClassificationBadge(selectedItemData.classification)}
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Disclaimer Text</h4>
                  <p className="text-sm bg-gray-50 p-3 rounded border">
                    {selectedItemData.disclaimer}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Citation</h4>
                  <p className="text-sm bg-yellow-50 p-3 rounded border border-yellow-200">
                    {selectedItemData.citation}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Confidence Score</h4>
                  <span className={`text-lg font-bold ${getConfidenceColor(selectedItemData.confidenceScore)}`}>
                    {(selectedItemData.confidenceScore * 100).toFixed(1)}%
                  </span>
                </div>
              </div>

              {/* Right Column - Document Viewer */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Document Preview</h4>
                <DocumentViewer 
                  document={{
                    name: selectedItemData.documentName,
                    type: 'image',
                    pages: 5,
                    currentPage: selectedItemData.pageNumber,
                    matches: [{
                      page: selectedItemData.pageNumber,
                      text: selectedItemData.citation,
                      highlighted: true
                    }]
                  }}
                  showHighlights={true}
                />
              </div>
            </div>

            {/* Review Actions */}
            <div className="border-t pt-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    <MessageSquare className="h-4 w-4 inline mr-1" />
                    Review Comments
                  </label>
                  <Textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Add your review comments..."
                    className="min-h-[80px]"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleApprove(selectedItemData.id)}
                    className="bg-green-600 hover:bg-green-700"
                    size="sm"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleReject(selectedItemData.id)}
                    variant="destructive"
                    size="sm"
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pending Reviews */}
      {pendingItems.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Pending Reviews</h2>
          {pendingItems.map((item) => (
            <Card key={item.id} className="border-l-4 border-l-yellow-400">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{item.prompt}</CardTitle>
                  {getStatusBadge(item.status)}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Submitted: {item.submittedDate}</span>
                  <span className="flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    {item.documentName}
                  </span>
                  <span>Page {item.pageNumber}</span>
                  <span className={`font-medium ${getConfidenceColor(item.confidenceScore)}`}>
                    {(item.confidenceScore * 100).toFixed(1)}% confidence
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Test Result:</p>
                  <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{item.result}</p>
                </div>
                
                <Button
                  onClick={() => setSelectedItem(item.id)}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <FileText className="h-4 w-4 mr-1" />
                  Review Item Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Completed Reviews */}
      {completedItems.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Completed Reviews</h2>
          {completedItems.map((item) => (
            <Card key={item.id} className={`border-l-4 ${item.status === 'approved' ? 'border-l-green-400' : 'border-l-red-400'}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{item.prompt}</CardTitle>
                  {getStatusBadge(item.status)}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Submitted: {item.submittedDate}</span>
                  <span className="flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    {item.documentName}
                  </span>
                  <span>Page {item.pageNumber}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Test Result:</p>
                  <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{item.result}</p>
                </div>
                {item.comments && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Review Comments:</p>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{item.comments}</p>
                  </div>
                )}
                <Button
                  onClick={() => setSelectedItem(item.id)}
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {reviewItems.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items to review</h3>
            <p className="text-gray-600">Items submitted for review will appear here.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
