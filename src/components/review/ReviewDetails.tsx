
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DocumentViewer } from '@/components/DocumentViewer';
import { ReviewActions } from './ReviewActions';

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

interface ReviewDetailsProps {
  selectedItem: ReviewItem;
  comments: string;
  setComments: (comments: string) => void;
  onApprove: () => void;
  onReject: () => void;
  onClose: () => void;
}

export const ReviewDetails = ({ 
  selectedItem, 
  comments, 
  setComments, 
  onApprove, 
  onReject, 
  onClose 
}: ReviewDetailsProps) => {
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
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[classification]}`}>
        {classification} - {labels[classification]}
      </span>
    );
  };

  return (
    <Card className="border-2 border-blue-200 bg-blue-50/30">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Review Details</span>
          <Button onClick={onClose} variant="outline" size="sm">
            Close Details
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Test Information</h4>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Prompt:</span> {selectedItem.prompt}</div>
                <div><span className="font-medium">Document:</span> {selectedItem.documentName}</div>
                <div><span className="font-medium">Page:</span> {selectedItem.pageNumber}</div>
                <div><span className="font-medium">Result:</span> {selectedItem.result}</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Classification</h4>
              {getClassificationBadge(selectedItem.classification)}
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Disclaimer Text</h4>
              <p className="text-sm bg-gray-50 p-3 rounded border">
                {selectedItem.disclaimer}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Citation</h4>
              <p className="text-sm bg-yellow-50 p-3 rounded border border-yellow-200">
                {selectedItem.citation}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Confidence Score</h4>
              <span className={`text-lg font-bold ${getConfidenceColor(selectedItem.confidenceScore)}`}>
                {(selectedItem.confidenceScore * 100).toFixed(1)}%
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Document Preview</h4>
            <DocumentViewer 
              document={{
                name: selectedItem.documentName,
                type: 'image',
                pages: 5,
                currentPage: selectedItem.pageNumber,
                matches: [{
                  page: selectedItem.pageNumber,
                  text: selectedItem.citation,
                  highlighted: true
                }]
              }}
              showHighlights={true}
            />
          </div>
        </div>

        <ReviewActions
          comments={comments}
          setComments={setComments}
          onApprove={onApprove}
          onReject={onReject}
        />
      </CardContent>
    </Card>
  );
};
