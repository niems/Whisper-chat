import React, { PureComponent } from 'react';
import env from '../../../../env';
import ChannelsCategory from './ChannelsCategory/channelsCategory';
import OnlineUsersCategory from './OnlineUsersCategory/onlineUsersCategory';

class CategoriesPanel extends PureComponent {
  constructor(props) {
    super(props);
    this.logoutImgSrc = env.routePath + 'assets/svg/placeholder/logout-black.svg';
  }

  render() {
    return (
      <section className="side-panel">
        <button id="logout" className="link-to" onClick={this.props.signout}>
          <img
            src={this.logoutImgSrc}
            alt="user logout"
          />
        </button>

        <nav id="all-categories" className="scrollbar">
          <ChannelsCategory
            allChannels={this.props.allChannels}
            allChannelRefs={this.props.allChannelRefs}
            onChannelSelect={this.props.onChannelSelect}
          />

          <OnlineUsersCategory
            channelRef={this.props.allChannelRefs['Online Users']}
            onUserSelect={this.props.onChannelSelect}
            userList={this.props.allOnlineUsers}
          />
        </nav>

        <span id="current-user">{this.props.username}</span>
      </section>
    );
  }
}

export default CategoriesPanel;
