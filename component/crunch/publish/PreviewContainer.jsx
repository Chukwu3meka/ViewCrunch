import { useState } from "react";
import { Preview } from ".";

const PreviewContainer = ({ displayPreview, setDisplayPreview, view }) => {
  const [publishTo, setPublishTo] = useState("username");

  const hidePreview = () => setDisplayPreview(false);

  const publishingOption = ["username", "vdvd", "ASdsad", "Sadasdas", "sfdaaaaaaaaaaaaaaaffffffffffffffffasdffsd"];

  return (
    <Preview
      setPublishTo={setPublishTo}
      publishingOption={publishingOption}
      publishTo={publishTo}
      displayPreview={displayPreview}
      hidePreview={hidePreview}
      view={view}
    />
  );
};

export default PreviewContainer;
// university of west indi
