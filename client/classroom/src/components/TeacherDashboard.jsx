import React, { useState } from 'react';
import ClassStudents from '../pages/ClassStudents';
import Timetable from '../pages/Timetable';

const TeacherDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('MyStudents');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'MyStudents':
        return <ClassStudents/>;
      case 'Timetable':
        return <Timetable/>;
      default:
        return <ClassStudents />;
    }
  };

  return (
    <div className="flex">
      {/* Navigation Menu */}
      <div className="menu mt-20 bg-base-200 rounded-box w-56 space-y-5">
        <ul>
          <li>
            <button onClick={() => setActiveComponent('MyStudents')}>
              My ClassStudents
            </button>
          </li>
          <li>
            <button onClick={() => setActiveComponent('Timetable')}>
              Create TimeTable
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

export default TeacherDashboard;
