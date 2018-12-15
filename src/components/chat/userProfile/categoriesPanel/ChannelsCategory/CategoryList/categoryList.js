import React, { PureComponent } from 'react';
import ChannelItem from './channelItem/channelItem';

class CategoryList extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <h3 id={`${this.props.category}-category`} className="category-title">
          {this.props.category}
        </h3>

        <ul
          id={`${this.props.category}-list`}
          className="category-channels-list"
          onClick={this.props.onChannelSelect}
        >
          {this.props.channelList.map(channel => (
            <ChannelItem key={channel} channel={channel} />
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

export default CategoryList;
