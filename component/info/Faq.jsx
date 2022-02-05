import ExpandMore from "@mui/icons-material/ExpandMore";
import { Accordion, Typography, AccordionSummary, AccordionDetails } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Footer, NavContainer } from "@component/layout";

const FAQ = ({ faqSolution, handleChange, expanded, classes }) => (
  <Grid container style={{ maxWidth: "1200px", margin: "auto" }}>
    <NavContainer>
      <div>
        <Typography variant="body2">FAQs Section.</Typography>
      </div>
    </NavContainer>
    <Grid item xs={12} sm={12} md={8}>
      <div className={classes.root}>
        {faqSolution.map(({ title, details }, index) => (
          <Accordion square expanded={expanded === title} onChange={handleChange(title)} key={title}>
            <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1bh-content" id="panel1bh-header">
              <Typography className={classes.heading}>{index + 1}</Typography>
              <Typography className={classes.secondaryHeading}>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{details} </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
      <Footer />
    </Grid>
  </Grid>
);

export default FAQ;
