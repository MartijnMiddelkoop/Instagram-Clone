import { useState, useEffect, useContext  } from 'react';
import UserContext from '../context/user';
import { getPhotos, getUserByUserId } from '../services/firebase';

export default function usePhotos() {
    const [photos, setPhotos] = useState(null);
    const {
        user: { uid: userId = '' }
    } = useContext(UserContext)

    useEffect(() =>  {
    async function getTimeLinePhotos() {
        const [{ following }] = await getUserByUserId(userId);
        let followedUserphotos = [];

        console.log('following', following);

        if (following.lenght > 0 ) {  
            followedUserphotos = await getPhotos(userId, follwing);
        }

        followedUserphotos.sort((a,b) => b.dateCreated - a.dateCreated);
        setPhotos(followedUserphotos);
    }

    
        getTimeLinePhotos();    
}, [userId]);

    return { photos };
}