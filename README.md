## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization).

## Learn More
Types Overview

Board
    Represents a project or context for which tasks are organized. Each board contains a list of statuses and tasks associated with it.

    id (string): A unique identifier for the board.
    name (string): The name of the board.
    statusList (StatusItem[]): An array of statuses that tasks can be categorized by within this board.
    tasks (Task[]): An array of tasks that belong to this board.

StatusItem
    Defines a category or phase that a task can be in. Used to track the progression of tasks within a board.

    id (string): A unique identifier for the status item.
    value (string): The name or label of the status, such as "Todo", "In Progress", or "Done".

Task
    Represents an individual task or work item. Tasks are associated with a board and have a status indicating their current progression.

    id (string): A unique identifier for the task.
    title (string): The title or brief description of the task.
    description (string): A detailed description of the task.
    statusId (string): The identifier of the task's current status, linking to a StatusItem.
    subtasks (Subtask[]): An array of subtasks or smaller tasks that make up this task.

Subtask
    Defines a smaller, actionable item within a larger task. Subtasks help break down tasks into manageable parts.

    id (string): A unique identifier for the subtask.
    title (string): The title or brief description of the subtask.
    isCompleted (boolean): A flag indicating whether the subtask has been completed.

BoardNav
    Used for navigation purposes, allowing users to switch between different boards within the application.

    id (string): A unique identifier for the navigation item.
    name (string): The name of the board this navigation item links to.
