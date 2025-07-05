
import { Clock, CheckCircle, XCircle } from 'lucide-react';

interface ReviewHeaderProps {
  totalPending: number;
  totalApproved: number;
  totalRejected: number;
}

export const ReviewHeader = ({ totalPending, totalApproved, totalRejected }: ReviewHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-900">Review Queue</h1>
      <div className="flex gap-4 text-sm text-gray-600">
        <span className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          {totalPending} Pending
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle className="h-4 w-4 text-green-600" />
          {totalApproved} Approved
        </span>
        <span className="flex items-center gap-1">
          <XCircle className="h-4 w-4 text-red-600" />
          {totalRejected} Rejected
        </span>
      </div>
    </div>
  );
};
