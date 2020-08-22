import React, {useState, useEffect} from 'react';
import './project.scss';
import {Column} from './column';

function Project({projectId, projectService}) {
  const [projectData, setProjectData] = useState(undefined);
  const [draggedCardId, setDraggedCardId] = useState(undefined);
  useEffect(() => {
      async function getProjectData() {
        var projectData = await projectService.getProject(projectId);
        setProjectData(projectData);
      }
      getProjectData();
    },
    [projectId, projectService]);
  
  const moveCardToStatus = (draggedId, statusId) => {
    setProjectData((oldCardData) => {
      projectService.moveCardToStatus(oldCardData, draggedId, statusId)

      return {
        tasks: [...oldCardData.tasks],
        statuses: [...oldCardData.statuses]
      };
    })
  }

  const moveCards = (draggedId, statusId, ordinal) => {
    setProjectData((oldCardData) => {
      projectService.swapTasks(oldCardData, draggedId, statusId, ordinal)

      return {
        tasks: [...oldCardData.tasks],
        statuses: [...oldCardData.statuses]
      };
    });
  };

  const renderColumns = () => {
    if (projectData === undefined) {
      return (<div>Loading...</div>)
    }

    let sortedCards = (statusId) => projectData.tasks.filter(t => t.statusId === statusId).sort((a, b) => a.ordinal - b.ordinal);

    return projectData.statuses.map((status, i) => (<Column 
      key={status.id} 
      cards={sortedCards(status.id)} 
      status={status} 
      moveCards={moveCards} 
      moveCardToStatus={moveCardToStatus}
      draggedCardId={draggedCardId}
      setDraggedCardId={setDraggedCardId}
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