import { HomeIcon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function BackToHome() {
    const navigate = useNavigate();

    return (
        <div className='flex-start-wrapper'>
            <IconButton onClick={() => navigate('/')} color="gray" variant="surface" highContrast>
                <HomeIcon width="18" height="18" />
            </IconButton>
        </div>
    );
}

export default BackToHome;
