import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart3, TrendingUp, Target, Users, Clock, CheckCircle, XCircle } from 'lucide-react';

export const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [metric, setMetric] = useState('accuracy');

  // Review statistics
  const reviewStats = {
    totalPending: 12,
    totalApproved: 45,
    totalRejected: 8,
    promptDisclaimerCombos: 5
  };

  // Detailed prompt and disclaimer combinations with comprehensive metrics
  const detailedPromptMetrics = [
    {
      prompt: "Test prompt for financial disclaimer",
      disclaimer: "Past performance does not guarantee future results. All investments carry risk of loss.",
      pending: 2,
      approved: 1,
      rejected: 0,
      recall: 92.5,
      specificity: 88.3,
      precision: 89.7,
      f1Score: 91.1,
      totalTests: 15,
      avgConfidence: 0.89
    },
    {
      prompt: "Investment risk warning validation",
      disclaimer: "Investment involves risk. You may lose some or all of your invested capital.",
      pending: 0,
      approved: 1,
      rejected: 1,
      recall: 85.7,
      specificity: 82.1,
      precision: 83.4,
      f1Score: 84.5,
      totalTests: 12,
      avgConfidence: 0.82
    },
    {
      prompt: "FDIC insurance verification",
      disclaimer: "Not FDIC insured. No bank guarantee. May lose value.",
      pending: 3,
      approved: 2,
      rejected: 1,
      recall: 89.4,
      specificity: 91.2,
      precision: 90.8,
      f1Score: 90.1,
      totalTests: 18,
      avgConfidence: 0.91
    },
    {
      prompt: "Hypothetical performance warning",
      disclaimer: "Hypothetical performance results have inherent limitations.",
      pending: 4,
      approved: 3,
      rejected: 2,
      recall: 87.8,
      specificity: 84.6,
      precision: 86.1,
      f1Score: 86.9,
      totalTests: 21,
      avgConfidence: 0.85
    },
    {
      prompt: "Investment advice disclaimer",
      disclaimer: "This is not investment advice. Please consult a financial advisor.",
      pending: 3,
      approved: 5,
      rejected: 4,
      recall: 91.2,
      specificity: 86.7,
      precision: 88.9,
      f1Score: 90.0,
      totalTests: 24,
      avgConfidence: 0.87
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Track performance and insights across your disclaimer tests</p>
        </div>
        <div className="flex space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={metric} onValueChange={setMetric}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="accuracy">Accuracy</SelectItem>
              <SelectItem value="precision">Precision</SelectItem>
              <SelectItem value="recall">Recall</SelectItem>
              <SelectItem value="tests">Test Count</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Accuracy</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">91.8%</div>
            <p className="text-xs text-muted-foreground">+2.3% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reviewStats.totalPending}</div>
            <p className="text-xs text-muted-foreground">{reviewStats.promptDisclaimerCombos} combinations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Prompts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-muted-foreground">+3 new this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Improvement Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+5.2%</div>
            <p className="text-xs text-muted-foreground">Avg monthly improvement</p>
          </CardContent>
        </Card>
      </div>

      {/* Review Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Review Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                <span className="font-medium">Pending</span>
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

      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList>
          <TabsTrigger value="performance">Performance Trends</TabsTrigger>
          <TabsTrigger value="detailed-metrics">Detailed Metrics</TabsTrigger>
          <TabsTrigger value="heatmap">Regional Heatmap</TabsTrigger>
          <TabsTrigger value="leaderboard">Prompt Leaderboard</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Accuracy Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Line chart showing accuracy trends</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Test Volume by Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Bar chart showing test volumes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance by Disclaimer Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Past performance does not guarantee future returns", accuracy: 94.2, tests: 89 },
                  { name: "Not FDIC insured", accuracy: 87.5, tests: 67 },
                  { name: "No investment advice", accuracy: 91.3, tests: 52 },
                  { name: "Risk of loss", accuracy: 88.9, tests: 39 },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.tests} tests</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{item.accuracy}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed-metrics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Comprehensive Prompt & Disclaimer Metrics</CardTitle>
              <p className="text-sm text-gray-600">Detailed performance analysis for each prompt and disclaimer combination</p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prompt & Disclaimer</TableHead>
                    <TableHead>Review Status</TableHead>
                    <TableHead>Recall</TableHead>
                    <TableHead>Specificity</TableHead>
                    <TableHead>Precision</TableHead>
                    <TableHead>F1 Score</TableHead>
                    <TableHead>Tests</TableHead>
                    <TableHead>Avg Confidence</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {detailedPromptMetrics.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="max-w-md">
                        <div className="space-y-1">
                          <div className="font-medium text-sm truncate" title={item.prompt}>
                            {item.prompt}
                          </div>
                          <div className="text-xs text-gray-500 truncate" title={item.disclaimer}>
                            {item.disclaimer}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 flex-wrap">
                          {item.pending > 0 && (
                            <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                              {item.pending} Pending
                            </Badge>
                          )}
                          {item.approved > 0 && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              {item.approved} Approved
                            </Badge>
                          )}
                          {item.rejected > 0 && (
                            <Badge className="bg-red-100 text-red-800 text-xs">
                              {item.rejected} Rejected
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{item.recall}%</span>
                          <Progress value={item.recall} className="h-1 w-12" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{item.specificity}%</span>
                          <Progress value={item.specificity} className="h-1 w-12" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{item.precision}%</span>
                          <Progress value={item.precision} className="h-1 w-12" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{item.f1Score}%</span>
                          <Progress value={item.f1Score} className="h-1 w-12" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{item.totalTests}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium">{(item.avgConfidence * 100).toFixed(1)}%</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="heatmap" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance by Region & LOB</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {['US', 'EMEA', 'APAC'].map((region) => (
                  <div key={region} className="space-y-2">
                    <h4 className="font-medium text-center">{region}</h4>
                    <div className="space-y-2">
                      <div className="bg-green-100 p-3 rounded text-center">
                        <p className="text-sm font-medium">Private Bank</p>
                        <p className="text-xs text-green-700">93.2%</p>
                      </div>
                      <div className="bg-blue-100 p-3 rounded text-center">
                        <p className="text-sm font-medium">Asset Mgmt</p>
                        <p className="text-xs text-blue-700">89.7%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Prompts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { rank: 1, name: "Future Returns Detection v2.2", accuracy: 94.2, improvement: "+2.1%" },
                  { rank: 2, name: "Investment Advice Filter v3.1", accuracy: 91.3, improvement: "+1.8%" },
                  { rank: 3, name: "Insurance Status Checker v1.5", accuracy: 89.7, improvement: "+3.2%" },
                  { rank: 4, name: "Risk Warning Detector v2.0", accuracy: 88.9, improvement: "+1.5%" },
                  { rank: 5, name: "Hypothetical Performance Classifier", accuracy: 87.4, improvement: "+0.9%" },
                ].map((prompt) => (
                  <div key={prompt.rank} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-800">
                        {prompt.rank}
                      </div>
                      <div>
                        <p className="font-medium">{prompt.name}</p>
                        <p className="text-sm text-green-600">{prompt.improvement} improvement</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{prompt.accuracy}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">🎯 Performance Improvement</h4>
                    <p className="text-blue-800 text-sm">
                      Your "Future Returns" prompts show 15% better accuracy when they include temporal modifiers like "will," "expect," and "anticipate."
                    </p>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-900 mb-2">📈 Trending Up</h4>
                    <p className="text-green-800 text-sm">
                      EMEA region shows the highest accuracy improvement (+4.2%) this month, particularly for investment advice detection.
                    </p>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-medium text-yellow-900 mb-2">⚠️ Attention Needed</h4>
                    <p className="text-yellow-800 text-sm">
                      False positive rate for "Risk Warning" prompts has increased by 2.1%. Consider refining trigger phrases.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-sm">High Priority</p>
                      <p className="text-sm text-gray-600">Update "FDIC Insurance" prompts to address recent false negatives</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-sm">Medium Priority</p>
                      <p className="text-sm text-gray-600">Test new prompt variations for investment advice detection</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-sm">Low Priority</p>
                      <p className="text-sm text-gray-600">Archive unused prompts from Q3 to improve library organization</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
