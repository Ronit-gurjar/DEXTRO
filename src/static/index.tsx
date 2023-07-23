import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css'

const index = (
  <div>
    <h1>hello world</h1>
  </div>
)

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(index)