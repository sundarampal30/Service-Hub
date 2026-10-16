import React, { useState, useEffect, useContext } from "react";
import { AuthDataContext } from "./Authcontext.jsx";
import axios from "axios";

export const userDataContext = React.createContext();

function Usercontext({ children }) {
    const [userData, setUserData] = useState(null);
    const { serverUrl } = useContext(AuthDataContext);



    const getCurrentUser = async () => {
        try {
            const token = localStorage.getItem("token")
            const result = await axios.get(`${serverUrl}/api/user/users`, {
                withCredentials: true,
            });
            setUserData(result.data.user);
            console.log("User data fetched:", result.data.user);
        } catch (error) {
            setUserData(null);
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        getCurrentUser();
    }, []);

    const value = {
        userData,
        setUserData,
        getCurrentUser,
    };

    return (
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
    );
}

export default Usercontext;