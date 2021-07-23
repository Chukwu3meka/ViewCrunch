import { useState } from "react";
import { Faq, faqSolution } from ".";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "5%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const FaqContainer = () => {
  const classes = useStyles();

  // const [expanded, setExpanded] = useState("ViewCrunch Intro");
  const [expanded, setExpanded] = useState("news");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return <Faq faqSolution={faqSolution} handleChange={handleChange} expanded={expanded} classes={classes} />;
};

export default FaqContainer;
