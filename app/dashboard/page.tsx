import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation';
import AddNewTask from './components/addNewTask'
import { Button } from "@/components/ui/button"
import EditTask from './components/editTask'
import MarkCompleted from './components/markCompleted'
import DeleteButton from './components/deleteButton'
export default async function Page() {
  
  const supabase = await createClient()
  
  
  const {data: { user }} = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data: tasks } = await supabase.from('tasks').select()


return (
  <div className="max-w-4xl mx-auto p-6 min-h-screen bg-gray-50">
    <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
      My Tasks
    </h1>
    <div className="mb-8">
      <AddNewTask user={user}/>
    </div>
    <div className="grid gap-4">
      {tasks?.map((task) => (
        <div 
          key={task.id} 
          className={`
            bg-white rounded-lg shadow-sm border border-gray-100 p-6 
            transition-all duration-200 hover:shadow-md
            ${task.status === 'completed' ? 'bg-opacity-75' : ''}
          `}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className={`text-xl font-semibold mb-2 ${task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                {task.title}
              </h2>
              <p className="text-gray-600 text-sm mb-3">{task.description}</p>
              <div className="flex items-center gap-3 text-sm">
                <span className={`
                  px-3 py-1 rounded-full font-medium
                  ${task.status === 'completed' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'}
                `}>
                  {task.status}
                </span>
                <span className="text-gray-400">
                  Due Date: {new Date(task.due_date).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
            <EditTask task={task} user={user}/>
            <MarkCompleted task={task}/>
            <DeleteButton task={task}/>
          </div>
        </div>
      ))}
    </div>
  </div>
);

}