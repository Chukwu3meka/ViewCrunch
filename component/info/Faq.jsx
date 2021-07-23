import ExpandMore from "@material-ui/icons/ExpandMore";
import { Accordion, Typography, AccordionSummary, AccordionDetails } from "@material-ui/core";

const FAQ = ({ faqSolution, handleChange, expanded, classes }) => (
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
);

export default FAQ;
