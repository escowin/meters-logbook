import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { docMutation } from "../utils/helpers";

function Options({ type }) {
    const { id: _id } = useParams();
    // const [removeWorkout, error] = useMutation()

    // const handleEdit = () => setEditSelected(true);
    const handleClick = async (button) => {
        try {
            console.log(`clicked ${button}`)
        //   await removeWorkout({ variables: { id: _id } });
        //   navigate("/");
        } catch (err) {
          console.error(err);
        }
      };

      
  return (
    <button
      className={`option-btn ${type}`}
      onClick={() => handleClick(type)}
    >
      {type}
    </button>
  );
}

export default Options;
