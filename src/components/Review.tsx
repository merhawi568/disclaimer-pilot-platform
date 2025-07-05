
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, FileText, Save } from 'lucide-react';

export const Review = () => {
  const [reviewItems, setReviewItems] = useState([]);
  const [selectedCombo, setSelectedCombo] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [reviewData, setReviewData] = useState({});

  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem('reviewItems') || '[]');
    setReviewItems(storedReviews);
  }, []);

  const handleSectionToggle = (index) => {
    setOpenSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleComboSelect = (combo) => {
    setSelectedCombo(combo);
  };

  const handleReviewChange = (itemId, field, value) => {
    setReviewData(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [field]: value
      }
    }));
  };

  const handleSaveReview = () => {
    console.log('Saving review data:', reviewData);
    alert('Review data saved successfully!');
  };

  if (reviewItems.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Review</h1>
          <p className="text-gray-600 mt-1">Review submitted analysis results</p>
        </div>
        
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Items for Review</h3>
            <p className="text-gray-500">
              Items submitted for review will appear here. Go to "Test a Disclaimer" to submit analysis results for review.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Review</h1>
        <p className="text-gray-600 mt-1">Review submitted analysis results ({reviewItems.length} submissions)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Review Items by Disclaimer/Prompt Combo */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Review Submissions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {reviewItems.map((item, index) => (
                <Collapsible key={index}>
                  <CollapsibleTrigger
                    className="flex items-center justify-between w-full p-3 text-left hover:bg-gray-50 rounded-lg"
                    onClick={() => handleSectionToggle(index)}
                  >
                    <div className="flex-1">
                      <div className="font-medium text-sm">
                        Submission {index + 1}
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.selectedItems.length} items • {new Date(item.submittedAt).toLocaleDateString()}
                      </div>
                    </div>
                    {openSections[index] ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="px-3 pb-3">
                    <div className="space-y-2 ml-4">
                      <div>
                        <Label className="text-xs text-gray-500">Prompt:</Label>
                        <p className="text-xs text-gray-700 truncate" title={item.prompt}>
                          {item.prompt.substring(0, 50)}...
                        </p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Disclaimer:</Label>
                        <p className="text-xs text-gray-700 truncate" title={item.disclaimer}>
                          {item.disclaimer.substring(0, 30)}...
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-2"
                        onClick={() => handleComboSelect(item)}
                      >
                        Review Items
                      </Button>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Selected Combo Details */}
        <div className="lg:col-span-2">
          {selectedCombo ? (
            <Card>
              <CardHeader>
                <CardTitle>Review Analysis Results</CardTitle>
                <div className="space-y-2">
                  <div>
                    <Label className="text-sm font-medium">Prompt:</Label>
                    <p className="text-sm text-gray-700">{selectedCombo.prompt}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Disclaimer:</Label>
                    <p className="text-sm text-gray-700">{selectedCombo.disclaimer}</p>
                  </div>
                  <div className="flex gap-4 text-xs text-gray-500">
                    <span>Recall: {selectedCombo.recall}%</span>
                    <span>Specificity: {selectedCombo.specificity}%</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Results for Review ({selectedCombo.selectedItems.length} items)</h3>
                    <Button onClick={handleSaveReview} size="sm">
                      <Save className="h-4 w-4 mr-2" />
                      Save Review
                    </Button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Document Name</TableHead>
                          <TableHead>Original Result</TableHead>
                          <TableHead>Reason</TableHead>
                          <TableHead>Reviewer Agrees?</TableHead>
                          <TableHead>Review Comments</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedCombo.selectedItems.map(item => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.documentName}</TableCell>
                            <TableCell>
                              <Badge variant={item.flagged ? "destructive" : "secondary"}>
                                {item.flagged ? "Flagged" : "Not Flagged"}
                              </Badge>
                            </TableCell>
                            <TableCell className="max-w-xs">
                              <div className="truncate" title={item.reason}>
                                {item.reason}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Select
                                value={reviewData[item.id]?.agrees || ''}
                                onValueChange={(value) => handleReviewChange(item.id, 'agrees', value)}
                              >
                                <SelectTrigger className="w-24">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="yes">Yes</SelectItem>
                                  <SelectItem value="no">No</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <Textarea
                                placeholder="Add review comments..."
                                className="min-h-[60px] resize-none"
                                value={reviewData[item.id]?.comments || ''}
                                onChange={(e) => handleReviewChange(item.id, 'comments', e.target.value)}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Submission to Review</h3>
                <p className="text-gray-500">
                  Choose a disclaimer/prompt combination from the left panel to start reviewing the analysis results.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
