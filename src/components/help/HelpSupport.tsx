
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, FileText } from 'lucide-react';

export const HelpSupport = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Priority Support</h4>
                <p className="text-blue-800 text-sm mb-3">
                  Get help within 4 hours for urgent issues
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Open Priority Ticket
                </Button>
              </div>
              
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Live Chat (Online)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Submit Ticket
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Support Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Business Hours</h4>
                <p className="text-sm text-gray-600">
                  Monday - Friday<br/>
                  9:00 AM - 6:00 PM EST
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Emergency Support</h4>
                <p className="text-sm text-gray-600">
                  24/7 for critical issues<br/>
                  Response within 1 hour
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Response Times</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Priority:</span>
                    <span>4 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Standard:</span>
                    <span>24 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>General:</span>
                    <span>48 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium">All Systems Operational</span>
              </div>
              <Badge className="bg-green-100 text-green-800">Healthy</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="flex items-center justify-between">
                <span>API Services</span>
                <Badge className="bg-green-100 text-green-800">Online</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Document Processing</span>
                <Badge className="bg-green-100 text-green-800">Online</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>AI Models</span>
                <Badge className="bg-green-100 text-green-800">Online</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
