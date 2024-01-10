import React from 'react';
import Avatar from '../../../assets/avatar.svg';

const UserProfile = ({ user }) => {
  return (
    <div className='flex items-center my-8 mx-14'>
      <div>
        <img src={Avatar} width={75} height={75} className='border border-primary p-[2px] rounded-full' alt='User Avatar' />
      </div>
      <div className='ml-8'>
        <h3 className='text-2xl'>{user?.fullName}</h3>
        <p className='text-lg font-light'>My Account</p>
      </div>
    </div>
  );
};

export default UserProfile;

