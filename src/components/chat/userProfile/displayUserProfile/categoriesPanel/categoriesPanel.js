import React from 'react';
import CategoryList from './CategoryList/categoryList';
import ChannelItem from './CategoryList/channelItem/channelItem';

/* the structure of this.allMessages should be changed from 
    {
        "channel": [ 
            {...},     // messages
        ] 
    }


    TO 

    {
        "category1": {
            "channel": [
                {...},      // messages
            ],
        },
        "category2": {
            "anotherChannel": [
                {...}       // more messages
            ],
        },
        .
        .
        .
    }
*/

// testing data for structuring channel panel
const testChannelCategories = {
    "Groups": [ // user CAN manually create channels under this category
        'general', // default channel
        'random', // default channel

        'listenHereGuy', // user-defined channel
    ], 

    "PMs": [ // user CANNOT manually create channels under this category: they're automatically added when selecting a user to message or receiving a message
        'Rick',
        'Morty',
        'BirdPerson'
    ]
};

const testOnlineUsers = [
    'Marky',
    'Ricky',
    'Danny',
    'Terry',
    'Mickey',
    'Davie',
    'Timmy',
    'Tommy',
    'Joey',
    'Robie',
    'Johnny',
    'Brian'
];

const CategoriesPanel = ({ username, allChannels, signout }) => {
    console.log(`all channels: ${JSON.stringify(allChannels)}\n`);
    
    // get all the categories to be displayed in the panel
    const channelCategories = Object.keys( testChannelCategories ).map(category => (
        <CategoryList key={category} category={category} channelList={testChannelCategories[category]} />
    )); 

    const onlineUsers =  (<CategoryList channelList={testOnlineUsers} />);

    return (
        <section className='side-panel'>
            <button id='logout' className='link-to' onClick={signout}>
                <img src='./assets/svg/placeholder/logout-black.svg' alt='user logout' />
            </button>

            <nav id='all-categories' className='scrollbar'>
                <h2 className='category-section-header'>Channels</h2>
                <div className='category-section'>
                    {channelCategories}
                </div>

                <h2 className='category-section-header'>Online Users</h2>
                <div className='category-section'>
                    {onlineUsers}
                </div>
            </nav>

            <span id='current-user'>{username}</span>
        </section>
    );
}

export default CategoriesPanel;
