
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Users, FileText, AlertTriangle } from 'lucide-react';

export const Dashboard = () => {
  const recentTests = [
    { name: 'Investment Returns Disclaimer', accuracy: 94, status: 'Completed', date: '2 hours ago' },
    { name: 'FDIC Insurance Notice', accuracy: 87, status: 'In Progress', date: '5 hours ago' },
    { name: 'Risk Warning Statement', accuracy: 92, status: 'Completed', date: '1 day ago' },
  ];

  const topPrompts = [
    { name: 'Future Returns Detection', accuracy: 96, tests: 45 },
    { name: 'Insurance Status Checker', accuracy: 94, tests: 38 },
    { name: 'Investment Advice Filter', accuracy: 91, tests: 29 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor your disclaimer testing performance</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          New Test
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tests</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Accuracy</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92.3%</div>
            <p className="text-xs text-muted-foreground">+2.1% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents Tested</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">+180 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">False Positives</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">-8% from last week</p>
          </CardContent>
        </Card>
      </div>

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

        {/* Top Performing Prompts */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Prompts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPrompts.map((prompt, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{prompt.name}</p>
                    <span className="text-sm font-medium">{prompt.accuracy}%</span>
                  </div>
                  <Progress value={prompt.accuracy} className="h-2" />
                  <p className="text-xs text-gray-500">{prompt.tests} tests completed</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <TestTube className="h-6 w-6 mb-2" />
              Test New Disclaimer
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <FileText className="h-6 w-6 mb-2" />
              Review Results
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <TrendingUp className="h-6 w-6 mb-2" />
              View Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
