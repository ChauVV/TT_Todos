import React from 'react';
import MainScreen from 'src/MainScreen';
import {Provider} from 'react-redux';
import {store, persistor} from 'store/configureStore';
import {PersistGate} from 'redux-persist/integration/react';

console.disableYellowBox = true;

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainScreen />
      </PersistGate>
    </Provider>
  );
};

export default App;
