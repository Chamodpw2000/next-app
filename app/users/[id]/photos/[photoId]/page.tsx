import React from 'react'

interface Props {
    params: {
        id: number;
        photoId: number;
    }
}



const UserPhoto = ({ params: { id, photoId } }: Props) => {
    return (
        <div>
            
            UserId {id} UserPhoto {photoId}</div>
    )
}

export default UserPhoto