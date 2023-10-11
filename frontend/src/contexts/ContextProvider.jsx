import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export const ContextProvider = () => {
    return (
        <StateContext.Provider>
            
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);