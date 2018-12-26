import React, { PureComponent } from 'react';
import env from '../../../env';

class Toolbar extends PureComponent {
  constructor(props) {
    super(props);
    this.logoutImgSrc =
      env.routePath + 'assets/svg/placeholder/logout-black.svg';
  }

  render() {
    return (
      <div className="toolbar">
        <span id='current-user'>{this.props.username}</span>
        
        <button id="logout" className="link-to" onClick={this.props.signout}>
          <img src={this.logoutImgSrc} alt="user logout" />
        </button>
      </div>
    );
  }
}

export default Toolbar;
