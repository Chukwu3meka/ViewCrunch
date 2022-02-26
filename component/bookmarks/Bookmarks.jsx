import { styles } from ".";

import InfoIcon from "@mui/icons-material/Help";
import { Paper, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import StatIcon from "@mui/icons-material/BarChart";
import DefaultIcon from "@mui/icons-material/AcUnitOutlined";
import AchievementIcon from "@mui/icons-material/EmojiEvents";
import FinanceIcon from "@mui/icons-material/AttachMoneyOutlined";

const Notification = ({ messages, openMessageHandler, deleteMessageHandler }) => (
  <div className={styles.notification}>
    {messages.map(({ message, date, icon, seen }, index) => (
      <Paper key={index} className={seen ? "" : styles.unread}>
        <IconButton size="large" onClick={deleteMessageHandler(index)}>
          {icon === "achievement" ? (
            <AchievementIcon fontSize="large" />
          ) : icon === "info" ? (
            <InfoIcon fontSize="large" />
          ) : icon === "finance" ? (
            <FinanceIcon fontSize="large" />
          ) : icon === "stat" ? (
            <StatIcon fontSize="large" />
          ) : (
            <DefaultIcon />
          )}
        </IconButton>

        <div>
          <Typography fontSize={10} textTransform="capitalize">
            {date}
          </Typography>
          <Typography fontSize={16} onClick={openMessageHandler(index)} sx={{ cursor: "pointer" }}>
            {message}
          </Typography>
        </div>
      </Paper>
    ))}
  </div>
);

export default Notification;
