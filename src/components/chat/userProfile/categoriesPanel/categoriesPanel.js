import React, { PureComponent } from 'react';
import env from '../../../../env';
import ChannelsCategory from './ChannelsCategory/channelsCategory';
import OnlineUsersCategory from './OnlineUsersCategory/onlineUsersCategory';

class CategoriesPanel extends PureComponent {
  render() {
    return (
      <section className="side-panel">
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
      </section>
    );
  }
}

export default CategoriesPanel;
