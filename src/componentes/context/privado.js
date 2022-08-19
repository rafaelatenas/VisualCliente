import {Navigate, Outlet} from 'react-router-dom';
import { useAuthContext } from './authContext';

export default function Privado(){
    const {isAuthenticated,IdUser} = useAuthContext();
    console.log(isAuthenticated,IdUser)
    if(!isAuthenticated){
       return <Navigate to='/retailservices/'/>
    }
    return (<Outlet/>)
}