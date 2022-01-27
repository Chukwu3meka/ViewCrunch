import Link from "next/link";
import Image from "next/image";

import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";

import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

import { layoutStyles } from "/";

const Header = ({ hidden, mobile }) => (
  <div className={hidden === "hidden" ? layoutStyles.headerHidden : layoutStyles.header}>
    <span />
    <Link href="/">
      <Typography variant="h1">ViewCrunch</Typography>
    </Link>

    {mobile ? (
      <FormControl variant="outlined">
        <Input
          placeholder="Search..."
          id="search"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>
    ) : (
      <span />
    )}
  </div>
);

export default Header;
