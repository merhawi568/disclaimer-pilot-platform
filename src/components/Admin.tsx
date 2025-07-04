
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, Shield, Database, Settings as SettingsIcon, Plus, Edit, Trash } from 'lucide-react';

export const Admin = () => {
  const [users] = useState([
    { id: 1, name: "Sarah Chen", email: "sarah.chen@company.com", role: "Admin", status: "Active", lastLogin: "2 hours ago" },
    { id: 2, name: "Mike Johnson", email: "mike.johnson@company.com", role: "Analyst", status: "Active", lastLogin: "1 day ago" },
    { id: 3, name: "Lisa Wang", email: "lisa.wang@company.com", role: "Reviewer", status: "Inactive", lastLogin: "1 week ago" },
  ]);

  const [disclaimers] = useState([
    { id: 1, text: "Past performance does not guarantee future returns", category: "Performance", active: true, usage: 89 },
    { id: 2, text: "Not FDIC insured", category: "Insurance", active: true, usage: 67 },
    { id: 3, text: "No investment advice", category: "Advisory", active: true, usage: 52 },
    { id: 4, text: "Risk of loss", category: "Risk", active: false, usage: 23 },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600 mt-1">Manage users, disclaimers, and system settings</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">Export Settings</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">System Health</Button>
        </div>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList>
          <TabsTrigger value="users">Users & Roles</TabsTrigger>
          <TabsTrigger value="disclaimers">Disclaimers</TabsTrigger>
          <TabsTrigger value="sources">Document Sources</TabsTrigger>
          <TabsTrigger value="models">AI Models</TabsTrigger>
          <TabsTrigger value="settings">System Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">User Management</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="user-name">Full Name</Label>
                    <Input id="user-name" placeholder="Enter full name" />
                  </div>
                  <div>
                    <Label htmlFor="user-email">Email</Label>
                    <Input id="user-email" type="email" placeholder="Enter email address" />
                  </div>
                  <div>
                    <Label htmlFor="user-role">Role</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="analyst">Analyst</SelectItem>
                        <SelectItem value="reviewer">Reviewer</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">Create User</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Active Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium text-sm">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'}>
                        {user.role}
                      </Badge>
                      <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                        {user.status}
                      </Badge>
                      <div className="text-sm text-gray-500">
                        {user.lastLogin}
                      </div>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Role Permissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Admin</span>
                    <Badge>Full Access</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Analyst</span>
                    <Badge variant="secondary">Create & Test</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Reviewer</span>
                    <Badge variant="secondary">Review Only</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Viewer</span>
                    <Badge variant="outline">View Only</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Activity Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Active Users</span>
                    <span className="font-medium">18</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tests This Week</span>
                    <span className="font-medium">147</span>
                  </div>
                  <div className="flex justify-between">
                    <span>New Prompts</span>
                    <span className="font-medium">8</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full text-left justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Audit Logs
                  </Button>
                  <Button variant="outline" className="w-full text-left justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Access Controls
                  </Button>
                  <Button variant="outline" className="w-full text-left justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Session Management
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="disclaimers" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Disclaimer Management</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Disclaimer
            </Button>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {disclaimers.map((disclaimer) => (
                  <div key={disclaimer.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant="outline">{disclaimer.category}</Badge>
                        <Badge variant={disclaimer.active ? 'default' : 'secondary'}>
                          {disclaimer.active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <p className="font-medium">"{disclaimer.text}"</p>
                      <p className="text-sm text-gray-500 mt-1">Used in {disclaimer.usage} tests</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Document Sources</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Source
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2" />
                  Connected Sources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "SharePoint - Marketing", status: "Connected", docs: 1247 },
                    { name: "S3 Bucket - Legal", status: "Connected", docs: 892 },
                    { name: "OneDrive - Compliance", status: "Syncing", docs: 445 },
                    { name: "Box - Regional", status: "Error", docs: 234 },
                  ].map((source, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">{source.name}</p>
                        <p className="text-sm text-gray-500">{source.docs} documents</p>
                      </div>
                      <Badge variant={
                        source.status === 'Connected' ? 'default' :
                        source.status === 'Syncing' ? 'secondary' : 'destructive'
                      }>
                        {source.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Source Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Sync Frequency</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>File Types</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {['PDF', 'DOCX', 'HTML', 'TXT'].map((type) => (
                        <Badge key={type} variant="outline">{type}</Badge>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full">Update Settings</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="models" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">AI Model Configuration</h2>
            <Button>Configure Models</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Models</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "GPT-4o", version: "2024-08-06", status: "Active", accuracy: "94.2%" },
                    { name: "Claude-3.5-Sonnet", version: "20241022", status: "Active", accuracy: "91.8%" },
                    { name: "GPT-4o-mini", version: "2024-07-18", status: "Backup", accuracy: "87.5%" },
                  ].map((model, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">{model.name}</p>
                        <p className="text-sm text-gray-500">v{model.version}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={model.status === 'Active' ? 'default' : 'secondary'}>
                          {model.status}
                        </Badge>
                        <p className="text-sm text-gray-500 mt-1">{model.accuracy}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Model Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Primary Model</Label>
                    <Select defaultValue="gpt-4o">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                        <SelectItem value="claude-3.5">Claude-3.5-Sonnet</SelectItem>
                        <SelectItem value="gpt-4o-mini">GPT-4o-mini</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Temperature</Label>
                    <Input type="number" defaultValue="0.1" min="0" max="1" step="0.1" />
                  </div>
                  <div>
                    <Label>Max Tokens</Label>
                    <Input type="number" defaultValue="2048" />
                  </div>
                  <Button className="w-full">Update Configuration</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <SettingsIcon className="h-5 w-5 mr-2" />
                  System Configuration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Organization Name</Label>
                    <Input defaultValue="Acme Financial Services" />
                  </div>
                  <div>
                    <Label>Default Region</Label>
                    <Select defaultValue="us">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="emea">EMEA</SelectItem>
                        <SelectItem value="apac">APAC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Retention Period (days)</Label>
                    <Input type="number" defaultValue="365" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Email Alerts</Label>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Slack Integration</Label>
                    <input type="checkbox" className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Weekly Reports</Label>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>System Maintenance</Label>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Data & Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline">Export All Data</Button>
                <Button variant="outline">Data Retention Policy</Button>
                <Button variant="outline">Privacy Settings</Button>
                <Button variant="outline">Backup Configuration</Button>
                <Button variant="outline">Audit Trail</Button>
                <Button variant="destructive">Reset System</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
