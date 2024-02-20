Data Model
    The application's data model is structured around several key entities:

    Board: Represents a project or context for organizing tasks.
    StatusItem: Defines categories or phases for task progression.
    Task: Represents an individual task with a title, description, and associated subtasks.
    Subtask: Defines actionable items within a larger task.
    For a detailed overview of each type and their properties, see /lib/type.ts.

Data Storage
    The application uses the browser's localStorage to persist data across sessions. All task and board information is stored under the key 'boards', allowing for quick retrieval and update operations without the need for an external database.

Getting Started

To set up the Task Management Program locally, follow these steps:

Install dependencies:

``` bash
    npm install
```
Start the application:

``` bash
    npm run dev
```
The application should now be running on http://localhost:3000.

Usage
    To use the Task Management Program, navigate through the UI to create boards, add tasks, and assign them statuses. Each task can be expanded to reveal or add subtasks, providing detailed tracking at a glance.

Types Documentation

Board
    Represents a project or context for tasks.

    id: Unique identifier
    name: Board name
    statusList: Array of StatusItem
    tasks: Array of Task

StatusItem
    Defines a task's status.

    id: Unique identifier
    value: Status name

Task
    Represents a task within a board.

    id: Unique identifier
    title: Task title
    description: Task description
    statusId: Identifier for the task's current status
    subtasks: Array of Subtask

Subtask
    Defines a part of a larger task.

    id: Unique identifier
    title: Subtask title
    isCompleted: Whether the subtask is completed

For more details on each type, refer to the source code documentation.