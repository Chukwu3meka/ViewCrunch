import { connect } from "react-redux";
import { useState } from "react";
import { Preview } from ".";
import Joi from "joi";
import { useSnackbar } from "notistack";

const PreviewContainer = ({ displayPreview, setDisplayPreview, view, crunches, myID, displayName }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [publishTo, setPublishTo] = useState(displayName);

  const [loading, setLoading] = useState(false);

  const [description, setDescription] = useState("");

  const hidePreview = () => setDisplayPreview(false);

  const content = view.content
    .map((x) => {
      if (typeof x === "string") return x;
      if (typeof x === "object") return `<Image src='${x.image}' alt='${view.title}' layout="fill" />`;
    })
    .flat(Infinity)
    .join("");

  const publishingOption = [displayName, ...crunches];

  const publishHandler = () => {
    setLoading(true);

    const title = view.title || false;
    const keywords = view.keywords?.split(",").slice(0, 5) || ["viewcrunch"];
    const description = description || "viewcrunch";
    const content = view.content || false;

    // description, keywords, title
    const schema = Joi.object({
      title: Joi.string()
        // If you omit { invert: true } option, it will require you to have all regex
        .regex(/^[,. \-a-z0-9]+$/, { invert: true })
        .min(3)
        .max(150)
        .required()
        .trim(),
      description: Joi.string()
        .regex(/^[,. \-a-z0-9]+$/)
        .min(30)
        .max(158)
        .required()
        .trim(),
      keywords: Joi.array().items(
        Joi.string()
          .regex(/^[a-z]+$/)
          .min(3)
          .max(10)
          .trim()
      ),

      content: Joi.string().min(30).required().trim(),
    });

    const { error, value } = schema.validate({ title, keywords, description, content: content.join() });

    // const { link } = await fetcher(
    //   oldContent ? "/api/crunch/retouchView" : "/api/crunch/publishView",
    //   JSON.stringify({ description, profile, title, content, keywords, crunch, moderator, oldContent: oldContent || false })
    // );

    if (error) {
      enqueueSnackbar(error.details[0].message, { variant: "error" });
      setLoading(false);
    } else {
      setLoading(false);
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
