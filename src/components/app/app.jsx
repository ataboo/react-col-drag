import React from 'react';
import './app.scss';
import Project from './project';
import FakeProjectService from '../../service/implementation/fake-project-service';


function App() {
  const projectService = new FakeProjectService();

  return (
    <div className="App">
      <Project projectId="1" projectService={projectService} />
    </div>
  );
}

export default App;
