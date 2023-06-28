import React from 'react';

export const FaceBookIcon = React.forwardRef(({ width = '2.5rem', height = '2.5rem', className }, ref) => (
    <svg
        ref={ref}
        className={className}
        width={width}
        height={height}
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
        style={{ fill: 'rgb(45, 136, 255)' }}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m13 2h-2.5A3.5 3.5 0 0 0 12 8.5V11h-2v3h2v7h3v-7h3v-3h-3V9a1 1 0 0 1 1-1h2V5z"
        ></path>
    </svg>
));

export const TwitterIcon = React.forwardRef(({ width = '2.5rem', height = '2.5rem', className }, ref) => (
    <svg
        ref={ref}
        className={className}
        width={width}
        height={height}
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
        style={{ fill: 'rgb(93, 169, 221)' }}
    >
        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"></path>
    </svg>
));

export const InstagramIcon = React.forwardRef(({ width = '2.5rem', height = '2.5rem', className }, ref) => (
    <svg
        ref={ref}
        className={className}
        width={width}
        height={height}
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
        style={{ fill: 'rgb(245, 96, 64)' }}
    >
        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
    </svg>
));

export const YoutubeIcon = React.forwardRef(({ width = '2.5rem', height = '2.5rem', className }, ref) => (
    <svg
        ref={ref}
        className={className}
        width={width}
        height={height}
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
        style={{ fill: 'rgb(255, 0, 0)' }}
    >
        <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"></path>
    </svg>
));

export const StartIcon = React.forwardRef(({ width = '2rem', height = '2rem', className }, ref) => (
    <svg
        ref={ref}
        className={className}
        width={width}
        height={height}
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
        style={{ fill: 'rgb(251 180 3)' }}
    >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
    </svg>
));

export const StartBorderIcon = React.forwardRef(({ width = '2rem', height = '2rem', className }, ref) => (
    <svg
        ref={ref}
        className={className}
        width={width}
        height={height}
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
        style={{ fill: 'rgb(251 180 3)' }}
    >
        <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path>
    </svg>
));

export const SearchIcon = React.forwardRef(({ width = '2.3rem', height = '2.3rem', className }, ref) => (
    <svg
        ref={ref}
        className={className}
        width={width}
        height={height}
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
        style={{ fill: 'rgba(0,0,0,.4)' }}
    >
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
    </svg>
));

export const ArrowDown = React.forwardRef(({ width = '2.3rem', height = '2.3rem', className }, ref) => (
    <svg
        ref={ref}
        className={className}
        width={width}
        height={height}
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
        style={{ fill: 'rgba(0,0,0,.6)' }}
    >
        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
    </svg>
));
