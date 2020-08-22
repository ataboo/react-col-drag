import { Project } from "../../models/project";

export interface ICardService {
    swapTasks(project: Project, draggedTaskId: string, droppedTaskStatusId: string, droppedTaskOrdinal: number) : void

    moveCardToStatus(project: Project, draggedTaskId: string, statusId: string) : void;

    getProjectList(): Promise<Project[]>;

    getProject(id: string): Promise<Project>

    saveProject(project: Project): Promise<any>;
}