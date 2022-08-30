import React , { useState , useEffect , createContext  } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {

    const [loading , setLoading] = useState(true);
    const [user , setUser] = useState(false);
    const history = useHistory();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setUser(user);
            setLoading(false);
            if(user) history.push("/chats");
        })
    } , [user , history])

    return (
        <AuthContext.Provider value={user}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;