import React from 'react';

export default function Message(props) {
    return <li className={props.author}>{props.text}</li>;
}