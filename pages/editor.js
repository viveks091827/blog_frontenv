import React from 'react'
import styles from '../styles/Editor.module.css';

const editor = () => {
    return (
        <div className={styles.container}>
            <div id="tooltip-controls">
                <button id="bold-button"><i class="fa fa-bold"></i></button>
                <button id="italic-button"><i class="fa fa-italic"></i></button>
                <button id="link-button"><i class="fa fa-link"></i></button>
                <button id="blockquote-button"><i class="fa fa-quote-right"></i></button>
                <button id="header-1-button"><i class="fa fa-header"><sub>1</sub></i></button>
                <button id="header-2-button"><i class="fa fa-header"><sub>2</sub></i></button>
            </div>
            <div id="sidebar-controls">
                <button id="image-button"><i class="fa fa-camera"></i></button>
                <button id="video-button"><i class="fa fa-play"></i></button>
                <button id="tweet-button"><i class="fa fa-twitter"></i></button>
                <button id="divider-button"><i class="fa fa-minus"></i></button>
            </div>
            <textarea id="editor-container">Tell your story...</textarea>
        </div>
    )
}

export default editor