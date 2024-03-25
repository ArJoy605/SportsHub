import { useState } from "react";
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery,
    ListItem
} from "@mui/material";

import {
    Search,
    CalendarMonth,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "@/states";
import { useNavigate } from "react-router-dom";
import FlexBetween from "@/components/FlexBetween";


const Navbar = () => {

    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const [searchQuery, setSearchQuery] = useState('');

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    const fullName = `${user.firstName} ${user.lastName}`;

    const fetchData = (value) =>{
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((json) =>{
            const results = json.filter((user)=>{
                return value && user && user.name && user.name.toLowerCase().includes(value);
            });
            console.log(results);
        });
    };

    const handleSearch =  (value) => {
        setSearchQuery(value);
        fetchData(value);


        // // Fetch suggestions from the server
        // const response = await fetch(`/api/users/search?query=${query}`);
        // const data = await response.json();
        // setSuggestions(data.suggestions);
    };


    return (
        <FlexBetween padding="1rem 6%" backgroundColor={alt}>
            <FlexBetween gap="1.75rem">
                {isNonMobileScreens ? (<Typography
                    fontWeight="bold" fontSize="clamp(1rem, 2rem, 2.25rem)" color="primary"
                    onClick={() => navigate("/home")}
                    sx={{
                        "&:hover": {
                            color: primaryLight,
                            cursor: "pointer",
                        },
                    }} >
                    SportsHUB
                </Typography>) : <Typography
                    fontWeight="bold" fontSize="clamp(.8rem, 2rem, 1.7rem)" color="primary"
                    onClick={() => navigate("/home")}
                    sx={{
                        "&:hover": {
                            color: primaryLight,
                            cursor: "pointer",
                        },
                    }} >
                    SportsHUB
                </Typography>}
                {(
                    <FlexBetween backgroundColor={neutralLight} borderRadius="20px" gap="1rem" padding="0.2rem 1.8rem">
                    <InputBase placeholder="Search...." value={searchQuery} onChange={(e)=>handleSearch(e.target.value)} />
                    <IconButton>
                        <Search />
                    </IconButton>
                </FlexBetween>
                )}
            </FlexBetween>

            {/*Desktop Nav */}
            {isNonMobileScreens ? (
                <FlexBetween gap="2rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === 'dark' ? (
                            <DarkMode sx={{ fontSize: "25px" }} />
                        ) : (
                            <DarkMode sx={{ color: dark, fontSize: "25px" }} />
                        )}
                    </IconButton>
                    <IconButton
                        onClick={() => navigate("/calendar")}
                        sx={{
                            position: 'relative',
                            borderRadius: "10px",
                        }}
                    >
                        <CalendarMonth sx={{ fontSize: "25px" }} />
                        <Typography>Scheduler</Typography>
                    </IconButton>
                    <Notifications sx={{ fontSize: "25px" }} />
                    <Help sx={{ fontSize: "25px" }} />
                    <FormControl variant="standard" value={fullName}>
                        <Select value={fullName}
                            sx={{
                                backgroundColor: neutralLight,
                                width: "150px",
                                borderRadius: "0.25rem",
                                p: "0.25rem 1rem",
                                "& .MuiSvgIcon-root": {
                                    pr: "0.25 rem",
                                    width: "3rem"
                                },
                                "& .MuiSelect-select:focus": {
                                    backgroundColor: neutralLight
                                }
                            }}
                            input={<InputBase />}
                        >
                            <MenuItem value={fullName}>
                                <Typography>{fullName}</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
                        </Select>
                    </FormControl>
                </FlexBetween>
            ) : (
                <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                    <Menu />

                </IconButton>)}

            {/* Mobile Nav */}

            {!isNonMobileScreens && isMobileMenuToggled && (
                <Box
                    position="fixed"
                    right="0"
                    bottom="0"
                    height="100%"
                    zIndex="10"
                    maxWidth="500px"
                    minWidth="300px"
                    backgroundColor={background}
                >
                    {/*Close Icon */}
                    <Box>
                        <IconButton
                            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                            <Close />
                        </IconButton>
                    </Box>
                    {/*Menu Item */}
                    <FlexBetween display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="3rem">
                        <IconButton onClick={() => dispatch(setMode())}>
                            {theme.palette.mode === 'dark' ? (
                                <DarkMode sx={{ fontSize: "25px" }} />
                                
                            ) : (
                                <DarkMode sx={{ color: dark, fontSize: "25px" }} />
                            )}
                            <Typography>Mode</Typography>
                        </IconButton>
                        <IconButton
                        onClick={() => navigate("/calendar")}
                        sx={{
                            position: 'relative',
                            borderRadius: "10px",
                        }}
                    >
                        <CalendarMonth sx={{ fontSize: "25px" }} />
                        <Typography>Scheduler</Typography>
                    </IconButton>
                        <Notifications sx={{ fontSize: "25px" }} />
                        <Help sx={{ fontSize: "25px" }} />
                        <FormControl variant="standard" value={fullName}>
                            <Select value={fullName}
                                sx={{
                                    backgroundColor: neutralLight,
                                    width: "150px",
                                    borderRadius: "0.25rem",
                                    p: "0.25rem 1rem",
                                    "& .MuiSvgIcon-root": {
                                        pr: "0.25 rem",
                                        width: "3rem"
                                    },
                                    "& .MuiSelect-select:focus": {
                                        backgroundColor: neutralLight
                                    }
                                }}
                                input={<InputBase />}
                            >
                                <MenuItem value={fullName}>
                                    <Typography>{fullName}</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
                            </Select>
                        </FormControl>
                    </FlexBetween>
                </Box>
            )}
        </FlexBetween>
    )
};



export default Navbar;