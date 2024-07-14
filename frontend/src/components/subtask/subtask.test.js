
import React from "react";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { TasksContext, TasksDispatchContext } from "../../store/tasksContext";
import { ThemeContext } from "../../store/themeContext";
import { deleteSubtask } from "../../services/tasks";
import { CSRFTokenContext } from "../../store/csrfContext";

import Task from "../task/task";
import Subtask from "./subtask";


// Mock the tasks dispatch function
const mockTasksDispatch = jest.fn();

// Mock the function that updates the parent task's list of changed subtasks
const mockUpdateEditedSubtaskList = jest.fn();

// Mock the delete-subtask API service function
const mockDeleteSubtask = jest.fn();
jest.mock("../../services/tasks", () => ({
    ...jest.requireActual("../../services/tasks"),
    deleteSubtask: (id, token) => mockDeleteSubtask(id, token),
}));


describe("Subtask Component", () => {

    let testSubtask = {};
    let testTask = {};
    let csrfToken = "dummyCSRF";

    beforeEach(() => {
        jest.clearAllMocks();

        testSubtask = {
            id: 21,
            parentTask: 3,
            title: "Dummy Subtask 1",
            completed: false,
            deadline: new Date().toISOString().slice(0, 10),
            description: "Dummy description 1.",
        };

        testTask = {
            'id': 3,
            'title': 'Test Title',
            'description': 'Test description.',
            'deadline': new Date().toISOString().slice(0, 10),
            'completed': false,
            'subtasks': [testSubtask],
        };
    });

    const renderSubtask = (inEditMode=false) => {

        return render(
            <ThemeContext.Provider value={'light'}>
                <CSRFTokenContext.Provider value={csrfToken}>
                        <TasksDispatchContext.Provider value={mockTasksDispatch}>
                            <Subtask 
                                subtask={testSubtask} 
                                inEditMode={inEditMode}
                                updateEditedSubtaskList={mockUpdateEditedSubtaskList}
                            />
                        </TasksDispatchContext.Provider>
                </CSRFTokenContext.Provider>
            </ThemeContext.Provider>
        );
    };

    it("Correctly renders the subtask OUT of edit mode", () => {
        
        // Render subtask not in edit mode
        renderSubtask();

        expect(screen.getByTestId(`subtask-${testSubtask.id}-completed-checkbox`)).toBeInTheDocument();
        expect(screen.getByText(testSubtask.title)).toBeInTheDocument();
        expect(screen.getByText(testSubtask.description)).toBeInTheDocument();
        expect(screen.getByText(testSubtask.deadline)).toBeInTheDocument();

    });

    it("Correctly renders the subtask IN of edit mode", () => {

        // Render subtask not in edit mode
        renderSubtask(true);

        expect(screen.getByLabelText(`Subtask Title`)).toBeInTheDocument();
        expect(screen.getByLabelText(`Deadline`)).toBeInTheDocument();
        expect(screen.getByLabelText(`Description`)).toBeInTheDocument();
    });

    it("Changes input values on input in edit mode", async () => {

        mockTasksDispatch.mockImplementationOnce((action) => {
            testSubtask.title = action.subtask.title;
        }).mockImplementationOnce((action) => {
            testSubtask.description = action.subtask.description;
        });

        // Render subtask in edit mode
        const { rerender } = renderSubtask(true);

        // Get input elements
        const titleInput = screen.getByLabelText(`Subtask Title`);
        const deadlineInput = screen.getByLabelText(`Deadline`);
        const descriptionInput = screen.getByLabelText(`Description`);

        const fakeChanges = {
            title: "Changed title",
            description: "Changed description",
            deadline: new Date().toISOString().slice(0, 10),
        };

        // Test change to title
        fireEvent.change(titleInput, { target: { value : fakeChanges.title } });
        await waitFor(() => {
            expect(mockTasksDispatch).toHaveBeenLastCalledWith({
                type: 'editSubtask',
                subtask: { ...testSubtask, title: fakeChanges.title },
            });
        });
        
        // Test change to description
        fireEvent.change(descriptionInput, { target: { value : fakeChanges.description } });
        await waitFor(() => {
            expect(mockTasksDispatch).toHaveBeenLastCalledWith({
                type: 'editSubtask',
                subtask: { ...testSubtask, description: fakeChanges.description},
            });
        });

        // Test change to deadline
        fireEvent.change(deadlineInput, { target: { value : fakeChanges.deadline } });
        await waitFor(() => {
            expect(mockTasksDispatch).toHaveBeenLastCalledWith({
                type: 'editSubtask',
                subtask: { ...testSubtask, deadline: fakeChanges.deadline},
            });
        });
        
        // Re-render subtask to check newly changed input values
        rerender(
            <ThemeContext.Provider value={'light'}>
                <CSRFTokenContext.Provider value={csrfToken}>
                        <TasksDispatchContext.Provider value={mockTasksDispatch}>
                            <Subtask 
                                subtask={testSubtask} 
                                inEditMode={true}
                                updateEditedSubtaskList={mockUpdateEditedSubtaskList}
                            />
                        </TasksDispatchContext.Provider>
                </CSRFTokenContext.Provider>
            </ThemeContext.Provider>
        );

        expect(titleInput).toHaveValue(fakeChanges.title);
        expect(descriptionInput).toHaveValue(fakeChanges.description);
        expect(deadlineInput).toHaveValue(fakeChanges.deadline);
    });
    
    it("Calls services necessary to delete itself when the delete subtask button is clicked", async () => {
        
        mockDeleteSubtask.mockResolvedValueOnce();

        // Render subtask in edit mode
        renderSubtask(true);

        const deleteSubtaskBtn = screen.getByTitle("Delete subtask");
        expect(deleteSubtaskBtn).toBeInTheDocument();

        // Test that the delete-subtask API service call is made
        fireEvent.click(deleteSubtaskBtn);
        await waitFor(() => {
            expect(mockDeleteSubtask).toHaveBeenLastCalledWith(testSubtask.id, csrfToken);
        });

        // Test that the delete-subtask dispatch call is made
        await waitFor(() => {
            expect(mockTasksDispatch).toHaveBeenLastCalledWith({
                type: 'deleteSubtask',
                subtask: { ...testSubtask },
            });
        });
    });
});