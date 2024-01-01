// import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { docMutation, updateCache } from "../utils/helpers";

function Options({ doc, type, _id, handleEditClick }) {
  const [document, { error }] = useMutation(docMutation(doc, type), {
    update(cache, { data }) {
      try {
        updateCache(cache, data, type, _id);
      } catch (err) {
        console.error(error);
        console.error(err);
      }
    },
  });

  const handleClick = async (mutation) => {
    try {
      console.log(`clicked ${doc} ${_id}`);

      if (mutation === "delete") {
        await document({ variables: { id: _id } });
      } else if (mutation === "edit") {
        console.log(mutation + " option tbd");
        handleEditClick(true)
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button className={`option-btn ${type}`} onClick={() => handleClick(type)}>
      {type}
    </button>
  );
}

export default Options;
