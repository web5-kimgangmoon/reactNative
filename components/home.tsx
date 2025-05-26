import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {Button} from 'react-native';

const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Home'>) => {
  return (
    <Button
      title="Go to Jane's profile"
      onPress={() => navigation.navigate('Profile', {name: 'Jane'})}
    />
  );
};

export default HomeScreen;
