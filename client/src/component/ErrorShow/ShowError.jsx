import React from 'react'

const ShowError = ({ error_message }) => {
    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-sm">
            {error_message}
        </div>
    );
};


export default ShowError