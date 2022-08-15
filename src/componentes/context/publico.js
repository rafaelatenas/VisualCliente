import {Navigate, Outlet} from 'react-router-dom';
import {useAuthContext} from './authContext';

export default function Public(){
    const {isAuthenticated} = useAuthContext();
    console.log(isAuthenticated)
    if(isAuthenticated){
       return <Navigate to='/retailservices/home'/>
    }
    return (<Outlet/>)
}