import { useState } from 'react';

const useSharedState = () => {
    const [isEdit, setIsEdit] = useState(false);

    const updateIsEdit = () => {
        setIsEdit(true);
        console.log("edit: ",isEdit);
    };

    return [isEdit, updateIsEdit];
};

export default useSharedState;
