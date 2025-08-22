import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ListFilter } from 'lucide-react';
import type { FilterDataType } from '../types/FilterDataType';

export default function MenuFilter(params:FilterDataType) {
    const {   setTypeOfFilter} = params
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event: React.MouseEvent<HTMLLIElement>) => {
        const valueChoised = (event.target as HTMLElement).textContent;
        if (valueChoised) {
            setTypeOfFilter(valueChoised);
        }
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
            <ListFilter size={30} className='text-zinc-400 cursor-pointer' />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',     // ancorado na parte superior do botão
                    horizontal: 'left',  // alinhado à esquerda
                }}
                transformOrigin={{
                    vertical: 'bottom',  // o menu se expande para cima
                    horizontal: 'left',
                }}
                slotProps={{
                    list: {
                        'aria-labelledby': 'basic-button',
                    },
                }}
            >
                <MenuItem onClick={handleClose}>Plano</MenuItem>
                <MenuItem onClick={handleClose}>Preço</MenuItem>
                <MenuItem onClick={handleClose}>Status</MenuItem>
            </Menu>
        </div>
    );
}