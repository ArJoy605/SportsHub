import { Box, useMediaQuery } from "@mui/material";
import Navbar from "@/scenes/navbar";
import UserWidget from "@/scenes/widgets/UserWidget";
import MyPostWidget from "@/scenes/widgets/MyPostWidget";
import { useSelector } from "react-redux";
import PostsWidget from "@/scenes/widgets/PostsWidget";
import AdvertWidget from "@/scenes/widgets/AdvertWidget";
import FriendListWidget from "@/scenes/widgets/FriendListWidget";

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { _id, picturePath } = useSelector((state) => state.user);
    return (
        <Box>
            <Navbar />

            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap=".5rem"
                justifyContent="space-between"
            >
                {isNonMobileScreens && <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidget userId={_id} picturePath={picturePath} />
                    <Box m="2rem 0" />
                    <FriendListWidget userId={_id} />
                </Box>}

                <Box flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : ".002rem"}>
                    <MyPostWidget picturePath={picturePath} />

                    <PostsWidget userId={_id} isProfile={false} />
                </Box>
                {isNonMobileScreens &&
                    (<Box flexBasis="26%">
                        <AdvertWidget />
                        <Box m="2rem 0" />
                    </Box>)}
            </Box>
        </Box>
    )
}

export default HomePage;