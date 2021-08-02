import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerScreenNavigator, AuthScreenNavigator } from './AppNavigator';
import { useSelector } from 'react-redux';



const AppNavigator = props => {

    const user = useSelector(state => state.auth.user);
    const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);
    console.log("DID TRY",didTryAutoLogin)
    return <NavigationContainer>
        {didTryAutoLogin  && <DrawerScreenNavigator user={user} />}
        {!didTryAutoLogin && <AuthScreenNavigator />}
        {/* <AuthScreenNavigator /> */}
        {/* <DrawerScreenNavigator /> */}
    </NavigationContainer>
}


export default AppNavigator;