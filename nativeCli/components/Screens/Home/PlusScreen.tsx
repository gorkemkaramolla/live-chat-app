import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

type PlusScreenProps = {
  route: any;
};

const PlusScreen: React.FC<PlusScreenProps> = ({route}) => {
  return (
    <SafeAreaView style={{backgroundColor: 'red', flex: 1}}>
      <Text>asdasdasdasd</Text>
    </SafeAreaView>
  );
};

export default PlusScreen;
