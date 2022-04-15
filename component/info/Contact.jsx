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

const Section = ({ supportTeam, sectionHandler }) => (
  <div>
    {supportTeam.map(({ supportType, image, description, buttonType }) => (
      <Paper elevation={2} key={supportType} onClick={() => sectionHandler({ target: { value: buttonType } })}>
        <div>
          <Image src={image} layout="fill" />
        </div>

        <Typography variant="h6">
          <b>{supportType}</b>
        </Typography>

        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </Paper>
    ))}
  </div>
);

const Contact = ({ contactLinks, sectionHandler, setValues, values, submitHandler, commentRef, supportTeam }) => (
  <Grid container style={{ maxWidth: "2200px", margin: "auto" }}>
    <NavContainer>
      <div className={styles.nav}>
        <Typography variant="h4">Contact US</Typography>
        <hr />
        <Typography fontSize={15}>
          Unlimited access to helpful resources. Get the support you need when you need it from our trusted experts.
        </Typography>
      </div>
    </NavContainer>

    <Grid item xs={12} sm={12} md={8}>
      <Box className={styles.contact}>
        <Typography gutterBottom variant="h3" component="h2">
          Our teams are here to help
        </Typography>
        <hr />
        <Section supportTeam={supportTeam} sectionHandler={sectionHandler} />
        <Grid item container alignItems="center">
          <Grid item container xs={12} md={12}>
            <Grid item xs={12} md={8}>
              <Typography variant="h4">Contact Support</Typography>
              <Typography>
                Already using ViewCrunch? Please, SignIn by clicking the Facebook signin button at the buttom of this page; So we can
                tailor your support experience. If that's not possible, we'll still like to hear from you.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} />
          </Grid>
          <Grid item container xs={12} md={12}>
            <Grid item xs={12} md={8}>
              <Paper elevation={4}>
                <FormControl fullWidth>
                  <InputLabel id="section-id">Section</InputLabel>
                  <Select labelId="section-id" id="section" value={values.section} onChange={sectionHandler} label="Section">
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
                  inputRef={commentRef}
                  placeholder="What will you like to tell us?"
                  onChange={(e) => setValues({ ...values, comment: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="Name"
                  value={values?.name}
                  placeholder="How do you want our respondents to address you"
                  onChange={(e) => setValues({ ...values, name: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="eMail"
                  value={values?.email}
                  placeholder="We'll reach out to you soon"
                  onChange={(e) => setValues({ ...values, email: e.target.value })}
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
        <Footer />
      </Box>
    </Grid>
  </Grid>
);

export default Contact;
