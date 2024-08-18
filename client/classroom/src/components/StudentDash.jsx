import React, { useState } from 'react';
import Timetable from '../pages/Timetable';
import ClassMates from './ClassMates';
import MyTimeTables from '../pages/MyTimeTables';

const StudentDash = () => {
  const [activeComponent, setActiveComponent] = useState('MyClassmates');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'MyClassmates':
        return <ClassMates/>;
      case 'MyTimetable':
        return <MyTimeTables/>
      default:
        return <ClassMates />;
    }
  };

  return (
    <div className="flex">
      {/* Navigation Menu */}
      <div className="menu mt-20 bg-base-200 rounded-box w-56 space-y-5">
        <ul>
          <li>
            <button onClick={() => setActiveComponent('MyStudents')}>
              My ClassMates
            </button>
          </li>
          <li>
            <button onClick={() => setActiveComponent('MyTimetable')}>
              My TimeTable
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

export default StudentDash;
