import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddIcon from "@material-ui/icons/Add";
import { sleep, imageObject } from "@utils/clientFunctions";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import SaveIcon from "@material-ui/icons/Save";
import Typography from "@material-ui/core/Typography";
import { styles } from "/";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ContactsIcon from "@material-ui/icons/Contacts";
import CloseIcon from "@material-ui/icons/CloseRounded";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PetsIcon from "@material-ui/icons/Pets";

const CoverPicUpdate = ({
  viewscapePic,
  setViewscapePic,
  viewscapeCover,
  setViewscapeCover,
  viewscapeTitle,
  setViewscapeTitle,
  viewscapeAbout,
  setViewscapeAbout,
  modifyViewscape,
  setModifyViewscape,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const imageHandler = (setState) => async (e) => {
    const image = await imageObject(e.target.files[0]);
    setState(image);
  };

  const actions = [
    { icon: <PetsIcon />, label: "Logs" },
    { icon: <AssignmentIcon />, label: "Moderators" },
    { icon: <ContactsIcon />, label: "Manage Members" },
    { icon: <DeleteForeverIcon />, label: "Delete Crunch" },
  ];

  return (
    <Paper elevation={2} className={styles.modifyViewscape}>
      <TextField
        fullWidth
        value={viewscapeTitle}
        onChange={(e) => {
          setViewscapeTitle(e.target.value.trimStart().replace(/\s+/g, " "));
        }}
      />

      <div>
        <div>
          <img src={viewscapeCover} alt={`${viewscapeTitle} Cover picture`} />
          <input type="file" onChange={imageHandler(setViewscapeCover)} accept=".jpg, .jpeg, .webp" />
        </div>
        <div>
          <img src={viewscapePic} alt={`${viewscapeTitle} picture`} />
          <input type="file" onChange={imageHandler(setViewscapePic)} accept=".jpg, .jpeg, .webp" />
        </div>
      </div>
      <div>
        <TextField
          value={viewscapeAbout}
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          rowsMax={3}
          onChange={(e) => {
            setViewscapeAbout(e.target.value);
          }}
        />

        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button startIcon={<CloseIcon />} onClick={() => setModifyViewscape(false)}>
            cancel
          </Button>
          <Button>
            <span onClick={handleClick}>●●●</span>
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
              {actions.map(({ icon, label }, index) => (
                <MenuItem style={{ borderBottom: "1px solid grey", padding: "15px  10px" }} onClick={handleClose} key={index}>
                  {icon}
                  <>&nbsp;&nbsp;&nbsp;</>
                  {label}
                </MenuItem>
              ))}
            </Menu>
          </Button>
          <Button endIcon={<SaveIcon />}>save</Button>
        </ButtonGroup>
      </div>
    </Paper>
  );
};

const MyCrunches = ({}) => {
  const [viewscapePic, setViewscapePic] = useState("/images/no-image.webp");
  const [viewscapeCover, setViewscapeCover] = useState("/images/no-image-cover.webp");
  const [viewscapeTitle, setViewscapeTitle] = useState("Crunch Title");
  const [viewscapeAbout, setViewscapeAbout] = useState("Crunch about");
  const [modifyViewscape, setModifyViewscape] = useState(false);

  const createdViewscape = [
    {
      image: "/images/no-image.webp",
      cover: "/images/no-image-cover.webp",
      title: "Commerce",
      id: "dfsgdgf",
      about:
        "Tempor consequat enim in non ex culpa commodo dolor labore Lorem. Sint in cupidatat laboris adipisicing deserunt tempor esse. Consectetur aliquip ipsum ut sint dolore non in eiusmod anim qui laborum nisi do. Veniam ea duis cillum aute velit est et sunt tempor et est. Enim qui aute eiusmod ullamco. Nulla fugiat excepteur pariatur irure eiusmod nisi do quis eiusmod deserunt nulla sint exercitation.",
    },
    {
      image: "/images/no-image-cover.webp",
      cover: "/images/no-image.webp",
      title: "NEWS set",
      id: "23qwe",
      about:
        "Ut consequat veniam fugiat quis irure Lorem duis in sint sit duis dolore reprehenderit minim. Officia incididunt sit mollit consequat. Proident esse proident aliquip cupidatat nisi qui ea adipisicing esse. Exercitation qui aliquip culpa enim non Lorem in veniam.",
    },
  ];

  const initializeCreateViewscapeHandler = (crunch) => () => {
    const {
      image = "/images/no-image.webp",
      cover = "/images/no-image-cover.webp",
      title = "Crunch Title",
      about = "Crunch about",
      id,
    } = createdViewscape.find((x) => crunch === x.id) || [];
    setViewscapePic(image);
    setViewscapeCover(cover);
    setViewscapeTitle(title);
    setViewscapeAbout(about);
    setModifyViewscape(true);
  };

  return (
    <>
      <Paper elevation={2} className={styles.myViewscape}>
        {createdViewscape.map(({ image, title, id }) => (
          <div key={id} onClick={initializeCreateViewscapeHandler(id)}>
            <img src={image} alt={title} />
            <Typography variant="body2" color="textSecondary">
              {title}
            </Typography>
          </div>
        ))}
        {createdViewscape.length < 3 &&
          [...Array(3 - createdViewscape.length).keys()].map((x, index) => (
            <IconButton key={index} aria-label="create crunch" onClick={initializeCreateViewscapeHandler(null)}>
              <AddIcon fontSize="large" />
            </IconButton>
          ))}
      </Paper>

      {modifyViewscape && (
        <CoverPicUpdate
          {...{
            viewscapePic,
            setViewscapePic,
            viewscapeCover,
            setViewscapeCover,
            viewscapeTitle,
            setViewscapeTitle,
            viewscapeAbout,
            setViewscapeAbout,
            modifyViewscape,
            setModifyViewscape,
          }}
        />
      )}
    </>
  );
};

export default MyCrunches;
