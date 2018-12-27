import React from 'react';
import CategoryList from './CategoryList/categoryList';

const ChannelsCategory = ({ allChannels, allChannelRefs, onChannelSelect }) => {
  const Groups = 'Groups';
  const PMs = 'PMs';

  return (
    <div>
      <h2 className="category-section-header">Channels</h2>
      <div className="category-section">
        <CategoryList
          category={Groups}
          displayCategoryTitle={true}
          channelRef={allChannelRefs[Groups]}
          onChannelSelect={onChannelSelect}
          channelList={allChannels[Groups]}
        />

        <CategoryList
          category={PMs}
          displayCategoryTitle={true}
          channelRef={allChannelRefs[PMs]}
          onChannelSelect={onChannelSelect}
          channelList={allChannels[PMs]}
        />
      </div>
    </div>
  );
};

export default ChannelsCategory;
