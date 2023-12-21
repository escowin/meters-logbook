// import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { docMutation, updateCache } from "../utils/helpers";

function Options({ doc, type, _id }) {
  //   const { id: _id } = useParams();
  // console.log(_id);
  const [document, {error}] = useMutation(docMutation(doc, type), {
    update(cache, { data }) {
      try {
        console.log(cache)
        console.log(data)
      } catch (err) {
        console.error(err)
      }
    },
  });

  // const handleEdit = () => setEditSelected(true);
  const handleClick = async (button) => {
    try {
      console.log(`clicked ${button} ${_id}`);

      if (button === "delete") {
        // await mutation({ variables: { id: _id } });
      } else {
        console.log(button + " option tbd");
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
