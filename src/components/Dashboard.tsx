import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { TrendingUp, Users, FileText, AlertTriangle, TestTube, Target, BarChart3, Clock, CheckCircle, XCircle } from 'lucide-react';

interface DashboardProps {
  onNavigate?: (tab: string) => void;
}

export const Dashboard = ({ onNavigate }: DashboardProps) => {
  const recentTests = [
    { name: 'Investment Returns Disclaimer', accuracy: 94, status: 'Completed', date: '2 hours ago' },
    { name: 'FDIC Insurance Notice', accuracy: 87, status: 'In Progress', date: '5 hours ago' },
    { name: 'Risk Warning Statement', accuracy: 92, status: 'Completed', date: '1 day ago' },
  ];

  const topPrompts = [
    { rank: 1, name: "Future Returns Detection v2.2", recall: 94.2, specificity: 91.8, tests: 89 },
    { rank: 2, name: "Investment Advice Filter v3.1", recall: 91.3, specificity: 89.5, tests: 67 },
    { rank: 3, name: "Insurance Status Checker v1.5", recall: 89.7, specificity: 87.2, tests: 52 },
    { rank: 4, name: "Risk Warning Detector v2.0", recall: 88.9, specificity: 86.1, tests: 39 },
    { rank: 5, name: "Hypothetical Performance Classifier", recall: 87.4, specificity: 84.3, tests: 28 },
  ];

  // Review statistics data
  const reviewStats = {
    totalPending: 12,
    totalApproved: 45,
    totalRejected: 8,
    promptDisclaimerCombos: 5
  };

  // Prompt and disclaimer combinations with their metrics
  const promptDisclaimerMetrics = [
    {
      prompt: "Test prompt for financial disclaimer",
      disclaimer: "Past performance does not guarantee future results. All investments carry risk of loss.",
      pending: 2,
      approved: 1,
      rejected: 0,
      recall: 92.5,
      specificity: 88.3
    },
    {
      prompt: "Investment risk warning validation",
      disclaimer: "Investment involves risk. You may lose some or all of your invested capital.",
      pending: 0,
      approved: 1,
      rejected: 1,
      recall: 85.7,
      specificity: 82.1
    },
    {
      prompt: "FDIC insurance verification",
      disclaimer: "Not FDIC insured. No bank guarantee. May lose value.",
      pending: 3,
      approved: 2,
      rejected: 1,
      recall: 89.4,
      specificity: 91.2
    },
    {
      prompt: "Hypothetical performance warning",
      disclaimer: "Hypothetical performance results have inherent limitations.",
      pending: 4,
      approved: 3,
      rejected: 2,
      recall: 87.8,
      specificity: 84.6
    },
    {
      prompt: "Investment advice disclaimer",
      disclaimer: "This is not investment advice. Please consult a financial advisor.",
      pending: 3,
      approved: 5,
      rejected: 4,
      recall: 91.2,
      specificity: 86.7
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard & Analytics</h1>
          <p className="text-gray-600 mt-1">Last 30 days performance overview</p>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => onNavigate?.('test-disclaimer')}
        >
          New Test
        </Button>
      </div>

      {/* Key Metrics - Last 30 Days */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Prompts</CardTitle>
            <TestTube className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">Active in last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reviewStats.totalPending}</div>
            <p className="text-xs text-muted-foreground">{reviewStats.promptDisclaimerCombos} prompt/disclaimer combos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Recall</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">90.4%</div>
            <p className="text-xs text-muted-foreground">+3.2% from previous 30d</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents Tested</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Review Status Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Review Status Summary
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onNavigate?.('review')}
            >
              View All Reviews
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                <span className="font-medium">Pending Review</span>
              </div>
              <span className="text-2xl font-bold text-yellow-700">{reviewStats.totalPending}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium">Approved</span>
              </div>
              <span className="text-2xl font-bold text-green-700">{reviewStats.totalApproved}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-600" />
                <span className="font-medium">Rejected</span>
              </div>
              <span className="text-2xl font-bold text-red-700">{reviewStats.totalRejected}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="rankings">Top Prompts Ranking</TabsTrigger>
          <TabsTrigger value="prompt-metrics">Prompt/Disclaimer Metrics</TabsTrigger>
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Summary (30 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Best Performing Category</p>
                      <p className="text-xs text-gray-600">Future Returns Detection</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-700">94.2%</p>
                      <p className="text-xs text-gray-500">Avg Recall</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Most Tested</p>
                      <p className="text-xs text-gray-600">Investment Advice Filters</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-700">89</p>
                      <p className="text-xs text-gray-500">Tests Run</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Needs Attention</p>
                      <p className="text-xs text-gray-600">FDIC Insurance Checks</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-yellow-700">78.4%</p>
                      <p className="text-xs text-gray-500">Below Target</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Trend */}
            <Card>
              <CardHeader>
                <CardTitle>30-Day Performance Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    recall: {
                      label: "Recall",
                      color: "hsl(220, 70%, 50%)",
                    },
                    specificity: {
                      label: "Specificity", 
                      color: "hsl(142, 76%, 36%)",
                    },
                    accuracy: {
                      label: "Accuracy",
                      color: "hsl(291, 64%, 42%)",
                    },
                  }}
                  className="h-64"
                >
                  <LineChart
                    data={[
                      { day: "Dec 18", recall: 82, specificity: 85, accuracy: 83 },
                      { day: "Dec 19", recall: 83, specificity: 86, accuracy: 84 },
                      { day: "Dec 20", recall: 84, specificity: 87, accuracy: 85 },
                      { day: "Dec 21", recall: 85, specificity: 88, accuracy: 86 },
                      { day: "Dec 22", recall: 86, specificity: 89, accuracy: 87 },
                      { day: "Dec 23", recall: 87, specificity: 90, accuracy: 88 },
                      { day: "Dec 24", recall: 88, specificity: 91, accuracy: 89 },
                      { day: "Dec 25", recall: 89, specificity: 92, accuracy: 90 },
                      { day: "Dec 26", recall: 90, specificity: 93, accuracy: 91 },
                      { day: "Dec 27", recall: 91, specificity: 94, accuracy: 92 },
                      { day: "Dec 28", recall: 92, specificity: 95, accuracy: 93 },
                      { day: "Dec 29", recall: 93, specificity: 96, accuracy: 94 },
                      { day: "Dec 30", recall: 94, specificity: 97, accuracy: 95 },
                      { day: "Dec 31", recall: 95, specificity: 98, accuracy: 96 },
                      { day: "Jan 1", recall: 96, specificity: 99, accuracy: 97 },
                      { day: "Jan 2", recall: 97, specificity: 100, accuracy: 98 },
                      { day: "Jan 3", recall: 98, specificity: 99, accuracy: 98.5 },
                      { day: "Jan 4", recall: 99, specificity: 98, accuracy: 98.5 },
                      { day: "Jan 5", recall: 100, specificity: 97, accuracy: 98.5 },
                      { day: "Jan 6", recall: 99.5, specificity: 96, accuracy: 97.8 },
                      { day: "Jan 7", recall: 99, specificity: 95, accuracy: 97 },
                      { day: "Jan 8", recall: 98.5, specificity: 94, accuracy: 96.3 },
                      { day: "Jan 9", recall: 98, specificity: 93, accuracy: 95.5 },
                      { day: "Jan 10", recall: 97.5, specificity: 92, accuracy: 94.8 },
                      { day: "Jan 11", recall: 97, specificity: 91, accuracy: 94 },
                      { day: "Jan 12", recall: 96.5, specificity: 90, accuracy: 93.3 },
                      { day: "Jan 13", recall: 96, specificity: 89, accuracy: 92.5 },
                      { day: "Jan 14", recall: 95.5, specificity: 88, accuracy: 91.8 },
                      { day: "Jan 15", recall: 95, specificity: 87, accuracy: 91 },
                      { day: "Jan 16", recall: 94.5, specificity: 86, accuracy: 90.3 },
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient id="recallGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(220, 70%, 50%)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(220, 70%, 50%)" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="specificityGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(291, 64%, 42%)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(291, 64%, 42%)" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
                    <XAxis 
                      dataKey="day" 
                      className="text-xs"
                      interval="preserveStartEnd"
                      tick={{ fontSize: 10 }}
                    />
                    <YAxis 
                      domain={[75, 105]}
                      className="text-xs"
                      tick={{ fontSize: 10 }}
                    />
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                    />
                    <Line 
                      type="linear" 
                      dataKey="recall" 
                      stroke="hsl(220, 70%, 50%)" 
                      strokeWidth={3}
                      dot={{ fill: "hsl(220, 70%, 50%)", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: "hsl(220, 70%, 50%)", stroke: "white", strokeWidth: 2 }}
                    />
                    <Line 
                      type="linear" 
                      dataKey="specificity" 
                      stroke="hsl(142, 76%, 36%)" 
                      strokeWidth={3}
                      dot={{ fill: "hsl(142, 76%, 36%)", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: "hsl(142, 76%, 36%)", stroke: "white", strokeWidth: 2 }}
                    />
                    <Line 
                      type="linear" 
                      dataKey="accuracy" 
                      stroke="hsl(291, 64%, 42%)" 
                      strokeWidth={3}
                      dot={{ fill: "hsl(291, 64%, 42%)", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: "hsl(291, 64%, 42%)", stroke: "white", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rankings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Prompts (Last 30 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topPrompts.map((prompt) => (
                  <div key={prompt.rank} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-800">
                        {prompt.rank}
                      </div>
                      <div>
                        <p className="font-medium">{prompt.name}</p>
                        <p className="text-sm text-gray-500">{prompt.tests} tests completed</p>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="flex space-x-4 text-sm">
                        <div>
                          <span className="text-gray-500">Recall: </span>
                          <span className="font-medium">{prompt.recall}%</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Specificity: </span>
                          <span className="font-medium">{prompt.specificity}%</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Progress value={prompt.recall} className="h-2 w-16" />
                        <Progress value={prompt.specificity} className="h-2 w-16" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prompt-metrics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Prompt & Disclaimer Performance Metrics</CardTitle>
              <p className="text-sm text-gray-600">Performance metrics for each prompt and disclaimer combination</p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prompt</TableHead>
                    <TableHead>Disclaimer</TableHead>
                    <TableHead>Review Status</TableHead>
                    <TableHead>Recall</TableHead>
                    <TableHead>Specificity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {promptDisclaimerMetrics.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium max-w-xs">
                        <div className="truncate" title={item.prompt}>
                          {item.prompt}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <div className="truncate text-sm" title={item.disclaimer}>
                          {item.disclaimer}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 flex-wrap">
                          {item.pending > 0 && (
                            <Badge className="bg-yellow-100 text-yellow-800">
                              {item.pending} Pending
                            </Badge>
                          )}
                          {item.approved > 0 && (
                            <Badge className="bg-green-100 text-green-800">
                              {item.approved} Approved
                            </Badge>
                          )}
                          {item.rejected > 0 && (
                            <Badge className="bg-red-100 text-red-800">
                              {item.rejected} Rejected
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.recall}%</span>
                          <Progress value={item.recall} className="h-2 w-16" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.specificity}%</span>
                          <Progress value={item.specificity} className="h-2 w-16" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Tests */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Tests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTests.map((test, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{test.name}</p>
                        <p className="text-xs text-gray-500">{test.date}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={test.status === 'Completed' ? 'default' : 'secondary'}>
                          {test.status}
                        </Badge>
                        <span className="text-sm font-medium">{test.accuracy}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  <Button 
                    variant="outline" 
                    className="h-16 flex items-center justify-start space-x-3"
                    onClick={() => onNavigate?.('test-disclaimer')}
                  >
                    <TestTube className="h-5 w-5" />
                    <span>Test New Disclaimer</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-16 flex items-center justify-start space-x-3"
                    onClick={() => onNavigate?.('test-results')}
                  >
                    <FileText className="h-5 w-5" />
                    <span>Review All Results</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-16 flex items-center justify-start space-x-3"
                    onClick={() => onNavigate?.('prompt-library')}
                  >
                    <TrendingUp className="h-5 w-5" />
                    <span>Browse Prompt Library</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
