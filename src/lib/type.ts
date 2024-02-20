export type Board = {
    id: string;
    name: string;
    statusList: StatusItem[]; 
    tasks: Task[];
}


export type StatusItem = {
    id: string;
    value: string;
}

export type Task = {
    id: string;
    title: string;
    description: string;
    statusId: string;
    subtasks: Subtask[]
}

export type Subtask = {
    id: string;
    title: string;
    isCompleted: boolean;
}

export type BoardNav = {
    id: string;
    name: string
}

export type InputTextProps = {
    id: string;
    value: string;
    valid: boolean;
    shouldValidate?: boolean;
}

export type InputTextAreaProps = {
    id: string;
    value: string;
    valid: boolean;
    shouldValidate?: boolean;
}

