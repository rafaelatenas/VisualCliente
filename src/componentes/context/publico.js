import {Navigate, Outlet} from 'react-router-dom';
import {useAuthContext} from './authContext';

export default function Public(){
    const {isAuthenticated,IdUser} = useAuthContext();
    const Home = <Navigate to='/retailservices/home'/>
    const Panel = <Navigate to='/retailservices/management/panel'/>
    if(isAuthenticated){
        if (IdUser !== 1) {
            return Home
        }
        return Panel
    }
    return (<Outlet/>)
}