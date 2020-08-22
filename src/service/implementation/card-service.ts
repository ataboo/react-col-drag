import { Project } from "../../models/project";
import { ICardService } from "../interface/icard-service";

export default class ProjectService implements ICardService {
    swapTasks(project: Project, draggedTaskId: string, droppedTaskStatusId: string, droppedTaskOrdinal: number) {
        let draggedTask = project.tasks.find(t => t.id === draggedTaskId);
        if (draggedTask === undefined) {
            throw new Error("Failed to find task: " + draggedTaskId);
        }

        let newStatusTasks = project.tasks.filter(c => c.statusId === droppedTaskStatusId && c.id !== draggedTaskId);
        newStatusTasks.sort((a, b) => a.ordinal - b.ordinal);
    
        if (draggedTask.statusId === droppedTaskStatusId) {
            let droppedTask = newStatusTasks.find(c => c.ordinal === droppedTaskOrdinal);
            if (droppedTask !== undefined) {
                droppedTask.ordinal = draggedTask.ordinal;
            }
        } else {   
            let oldStatusTasks = project.tasks.filter(c => c.statusId === draggedTask!.statusId && c.id !== draggedTaskId);
            oldStatusTasks.sort((a, b) => a.ordinal - b.ordinal);
            for(let i=droppedTaskOrdinal; i<newStatusTasks.length; i++) {
                newStatusTasks[i].ordinal = i+1;
            }
    
            for(let i=0; i<oldStatusTasks.length; i++) {
                oldStatusTasks[i].ordinal = i; 
            }
        }
    
        draggedTask.ordinal = droppedTaskOrdinal;
        draggedTask.statusId = droppedTaskStatusId;
    };

    moveCardToStatus(project: Project, draggedTaskId: string, statusId: string) {
        let draggedTask = project.tasks.find(c => c.id === draggedTaskId);
        if (draggedTask === undefined) {
            throw new Error("Failed to find task: " + draggedTaskId);
        }
        
        if(draggedTask.statusId !== statusId) {
            var oldStatusTasks = project.tasks.filter(c => c.statusId === draggedTask!.statusId && c.id !== draggedTaskId);
    
            for(let i=0; i<oldStatusTasks.length; i++) {
                oldStatusTasks[i].ordinal = i;
            }
    
            draggedTask.statusId = statusId;
            draggedTask.ordinal = 0;
        }
    }
    
    async getProjectList(): Promise<Project[]> {
        const response = await fetch(`localhost:8080/api/v1/projects/list`, {
            method: 'GET',
            mode: 'same-origin',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'error',
            referrerPolicy: 'no-referrer'
        });
    
        return response.json();
    }

    async getProject(projectId: string): Promise<Project> {
        const response = await fetch(`localhost:8080/api/v1/projects/get?id=${projectId}`, {
            method: 'GET',
            mode: 'same-origin',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'error',
            referrerPolicy: 'no-referrer'
        });
    
        return response.json();
    };
    
    async saveProject(project: Project): Promise<any> {
        const response = await fetch(`localhost:8080/api/v1/projects/update?id=${project.id}`, {
            method: 'POST',
            mode: 'same-origin',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'error',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(project)
        });
    
        return response.json();
    };
}
