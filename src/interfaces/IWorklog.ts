
export interface IWorklogRoot {
    worklog: IWorklog;
}

export interface IWorklog {
    owner: IOwner;
    end_time: IEndTime;
    description: string;
    other_charge: number;
    recorded_time: IRecordedTime;
    tech_charge: number;
    mark_first_response: boolean;
    include_nonoperational_hours: boolean;
    start_time: IStartTime;
    worklog_type: IWorklogType;

}

export interface IOwner {
    id: string;
}

export interface IEndTime {
    value: string;
}

export interface IStartTime {
    value: string;
}

export interface IRecordedTime {
    value: number

}

export interface IWorklogType {
    id: string;
}
