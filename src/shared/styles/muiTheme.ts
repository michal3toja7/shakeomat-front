import {createTheme, ThemeOptions, responsiveFontSizes} from '@mui/material/styles';


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


// @ts-ignore
export const baseTheme: ThemeOptions = {
    palette: {
        ...themePalette.palette,
    },
    shape: {
        borderRadius: 4,
    },
    components: {
        MuiButton: {
            defaultProps: {
                variant: "contained",
                color: "primary"
            },
            styleOverrides: {
                root: {
                    fontWeight: 700,
                    paddingInline: 15,
                    textTransform: "none",
                    border: 4,
                    borderStyle: "solid",
                    borderColor: themePalette.palette.third.main,
                    transform: "skew(-15deg)"
                }
            },
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    marginBottom: "0.5em",
                    marginTop: "0.5em",
                },
                flexContainer: {
                    transform: "skew(-15deg)",
                },
                indicator: {
                    height: 0,
                    display: "none",
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    backgroundColor: themePalette.palette.secondary.main,
                    fontWeight: 700,

                    color: "#000000",
                    textTransform: "none",
                    border: 4,
                    borderStyle: "solid",
                    borderColor: themePalette.palette.third.main,
                    borderRight: "none",
                    "&.Mui-selected": {
                        backgroundColor: themePalette.palette.primary.main,
                        color: "#FFFFFF",
                    },
                    "&:last-child": {
                        border: 5,
                        borderStyle: "solid",
                        borderColor: themePalette.palette.third.main,
                    }
                },

            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    border: 1,
                    borderStyle: "solid",
                    borderRadius: 10,
                    backgroundColor: themePalette.palette.primary.main,
                    borderColor: themePalette.palette.third.main,
                    // width: 400,
                    maxWidth: 350,
                    minWidth: 350,
                }
            }
        },
        MuiCardMedia: {
            styleOverrides: {
                root: {
                    height: 420,
                    backgroundColor: themePalette.palette.background.default,
                }
            }
        },
        MuiGrid: {
            styleOverrides: {
                root: {
                    rowGap:40,
                    justifyContent: "center",
                    alignItems: "center"
                },
                item: {
                    display:'flex',
                    justifyContent:'center'
                }
            }
        }

    }

};

export const theme = () => createTheme(baseTheme);

export const muiTheme = theme;