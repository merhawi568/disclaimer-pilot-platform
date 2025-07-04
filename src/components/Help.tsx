
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, BookOpen, Video, MessageCircle, FileText, ExternalLink } from 'lucide-react';

export const Help = () => {
  const faqs = [
    {
      question: "How do I create my first disclaimer test?",
      answer: "Navigate to the 'Test a Disclaimer' tab and follow the 7-step wizard. Start by selecting or entering your disclaimer text, then filter documents, review matches, and configure your detection prompt."
    },
    {
      question: "What's the difference between precision and recall?",
      answer: "Precision measures how many of the detected matches are actually correct (TP / (TP + FP)). Recall measures how many of the actual disclaimers were successfully detected (TP / (TP + FN))."
    },
    {
      question: "How can I improve my prompt accuracy?",
      answer: "Review false positives and false negatives in your test results. Use the AI suggestions to refine trigger words, and consider testing variations of your prompt with different document sets."
    },
    {
      question: "Can I integrate with external document sources?",
      answer: "Yes, the platform supports SharePoint, S3, OneDrive, and Box integrations. Contact your admin to configure new document sources in the Admin panel."
    },
  ];

  const tutorials = [
    { title: "Getting Started: Your First Test", duration: "5 min", type: "Video" },
    { title: "Understanding Test Metrics", duration: "8 min", type: "Article" },
    { title: "Advanced Prompt Engineering", duration: "12 min", type: "Video" },
    { title: "Managing Document Sources", duration: "6 min", type: "Article" },
    { title: "Analytics and Reporting", duration: "10 min", type: "Video" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
          <p className="text-gray-600 mt-1">Get help, tutorials, and documentation</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <MessageCircle className="h-4 w-4 mr-2" />
          Contact Support
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Quick Actions */}
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

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="faq" className="space-y-6">
            <TabsList>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
              <TabsTrigger value="documentation">Documentation</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>

            <TabsContent value="faq" className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search frequently asked questions..." className="pl-10" />
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-gray-600">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tutorials" className="space-y-6">
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
            </TabsContent>

            <TabsContent value="documentation" className="space-y-6">
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
            </TabsContent>

            <TabsContent value="support" className="space-y-6">
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
