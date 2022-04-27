import { Grid, Typography, Box } from "@mui/material";
import Image from "next/image";

const ProfilePicture = ({ profileData: { profilePicture, coverPicture, handle } }) => {
  console.log(profilePicture);
  return (
    <Box>
      <Box height={100} width={100}>
        <Image src={coverPicture} layout="fill" alt={handle} />
      </Box>
      <Box height={100} width={100}>
        <Image src={coverPicture} layout="fill" alt={handle} />
      </Box>
    </Box>
  );
};

export default ProfilePicture;
