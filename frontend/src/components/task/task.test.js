
import React from "react";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Task from "./task";
import { TasksContext, TasksDispatchContext } from "../../store/tasksContext";
import { ThemeContext } from "../../store/themeContext";
import { editTask, deleteTask, editSubtask, createSubtask } from "../../services/tasks";


// Helper function to manually add collapse classNames because Jest environment won't
const toggleCollapseManually = (element) => {
    if (element.classList.contains('show')) {
        element.classList.remove('show');
    } else {
        element.classList.add('show');
    }
};

// Mock the tasks dispatch function
const mockTasksDispatch = jest.fn();

// Mock the createSubtask service function
const mockCreateSubtask = jest.fn();
const mockDeleteTask = jest.fn();
jest.mock("../../services/tasks", () => ({
    ...jest.requireActual("../../services/tasks"),
    createSubtask: () => mockCreateSubtask(),
    deleteTask: () => mockDeleteTask(),
}));

describe("Task Component", () => {

    let testTask = {};

    beforeEach(() => {
        jest.clearAllMocks();

        testTask = {
            'id': 3,
            'title': 'Test Title',
            'description': 'Test description.',
            'deadline': new Date().toISOString().slice(0, 10),
            'completed': false,
            'subtasks': [],
        };
    });

    const renderTask = () => {

        return render(
            <ThemeContext.Provider value={'light'}>
                <TasksContext.Provider value={[{...testTask}]}>
                    <TasksDispatchContext.Provider value={mockTasksDispatch}>
                        <Task task={testTask} />
                    </TasksDispatchContext.Provider>
                </TasksContext.Provider>
            </ThemeContext.Provider>
        );
    };

    it("Collapse is toggled when not in edit mode and header is clicked", async () => {
        renderTask();
        
        const headerCollapseBtn = screen.getByTestId("taskHeaderCollapseBtn");
        const collapsibleSection = screen.getByTestId("taskCollapsible");
        
        // Initially the collapsible section should have 'collapse' class
        expect(collapsibleSection).toHaveClass("collapse");
    
        // Click to expand the section
        fireEvent.click(headerCollapseBtn);
        toggleCollapseManually(collapsibleSection);

        // Wait for the 'collapse' class to be removed (transition completed)
        expect(collapsibleSection).toHaveClass("show");

        // Click to collapse the section
        fireEvent.click(headerCollapseBtn);
        toggleCollapseManually(collapsibleSection);

        // Check that the collapsible section is collapsed
        expect(collapsibleSection).toHaveClass("collapse");
        expect(collapsibleSection).not.toHaveClass("show");
    });

    it("Renders task info and inputs correctly when in and out of edit mode", () => {
        renderTask();

        // Not in edit mode
        expect(screen.getByTitle("completedCheckbox")).toBeInTheDocument();
        expect(screen.getByText(testTask.title)).toBeInTheDocument();
        expect(screen.getByText(testTask.deadline)).toBeInTheDocument();
        expect(screen.getByText(testTask.deadline)).toBeInTheDocument();
        
        const editBtn = screen.getByTitle("Edit task");

        // Enter edit mode
        fireEvent.click(editBtn);

        expect(screen.getByLabelText("Task Title")).toBeInTheDocument();
        expect(screen.getByLabelText("Deadline")).toBeInTheDocument();
        expect(screen.getByLabelText("Task Description")).toBeInTheDocument();
        expect(screen.queryByTestId("completedCheckbox")).toBeNull();

        // Exit edit mode
        fireEvent.click(editBtn);

        expect(screen.getByTitle("completedCheckbox")).toBeInTheDocument();
        expect(screen.getByText(testTask.title)).toBeInTheDocument();
        expect(screen.getByText(testTask.deadline)).toBeInTheDocument();
        expect(screen.getByText(testTask.deadline)).toBeInTheDocument();
    });

    it("Changes task values on user input in edit mode", async () => {

        mockTasksDispatch.mockImplementationOnce((action) => {
            testTask.title = action.task.title;
        }).mockImplementationOnce((action) => {
            testTask.description = action.task.description;
        });

        const { rerender } = renderTask();

        const editBtn = screen.getByTitle("Edit task");

        // Enter edit mode
        fireEvent.click(editBtn);

        const fakeChanges = {
            title: "Changed title",
            description: "Changed description",
        };

        const titleInput = screen.getByLabelText("Task Title");       
        const descriptionInput = screen.getByLabelText("Task Description");   
        
        // Change title input
        fireEvent.change(titleInput, { target: { value: fakeChanges.title } });
        await waitFor(() => {
            expect(mockTasksDispatch).toHaveBeenLastCalledWith({
                'type': 'editTask',
                'task': { ...testTask, title: fakeChanges.title },
            });
        });
        
        // Change description input
        fireEvent.change(descriptionInput, { target: { value: fakeChanges.description } });
        await waitFor(() => {
            expect(mockTasksDispatch).toHaveBeenLastCalledWith({
                'type': 'editTask',
                'task': { ...testTask, description: fakeChanges.description },
            });
        });

        // rerender task component with newly changed test task
        rerender(
            <ThemeContext.Provider value={'light'}>
                <TasksContext.Provider value={[{...testTask}]}>
                    <TasksDispatchContext.Provider value={mockTasksDispatch}>
                        <Task task={testTask} />
                    </TasksDispatchContext.Provider>
                </TasksContext.Provider>
            </ThemeContext.Provider>
        );

        expect(mockTasksDispatch).toHaveBeenCalledTimes(2);
 
        // check that title and description input values changed
        expect(titleInput.value).toBe(fakeChanges.title);
        expect(descriptionInput.value).toBe(fakeChanges.description);
    });

    it("Creates new subtask when create-subtask button is clicked", async () => {
        const dummyNewSubtask = {
            id: 21,
            parentTask: testTask.id,
            title: "Dummy Subtask",
            completed: false,
            deadline: new Date().toISOString().slice(0, 10),
            description: "Dummy description.",
        };

        // Mock create-subtask service to return the fake created-subtask
        mockCreateSubtask.mockImplementationOnce(() => Promise.resolve(dummyNewSubtask));

        // Mock the tasksDispatch to add the new fake subtask to the task's subtasks list
        mockTasksDispatch.mockImplementationOnce(() => {
            testTask = { ...testTask, subtasks: [dummyNewSubtask]};
        })

        const { rerender } = renderTask();
        const createSubtaskBtn = screen.getByTitle("Create new subtask");
        fireEvent.click(createSubtaskBtn);

        await waitFor(() => {
            expect(mockCreateSubtask).toHaveBeenCalled();
        });

        await waitFor(() => {
            expect(mockTasksDispatch).toHaveBeenLastCalledWith({
                type: 'createSubtask',
                'subtask': dummyNewSubtask,
            });
        });

        rerender(
            <ThemeContext.Provider value={'light'}>
                <TasksContext.Provider value={[{...testTask}]}>
                    <TasksDispatchContext.Provider value={mockTasksDispatch}>
                        <Task task={testTask} />
                    </TasksDispatchContext.Provider>
                </TasksContext.Provider>
            </ThemeContext.Provider>
        );

        await waitFor(() => {
            expect(screen.getByText(dummyNewSubtask.description)).toBeInTheDocument();
        });
    });

    it("Deletes itself (the task) when the delete-task button is clicked", async () => {

        mockDeleteTask.mockResolvedValueOnce();

        renderTask();

        const deleteTaskBtn = screen.getByTitle("Delete task");
        fireEvent.click(deleteTaskBtn);

        await waitFor(() => {
            expect(mockDeleteTask).toHaveBeenCalled();
        });

        await waitFor(() => {
            expect(mockTasksDispatch).toHaveBeenLastCalledWith({
                type: 'deleteTask',
                'id': testTask.id,
            });
        });
    });

    it("Correctly renders subtasks", () => {
        
        const dummySubtask1 = {
            id: 21,
            parentTask: testTask.id,
            title: "Dummy Subtask 1",
            completed: false,
            deadline: new Date().toISOString().slice(0, 10),
            description: "Dummy description 1.",
        };

        const dummySubtask2 = {
            id: 22,
            parentTask: testTask.id,
            title: "Dummy Subtask 2",
            completed: false,
            deadline: new Date().toISOString().slice(0, 10),
            description: "Dummy description 2.",
        };

        testTask.subtasks = [ dummySubtask1, dummySubtask2];
        
        renderTask();

        expect(screen.getByText(dummySubtask1.title)).toBeInTheDocument();
        expect(screen.getByText(dummySubtask1.description)).toBeInTheDocument();

        expect(screen.getByText(dummySubtask2.title)).toBeInTheDocument();
        expect(screen.getByText(dummySubtask2.description)).toBeInTheDocument();
    });

});