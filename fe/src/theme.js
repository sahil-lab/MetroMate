import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0d47a1', // Darker blue
        },
        secondary: {
            main: '#546e7a', // Subtle gray-blue
        },
        background: {
            default: '#eceff1', // Light gray background
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    textTransform: 'none',
                    boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: '0px 6px 10px -2px rgba(0,0,0,0.2), 0px 8px 16px 1px rgba(0,0,0,0.14), 0px 3px 24px 2px rgba(0,0,0,0.12)',
                    },
                },
            },
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    padding: '20px',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    backgroundColor: '#fff',
                    borderRadius: '4px',
                },
            },
        },
    },
});

export default theme;
