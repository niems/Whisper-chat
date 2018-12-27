import React, { PureComponent } from 'react';
import env from '../../../env';

class Toolbar extends PureComponent {
  constructor(props) {
    super(props);
    this.logoutImgSrc =
      env.routePath + 'assets/svg/placeholder/logout-black.svg';

    this.channelsViewImgSrc =
      env.routePath + 'assets/svg/placeholder/list-view.svg';
  }

  render() {
    return (
      <div className="toolbar">
        <button id='channels-view-list-btn'>
          <img src={this.channelsViewImgSrc} alt="toggle channel list" />
        </button>
        
        <span id="current-user">{this.props.username}</span>

        <button id="logout-btn" className="link-to" onClick={this.props.signout}>
          <img src={this.logoutImgSrc} alt="user logout" />
        </button>
      </div>
    );
  }
}

export default Toolbar;
