import React from "react";

const Logo = ({ className = "", size = 111 }) => {
    return (
        <div
            className={`bg-black rounded-xl flex items-center justify-center ${className}`}
            style={{
                width: size,
                height: size,
            }}
        >
            <svg
                width={size * 0.7}
                height={size * 0.7}
                viewBox="0 0 111 111"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill="white"
                    d="M73.08,54.2c-4.77-.71-7.15-6.25-4.3-10.14.65-.88,1.11-1.37,1.11-1.37l14.28-14.28-1.59-1.59-14.28,14.28s-.45.42-1.25,1.02c-3.95,2.94-9.68.56-10.25-4.33-.12-1.02-.18-2.09-.18-3.24V0h-2.25v34.56c0,1.13-.06,2.19-.18,3.19-.57,4.95-6.43,7.38-10.33,4.28-.79-.63-1.58-1.33-2.38-2.13l-13.08-13.08-1.59,1.59,13.08,13.08c.81.81,1.53,1.62,2.16,2.42,3.06,3.86.69,9.59-4.19,10.31-1,.15-1.61.16-1.61.16H0v2.25h36.26s.63.02,1.66.17c4.77.71,7.15,6.25,4.3,10.14-.65.88-1.11,1.37-1.11,1.37l-14.28,14.28,1.59,1.59,14.28-14.28s.44-.42,1.25-1.02c3.95-2.94,9.68-.56,10.25,4.33.12,1.02.18,2.09.18,3.24v34.56h2.25v-34.56c0-1.13.06-2.19.18-3.19.57-4.95,6.43-7.38,10.33-4.28.79.63,1.58,1.34,2.38,2.13l13.08,13.08,1.59-1.59-13.08-13.08c-.81-.81-1.53-1.62-2.16-2.42-3.06-3.86-.69-9.59,4.19-10.31,1-.15,1.61-.16,1.61-.16h36.26v-2.25h-36.26s-.63-.02-1.66-.17Z"
                />
            </svg>
        </div>
    );
};

export default Logo;
