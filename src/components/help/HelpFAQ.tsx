
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search } from 'lucide-react';

export const HelpFAQ = () => {
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

  return (
    <div className="space-y-6">
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
    </div>
  );
};
