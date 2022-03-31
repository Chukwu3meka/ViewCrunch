import { useState } from "react";
import { Preview } from ".";

const PreviewContainer = ({ displayPreview, setDisplayPreview, view }) => {
  const [publishTo, setPublishTo] = useState("username");

  const hidePreview = () => setDisplayPreview(false);

  const publishingOption = ["username", "vdvd", "ASdsad", "Sadasdas", "sfdaaaaaaaaaaaaaaaffffffffffffffffasdffsd"];

  const content = view.content
    .map((x) => {
      if (typeof x === "string") return x;
      if (typeof x === "object") return `<Image src='${x.image}' alt='${view.title}' layout="fill" />`;
    })
    .flat(Infinity)
    .join("");

  return (
    <Preview
      setPublishTo={setPublishTo}
      publishingOption={publishingOption}
      publishTo={publishTo}
      displayPreview={displayPreview}
      hidePreview={hidePreview}
      view={{ ...view, content }}
    />
  );
};

export default PreviewContainer;
// university of west indi
