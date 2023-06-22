import React from 'react';

const ExcelShape = ({ width, height, color }: { width: string; height: string; color: string; }) => {
    return (
        <div
            style={{
                width: `${width}px`,
                height: `${height}px`,
                borderRadius: '50%',
                backgroundColor: color,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#fff',
                cursor: 'pointer',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
            }}
        >
            <span style={{ userSelect: 'none' }}>+</span>
        </div>
    );
};

export default ExcelShape;