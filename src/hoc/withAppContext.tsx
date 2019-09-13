import React, { ComponentType, Component } from 'react';
import { AppContextConsumer } from '../AppContext';
import { AppContextInterface } from '../types';

export const withAppContext = (
  WrappedComponent: ComponentType<any & AppContextInterface>
) =>
  class AppContextWrapper extends Component {
    render = () => (
      <AppContextConsumer>
        {storeInterface => {
          if (
            storeInterface &&
            storeInterface.store &&
            storeInterface.updateStore
          ) {
            const { store, updateStore } = storeInterface;
            return <WrappedComponent {...this.props} store={store} updateStore={updateStore} />;
          }
          return <span>No store defined</span>;
        }}
      </AppContextConsumer>
    );
  };
