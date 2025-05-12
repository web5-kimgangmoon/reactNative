// import {Text, View} from 'react-native';

import {Component, PropsWithChildren, useState} from 'react';
import {
  Button,
  FlatList,
  Image,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// const YourApp = () => {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}>
//       <Text>Try editing mesdsad!</Text>
//     </View>
//   );
// };

// export default YourApp;

// const styles = StyleSheet.create({
//   center: {
//     alignItems: 'center',
//   },
// });

// type GreetingProps = {
//   name: string;
// };

// const Greeting = (props: GreetingProps) => {
//   return (
//     <View style={styles.center}>
//       <Text>Helllo {props.name}!</Text>
//     </View>
//   );
// };

// const LotsOfGreetings = () => {
//   return (
//     <View style={[styles.center, {top: 50}]}>
//       <Greeting name="Rexxar" />
//       <Greeting name="Jaina" />
//       <Greeting name="Valeera" />
//     </View>
//   );
// };

// export default LotsOfGreetings;

// const App = () => {
//   const [count, setCount] = useState(0);

//   return (
//     <View style={styles.container}>
//       <Text>You clicked {count} times</Text>
//       <Button onPress={() => setCount(count + 1)} title="Click me!" />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default App;

// class App extends Component {
//   state = {
//     count: 0,
//   };

//   onPress = () => {
//     this.setState({
//       count: this.state.count + 1,
//     });
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <TouchableOpacity style={styles.button} onPress={this.onPress}>
//           <Text>Click me</Text>
//         </TouchableOpacity>
//         <View>
//           <Text>You clicked {this.state.count} times</Text>
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   button: {
//     alignItems: 'center',
//     backgroundColor: '#DDDDDD',
//     padding: 10,
//     marginBottom: 10,
//   },
// });

// export default App;
// const App = () => {
//   return (
//     <ScrollView>
//       <Text>Some text</Text>
//       <View>
//         <Text>Some more Text</Text>
//         <Image
//           source={{
//             uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
//           }}
//           style={{width: 200, height: 200}}
//         />
//       </View>
//       <TextInput
//         style={{
//           height: 40,
//           borderColor: 'gray',
//           borderWidth: 1,
//         }}
//         defaultValue="You can type in me"
//       />
//     </ScrollView>
//   );
// };

// export default App;

// const Cat = () => {
//   return <Text>Hello, I am your cat!</Text>;
// };

// export default Cat;

const globalStylees = StyleSheet.create({
  top: {
    paddingTop: 13,
  },
});

// const Cat = () => {
//   const name = 'Maru';
//   return (
//     <View style={globalStylees.top}>
//       <Text>Hello, I am {name}</Text>
//     </View>
//   );
// };

// export default Cat;

// const getFullName = (
//   firstName: string,
//   secondName: string,
//   thirdName: string,
// ) => {
//   return firstName + ' ' + secondName + ' ' + thirdName;
// };

// const Cat = () => {
//   return <Text >Hello, I am {getFullName('Rum', 'Tum', 'Tugger')}!</Text>;
// };

// export default Cat;

// const Cat = () => {
//   return (
//     <View>
//       <Text>Hello, I am...</Text>
//       <TextInput
//         style={{
//           height: 40,
//           borderColor: 'gray',
//           borderWidth: 1,
//         }}
//         defaultValue="Name me!"
//       />
//     </View>
//   );
// };

// export default Cat;

// const Cat = () => {
//   return (
//     <View>
//       <Text>I am also a cat!</Text>
//     </View>
//   );
// };

// const Cafe = () => {
//   return (
//     <View>
//       <Text>Welcome!</Text>
//       <Cat />
//       <Cat />
//       <Cat />
//     </View>
//   );
// };

// export default Cafe;

// type CatProps = {
//   name: string;
// };

// const Cat = (props: CatProps) => {
//   return (
//     <View>
//       <Text>Hello, I am {props.name}!</Text>
//     </View>
//   );
// };

// const Cafe = () => {
//   return (
//     <View>
//       <Cat name="Maru" />
//       <Cat name="Jellylorum" />
//       <Cat name="Spot" />
//     </View>
//   );
// };

// export default Cafe;

// const CatApp = () => {
//   return (
//     <View>
//       <Image
//         source={{
//           uri: 'https://reactnative.dev/docs/assets/p_cat1.png',
//         }}
//         style={{width: 200, height: 200}}
//       />
//       <Text>Hello, I am your cat!</Text>
//     </View>
//   );
// };

// export default CatApp;

// type CatProps = {
//   name: string;
// };

// const Cat = (props: CatProps) => {
//   const [isHungry, setIsHungry] = useState(true);

//   return (
//     <View>
//       <Text>
//         I am {props.name}, and I am {isHungry ? 'hungry' : 'full!'}!
//       </Text>
//       <Button
//         onPress={() => {
//           setIsHungry(false);
//         }}
//         disabled={!isHungry}
//         title={isHungry ? 'Give me some food, please!' : 'Thank you!'}
//       />
//     </View>
//   );
// };

// const Cafe = () => {
//   return (
//     <>
//       <Cat name="Munkustrap" />
//       <Cat name="Spot" />
//     </>
//   );
// };
// export default Cafe;

// const PizzaTranslator = () => {
//   const [text, setText] = useState('');
//   return (
//     <View style={{padding: 10}}>
//       <TextInput
//         style={{height: 40, padding: 5}}
//         placeholder="Type here to translate"
//         onChangeText={newText => setText(newText)}
//         defaultValue={text}
//       />
//       <Text style={{padding: 10, fontSize: 42}}>
//         {text
//           .split(' ')
//           .map(word => word && '🍕')
//           .join(' ')}
//       </Text>
//     </View>
//   );
// };

// export default PizzaTranslator;

// const logo = {
//   uri: 'https://reactNative.dev/img/tiny_logo.png',
//   width: 64,
//   height: 64,
// };

// const App = () => {
//   return (
//     <ScrollView>
//       <Text style={{fontSize: 96}}>Scroll me plz</Text>
//       <Image source={logo} />
//       <Image source={logo} />
//       <Image source={logo} />
//       <Image source={logo} />
//       <Image source={logo} />
//       <Text style={{fontSize: 96}}>If you Like</Text>
//       <Image source={logo} />
//       <Image source={logo} />
//       <Image source={logo} />
//       <Image source={logo} />
//       <Image source={logo} />
//       <Text style={{fontSize: 96}}>Scrolling down</Text>
//       <Image source={logo} />
//       <Image source={logo} />
//       <Image source={logo} />
//       <Image source={logo} />
//       <Image source={logo} />
//       <Text style={{fontSize: 96}}>What's the best</Text>
//       <Image source={logo} />
//       <Image source={logo} />
//       <Image source={logo} />
//       <Image source={logo} />
//       <Image source={logo} />
//       <Text style={{fontSize: 96}}>FrameWork around?</Text>
//       <Image source={logo} />
//       <Image source={logo} />
//       <Image source={logo} />
//       <Image source={logo} />
//       <Image source={logo} />
//       <Text style={{fontSize: 96}}>React Native</Text>
//     </ScrollView>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 22,
//   },
//   item: {
//     padding: 10,
//     fontSize: 18,
//     height: 44,
//   },
// });

// const FlatListBasics = () => {
//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={[
//           {key: 'Devin'},
//           {key: 'Dan'},
//           {key: 'Dominic'},
//           {key: 'Jackson'},
//           {key: 'James'},
//           {key: 'Joel'},
//           {key: 'John'},
//           {key: 'Jillian'},
//           {key: 'Jimmy'},
//           {key: 'Julie'},
//         ]}
//         renderItem={({item}) => (
//           <Text style={styles.item}>{item.key}</Text>
//         )}
//         />
//     </View>
//   );
// };

// export default FlatListBasics;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 22,
//   },
//   sectionHeader: {
//     paddingTop: 2,
//     paddingLeft: 10,
//     paddingRight: 10,
//     paddingBottom: 2,
//     fontSize: 14,
//     fontWeight: 'bold',
//     backgroundColor: 'rgba(247,247,247,1.0)',
//   },
//   item: {
//     padding: 10,
//     fontSize: 18,
//     height: 44,
//   },
// });

// const SectionListBasics = () => {
//   return (
//     <View style={styles.container}>
//       <SectionList
//         sections={[
//           {title: 'D', data: ['Devin', 'Dan', 'Dominic']},
//           {
//             title: 'J',
//             data: [
//               'Jackson',
//               'James',
//               'Jillian',
//               'Jimmy',
//               'Joel',
//               'John',
//               'Julie',
//             ],
//           },
//         ]}
//         renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
//         renderSectionHeader={({section}) => (
//           <Text style={styles.sectionHeader}>{section.title}</Text>
//         )}
//         keyExtractor={item => `basicListEntry-${item}`}
//       />
//     </View>
//   );
// };

// export default SectionListBasics;

const FlexDirectionBasics = () => {
  const [flexDirection, setflexDirection] = useState('column');

  return (
    <PreviewLayout
      label="flexDirection"
      values={['column', 'row', 'column-reverse', 'row-reverse']}
      selectedValue={flexDirection}
      setSelectedValue={setflexDirection}>
      <View style={[styles.box, {backgroundColor: 'powderblue'}]} />
      <View style={[styles.box, {backgroundColor: 'skyblue'}]} />
      <View style={[styles.box, {backgroundColor: 'steelblue'}]} />
    </PreviewLayout>
  );
};

type PreviewLayoutProps = PropsWithChildren<{
  label: string;
  values: string[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}>;

const PreviewLayout = ({
  label,
  children,
  values,
  selectedValue,
  setSelectedValue,
}: PreviewLayoutProps) => (
  <View style={{padding: 10, flex: 1}}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.row}>
      {values.map(value => (
        <TouchableOpacity
          key={value}
          onPress={() => setSelectedValue(value)}
          style={[styles.button, selectedValue === value && styles.selected]}>
          <Text
            style={[
              styles.buttonLabel,
              selectedValue === value && styles.selectedLabel,
            ]}>
            {value}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
    <View style={[styles.container, {[label]: selectedValue}]}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: 'aliceblue',
  },
  box: {
    width: 50,
    height: 50,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: 'oldlace',
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    minWidth: '48%',
    textAlign: 'center',
  },
  selected: {
    backgroundColor: 'coral',
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: 'coral',
  },
  selectedLabel: {
    color: 'white',
  },
  label: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 24,
  },
});

export default FlexDirectionBasics;
