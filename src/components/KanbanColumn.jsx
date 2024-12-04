import { Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';
import { PlusIcon } from '@heroicons/react/24/outline';

function KanbanColumn({ column, onAddTask, onDeleteTask }) {
  return (
    <div className="bg-gray-200 rounded-lg p-4 w-80 flex-shrink-0">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">{column.title}</h2>
        <button
          onClick={() => onAddTask(column.id)}
          className="p-1 hover:bg-gray-300 rounded"
        >
          <PlusIcon className="w-5 h-5" />
        </button>
      </div>

      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="min-h-[200px]"
          >
            {column.tasks.length === 0 ? (
              <button
                onClick={() => onAddTask(column.id)}
                className="w-full py-3 border-2 border-dashed border-gray-400 rounded-lg text-gray-500 hover:border-gray-600 hover:text-gray-600"
              >
                Add Task
              </button>
            ) : (
              column.tasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  onDelete={() => onDeleteTask(column.id, task.id)}
                />
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default KanbanColumn;