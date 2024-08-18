import { useDispatch } from 'react-redux';
import { loadUserSuccess, loadUserStart, loadUserFail } from './../redux/user/userSlice';

const useLoadUser = () => {
    const dispatch = useDispatch();

    const loadUser = async () => {
        dispatch(loadUserStart());
        try {
            const res = await fetch('/api/v1/me');
            const data = await res.json();
            if (!res.ok) {
                dispatch(loadUserFail(data.message));
            } else {
                dispatch(loadUserSuccess(data));
            }
        } catch (error) {
            dispatch(loadUserFail(error.message));
        }
    };

    return loadUser;
};

export default useLoadUser;