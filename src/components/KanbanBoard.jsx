import { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import KanbanColumn from './KanbanColumn';
import { PlusIcon } from '@heroicons/react/24/outline';

function KanbanBoard() {
  const [columns, setColumns] = useState([
    { id: 'todo', title: 'Todo', tasks: [] },
    { id: 'in-progress', title: 'In Progress', tasks: [] },
    { id: 'done', title: 'Done', tasks: [] }
  ]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const newColumns = [...columns];
    const sourceColumn = newColumns.find(col => col.id === source.droppableId);
    const destColumn = newColumns.find(col => col.id === destination.droppableId);
    const [movedTask] = sourceColumn.tasks.splice(source.index, 1);
    destColumn.tasks.splice(destination.index, 0, movedTask);
    setColumns(newColumns);
  };

  const addSection = () => {
    const newSectionId = `section-${columns.length + 1}`;
    setColumns([...columns, { id: newSectionId, title: 'New Section', tasks: [] }]);
  };

  const addTask = (columnId) => {
    const newTask = {
      id: `task-${Date.now()}`,
      title: 'New Task',
      description: '',
      dueDate: '',
      assignee: ''
    };

    setColumns(columns.map(column => {
      if (column.id === columnId) {
        return { ...column, tasks: [...column.tasks, newTask] };
      }
      return column;
    }));
  };

  const deleteTask = (columnId, taskId) => {
    setColumns(columns.map(column => {
      if (column.id === columnId) {
        return {
          ...column,
          tasks: column.tasks.filter(task => task.id !== taskId)
        };
      }
      return column;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Kanban Board</h1>
        <button
          onClick={addSection}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Section
        </button>
      </div>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {columns.map(column => (
            <KanbanColumn
              key={column.id}
              column={column}
              onAddTask={addTask}
              onDeleteTask={deleteTask}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default KanbanBoard;