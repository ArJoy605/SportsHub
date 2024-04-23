import { useState } from "react";
import axios from "axios";
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
    ListItem,
    InputAdornment,
    TextField
} from "@mui/material";

import {
    Search,
    CalendarMonth,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close,
    AdminPanelSettingsTwoTone,
    SensorOccupiedTwoTone,
    EmojiEventsTwoTone,
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
    const isNonVerySmallScreens = useMediaQuery("(min-width:600px");
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setdata] = useState([]);

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primary = theme.palette.primary.main;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    const fullName = `${user.firstName} ${user.lastName}`;

    const fetchData = async (value) => {
        const response = await axios.get(`http://27.54.151.248:3001/users/getusers/${value}`);
        const data = await response.data;
        setdata(data);

    };

    const handleSearch = (value) => {
        setSearchQuery(value);
        fetchData(value);


        // // Fetch suggestions from the server
        // const response = await fetch(`/api/users/search?query=${query}`);
        // const data = await response.json();
        // setSuggestions(data.suggestions);
    };

    const hanleSearchClick = (id)=>{
        console.log(id);
        // navigate(`/profile/${id}`);

        const route = `/profile/${id}`;
    console.log("Navigating to route:", route);
    navigate(route);
    }


    return (
        <FlexBetween padding="1rem 6%" backgroundColor={alt}>
            <FlexBetween gap="1.75rem">
                {isNonVerySmallScreens ? (<Typography
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
                    fontWeight="bold" fontSize="clamp(.7rem, 2rem, 160%)" color="primary"
                    onClick={() => navigate("/home")}
                    sx={{
                        "&:hover": {
                            color: primaryLight,
                            cursor: "pointer",
                        },
                    }} >
                    SportsHUB
                </Typography>}


                {isNonVerySmallScreens ? <FlexBetween backgroundColor={neutralLight} borderRadius="2px" gap="1rem" padding="0.2rem 1.8rem" position="relative">
                    <Box position="relative">
                        <InputBase placeholder="Search...." value={searchQuery} onChange={(e) => handleSearch(e.target.value)} />
                        {searchQuery && (
                            <Box
                                position="absolute"
                                top="100%"
                                left="-1.8rem"
                                width="160%"
                                bgcolor="white"
                                borderRadius="4px"
                                boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                                zIndex="1000" // Adjust as needed
                                py="8px" // Adjust the vertical padding
                                maxHeight="200px" // Adjust the maximum height if needed
                                overflow="auto" // Add scrollbar if content exceeds the maximum height
                                sx={{
                                    backgroundColor: neutralLight,
                                    "& .MuiSvgIcon-root": {
                                        pr: "0.25 rem",
                                        width: "10rem"
                                    },
                                    "& .MuiSelect-select:focus": {
                                        backgroundColor: neutralLight
                                    },
                                }}
                            >

                                <FormControl
                                    sx={{
                                        backgroundColor: neutralLight,
                                        width: "100%",
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
                                >
                                    {data.filter(item => {
                                        const fullName = `${item.firstName} ${item.lastName}`;
                                        return new RegExp(`^${searchQuery}`, 'i').test(fullName);
                                    }).map((item) => (
                                        <MenuItem key={item._id} onClick={()=>hanleSearchClick(item._id)}>{`${item.firstName} ${item.lastName}`}</MenuItem>
                                    ))}
                                </FormControl>

                            </Box>
                        )}
                    </Box>
                    <IconButton>
                        <Search />
                    </IconButton>
                </FlexBetween> :
                    <FlexBetween backgroundColor={neutralLight} borderRadius="2px" gap="1rem" padding="0.2rem 1.8rem" position="relative">
                        <Box position="relative">
                            <InputBase placeholder="Search...." value={searchQuery} onChange={(e) => handleSearch(e.target.value)} />
                            {searchQuery && (
                                <Box
                                    position="absolute"
                                    top="130%"
                                    left="-4rem"
                                    width="600%"
                                    bgcolor="white"
                                    borderRadius="4px"
                                    boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                                    zIndex="100" // Adjust as needed
                                    py="8px" // Adjust the vertical padding
                                    maxHeight="200px" // Adjust the maximum height if needed
                                    overflow="auto" // Add scrollbar if content exceeds the maximum height
                                    sx={{
                                        backgroundColor: neutralLight,
                                        "& .MuiSvgIcon-root": {
                                            pr: "0.25 rem",
                                            width: "10rem"
                                        },
                                        "& .MuiSelect-select:focus": {
                                            backgroundColor: neutralLight
                                        },
                                    }}
                                >
                                    <FormControl
                                        sx={{
                                            backgroundColor: neutralLight,
                                            width: "100%",
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
                                    >
                                        {data.filter(item => {
                                            const fullName = `${item.firstName} ${item.lastName}`;
                                            return new RegExp(`^${searchQuery}`, 'i').test(fullName);
                                        }).map((item) => (
                                            <MenuItem key={item._id} onClick={() => navigate(`/profile/${item._id}`)}>{`${item.firstName} ${item.lastName}`}</MenuItem>
                                        ))}
                                    </FormControl>
                                </Box>
                            )}
                        </Box>
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                }


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
                        <CalendarMonth sx={{ fontSize: "25px", color: primary  }} />
                        <Typography>Scheduler</Typography>
                    </IconButton>
                    <IconButton
                        onClick={() => navigate("/tournament")}
                        sx={{
                            position: 'relative',
                            borderRadius: "10px",
                        }}
                    >
                        <EmojiEventsTwoTone sx={{ fontSize: "25px", color: primary }} />
                        <Typography>Tournament</Typography>
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
                    zIndex="110"
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
                        <IconButton
                        onClick={() => navigate("/tournament")}
                        sx={{
                            position: 'relative',
                            borderRadius: "10px",
                        }}
                    >
                        <EmojiEventsTwoTone sx={{ fontSize: "25px", color: primary }} />
                        <Typography>Tournament</Typography>
                    </IconButton>
                        <IconButton
                            onClick={() => navigate("/myprofile")}
                            sx={{
                                position: 'relative',
                                borderRadius: "10px",
                            }}
                        >
                            <AdminPanelSettingsTwoTone sx={{ fontSize: "25px" }} />
                            <Typography>My Profile</Typography>
                        </IconButton>
                        <IconButton
                            onClick={() => navigate("/connections")}
                            sx={{
                                position: 'relative',
                                borderRadius: "10px",
                            }}
                        >
                            <SensorOccupiedTwoTone sx={{ fontSize: "25px" }} />
                            <Typography>Connections</Typography>
                        </IconButton>

                        <IconButton
                            onClick={() => navigate("/latestevents")}
                            sx={{
                                position: 'relative',
                                borderRadius: "10px",
                            }}
                        >
                            <EmojiEventsTwoTone sx={{ fontSize: "25px" }} />
                            <Typography>Latest Events</Typography>
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