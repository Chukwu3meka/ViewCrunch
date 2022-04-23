import Joi from "joi";
import { useState } from "react";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

import { Preview } from ".";
import { fetcher, removeImagesInContent } from "@utils/clientFunctions";

const PreviewContainer = ({ displayPreview, setDisplayPreview, view, crunches, myID, displayName }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [publishTo, setPublishTo] = useState(displayName);
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [description, setDescription] = useState("");

  const hidePreview = () => {
    if (loading) {
      enqueueSnackbar("Please wait, while we publish your view", { variant: "warning" });
    } else {
      setDisplayPreview(false);
    }
  };

  const content = view.content
    .map((x) => {
      if (typeof x === "string") return x;
      if (typeof x === "object") return `<Image src='${x.image}' alt='${view.title}' layout="fill" />`;
    })
    .flat(Infinity)
    .join("");

  const publishingOption = [displayName, ...crunches];

  const publishHandler = async () => {
    // setLoading(true);

    const title = view.title || false;
    const content = view.content || false;
    const keywords = view.keywords ? view.keywords?.split(",").slice(0, 5) : ["viewcrunch"];
    const description = description || removeImagesInContent(content).substring(0, 158).split(" ").slice(0, -1).join(" ");

    // description, keywords, title
    const schema = Joi.object({
      title: Joi.string()
        .min(3)
        .max(150)
        .required()
        .trim()
        .pattern(/^[ A-Za-z0-9'$.@&!|_-]*$/)

        .error((errors) => {
          errors.forEach((err) => {
            console.log(err.code);

            switch (err.code) {
              case "any.empty":
                err.message = `Title should not be empty!`;
                break;
              case "string.min":
                err.message = `Title should have at least ${err.local.limit} characters!`;
                break;
              case "string.max":
                err.message = `Title should have at most ${err.local.limit} characters!`;
                break;
              case "string.pattern.base":
                err.message = `Only Alphanumeric, Emptyspace and \` ' $ . @ & ! | _ - \` allowed in title`;
                break;
              default:
                break;
            }
          });
          return errors;
        }),

      // title: Joi.string().min(3).max(150).required().trim(),
      description: Joi.string().max(158).trim(),
      keywords: Joi.array().items(
        Joi.string()
          .min(3)
          .max(20)
          .trim()
          .error((errors) => {
            errors.forEach((err) => {
              switch (err.code) {
                case "any.empty":
                  err.message = `Tag should not be empty!`;
                  break;
                case "string.min":
                  err.message = `Tags (${err.value}) should have at least ${err.local.limit} characters!`;
                  break;
                case "string.max":
                  err.message = `Tags (${err.value}) should have at most ${err.local.limit} characters!`;
                  break;
                default:
                  break;
              }
            });
            return errors;
          })
      ),
      content: Joi.string().min(30).required().trim(),
    });

    const { error, value } = schema.validate({ title, keywords, description, content: content.join() });

    if (error) {
      // enqueueSnackbar(error.details[0].message, { variant: "error" });
      enqueueSnackbar(error.stack, { variant: "error" });
      setLoading(false);
    } else {
      // const { link, errMsg } = await fetcher("/api/crunch/publish", {
      //   title,
      //   keywords,
      //   description,
      //   content,
      //   myID,
      //   crunch: publishTo === displayName ? "community" : publishTo,
      // });

      setLoading(false);

      // redirect author to view if view was published succesfully
      // if (link) return router.push(link);
      enqueueSnackbar(errMsg, { variant: "error" });
    }
  };

  const descriptionChangeHandler = (e) => {
    if (e.target.value.length <= 158) {
      setDescription(e.target.value);
    } else {
      enqueueSnackbar("You've reached the limit allowed for description", { variant: "warning" });
    }
  };

  return (
    <Preview
      publishHandler={publishHandler}
      loading={loading}
      description={description}
      descriptionChangeHandler={descriptionChangeHandler}
      setPublishTo={setPublishTo}
      publishingOption={publishingOption}
      publishTo={publishTo}
      displayPreview={displayPreview}
      hidePreview={hidePreview}
      view={{ ...view, content }}
    />
  );
};

const mapStateToProps = (state) => ({ myID: state.profile?.myID }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PreviewContainer);
