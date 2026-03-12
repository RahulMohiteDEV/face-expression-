import {registerUser, loginUser, getmeUser, logoutUser} from "../services/auth.api";
import {  useContext } from "react";
import { AuthContext } from "../auth.context";
import { useEffect } from "react";

export const useAuth = () => {
    const context = useContext(AuthContext);
    const {user, setUser, loading, setLoading} = context;

    async function handleRegister({username, email, password}) {
        setLoading(true);
        const data = await registerUser({username, email, password});
        setUser(data.user);
        setLoading(false);
    }

    async function handleLogin({username, email, password}) {
        setLoading(true);
        const data = await loginUser({username, email, password});
        setUser(data.user);
        setLoading(false);
    }

    async function handleGetMe(){
        setLoading(true);
        const data = await getmeUser();
        setUser(data.user);
        setLoading(false);
        

    }


    async function handleLogout(){
        setLoading(true);
        const data = await logoutUser();
        setUser(null);
        setLoading(false);
    }

  useEffect(() => {

    
        
    handleGetMe();

},[])

    return ({
        user, loading , handleRegister, handleLogin, handleLogout, handleGetMe
    })
}