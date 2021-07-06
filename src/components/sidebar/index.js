import React, { memo } from 'react';
import useUser from '../../hooks/use-user';
import User from './user';
import Suggestions from './Suggestions';

export default function Sidebar()  {
    const { 
    user:  { docId, fullName, username, userId, following }
    } = useUser();

    console.log('fullName, username, userId', fullName, username, userId);
    return (
    <div className="p-4">
        <User username={username} fullName={fullname} />
        <Suggestions userId={userId} following={following} loggedInUserDocId={docId} />
    </div>
    );
};

