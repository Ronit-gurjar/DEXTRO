import React from 'react';
import {createRoot} from 'react-dom/client';
import './assets/popup.css'

const index = (
  <div>
    <h1 className="text-blue-500">Hello World!</h1>
    <p>Enjoy building your Dream extension 😁</p>
  </div>
)

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(index)