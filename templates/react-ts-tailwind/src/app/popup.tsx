import React from 'react';
import {createRoot} from 'react-dom/client';
import '../assets/tailwind.css'

const index = (
  <div className="container">
    <h1 className="text-3xl  text-white font-bold underline">Hello World!</h1>
    <p className="text-white font-bold">Enjoy building your Dream extension 😁</p>
  </div>
)

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(index)