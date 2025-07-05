
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, XCircle, MessageSquare } from 'lucide-react';

interface ReviewActionsProps {
  comments: string;
  setComments: (comments: string) => void;
  onApprove: () => void;
  onReject: () => void;
}

export const ReviewActions = ({ comments, setComments, onApprove, onReject }: ReviewActionsProps) => {
  return (
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
            onClick={onApprove}
            className="bg-green-600 hover:bg-green-700"
            size="sm"
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            Approve
          </Button>
          <Button
            onClick={onReject}
            variant="destructive"
            size="sm"
          >
            <XCircle className="h-4 w-4 mr-1" />
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
};
