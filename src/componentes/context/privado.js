import {Navigate, Outlet} from 'react-router-dom';
import { useAuthContext } from './authContext';

export default function Privado(){
    const {isAuthenticated} = useAuthContext();
    if(!isAuthenticated){
       return <Navigate to='/retailservices/'/>
    }
    return (<Outlet/>)
}