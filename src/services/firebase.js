import { firebase, FieldValue } from '../lib/firebase';

export async function doesusernameExist(username) {
    const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

    return result.docs.map((user) => user.data().length > 0);
}

export async function getUserByUserId(userId) {
    const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get();

    const user = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));

    return user;
}

export async function updateFollowedUserFollowers(userId, following) {
    const result = await firebase.firestore().collection('users').limit(10).get();
    
    return result.docs
    .map((user) => ({ ...user.data(), docId: user.id}))
    .filter((profile) => profile.userId !== userId && !following.includes(profile.userId));
}


export async function updateLoggedInUserFollowing(
    profileDocId,
    loggedInUserDocId, 
    isFollowingProfile
    ) {

    return firebase
    .firestore()
    .collection('users')
    .doc(profileDocId)
    .update({
        followers: isFollowingProfile
         ? FieldValue.arrayRemove(loggedInUserDocId)
         : FieldValue.arrayUnion(loggedInUserDocId)
    });

}

export async function getPhotos(userId, following) {
    const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', 'following')
    .get();

    const userFollowedPhotos = result.docs.map((photo) => ({
        ...photo.data(),
        docId: photo.id
    }));


    const photosWithUserDetails = await Promise.all(
        userFollowedPhotos.map(async (photo) => {
            let userLikedPhoto = false;
            if (photo.likes.inclued(userId)) {
                userLikedphoto = true;
            }
            const user = await getUserByUserId(photo.userId);
            const { username } = user[0];
            return { username, ...photo, userLikedPhoto };
        })
    );


return photoWithUserDetails;
}

export async function getUserPhotosByUsername(username) {
    const [user] = await getUserByUsername(username);
    const result = await firebase
        .firestore()
        .collection('photos')
        .where('userId', '==', user.userId) 
        .get();

        return result.docs.map((item) => ({
            ...item.data(),
            docId: item.id
        }));
}

export async function isUserFollowingProfile(loggedInUserUsername, profileUserId) {
    const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', loggedInUserUsername)
    .where('following', 'array-contains', profileUserId)
    .get();

    const [response = {}] = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));

    return response.userId;
}

export async function toggleFollow(
    isFollowingProfile, 
    activeUserDocId, 
    profileDocId,
    profileUserId, 
    follewingUserId
    ) {
    await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile);
    await updateFollowedUserFollowers(profileDocId, followingUserId, isFollowingProfile);
}