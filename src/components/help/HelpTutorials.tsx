
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Video, FileText, ExternalLink } from 'lucide-react';

export const HelpTutorials = () => {
  const tutorials = [
    { title: "Getting Started: Your First Test", duration: "5 min", type: "Video" },
    { title: "Understanding Test Metrics", duration: "8 min", type: "Article" },
    { title: "Advanced Prompt Engineering", duration: "12 min", type: "Video" },
    { title: "Managing Document Sources", duration: "6 min", type: "Article" },
    { title: "Analytics and Reporting", duration: "10 min", type: "Video" },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Learning Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tutorials.map((tutorial, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    {tutorial.type === 'Video' ? 
                      <Video className="h-5 w-5 text-blue-600" /> : 
                      <FileText className="h-5 w-5 text-blue-600" />
                    }
                  </div>
                  <div>
                    <p className="font-medium">{tutorial.title}</p>
                    <p className="text-sm text-gray-500">{tutorial.duration} • {tutorial.type}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Platform Overview</span>
                <Badge variant="outline">New</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">First Test Walkthrough</span>
                <Badge>Essential</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Understanding Results</span>
                <Badge>Essential</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Advanced Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Custom Prompt Engineering</span>
                <Badge variant="secondary">Advanced</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Analytics Deep Dive</span>
                <Badge variant="secondary">Advanced</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">API Integration Guide</span>
                <Badge variant="secondary">Developer</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
