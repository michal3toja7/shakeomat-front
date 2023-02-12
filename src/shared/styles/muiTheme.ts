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
    typography: {
        fontSize: 14,
    },
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
                color: "primary",
                size: "medium"
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
                },
                sizeSmall:{
                    padding: 0,
                    minWidth: 45
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
                    position: "relative",
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
        MuiCardActions: {
            styleOverrides: {
                root: {
                    position: "relative",
                    display: "flex",
                    justifyContent: "space-around",
                    padding: "15px 10px 5px 10px"
                }
            }
        },
        MuiAccordionSummary: {
            styleOverrides: {
                root: {
                    display: "none"
                }
            }
        },
        MuiAccordionDetails: {
            styleOverrides: {
                root: {
                    color: "#fff",
                    backgroundColor: themePalette.palette.primary.main
                }
            }
        },
        MuiGrid: {
            styleOverrides: {
                root: {
                    rowGap: 40,
                    justifyContent: "center",
                    alignItems: "center"
                },
                item: {
                    display: 'flex',
                    justifyContent: 'center'
                }
            }
        },
        MuiFab: {
            defaultProps: {
                color: "primary",
                variant: "extended",
                size: "large"
            },
            styleOverrides: {
                extended: {
                    flexDirection: "column",
                    backgroundColor: "transparent",
                    textTransform: "none",
                    boxShadow: "none",
                    borderRadius: 10,
                    padding: 5,
                    transition: "transform 600ms, background 600ms",
                    "&:hover": {
                        transform: "scale3d(1.1, 1.1, 1)",
                    },
                    "&:disabled": {
                        backgroundColor: "transparent"
                    }
                },
            }
        }

    }

};

export const theme = () => createTheme(baseTheme);

export const muiTheme = theme;