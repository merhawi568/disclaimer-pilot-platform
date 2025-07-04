
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Download, 
  ChevronLeft, 
  ChevronRight,
  FileText,
  Image as ImageIcon
} from 'lucide-react';

interface DocumentViewerProps {
  document: {
    name: string;
    type: 'pdf' | 'image' | 'html';
    pages: number;
    currentPage?: number;
    matches?: Array<{
      page: number;
      text: string;
      highlighted: boolean;
    }>;
  };
  onPageChange?: (page: number) => void;
  showHighlights?: boolean;
}

export const DocumentViewer = ({ 
  document, 
  onPageChange, 
  showHighlights = false 
}: DocumentViewerProps) => {
  const [currentPage, setCurrentPage] = useState(document.currentPage || 1);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= document.pages) {
      setCurrentPage(newPage);
      onPageChange?.(newPage);
    }
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  const renderDocumentContent = () => {
    if (document.type === 'pdf') {
      return (
        <div 
          className="bg-white border-2 border-gray-200 mx-auto shadow-lg"
          style={{ 
            width: `${zoom}%`,
            transform: `rotate(${rotation}deg)`,
            aspectRatio: '8.5/11'
          }}
        >
          <div className="h-full p-8 text-sm leading-relaxed">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Investment Strategy Overview</h2>
              <p className="text-gray-600">Q1 2024 Performance Report</p>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-700">
                Our investment strategies are designed to provide diversified exposure 
                across multiple asset classes and geographic regions.
              </p>
              
              {showHighlights && currentPage === 3 && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 my-4">
                  <p className="text-gray-800">
                    <mark className="bg-yellow-200 px-1">
                      Our strategies aim to deliver strong returns over the long term
                    </mark>, targeting annual growth between 8-12% based on historical market analysis.
                  </p>
                  <Badge className="mt-2 bg-red-100 text-red-800">
                    Missing Disclaimer
                  </Badge>
                </div>
              )}
              
              <p className="text-gray-700">
                The portfolio maintains a balanced approach with 60% equity allocation 
                and 40% fixed income instruments, adjusted quarterly based on market conditions.
              </p>
              
              {currentPage === 1 && (
                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600 italic">
                    Past performance does not guarantee future returns. All investments 
                    carry risk of loss.
                  </p>
                </div>
              )}
            </div>
            
            <div className="absolute bottom-4 right-4 text-xs text-gray-400">
              Page {currentPage} of {document.pages}
            </div>
          </div>
        </div>
      );
    }
    
    if (document.type === 'image') {
      return (
        <div 
          className="bg-white border-2 border-gray-200 mx-auto shadow-lg rounded-lg overflow-hidden"
          style={{ 
            width: `${zoom}%`,
            transform: `rotate(${rotation}deg)`,
            maxWidth: '800px'
          }}
        >
          <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
            <div className="text-center p-8">
              <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Landing Page Screenshot
              </h3>
              <p className="text-gray-600 mb-4">
                Investment Advisory Services - EMEA Region
              </p>
              {showHighlights && (
                <div className="bg-yellow-200 border border-yellow-400 rounded p-2 inline-block">
                  <span className="text-sm font-medium">
                    "Guaranteed 15% Returns"
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="bg-white border-2 border-gray-200 mx-auto shadow-lg rounded-lg p-6">
        <div className="text-center">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">HTML Document Preview</p>
          <p className="text-sm text-gray-500 mt-2">{document.name}</p>
        </div>
      </div>
    );
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center">
              {document.type === 'pdf' && <FileText className="h-5 w-5 mr-2" />}
              {document.type === 'image' && <ImageIcon className="h-5 w-5 mr-2" />}
              {document.name}
            </CardTitle>
            <p className="text-sm text-gray-600">
              Page {currentPage} of {document.pages}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">{zoom}%</span>
            <Button size="sm" variant="outline" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={handleRotate}>
              <RotateCw className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <ScrollArea className="h-96">
          <div className="p-4">
            {renderDocumentContent()}
          </div>
        </ScrollArea>
        
        {/* Navigation Controls */}
        <div className="flex items-center justify-between p-4 border-t bg-gray-50">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          
          <div className="flex items-center space-x-2">
            {Array.from({ length: Math.min(document.pages, 5) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <Button
                  key={pageNum}
                  size="sm"
                  variant={currentPage === pageNum ? "default" : "outline"}
                  className="w-8 h-8 p-0"
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </Button>
              );
            })}
            {document.pages > 5 && <span className="text-sm text-gray-500">...</span>}
          </div>
          
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === document.pages}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
