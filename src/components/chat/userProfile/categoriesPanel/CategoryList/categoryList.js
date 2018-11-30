import React, { PureComponent } from 'react';
import ChannelItem from './channelItem/channelItem';

// only displays category title & toggle button if category was given
const DisplayCategoryTitle = ({ category }) => {
    const categoryDisplay = category ?
        <React.Fragment>
            <h3 id={`${category}-category`} className='category-title'>{category}</h3>
        </React.Fragment>
        : null;

    return categoryDisplay;
};

class CategoryList extends PureComponent {
    render() {
        return(
            <React.Fragment>
                {this.props.displayCategoryTitle ? <DisplayCategoryTitle category={this.props.category} /> : null}
                
                <ul id={`${this.props.category}-list`} className='category-channels-list' onClick={this.props.onChannelSelect}>
                    {this.props.channelList.map(channel => (
                        <ChannelItem key={channel} channel={channel} />
                    ))}
                </ul>
            </React.Fragment>
        );
    }
}

export default CategoryList;