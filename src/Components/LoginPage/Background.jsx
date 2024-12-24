import React from 'react';

function Background() {
    return (
        <div className="bg-dark h-screen w-screen bg-[radial-gradient(circle,_#bbbbbb_1px,_transparent_1px)] bg-[length:20px_20px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-0"></div>
            {/* Background content */}
        </div>
    );
}

export default Background;
