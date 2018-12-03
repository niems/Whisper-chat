import React, { PureComponent } from 'react';
import CategoryList from './CategoryList/categoryList';
import OnlineUsersCategory from './OnlineUsersCategory/onlineUsersCategory';

class CategoriesPanel extends PureComponent {
    render() {
        console.log('categoriesPanel re-render');
        
        return (
            <section className='side-panel'>
                <button id='logout' className='link-to' onClick={this.props.signout}>
                    <img src='./assets/svg/placeholder/logout-black.svg' alt='user logout' />
                </button>
    
                <nav id='all-categories' className='scrollbar'>
                    <h2 className='category-section-header'>Channels</h2>
                    <div className='category-section'>
                        { Object.keys( this.props.allChannels ).map(category => (
                            <CategoryList key={category} category={category} displayCategoryTitle={true} channelRef={this.props.allChannelRefs[category]}
                                          onChannelSelect={this.props.onChannelSelect} channelList={this.props.allChannels[category]} />
                        ))}
                    </div>
    
                    <OnlineUsersCategory channelRef={this.props.allChannelRefs['Online Users']} onUserSelect={this.props.onChannelSelect}
                                         userList={this.props.allOnlineUsers} />
                </nav>
    
                <span id='current-user'>{this.props.username}</span>
            </section>
        );
    }
}


export default CategoriesPanel;

/*
<div className='category-section'>
                        { Object.keys( this.props.allOnlineUsers ).map(user => (
                            <CategoryList category={'online-users'} channelRef={this.props.allChannelRefs['Online Users']}
                                      onChannelSelect={this.props.onChannelSelect} channelList={this.props.allOnlineUsers} />
                        ))}
                    </div>
*/
