import * as React from 'react';
import {Button, View, Text} from 'react-native';

export default (function(props) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Settings Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => props.navigation.navigate('Details')}
      />
    </View>
  );
});
