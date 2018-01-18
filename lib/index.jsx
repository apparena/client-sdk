import React from 'react';
import {render} from 'react-dom';
import App from './app';
import styles from 'raw-loader!./index.css';

function createStyleTag() {
    const el = document.createElement('style');
    el.id = 'apparena-stylesheet';
    el.type = 'text/css';
    el.innerText = styles;
    window.parent.document.head.appendChild(el);
    return el;
}

function createContainer() {
    const el = document.createElement('div');
    el.id = 'apparena-container';
    el.style.position = 'fixed';
    el.style.width = 0;
    el.style.height = 0;
    el.style.bottom = 0;
    el.style.left = 0;
    el.style.zIndex = 31231414;
    window.parent.document.body.appendChild(el);
    createStyleTag();
    return el;
}

render(
    <App/>
    , createContainer());