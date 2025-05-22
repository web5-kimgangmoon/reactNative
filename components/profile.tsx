import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {Text} from 'react-native';

const ProfileScreen = ({
  route,
}: NativeStackScreenProps<RootStackParamList, 'Profile'>) => {
  return <Text>This is {route.params.name}'s profile</Text>;
};

export default ProfileScreen;
