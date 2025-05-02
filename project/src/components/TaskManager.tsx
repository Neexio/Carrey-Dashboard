import React, { useState } from 'react';
import { CheckCircle, Circle, Clock, AlertCircle, Plus, Calendar, Star, Trash2, Edit2, Sparkles, Lightbulb } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed';
  dueDate: string;
  category: 'seo' | 'content' | 'technical' | 'other';
}

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Optimize meta descriptions',
      description: 'Update meta descriptions for top 10 pages to improve CTR',
      priority: 'high',
      status: 'pending',
      dueDate: '2025-05-01',
      category: 'seo'
    },
    {
      id: '2',
      title: 'Fix mobile responsiveness',
      description: 'Address mobile layout issues on product pages',
      priority: 'high',
      status: 'in_progress',
      dueDate: '2025-05-02',
      category: 'technical'
    },
    {
      id: '3',
      title: 'Create blog content',
      description: 'Write 3 blog posts targeting main keywords',
      priority: 'medium',
      status: 'pending',
      dueDate: '2025-05-05',
      category: 'content'
    }
  ]);

  const [showAddTask, setShowAddTask] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    priority: 'medium',
    status: 'pending',
    dueDate: '',
    category: 'seo'
  });

  const handleAddTask = () => {
    if (!newTask.title) return;
    
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description || '',
      priority: newTask.priority as 'high' | 'medium' | 'low',
      status: 'pending',
      dueDate: newTask.dueDate || new Date().toISOString().split('T')[0],
      category: newTask.category as 'seo' | 'content' | 'technical' | 'other'
    };

    setTasks([...tasks, task]);
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      status: 'pending',
      dueDate: '',
      category: 'seo'
    });
    setShowAddTask(false);
  };

  const handleEditTask = () => {
    if (!editingTask) return;
    
    setTasks(tasks.map(task => 
      task.id === editingTask.id ? editingTask : task
    ));
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const updateTaskStatus = (taskId: string, newStatus: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400';
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400';
      default:
        return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400';
    }
  };

  const getCategoryColor = (category: Task['category']) => {
    switch (category) {
      case 'seo':
        return 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400';
      case 'content':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400';
      case 'technical':
        return 'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  const TaskModal: React.FC<{
    task?: Partial<Task>;
    onSave: () => void;
    onClose: () => void;
    isEditing?: boolean;
  }> = ({ task = newTask, onSave, onClose, isEditing = false }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          {isEditing ? 'Edit Task' : 'Add New Task'}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              value={task.title}
              onChange={(e) => isEditing 
                ? setEditingTask({ ...editingTask!, title: e.target.value })
                : setNewTask({ ...newTask, title: e.target.value })
              }
              className="w-full px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="Task title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={task.description}
              onChange={(e) => isEditing
                ? setEditingTask({ ...editingTask!, description: e.target.value })
                : setNewTask({ ...newTask, description: e.target.value })
              }
              className="w-full px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500"
              rows={3}
              placeholder="Task description"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Priority
              </label>
              <select
                value={task.priority}
                onChange={(e) => isEditing
                  ? setEditingTask({ ...editingTask!, priority: e.target.value as Task['priority'] })
                  : setNewTask({ ...newTask, priority: e.target.value as Task['priority'] })
                }
                className="w-full px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <select
                value={task.category}
                onChange={(e) => isEditing
                  ? setEditingTask({ ...editingTask!, category: e.target.value as Task['category'] })
                  : setNewTask({ ...newTask, category: e.target.value as Task['category'] })
                }
                className="w-full px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="seo">SEO</option>
                <option value="content">Content</option>
                <option value="technical">Technical</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={task.dueDate}
              onChange={(e) => isEditing
                ? setEditingTask({ ...editingTask!, dueDate: e.target.value })
                : setNewTask({ ...newTask, dueDate: e.target.value })
              }
              className="w-full px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
          {isEditing && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                value={task.status}
                onChange={(e) => setEditingTask({ ...editingTask!, status: e.target.value as Task['status'] })}
                className="w-full px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          )}
          <div className="flex justify-end space-x-2 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            >
              {isEditing ? 'Save Changes' : 'Add Task'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const aiRecommendations = [
    {
      title: "Update Meta Descriptions",
      description: "Your top-performing pages need meta description updates",
      priority: "high",
      category: "seo",
      estimatedTime: "30 mins"
    },
    {
      title: "Optimize Images",
      description: "12 images need compression to improve page load speed",
      priority: "medium",
      category: "technical",
      estimatedTime: "45 mins"
    },
    {
      title: "Fix Broken Links",
      description: "3 broken internal links detected on your blog pages",
      priority: "high",
      category: "technical",
      estimatedTime: "20 mins"
    }
  ];

  const quickTips = [
    {
      tip: "Use your main keyword in the first 100 words of content",
      category: "Content"
    },
    {
      tip: "Ensure all images have descriptive alt text",
      category: "Technical"
    },
    {
      tip: "Keep title tags between 50-60 characters",
      category: "SEO"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Daily Tasks</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Track your SEO improvement tasks</p>
            </div>
            <button
              onClick={() => setShowAddTask(true)}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 flex items-center"
            >
              <Plus size={16} className="mr-2" />
              Add Task
            </button>
          </div>

          {/* AI Recommendations */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center mb-4">
              <Sparkles className="w-4 h-4 text-primary-500 mr-2" />
              AI Recommendations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {aiRecommendations.map((rec, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{rec.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(rec.priority)}`}>
                      {rec.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{rec.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      ⏱️ {rec.estimatedTime}
                    </span>
                    <button 
                      onClick={() => {
                        setNewTask({
                          title: rec.title,
                          description: rec.description,
                          priority: rec.priority,
                          category: rec.category,
                          status: 'pending',
                          dueDate: new Date().toISOString().split('T')[0]
                        });
                        setShowAddTask(true);
                      }}
                      className="text-primary-600 dark:text-primary-400 text-sm hover:underline"
                    >
                      Add to Tasks
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Tips */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center mb-4">
              <Lightbulb className="w-4 h-4 text-primary-500 mr-2" />
              Quick Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickTips.map((tip, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="text-xs text-primary-600 dark:text-primary-400 mb-2">{tip.category}</div>
                  <p className="text-sm">{tip.tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Existing Tasks List */}
          <div className="space-y-4">
            {tasks.map(task => (
              <div
                key={task.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <button
                      onClick={() => updateTaskStatus(
                        task.id,
                        task.status === 'completed' ? 'pending' : 'completed'
                      )}
                      className="mt-1"
                    >
                      {getStatusIcon(task.status)}
                    </button>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{task.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {task.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(task.category)}`}>
                          {task.category}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                          <Calendar size={12} className="mr-1" />
                          {task.dueDate}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setEditingTask(task)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <TaskModal
          onSave={handleAddTask}
          onClose={() => setShowAddTask(false)}
        />
      )}

      {/* Edit Task Modal */}
      {editingTask && (
        <TaskModal
          task={editingTask}
          onSave={handleEditTask}
          onClose={() => setEditingTask(null)}
          isEditing
        />
      )}
    </div>
  );
};

export default TaskManager;