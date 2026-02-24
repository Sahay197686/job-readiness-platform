import React from 'react';

const Button = ({ variant = 'primary', children, ...props }) => {
    const styles = {
        primary: {
            backgroundColor: 'var(--color-accent)',
            color: '#FFFFFF',
            border: 'none',
        },
        secondary: {
            backgroundColor: 'transparent',
            color: 'var(--color-text)',
            border: '1px solid var(--color-text)',
        }
    };

    const baseStyle = {
        padding: '12px 24px',
        fontWeight: 600,
        fontSize: '16px',
        letterSpacing: '0.02em',
        ...styles[variant]
    };

    return (
        <button style={baseStyle} {...props}>
            {children}
        </button>
    );
};

export default Button;
