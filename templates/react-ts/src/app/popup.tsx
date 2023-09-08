import React from 'react';
import {createRoot} from 'react-dom/client';
import '../assets/styles/popup.css'

const index = (
  <div className="container">
    <h1>Hello World!</h1>
    <p>Enjoy building your Dream extension 😁</p>
  </div>
)

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(index)