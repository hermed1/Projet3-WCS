import React from "react";
// import NewIdea from "../components/newIdea/NewIdea";
import IdeaContent from "../components/ideaContent/IdeaContent";
import HeaderNavbar from "../components/headernav/HeaderNavbar";

function AddIdea() {
  return (
    <div>
      <HeaderNavbar />
      {/* <NewIdea /> */}
      <IdeaContent />
    </div>
  );
}

export default AddIdea;