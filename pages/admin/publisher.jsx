import Head from "next/head";
import { useState } from "react";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { fetcher } from "@utils/clientFunctions";
import PublishIcon from "@material-ui/icons/Brush";
import { makeStyles } from "@material-ui/core/styles";

const Publisher = () => {
  const [body, setBody] = useState("");
  const [date, setDate] = useState(null);
  const [status, setStatus] = useState("");

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

  const classes = useStyles();

  const publishHandler = async () => {
    const response = await fetcher("/api/control/publish", JSON.stringify({ status, body, date }));
    if (response) setBody("");
  };

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <div
        style={{
          width: "100%",
          display: "flex",
          padding: "10px",
          alignItems: "center",
          flexDirection: "column",
          "& > *": { margin: "10px 0" },
        }}>
        <TextField
          id="date"
          label="Birthday"
          type="date"
          defaultValue={`${new Date().getFullYear()}-05-13`}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setDate(e.target.value)}
        />

        <TextField
          fullWidth
          autoFocus
          error={!!status?.length}
          label="Status, currently offline"
          placeholder="Development Status"
          value={status}
          onChange={(e) => setStatus(e.target.value.trimStart())}
        />

        <Button
          size="small"
          variant="contained"
          onClick={publishHandler}
          endIcon={<PublishIcon />}
          style={{
            width: "100px !important",
            margin: "10px auto",
          }}>
          verify
        </Button>

        <TextField
          fullWidth
          error={true}
          label="status information body"
          value={body}
          variant="outlined"
          multiline
          placeholder="body"
          rows={20}
          onChange={(e) => setBody(e.target.value.trimStart())}
        />

        <h5>work only in development</h5>
      </div>
    </>
  );
};
export default Publisher;
