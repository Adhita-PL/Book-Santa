import {createStackNavigator} from 'react-navigation-stack';
import ReceiverDetailsScreen from '../Screens/ReceiverDetailsScreen'
import BookDonateScreen from '../Screens/BookDonateScreen';

export const AppStackNavigator = createStackNavigator({
    BookDonateList : {screen: BookDonateScreen, 
        navigationOptions: {
            headerShown: false
        }
    },
    ReceiverDetails : {screen: ReceiverDetailsScreen,
        navigationOptions: {
            headerShown: false
        }
    },
},
    {initialRouteName: 'BookDonateList'}
)