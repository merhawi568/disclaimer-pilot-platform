
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

export const HelpDocumentation = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Documentation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Complete User Manual
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Prompt Writing Guide
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Best Practices
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Troubleshooting
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technical Documentation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                API Reference
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Integration Guide
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Data Schema
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Security Guidelines
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-2">Supported Browsers</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Chrome 90+</li>
                <li>Firefox 88+</li>
                <li>Safari 14+</li>
                <li>Edge 90+</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">File Formats</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>PDF documents</li>
                <li>Microsoft Word</li>
                <li>HTML pages</li>
                <li>Plain text files</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">API Limits</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>1000 requests/hour</li>
                <li>10MB file size limit</li>
                <li>Rate limiting applied</li>
                <li>Authentication required</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
