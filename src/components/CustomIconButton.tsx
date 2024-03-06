import React from 'react';
import IconButton from '@mui/material/IconButton';
import { SxProps, Theme } from '@mui/system';

interface CustomIconButtonProps {
  icon: React.ReactNode;
  ariaLabel: string;
  handleClick: () => void;
  variant?: 'default' | 'primary' | 'secondary';
  shape: 'round' | 'square';
  sx?: SxProps<Theme>;
}

const CustomIconButton = ({
  icon,
  ariaLabel,
  handleClick,
  variant = 'default',
  shape,
  sx = {},
}:CustomIconButtonProps) => {
  let backgroundColor = 'black';
  if (variant === 'primary') {
    backgroundColor = 'purple';
  } else if (variant === 'secondary') {
    backgroundColor = 'orange';
  }

  let borderRadius = shape === 'round' ? '50%' : '10%';

  return (
    <IconButton
      onClick={handleClick}
      aria-label={ariaLabel}
      sx={{
        backgroundColor,
        borderRadius,
        ...sx,
      }}
    >
      {icon}
    </IconButton>
  );
};

export default CustomIconButton;
