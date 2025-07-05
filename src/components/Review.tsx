import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';
import { ReviewHeader } from './review/ReviewHeader';
import { ReviewDetails } from './review/ReviewDetails';
import { ReviewGroupCard } from './review/ReviewGroupCard';

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
      prompt: 'Test prompt for financial disclaimer',
      disclaimer: 'Past performance does not guarantee future results. All investments carry risk of loss.',
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
      prompt: 'Investment risk warning validation',
      disclaimer: 'Investment involves risk. You may lose some or all of your invested capital.',
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
    {
      id: '4',
      prompt: 'Investment risk warning validation',
      disclaimer: 'Investment involves risk. You may lose some or all of your invested capital.',
      documentName: 'Marketing_Flyer.pdf',
      pageNumber: 2,
      result: 'Fail - Incomplete risk disclosure',
      status: 'rejected',
      submittedDate: '2024-01-12',
      comments: 'Risk disclosure is too generic',
      citation: 'Bottom section: Missing specific investment risks',
      confidenceScore: 0.78,
      classification: 'FN'
    },
  ]);

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [comments, setComments] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  // Group items by prompt + disclaimer combination
  const groupedItems: GroupedItems[] = reviewItems.reduce((acc, item) => {
    const key = `${item.prompt}|||${item.disclaimer}`;
    const existingGroup = acc.find(group => group.key === key);
    
    if (existingGroup) {
      existingGroup.items.push(item);
      if (item.status === 'pending') existingGroup.pendingCount++;
      if (item.status === 'approved') existingGroup.approvedCount++;
      if (item.status === 'rejected') existingGroup.rejectedCount++;
    } else {
      acc.push({
        key,
        prompt: item.prompt,
        disclaimer: item.disclaimer,
        items: [item],
        pendingCount: item.status === 'pending' ? 1 : 0,
        approvedCount: item.status === 'approved' ? 1 : 0,
        rejectedCount: item.status === 'rejected' ? 1 : 0,
      });
    }
    
    return acc;
  }, [] as GroupedItems[]);

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

  const toggleGroup = (groupKey: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupKey)) {
      newExpanded.delete(groupKey);
    } else {
      newExpanded.add(groupKey);
    }
    setExpandedGroups(newExpanded);
  };

  const selectedItemData = selectedItem ? reviewItems.find(item => item.id === selectedItem) : null;

  const totalPending = reviewItems.filter(item => item.status === 'pending').length;
  const totalApproved = reviewItems.filter(item => item.status === 'approved').length;
  const totalRejected = reviewItems.filter(item => item.status === 'rejected').length;

  return (
    <div className="space-y-6">
      <ReviewHeader 
        totalPending={totalPending}
        totalApproved={totalApproved}
        totalRejected={totalRejected}
      />

      {selectedItemData && (
        <ReviewDetails
          selectedItem={selectedItemData}
          comments={comments}
          setComments={setComments}
          onApprove={() => handleApprove(selectedItemData.id)}
          onReject={() => handleReject(selectedItemData.id)}
          onClose={() => {
            setSelectedItem(null);
            setComments('');
          }}
        />
      )}

      <div className="space-y-4">
        {groupedItems.map((group) => (
          <ReviewGroupCard
            key={group.key}
            group={group}
            isExpanded={expandedGroups.has(group.key)}
            onToggle={() => toggleGroup(group.key)}
            onSelectItem={setSelectedItem}
          />
        ))}
      </div>

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
