import React from 'react';

const Card = ({ children, padding = 'var(--space-3)', ...props }) => {
    return (
        <div style={{
            border: '1px solid var(--color-border)',
            padding: padding,
            backgroundColor: '#FFFFFF',
            transition: 'border-color var(--transition)',
        }} {...props}>
            {children}
        </div>
    );
};

export default Card;
