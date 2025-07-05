
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, FileText, CheckCircle, XCircle, Clock } from 'lucide-react';

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

interface GroupedItems {
  key: string;
  prompt: string;
  disclaimer: string;
  items: ReviewItem[];
  pendingCount: number;
  approvedCount: number;
  rejectedCount: number;
}

interface ReviewGroupCardProps {
  group: GroupedItems;
  isExpanded: boolean;
  onToggle: () => void;
  onSelectItem: (itemId: string) => void;
}

export const ReviewGroupCard = ({ group, isExpanded, onToggle, onSelectItem }: ReviewGroupCardProps) => {
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

  return (
    <Card className="border-l-4 border-l-blue-400">
      <Collapsible open={isExpanded} onOpenChange={onToggle}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                {isExpanded ? 
                  <ChevronDown className="h-4 w-4" /> : 
                  <ChevronRight className="h-4 w-4" />
                }
                {group.prompt}
              </CardTitle>
              <div className="flex gap-2">
                {group.pendingCount > 0 && 
                  <Badge className="bg-yellow-100 text-yellow-800">
                    {group.pendingCount} Pending
                  </Badge>
                }
                {group.approvedCount > 0 && 
                  <Badge className="bg-green-100 text-green-800">
                    {group.approvedCount} Approved
                  </Badge>
                }
                {group.rejectedCount > 0 && 
                  <Badge className="bg-red-100 text-red-800">
                    {group.rejectedCount} Rejected
                  </Badge>
                }
              </div>
            </div>
            <div className="text-sm text-gray-600 text-left">
              <strong>Disclaimer:</strong> {group.disclaimer}
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0 space-y-4">
            {group.items.map((item) => (
              <Card key={item.id} className="bg-gray-50 border">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        {item.documentName}
                      </span>
                      <span>Page {item.pageNumber}</span>
                      <span>Submitted: {item.submittedDate}</span>
                      <span className={`font-medium ${getConfidenceColor(item.confidenceScore)}`}>
                        {(item.confidenceScore * 100).toFixed(1)}% confidence
                      </span>
                    </div>
                    {getStatusBadge(item.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Test Result:</p>
                    <p className="text-sm text-gray-900 bg-white p-2 rounded border">{item.result}</p>
                  </div>
                  
                  {item.comments && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Review Comments:</p>
                      <p className="text-sm text-gray-900 bg-white p-2 rounded border">{item.comments}</p>
                    </div>
                  )}
                  
                  <Button
                    onClick={() => onSelectItem(item.id)}
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
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
