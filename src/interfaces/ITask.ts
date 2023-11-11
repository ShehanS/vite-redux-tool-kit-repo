export interface ITask {
    task: ITaskAttribute;
}

export interface ITaskAttribute {
    percentage_completion?: string;
    estimated_effort_hours?: string | undefined;
    email_before?: string | undefined;
    description?: string | undefined;
    title?: string | undefined;
    additional_cost?: string | undefined;
    actual_start_time?: IActualStartTime | undefined;
    actual_end_time?: IActualEndTime | undefined;
    owner?: IOwner | undefined;
    priority?: IPriority | undefined;
    scheduled_end_time?: IScheduledEndTime | undefined;
    estimated_effort_minutes?: string | undefined;
    estimated_effort_days?: string | undefined;
    task_type?: string | undefined | null;
    scheduled_start_time: IScheduledStartTime | undefined;
    status: IStatus | undefined;

}

export interface IScheduledEndTime {
    value?: string | undefined
}

export interface IScheduledStartTime {
    value?: string | undefined
}


export interface IActualStartTime {
    value?: string | undefined
}

export interface IActualEndTime {
    value?: string | undefined
}

export interface IOwner {
    name?: string | undefined;
    id?: string | undefined
}

export interface IPriority {
    name?: string | undefined;
    id?: string | undefined
}

export interface IStatus {
    name: string | undefined;
    id: string | undefined
}
