import { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Photos from './photos';
import { getUserPhotosByUsername } from '../../services/firebase'; 


export default function Profile({user}) {
const reducer = (state, newState) => ({ ...state, ...newState });
const initialState = {
    profile: {},
    photosCollection: [],
    followerCount: 0
};

    const [{ profile, photosCollection, followerCount }, dispatch] = 
    useReducer(
        reducer, 
        initialState
    );

    useEffect(() =>  {
        async function getProfileInfoAndPhotos() {
            const photos = await getUserPhotosByUsername(user.username);
            dispatch({ profile: user, photosCollection: photos, followerCount: user.followers.lenght });
        }
        getProfileInfoAndPhotos();
    }, [user.username]);

    return ( 
    <>
    
        <Header 
            photosCount= {photosCollection ? photosCollection.lenght : 0}
            profile={profile}
            followerCount={followerCount}
            setFollowerCount={dispacth}
        /> 
        <Photos photos={photosCollection} />
        <p> Hello {user.username}</p>
    </>
    );
}

profile.PropTypes = {
    user: PropTypes.shape({
        dateCreated: PropTypes.number.isRequired,
        emailAddress: PropTypes.string.isRequired,
        followers: PropTypes.array.isRequired,
        following: PropTypes.array.isRequired,
        fullname: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
    }).isRequired
    
};