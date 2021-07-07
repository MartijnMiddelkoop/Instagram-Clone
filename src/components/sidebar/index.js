import React, { useContext } from 'react';
import User from './user';
import Suggestions from './Suggestions';
import LoggedInUserContext from '../../context/logged-in-user';

export default function Sidebar()  {
    const { 
    user:  { docId = '', fullName, username, userId, following } = {} }  = useContext(LoggedInUserContext);

    console.log('fullName, username, userId', fullName, username, userId);
    return (
    <div className="p-4">
        <User username={username} fullName={fullname} />
        <Suggestions userId={userId} following={following} loggedInUserDocId={docId} />
    </div>
    );
};

