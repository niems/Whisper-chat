import React from 'react';
import CategoryList from './CategoryList/categoryList';

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
    "Default Channels": [
        'general',
        'random',
    ],

    "User Channels": [
        'listenHereGuy',
    ], 

    "PM's": [
        'Rick',
        'Morty',
        'BirdPerson'
    ]
};

const CategoriesPanel = ({ username, allChannels, signout }) => {
    console.log(`all channels: ${JSON.stringify(allChannels)}\n`);
    
    // get all the categories to be displayed in the panel
    const channelCategories = Object.keys( testChannelCategories ).map(category => (
        <CategoryList key={category} category={category} channelList={testChannelCategories[category]} />
    )); 

    return (
        <section className='side-panel'>
            <button id='logout' className='link-to' onClick={signout}>
                <img src='./assets/svg/placeholder/logout-black.svg' alt='user logout' />
            </button>

            <nav id='all-categories' className='scrollbar'>
                {channelCategories}
            </nav>

            <span id='current-user'>{username}</span>
        </section>
    );
}

export default CategoriesPanel;
