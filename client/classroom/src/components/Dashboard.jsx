import React, { useState } from 'react';
import AllStudents from '../pages/AllStudents';
import AllTeachers from '../pages/AllTeachers';
import CreateClass from '../pages/createClass';
import MyClasses from '../pages/MyClasses';

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('AllTeachers');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'AllTeachers':
        return <AllTeachers />;
      case 'AllStudents':
        return <AllStudents />;
      case 'CreateClass':
        return <CreateClass />;
      case 'MyClasses':
        return <MyClasses />;
      default:
        return <AllTeachers />;
    }
  };

  return (
    <div className="flex">
      {/* Navigation Menu */}
      <div className="menu mt-20 bg-base-200 rounded-box w-56 space-y-5">
        <ul>
          <li>
            <button onClick={() => setActiveComponent('AllTeachers')}>
              All Teachers
            </button>
          </li>
          <li>
            <button onClick={() => setActiveComponent('AllStudents')}>
              All Students
            </button>
          </li>
          <li>
            <button onClick={() => setActiveComponent('CreateClass')}>
              Create Classroom
            </button>
          </li>
          <li>
            <button onClick={() => setActiveComponent('MyClasses')}>
              All Classrooms
            </button>
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="content flex-1 p-4">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Dashboard;
