import { createTheme, ThemeOptions, responsiveFontSizes } from '@mui/material/styles';


export const themePalette = {
    palette: {
        type: 'light',
        primary: {
            main: '#e02130',
        },
        secondary: {
            main: '#fded14',
        },
        third: {
            main: '#f0922e',
        },
        background: {
            default: '#ffffff',
        },
    },
};

export const defaultTheme = responsiveFontSizes(createTheme({}));


export const baseTheme: ThemeOptions = {
    palette: {
        ...themePalette.palette,
    },
    shape: {
        borderRadius: 4,
    },

};

export const theme = () => createTheme(baseTheme);

export const muiTheme = theme;