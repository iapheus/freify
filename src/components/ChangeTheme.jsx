import { MoonIcon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';
import React from 'react';
import { changeTheme } from '../redux/slices/general/generalSlice';
import { useDispatch } from 'react-redux';

function ChangeTheme() {
    const dispatch = useDispatch();

    return (
        <div className='flex-end-wrapper'>
            <IconButton onClick={() => dispatch(changeTheme())} color="gray" variant="surface" highContrast>
                <MoonIcon width="18" height="18" />
            </IconButton>
        </div>
    );
}

export default ChangeTheme;
