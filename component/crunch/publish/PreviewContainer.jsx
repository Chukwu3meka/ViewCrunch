import { connect } from "react-redux";
import { useState } from "react";
import { Preview } from ".";
import Joi from "joi";
import { useSnackbar } from "notistack";
import { fetcher } from "@utils/clientFunctions";
import { useRouter } from "next/router";

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
    const a = `werew rew r ewr er<Image src="https://firebasestorage.googleapis.com/v0/b/viewcrunch-2018.appspot.com/o/images%2FzqWXUjfcFXPGKzgN3HCvoFuOz043%2Fm5c0tHcLCBLASZrYpWNC_1.png?alt=media&token=25f35980-3719-4dd5-802d-802e033731c0" alt="qqw ewq ewq ewqe   ~ 1" layout="fill" /><Image src="https://firebasestorage.googleapis.com/v0/b/viewcrunch-2018.appspot.com/o/images%2FzqWXUjfcFXPGKzgN3HCvoFuOz043%2Fm5c0tHcLCBLASZrYpWNC_2.png?alt=media&token=f36c7960-f7fc-440c-a2dd-6fca15d64071" alt="qqw ewq ewq ewqe   ~ 2" layout="fill" /><Image src="https://firebasestorage.googleapis.com/v0/b/viewcrunch-2018.appspot.com/o/images%2FzqWXUjfcFXPGKzgN3HCvoFuOz043%2Fm5c0tHcLCBLASZrYpWNC_3.png?alt=media&token=66e77732-6616-45c0-9b0b-f286f91c7b0c" alt="qqw ewq ewq ewqe   ~ 3" layout="fill" /><Image src="https://firebasestorage.googleapis.com/v0/b/viewcrunch-2018.appspot.com/o/images%2FzqWXUjfcFXPGKzgN3HCvoFuOz043%2Fm5c0tHcLCBLASZrYpWNC_4.png?alt=media&token=3f9ae70b-b314-4c7c-8699-176f91a6d44b" alt="qqw ewq ewq ewqe   ~ 4" layout="fill" />`;

    return;
    setLoading(true);

    const title = view.title || false;
    const keywords = view.keywords ? view.keywords?.split(",").slice(0, 5) : ["viewcrunch"];
    const description = description || "viewcrunch";
    const content = view.content || false;

    // description, keywords, title
    const schema = Joi.object({
      title: Joi.string().min(3).max(150).required().trim(),
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
      const { link, errMsg } = await fetcher(
        "/api/crunch/publish",
        JSON.stringify({ title, keywords, description, content, myID, crunch: publishTo === displayName ? "community" : publishTo })
      );

      setLoading(false);

      // redirect author to view if view was published succesfully
      if (link) return router.push(link);
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
