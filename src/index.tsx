import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import {rootStore, StoresContext} from "./stores/index"
import { configure } from 'mobx';



configure({ enforceActions: 'always' });


ReactDOM.render(
        <StoresContext.Provider value={rootStore}>
            <App/>
        </StoresContext.Provider>
    , document.getElementById('root')
);