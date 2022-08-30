import {Navigate, Outlet} from 'react-router-dom';
import { useAuthContext } from './authContext';

export default function Administrator(){
    const {isAuthenticated} = useAuthContext();
    if(!isAuthenticated){
       return <Navigate to='/retailservices/'/>
    }
    return (<Outlet/>)
}