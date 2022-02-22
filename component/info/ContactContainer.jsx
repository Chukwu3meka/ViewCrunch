import { Contact } from ".";
import Link from "next/link";
import Image from "next/image";
import { connect } from "react-redux";
import validate from "@utils/validator";
import { useSnackbar } from "notistack";
import { fetcher } from "@utils/clientFunctions";
import { useState, useRef, useEffect } from "react";
import { Button, Paper, Typography } from "@mui/material";

const ContactContainer = (props) => {
  const commentRef = useRef(null),
    [name, setName] = useState(""),
    [email, setEmail] = useState(""),
    { enqueueSnackbar } = useSnackbar(),
    [comment, setComment] = useState(""),
    [online, setOnline] = useState(props.online),
    [section, setSection] = useState("others"),
    setValues = { setEmail, setName, setComment, sectionHandler },
    [formError, setFormError] = useState({ comment: false, email: false, name: false });

  useEffect(() => {
    setOnline(props.online);
  }, [props.online]);

  const team = [
      {
        supportType: "Technical Support",
        image: "/images/info/contactus1.png",
        description: "Already using ViewCrunch and experiencing issues on the website",
        faqSection: "/info/faq?id=Technical-Support",
        buttonType: "technical",
      },
      {
        supportType: "Advertising",
        image: "/images/info/contactus2.png",
        description: "Having a pricing question or need help managing your ads",
        faqSection: "/info/faq?id=Advertising",
        buttonType: "advertising",
      },
      {
        supportType: "Others",
        image: "/images/info/contactus3.png",
        description: "Evaluating our service or issue not related to Technical support or Advertising",
        faqSection: "/info/faq?id=Contact-Us",
        buttonType: "others",
      },
    ],
    contactLinks = [
      { title: "ViewCrunch Services", path: "/info/company" },
      { title: "Reporting a user", path: "/info/faq?id=Reporting-a-user" },
      { title: "Exploitation", path: "/Exploitation" },
      { title: "Advertisement and Pricing", path: "/info/advertise" },
      { title: "Visit Our FAQ section", path: "/info/faq" },
      { title: "Signing In", path: "/info/faq?id=Signing-In" },
    ],
    values = { email, name, comment, section, formError, commentRef };

  const sectionHandler = ({ target: { value } }) => {
    setSection(value);
    setTimeout(() => {
      commentRef.current.focus();
    }, 100);
  };

  const changeHandler = (value, setValue, textType) => {
    setValues[setValue](value);
    const validInput = validate(textType === "name" ? "displayName" : textType, value);
    if (!validInput) enqueueSnackbar(`${textType} is invalid`, { variant: "error" });
    setFormError({ ...formError, [textType]: !validInput });
  };

  const Section = ({ supportType, image, description, faqSection, buttonType }) => (
    <Paper elevation={4}>
      <Typography variant="h6">
        <b>{supportType}</b>
      </Typography>

      <div>
        <Image src={image} layout="fill" />
      </div>

      <Typography variant="body2" color="textSecondary">
        {description}
      </Typography>

      <br />
      <Link href={faqSection}>
        <a>{faqSection.split("=")[1]} in FAQ</a>
      </Link>

      <Button size="small" color="primary" variant="contained" onClick={() => sectionHandler({ target: { value: buttonType } })}>
        Contact ME
      </Button>
    </Paper>
  );

  const submitHandler = async () => {
    if (name && email && comment && section) {
      for (const [k, v] of Object.entries(formError)) {
        if (v === true) return enqueueSnackbar(`${k} is invalid`, { variant: "error" });
      }

      if (online) {
        const status = await fetcher("/api/info/contactus", JSON.stringify({ name, email, comment, section }));
        if (status) {
          setName("");
          setEmail("");
          setComment("");
          setSection("others");
          enqueueSnackbar(`Submitted successful, We'll be in touch soon`, { variant: "success" });
        } else {
          enqueueSnackbar(`Please, Try again. Server unable to handle request.`, { variant: "error" });
        }
      } else {
        enqueueSnackbar(`Network connectivity issue.`, { variant: "warning" });
      }
    } else {
      enqueueSnackbar(`All fields are mandatory.`, { variant: "warning" });
    }
  };

  return <Contact {...{ team, Section, contactLinks, sectionHandler, changeHandler, values, submitHandler }} />;
};

const mapStateToProps = (state) => ({
    online: state?.device?.online,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ContactContainer);
