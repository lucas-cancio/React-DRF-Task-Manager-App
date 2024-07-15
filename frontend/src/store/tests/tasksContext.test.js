// __tests__/TasksProvider.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TasksProvider, useTasks, useTasksDispatch, tasksReducer } from '../tasksContext';

const TaskComponent = () => {
    const tasks = useTasks();
    const dispatch = useTasksDispatch();

    return (
        <div>
            <button onClick={() => dispatch({ type: 'createTask', task: { id: 1, title: 'Test Task' } })}>Add Task</button>
            <div data-testid="tasks">
                {tasks.map(task => (
                    <div key={task.id}>{task.title}</div>
                ))}
            </div>
        </div>
    );
};

describe("Task Store", () => {

    it('renders TasksProvider and interacts with context', () => {
        render(
            <TasksProvider>
                <TaskComponent />
            </TasksProvider>
        );
    
        const button = screen.getByText('Add Task');
        fireEvent.click(button);
    
        const tasks = screen.getByTestId('tasks');
        expect(tasks).toHaveTextContent('Test Task');
    });
    
    // __tests__/tasksReducer.test.js
    
    it('tasksReducer handles createTask action', () => {
        const initialState = [];
        const action = { type: 'createTask', task: { id: 1, title: 'New Task' } };
        const newState = tasksReducer(initialState, action);
        
        expect(newState).toHaveLength(1);
        expect(newState[0]).toEqual(action.task);
    });
    
    it('tasksReducer handles editTask action', () => {
        const initialState = [{ id: 1, title: 'Old Task', description: '' }];
        const action = { type: 'editTask', task: { id: 1, title: 'Updated Task', description: 'Updated Description' } };
        const newState = tasksReducer(initialState, action);
        
        expect(newState).toHaveLength(1);
        expect(newState[0].title).toBe('Updated Task');
        expect(newState[0].description).toBe('Updated Description');
    });
    
    it('tasksReducer handles deleteTask action', () => {
        const initialState = [{ id: 1, title: 'Task to be deleted' }];
        const action = { type: 'deleteTask', id: 1 };
        const newState = tasksReducer(initialState, action);
        
        expect(newState).toHaveLength(0);
    });   

    it('tasksReducer handles resetTasks action', () => {
        const initialState = [];
        const action = { type: 'resetTasks', tasks: [
            {id: 1, title: 'New Task' }, 
            {id: 2, title: 'New Task 2' }, 
        ]};
        const newState = tasksReducer(initialState, action);
        
        expect(newState).toHaveLength(2);
        expect(newState[0]).toEqual(action.tasks[0]);
    });

    it('tasksReducer handles createSubtask action', () => {
        const initialState = [
            {id: 1, title: 'New Task', subtasks: [] }, 
            {id: 2, title: 'New Task 2', subtasks: [] }, 
        ];
        const action = { type: 'createSubtask', subtask: { parentTask: 2, title: "New Subtask"}};
        const newState = tasksReducer(initialState, action);
        
        expect(newState).toHaveLength(2);
        expect(newState[1].subtasks).toContain(action.subtask);
    });

    it('tasksReducer handles editSubtask action', () => {
        const initialState = [
            {id: 1, title: 'New Task', subtasks: [
                { id: 3, parentTask: 1, title: "Subtask"}
            ] }, 
            {id: 2, title: 'New Task 2', subtasks: [] }, 
        ];
        const action = { type: 'editSubtask', subtask: { id: 3, parentTask: 1, title: "Edited Subtask"}};
        const newState = tasksReducer(initialState, action);
        
        expect(newState).toHaveLength(2);
        expect(newState[0].subtasks).toContain(action.subtask);
    });

    it('tasksReducer handles deleteSubtask action', () => {
        const initialState = [
            { id: 1, title: 'New Task', subtasks: [
                {id: 3, parentTask: 1, title: "Subtask"}
            ]},
        ];
        const action = { type: 'deleteSubtask', subtask: { id: 3, parentTask: 1}};
        const newState = tasksReducer(initialState, action);

        expect(newState[0].subtasks).toHaveLength(0);
    });
});


// Add more tests for other actions like createSubtask, editSubtask, deleteSubtask, resetTasks
