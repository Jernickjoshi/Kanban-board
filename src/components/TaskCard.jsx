import { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Menu } from '@headlessui/react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import TaskModal from './TaskModal';

function TaskCard({ task, index, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="bg-white p-4 rounded-lg shadow mb-3 cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <div onClick={() => setIsModalOpen(true)}>
                <h3 className="font-medium">{task.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                {task.dueDate && (
                  <p className="text-xs text-gray-500 mt-2">Due: {task.dueDate}</p>
                )}
                {task.assignee && (
                  <p className="text-xs text-gray-500">Assignee: {task.assignee}</p>
                )}
              </div>

              <Menu as="div" className="relative">
                <Menu.Button className="p-1 hover:bg-gray-100 rounded">
                  <EllipsisHorizontalIcon className="w-5 h-5" />
                </Menu.Button>
                <Menu.Items className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg z-10">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={onDelete}
                        className={`${
                          active ? 'bg-red-50 text-red-700' : 'text-gray-700'
                        } w-full text-left px-4 py-2 text-sm`}
                      >
                        Delete
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </div>
          </div>
        )}
      </Draggable>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={task}
      />
    </>
  );
}

export default TaskCard;