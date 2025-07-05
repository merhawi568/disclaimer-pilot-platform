
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, MessageSquare } from 'lucide-react';

interface ReviewItem {
  id: string;
  prompt: string;
  result: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  comments?: string;
}

export const Review = () => {
  const [reviewItems, setReviewItems] = useState<ReviewItem[]>([
    {
      id: '1',
      prompt: 'Test prompt for financial disclaimer',
      result: 'Pass - Disclaimer meets compliance requirements',
      status: 'pending',
      submittedDate: '2024-01-15',
    },
    {
      id: '2',
      prompt: 'Investment risk warning validation',
      result: 'Fail - Missing required risk statements',
      status: 'pending',
      submittedDate: '2024-01-14',
    },
    {
      id: '3',
      prompt: 'General disclaimer compliance check',
      result: 'Pass - All requirements satisfied',
      status: 'approved',
      submittedDate: '2024-01-13',
      comments: 'Approved after thorough review',
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
                <p className="text-sm text-gray-600">Submitted: {item.submittedDate}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Test Result:</p>
                  <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{item.result}</p>
                </div>
                
                {selectedItem === item.id ? (
                  <div className="space-y-3 border-t pt-4">
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
                        onClick={() => handleApprove(item.id)}
                        className="bg-green-600 hover:bg-green-700"
                        size="sm"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleReject(item.id)}
                        variant="destructive"
                        size="sm"
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                      <Button
                        onClick={() => {
                          setSelectedItem(null);
                          setComments('');
                        }}
                        variant="outline"
                        size="sm"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    onClick={() => setSelectedItem(item.id)}
                    variant="outline"
                    size="sm"
                  >
                    Review Item
                  </Button>
                )}
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
                <p className="text-sm text-gray-600">Submitted: {item.submittedDate}</p>
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
