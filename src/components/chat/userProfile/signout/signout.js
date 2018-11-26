import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

const SigningOut = (props) => {
    return (
        <section className='wrapper center'>
            <h1>Signing out...</h1>
        </section>
    );
};

class Signout extends Component {
    constructor(props) {
        super(props);
        this.state = { viewComponent: <SigningOut /> };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                viewComponent: <Redirect to='/' />
            });
        }, 2000);
    }

    render() {
        return this.state.viewComponent;
    }
}

export default Signout;