import React from 'react';
import logo from './logo.svg';
import './App.css';

// import {ProjectListScreen} from './screens/project-list/index'
import { useAuth } from 'context/auth-context';
import { UnauthenticatedApp } from 'unauthenticated-app';
import { AuthenticatedApp } from 'authenticated-app';


function App() {
  const { user } = useAuth()

  return (
    <div className="App">
      {/* <ProjectListScreen/> */}
      {/* <LoginScreen /> */}
      {user? <AuthenticatedApp/> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
