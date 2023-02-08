import React, { useEffect, useState, useRef } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';

import MainStack from './src/Navigation/MainStack';

function App() {
  return (
    <View style={{ flex: 1 }}>
      <MainStack />
    </View>
  );
}

export default App; 