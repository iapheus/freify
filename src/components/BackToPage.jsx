import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function BackToPage() {
    const navigate = useNavigate();

    return (
        <div className='flex-start-wrapper'>
            <IconButton onClick={() => navigate(-1)} color="gray" variant="surface" highContrast>
                <ArrowLeftIcon width="18" height="18" />
            </IconButton>
        </div>
    );
}

export default BackToPage;
