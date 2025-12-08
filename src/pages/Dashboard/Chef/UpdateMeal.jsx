import React from 'react';
import { useParams } from 'react-router';

const UpdateMeal = () => {
    const { id } = useParams();
    console.log(id);
    return (
        <div>

        </div>
    );
};

export default UpdateMeal;