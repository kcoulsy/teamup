import { useState, useCallback } from 'react';

// returned toggle function has any type for argument so that it can be used anywhere.
// It will only work if passing in a boolean and will set it to that value
const useToggle = (
    initialState: boolean = false
): [boolean, (newState?: any) => void] => {
    const [state, setToggle] = useState(initialState);
    const toggle = useCallback((arg) => {
        if (typeof arg !== 'boolean') {
            setToggle(arg);
        } else {
            setToggle((state) => !state);
        }
    }, []);

    return [state, toggle];
};

export default useToggle;
