import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClassmatesStart, getClassmatesSuccess, getClassmatesFail } from '../redux/student/studentSlice'; // Adjust import based on your file structure

const ClassMates = () => {
    const dispatch = useDispatch();
    const { classMates, loading, error } = useSelector((state) => state.student);

    const getAllStudents = async () => {
        dispatch(getClassmatesStart());
        try {
            const res = await fetch('/api/v1/allclassmates');
            const data = await res.json();
            if (!res.ok) {
                dispatch(getClassmatesFail(data.message));
            } else {
                dispatch(getClassmatesSuccess(data.students)); // Ensure this matches the API response
            }
        } catch (error) {
            dispatch(getClassmatesFail(error.message));
        }
    };

    useEffect(() => {
        getAllStudents();
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1 className='text-center text-4xl mt-5 mb-10 font-semibold'>
                My ClassMates
            </h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classMates.length > 0 ? (
                            classMates.map((item, i) => (
                                <tr key={item._id}>
                                    <th>{i + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.role}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No students available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClassMates;
