import React from 'react';
import Avatar from '../../../assets/avatar.svg';

const ConversationItem = ({ user, conversationId, fetchMessages }) => {
  return (
    <div className='flex items-center py-8 border-b border-b-gray-300'>
      <div className='cursor-pointer flex items-center' onClick={() => fetchMessages(conversationId, user)}>
        <div><img src={Avatar} className="w-[60px] h-[60px] rounded-full p-[2px] border border-primary" alt='User Avatar' /></div>
        <div className='ml-6'>
          <h3 className='text-lg font-semibold'>{user?.fullName}</h3>
          <p className='text-sm font-light text-gray-600'>{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;