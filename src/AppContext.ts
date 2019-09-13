import React from 'react';
import { AppContextInterface } from './types';

const context =  React.createContext<AppContextInterface | undefined>(undefined);

export const AppContextProvider = context.Provider;
export const AppContextConsumer = context.Consumer;
