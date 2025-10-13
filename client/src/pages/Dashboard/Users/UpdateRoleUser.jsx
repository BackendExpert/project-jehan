import React from 'react'
import { useParams } from 'react-router-dom'

const UpdateRoleUser = () => {
    const {id} = useParams()
    return (
        <div>UpdateRoleUser : {id}</div>
    )
}

export default UpdateRoleUser