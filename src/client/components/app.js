import './app.scss';

import React, { Component } from 'react';

class AppContainer extends Component {

    constructor(props) {
        super(props);

        this._click = this._click.bind(this);
        
    }

    componentDidMount() {
        console.log('HEY THERE');
    }

    render() {
        return (
            <div>
                <h1>Hello World! </h1>
                <button onClick={this._click}>Click me </button>
            </div>
        );
    }

    _click() {
        console.log('Test');
    }
}

export default AppContainer;
