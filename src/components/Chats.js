import React , { useContext , useEffect , useState } from 'react';
import { auth } from '../firebase';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from "react-chat-engine";
import axios from 'axios';

//Components
import Navbar from "./Navbar";

//styles
import styles from "./Chats.module.css";

//Context
import AuthContext from '../contexts/AuthContextProvider';

const Chats = () => {

    const [loading , setLoading] = useState(true);
    const user = useContext(AuthContext);
    const history = useHistory();

    const logoutHandler = async () => {
        await auth.signOut();
        history.push("/");
    }

    useEffect(() => {
        if(!user) {
            history.push("/")
            return;
        }

        axios.get("https://api.chatengine.io/users/me" , {
            headers: {
                "project-id" : "a98bff8a-baca-4490-836a-9b55a54b3df7" ,
                "user-name" : user.email ,
                "user-secret" : user.uid
            }
        })
        .then(() => {
            setLoading(false)
        })
        .catch(() => {
            let formdata = new FormData();
            formdata.append("email" , user.email)
            formdata.append("username" , user.email)
            formdata.append("secret" , user.uid)
            getFile(user.photoURL)
                .then(avatar => {
                    formdata.append("avatar" , avatar , avatar.name)
                    axios.post("https://api.chatengine.io/users/" , formdata , {
                        headers: {
                            "private-key" : "cfa91809-6232-4fb7-a643-c0c542537946"
                        }
                    })
                    .then(() => setLoading(false))
                    .catch(error => console.log(error))
                })
        })

    } , [user , history])

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();
        return new File([data] , "userPhoto.jpg" , {type : "image/jpeg"})
    }

    if(!user || loading) return "Loading ...";

    return (
        <div className={styles.container}>
            
            <Navbar logoutHandler={logoutHandler} />

            <ChatEngine
                height="calc(100vh - 50px)"
                projectID="a98bff8a-baca-4490-836a-9b55a54b3df7"
                userName={user.email}
                userSecret={user.uid}
             />

        </div>
    );
};

export default Chats;