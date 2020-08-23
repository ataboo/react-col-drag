import React, {useState, useEffect} from 'react';
import './project.scss';
import {Column} from './column/column';
import {Project as ProjectModel} from '../../../models/project';
import { IProjectService } from '../../../service/interface/iproject-service';

type ProjectProps = {
  projectId: string,
  projectService: IProjectService
}

function Project({projectId, projectService}: ProjectProps) {
  const [projectData, setProjectData] = useState<ProjectModel>(projectService.emptyProject());
  const [draggedCardId, setDraggedCardId] = useState<string>("");
  useEffect(() => {
      async function getProjectData() {
        var projectData = await projectService.getProject(projectId);
        setProjectData(projectData);
      }
      getProjectData();
    },
    [projectId, projectService]);
  
  const moveCardToStatus = (draggedId: string, statusId: string) => {
    setProjectData((oldProjectData) => {    
      let changed = projectService.moveCardToStatus(oldProjectData, draggedId, statusId)

      const newProjectData = {
        id: oldProjectData.id,
        name: oldProjectData.name,
        tasks: [...oldProjectData.tasks],
        statuses: [...oldProjectData.statuses],
      };

      if (changed) {
        projectService.saveProject(newProjectData);
      }

      return newProjectData;
    })
  }

  const moveCards = (draggedId: string, statusId: string, ordinal: number) => {
    setProjectData((oldProjectData) => {
      var changed = projectService.swapTasks(oldProjectData, draggedId, statusId, ordinal);

      const newProjectData = {
        id: oldProjectData.id,
        name: oldProjectData.name,
        tasks: [...oldProjectData.tasks],
        statuses: [...oldProjectData.statuses]
      };

      if(changed) {
        projectService.saveProject(newProjectData);
      }

      return newProjectData;
    });
  };

  const renderColumns = () => {
    if (projectData === undefined) {
      return (<div>Loading...</div>)
    }

    let sortedCards = (statusId: string) => projectData.tasks.filter(t => t.statusId === statusId).sort((a, b) => a.ordinal - b.ordinal);

    return projectData.statuses.map((status, i) => (<Column 
      key={status.id} 
      tasks={sortedCards(status.id)} 
      status={status} 
      moveCards={moveCards} 
      moveCardToStatus={moveCardToStatus}
      draggedCardId={draggedCardId}
      setDraggedCardId={setDraggedCardId}
      onDrop={() => projectService.saveProject(projectData)}
    />))

  }

  return (
    <div className="project">
        <div className="col-container">
          {renderColumns()}
        </div>
    </div>
  );
}

export default Project