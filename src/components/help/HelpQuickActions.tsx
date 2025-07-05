
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Video, FileText, MessageCircle } from 'lucide-react';

export const HelpQuickActions = () => {
  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle>Quick Help</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <BookOpen className="h-4 w-4 mr-2" />
            User Guide
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Video className="h-4 w-4 mr-2" />
            Video Tutorials
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <FileText className="h-4 w-4 mr-2" />
            API Documentation
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <MessageCircle className="h-4 w-4 mr-2" />
            Live Chat
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
