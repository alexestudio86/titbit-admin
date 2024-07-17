import { useState, useEffect, useContext, createContext } from "react";
import {auth} from '../config/firebase.js'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

//Initialize
//const auth  = getAuth(app);

//Use Login Context
const loginContext = createContext();
export function useLoginContext () {
    return useContext(loginContext)
}


export function LoginProvider ( {children} ) {

    const [user, setUser] = useState({
        email:          '',
        password:       '',
        authenticated:  false,
        loader:         false,
        error:          false,
    });
    const handleChange = ({ target: { value, name } }) => {
        setUser({ ...user, [name]: value });
    }

    const login = async() => {
        setUser({...user, loader:true })
        try {
            const userCredetntials = await signInWithEmailAndPassword(auth, user.email, user.password);
            setUser({...user, authenticated:true, loader:false });
        } catch (error) {
            console.log(`Code: ${error.code}, message: ${error.message}`);
            setUser({...user, loader:false, error:true });
            setTimeout( () => {
                setUser({...user, error:false });
            }, 600)
        }
    };

    const logout = async() => {
        try {
            await signOut(auth);
            setUser({...user, authenticated:false});
        } catch (error) {
            return error;
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            currentUser && setUser({...user, email: currentUser.email, authenticated: true});
        });
        return () => unsubscribe();
    }, []);
    
    return (
        <loginContext.Provider value={{user, handleChange, login, logout}}>
            {children}
        </loginContext.Provider>
    )
}