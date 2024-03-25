import { Box, Typography, useTheme } from "@mui/material";
import Friend from "@/components/Friend";
import WidgetWrapper from "@/components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "@/states";


const FriendListWidget = ({ userId }) => {
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);
    const [see, setSee] = useState(false);


    const getFriends = async () => {
        const response = await fetch(
            `http://27.54.151.248:3001/users/${userId}/friends`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        const data = await response.json();
        console.log(data);
        dispatch(setFriends({ friends: data }));
        friends.map((friend) => {
            console.log(friend.firstName);
        })
        setSee(true);
    };

    useEffect(() => {
        getFriends();
    }, []);

    return (
        <>
        {see && <WidgetWrapper>
            <Typography
                color={palette.neutral.dark}
                variant="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem" }}
            >
                Connections
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">
                { friends.map((friend) => (
                    <Friend
                    key={friend._id}
                    friendId={friend._id}
                    name={`${friend.firstName} ${friend.lastName}`}
                    subtitle={friend.occupation}
                    userPicturePath={friend.picturePath}
                  />
                ))}
            </Box>
        </WidgetWrapper>}
        </>
    );
};


export default FriendListWidget;