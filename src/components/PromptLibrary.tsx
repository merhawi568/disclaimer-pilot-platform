
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Play, Edit } from 'lucide-react';

export const PromptLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDisclaimer, setFilterDisclaimer] = useState('all');
  const [filterRegion, setFilterRegion] = useState('all');

  const prompts = [
    {
      id: 1,
      name: "Future Returns Detection v2.1",
      disclaimer: "Past performance does not guarantee future returns",
      accuracy: 94.2,
      lastRun: "2 hours ago",
      region: "US",
      lob: "Private Bank",
      tests: 45,
      description: "Identify any mention of future returns or performance expectations"
    },
    {
      id: 2,
      name: "Insurance Status Checker",
      disclaimer: "Not FDIC insured",
      accuracy: 89.7,
      lastRun: "5 hours ago",
      region: "US",
      lob: "Asset Management",
      tests: 38,
      description: "Detect mentions of insured or protected status without proper disclaimers"
    },
    {
      id: 3,
      name: "Investment Advice Filter",
      disclaimer: "No investment advice",
      accuracy: 91.3,
      lastRun: "1 day ago",
      region: "EMEA",
      lob: "Private Bank",
      tests: 29,
      description: "Identify language that could be construed as investment advice"
    },
    {
      id: 4,
      name: "Risk Warning Detector",
      disclaimer: "Risk of loss",
      accuracy: 87.9,
      lastRun: "2 days ago",
      region: "APAC",
      lob: "Asset Management",
      tests: 33,
      description: "Detect content discussing investment risks without proper warnings"
    },
    {
      id: 5,
      name: "Hypothetical Performance Classifier",
      disclaimer: "Hypothetical performance",
      accuracy: 92.5,
      lastRun: "3 days ago",
      region: "US",
      lob: "Private Bank",
      tests: 21,
      description: "Identify backtested or hypothetical performance data"
    },
  ];

  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = prompt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDisclaimer = filterDisclaimer === 'all' || prompt.disclaimer.includes(filterDisclaimer);
    const matchesRegion = filterRegion === 'all' || prompt.region === filterRegion;
    
    return matchesSearch && matchesDisclaimer && matchesRegion;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Prompt Library</h1>
          <p className="text-gray-600 mt-1">Manage and test your disclaimer detection prompts</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Create New Prompt
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search prompts by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={filterDisclaimer} onValueChange={setFilterDisclaimer}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by disclaimer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Disclaimers</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
                <SelectItem value="FDIC">FDIC Insurance</SelectItem>
                <SelectItem value="advice">Investment Advice</SelectItem>
                <SelectItem value="risk">Risk</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterRegion} onValueChange={setFilterRegion}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="US">US</SelectItem>
                <SelectItem value="EMEA">EMEA</SelectItem>
                <SelectItem value="APAC">APAC</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPrompts.map((prompt) => (
          <Card key={prompt.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{prompt.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{prompt.description}</p>
                </div>
                <Badge 
                  className={
                    prompt.accuracy >= 90 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }
                >
                  {prompt.accuracy}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm">
                  <span className="font-medium text-gray-700">Disclaimer:</span>
                  <p className="text-gray-600 mt-1 italic">"{prompt.disclaimer}"</p>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{prompt.region} • {prompt.lob}</span>
                  <span>{prompt.tests} tests</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Last run: {prompt.lastRun}</span>
                </div>
                
                <div className="flex space-x-2 pt-2">
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" className="flex-1">
                    <Play className="h-4 w-4 mr-1" />
                    Test Again
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPrompts.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No prompts found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
            <Button variant="outline">Clear Filters</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
