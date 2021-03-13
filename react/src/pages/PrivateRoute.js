import React, { useContext } from 'react'; 
import { Route, Redirect } from 'react-router-dom';
import { LoadingPage } from './../components/Loading';
import { UserContext } from './../hooks/UserContext';

export default function PrivateRoute(props) {   
    const { user, isLoading } = useContext(UserContext); 

        const { component: Component,
        ...rest } = props; 

        //return loading component 
        if(isLoading) {
          return <LoadingPage/>;
        } 

        if(user){
            return ( <Route {...rest} render={(props) => (
            <Component {...props}/>)}/>)
        } else {
            return <Redirect to='/home'/>
        }
}



















/**
  

    useEffect(() => {
        console.log('The Privte Route useEffect ran');
        if(user) {
          console.log(user);
          setUser(userStatus.username);
        } else {
            console.log('The Privte Route did NOT find a user');
            setUser({});
        }
      }, []);
 

 export default function PrivateRoute(props) {
    const { user, setUser } = useContext(UserContext);
    const { userStatus } = useFindUser();

    const checkAuthentication = () => {
            console.log('Private route check ran');
            const Component = props.component; 
            if(user) {
                return <Component/>
            } else {
                return <Redirect to = {{ pathname: '/' }} />
            }
        }
 
    return(
        <>
        {checkAuthentication(props)}
       </>
    )
};
**/

