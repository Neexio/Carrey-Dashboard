import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Users, Activity, CreditCard, Settings, Search } from 'lucide-react';

interface User {
  id: string;
  email: string;
  created_at: string;
  user_metadata: {
    name?: string;
  };
  subscription?: {
    plan: string;
    status: string;
  };
}

const Admin: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const { data: { users }, error } = await supabase.auth.admin.listUsers();
      if (error) throw error;

      // Get subscriptions for all users
      const { data: subscriptions } = await supabase
        .from('user_subscriptions')
        .select('user_id, plan_id, status');

      // Combine user data with subscriptions
      const usersWithSubscriptions = users.map(user => ({
        ...user,
        subscription: subscriptions?.find(sub => sub.user_id === user.id)
      }));

      setUsers(usersWithSubscriptions);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.user_metadata?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.subscription?.status === 'active').length,
    trialUsers: users.filter(u => !u.subscription).length,
    revenue: users.reduce((acc, user) => {
      const plan = user.subscription?.plan;
      const price = plan === 'basic' ? 29 : plan === 'business' ? 99 : plan === 'enterprise' ? 499 : 0;
      return acc + price;
    }, 0)
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search users..."
                className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
            <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
              Export Data
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <Users className="w-8 h-8 text-primary-500" />
              <span className="text-sm text-gray-500">Total Users</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <div className="text-sm text-gray-500">+12% from last month</div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <Activity className="w-8 h-8 text-green-500" />
              <span className="text-sm text-gray-500">Active Users</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">{stats.activeUsers}</div>
              <div className="text-sm text-gray-500">+8% from last month</div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <CreditCard className="w-8 h-8 text-purple-500" />
              <span className="text-sm text-gray-500">Monthly Revenue</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">${stats.revenue}</div>
              <div className="text-sm text-gray-500">+15% from last month</div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <Settings className="w-8 h-8 text-orange-500" />
              <span className="text-sm text-gray-500">Trial Users</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">{stats.trialUsers}</div>
              <div className="text-sm text-gray-500">+5% from last month</div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveTab('users')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'users'
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Users
              </button>
              <button
                onClick={() => setActiveTab('subscriptions')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'subscriptions'
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Subscriptions
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'analytics'
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Analytics
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'users' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-900">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Plan
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Joined
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center text-primary-600 dark:text-primary-400">
                              {user.user_metadata?.name?.[0] || user.email[0].toUpperCase()}
                            </div>
                            <div className="ml-3">
                              <div className="font-medium">{user.user_metadata?.name || 'No Name'}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            user.subscription?.plan === 'enterprise'
                              ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400'
                              : user.subscription?.plan === 'business'
                                ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                          }`}>
                            {user.subscription?.plan || 'Free Trial'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            user.subscription?.status === 'active'
                              ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                              : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400'
                          }`}>
                            {user.subscription?.status || 'Trial'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'subscriptions' && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">Subscription analytics coming soon</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  We're working on detailed subscription analytics and management features.
                </p>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">Analytics dashboard coming soon</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Detailed analytics and insights are under development.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;