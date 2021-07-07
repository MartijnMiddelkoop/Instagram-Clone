import { useState, useEffect, useContext } from "react";
import UserContext from '../context/user';
import { getUserByUserId } from "../services/firebase";

export default function useUser() {
    const [activeUser, setactiveUser] = useState({});
    const { user } = useContext(UserContext);

    useEffect (() => {
        async function getUserObjUserId(){
            const [user] = await getUserByUserId(user.uid);

            setactiveUser(user || {});
        }

        if (user?.uid) {
            getUserObjUserId(); 
        }
     }, [user]);

     return { user: activeUser };
}
