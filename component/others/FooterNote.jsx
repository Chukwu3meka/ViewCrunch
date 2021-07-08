import { styles } from "/";
import { Paper } from "@material-ui/core";
import { LineText } from "@component/others";

const FooterNote = ({ title, note }) => (
  <Paper elevation={4} className={styles.footerNotes}>
    <LineText title={title} />
    {note}
  </Paper>
);

export default FooterNote;
