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
} from "@material-ui/core";
import { styles } from ".";
import Link from "next/link";
import Image from "next/image";

const Contact = ({ team, Section, contactLinks, sectionHandler, changeHandler, values, submitHandler }) => (
  <Paper className={styles.contact}>
    <Typography gutterBottom variant="h3" component="h2">
      Our teams are here to help
    </Typography>
    <hr />
    <div>
      {team.map(({ supportType, image, description, faqSection, buttonType }) => (
        <Section {...{ supportType, image, description, faqSection, buttonType }} key={supportType} />
      ))}
    </div>
    <Grid container alignItems="center" spacing={3}>
      <Grid item container xs={12} md={12}>
        <Grid item xs={12} md={8}>
          <Typography variant="h4">Contact Customer Support</Typography>
          <Typography>
            Already using ViewCrunch? Please, SignIn by clicking the Facebook signin button at the buttom of this page; So we can tailor
            your support experience. If that's not possible, we'll still like to hear from you.
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} />
      </Grid>
      <Grid item container xs={12} md={12}>
        <Grid item xs={12} md={8}>
          <Paper elevation={4}>
            <FormControl fullWidth>
              <InputLabel id="section">Section</InputLabel>
              <Select labelId="section" id="section-id" value={values.section} onChange={sectionHandler}>
                <MenuItem value="others">Others</MenuItem>
                <MenuItem value="advertising">Advertising</MenuItem>
                <MenuItem value="technical">Technical</MenuItem>
                <MenuItem value="suggestion">Suggestion</MenuItem>
                <MenuItem value="digital-service">Digital Service</MenuItem>
              </Select>
              <FormHelperText>Choose what best describes your reason for reaching out</FormHelperText>
            </FormControl>
            <div>
              <Typography gutterBottom variant="body2" component="span">
                Visit a link
              </Typography>
              <section>
                {contactLinks.map(({ title, path }) => (
                  <Link href={path} key={title}>
                    <a>
                      <Button color="secondary" variant="outlined">
                        {title}
                      </Button>
                    </a>
                  </Link>
                ))}
              </section>
            </div>
            <TextField
              fullWidth
              label="Comment"
              variant="outlined"
              value={values?.comment}
              inputRef={values?.commentRef}
              error={values.formError?.comment}
              onChange={(e) => changeHandler(e.target.value, "setComment", "comment")}
            />
            <TextField
              fullWidth
              label="Name"
              value={values?.name}
              error={values.formError?.name}
              placeholder="How do you want our respondents to address you"
              onChange={(e) => changeHandler(e.target.value, "setName", "name")}
            />
            <TextField
              fullWidth
              label="eMail"
              value={values?.email}
              error={values.formError?.email}
              placeholder="We'll reach out to you soon"
              onChange={(e) => changeHandler(e.target.value, "setEmail", "email")}
            />
            <Button color="primary" variant="contained" onClick={submitHandler}>
              Submit
            </Button>
          </Paper>
        </Grid>
        <Hidden mdDown>
          <Grid item xs={12} md={4}>
            <div>
              <Image src="/images/ViewCrunch.webp" layout="fill" />
            </div>
          </Grid>
        </Hidden>
      </Grid>
    </Grid>
  </Paper>
);

export default Contact;
