import React from 'react';

const Input = ({ label, ...props }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {label && <label style={{ fontSize: '14px', fontWeight: 600 }}>{label}</label>}
            <input
                style={{
                    border: '1px solid var(--color-border)',
                    padding: '12px 16px',
                    fontSize: '16px',
                    outline: 'none',
                    backgroundColor: '#FFFFFF'
                }}
                {...props}
            />
        </div>
    );
};

export default Input;
