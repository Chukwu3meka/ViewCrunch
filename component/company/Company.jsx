import {
  Grid,
  Paper,
  Select,
  Hidden,
  Button,
  MenuItem,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  FormHelperText,
  Box,
} from "@mui/material";
import { styles } from ".";
import Link from "next/link";
import Image from "next/image";
import { Footer, NavContainer } from "@component/layout";

const Contact = () => (
  <Grid container style={{ maxWidth: "2200px", margin: "auto" }}>
    <NavContainer>
      <div>
        <Typography variant="h4">Company</Typography>
        <hr />
        <Typography fontSize={15}>Startup focused on building and marketing digital product for companies.</Typography>
      </div>
    </NavContainer>

    <Grid item xs={12} sm={12} md={8}>
      <Box>
        <Typography gutterBottom variant="h4" component="h1">
          What we do
        </Typography>

        <ul>
          <li>Cross platform Mobile Development</li>
          <li>Web hosting and Domain name purchase</li>
          <li>Web design and Development</li>
          <li>Desktop app Development</li>
          <li>System Administration</li>
        </ul>

        <Link href="/info/contactus?section=service">
          <Button variant="outlined">Contact us</Button>
        </Link>

        <Footer />
      </Box>
    </Grid>
  </Grid>
);

export default Contact;
