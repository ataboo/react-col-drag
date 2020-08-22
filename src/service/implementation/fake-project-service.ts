import { Project } from "../../models/project";
import { ICardService as IProjectService } from "../interface/icard-service";
import ProjectService from "./card-service";

export default class FakeProjectService implements IProjectService {
    cachedProjectData: Project
    realService: IProjectService

    constructor() {
        this.realService = new ProjectService();
        this.cachedProjectData = {
            id: "",
            name: "",
            statuses: [
                {
                    id: "1",
                    name: "Back Burner"
                },
                {
                    id: "2",
                    name: "Front Burner"
                }
            ],
            tasks: [
                {
                id: "1",
                name: "card a",
                statusId: "1",
                ordinal: 0
                },
                {
                id: "2",
                name: "card b",
                statusId: "1",
                ordinal: 1
                },
                {
                id: "3",
                name: "card c",
                statusId: "2",
                ordinal: 0
                },
                {
                id: "4",
                name: "card d",
                statusId: "2",
                ordinal: 1
                },
                {
                id: "5",
                name: "card e",
                statusId: "2",
                ordinal: 2
                },
                {
                id: "6",
                name: "card f",
                statusId: "2",
                ordinal: 3
                }
            ]
        }
    }

    swapTasks(project: Project, draggedTaskId: string, droppedTaskStatusId: string, droppedTaskOrdinal: number): void {
        this.realService.swapTasks(project, draggedTaskId, droppedTaskStatusId, droppedTaskOrdinal);
    }
    moveCardToStatus(project: Project, draggedTaskId: string, statusId: string): void {
        this.realService.moveCardToStatus(project, draggedTaskId, statusId);
    }

    async getProjectList(): Promise<Project[]> {
        return [this.cachedProjectData];
    }

    async getProject(projectId: string) : Promise<Project> {
        return this.cachedProjectData;
    }

    async saveProject(project: Project): Promise<any> {
        this.cachedProjectData = project;
    }
}
