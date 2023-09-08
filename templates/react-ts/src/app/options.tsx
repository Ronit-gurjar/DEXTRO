import React from 'react'
import {createRoot} from 'react-dom/client';
import '../assets/styles/option.css'

const options = (
    <div>
        <h1>options</h1>
    </div>
)

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(options)