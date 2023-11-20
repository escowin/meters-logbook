import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_WORKOUT } from "../utils/mutations";
import { QUERY_WORKOUTS, QUERY_ME } from "../utils/queries";

function WorkoutForm() {
  const formFields = [
    { name: "date", type: "date", required: true },
    { name: "meters", type: "number", required: true, max: 9999 },
    {
      name: "activity",
      type: "radio",
      max: 10,
      radios: ["row", "erg", "kayak", "sup", "bike", "jog", "swim"],
      required: true,
    },
    { name: "note", type: "text", max: 180, required: false },
  ];

  // addWorkout runs the mutation
  // const [addWorkout, { error }] = useMutation(ADD_WORKOUT, {
  //   update(cache, { data: { addWorkout } }) {
  //     // handles cases when workouts dont yet exist
  //     try {
  //       if (addWorkout.activity === "erg") {
  //         addWorkout.adjusted = addWorkout.meters;
  //       }
  //       console.log(addWorkout); // missing adjusted field

  //       // updates me array's cache
  //       const { me } = cache.readQuery({ query: QUERY_ME });
  //       console.log(me);
  //       cache.writeQuery({
  //         query: QUERY_ME,
  //         data: {
  //           me: {
  //             ...me,
  //             workouts: [...me.workouts, addWorkout],
  //           },
  //         },
  //       });
  //     } catch (e) {
  //       console.warn("first workout insertion by user");
  //       console.error(e);
  //     }
  //   },
  // });

  // update state based on form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handles form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Carries out client-server communication
    try {
      // Sets the object to mirror the GraphQL schema
      // const mutation = {
      //   ...formState,
      //   ...(type === "edit" ? { id: initialValues._id } : {}),
      // };

        // await document({ variables: mutation });
        // postMutation(type, navigate, setEditSelected);
    } catch (err) {
      // Error handling
      console.error(err);
    }
  };

  // UI
  const displayField = (field, i) => {
    switch (field.type) {
      case "radio":
        return (
          <fieldset id={field.name} key={i}>
            <legend>(field.name)</legend>
            {field.radios.map((radio, j) => (
              <label key={j} htmlFor={radio}>
                <input
                  type={field.type}
                  id={radio}
                  name={field.name}
                  max={field.max}
                  value={radio}
                  checked={formState[field.name] === radio}
                  onChange={handleChange}
                />
                {format.id(radio)}
              </label>
            ))}
          </fieldset>
        );
      default:
        return (
          <label key={i} htmlFor={field.name}>
            {field.name}
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              minLength={field.min ? field.min : null}
              maxLength={field.max ? field.max : null}
              required={field.req ? field.req : null}
              value={formState[field.name] || ""}
              onChange={handleChange}
              autoComplete="off"
            />
          </label>
        );
    }
  };

  return (
    <section>
      <form onSubmit={handleFormSubmit} id="workout-form">
        <h2>Add workout</h2>
        {formFields.map((field, i) => displayField(field, i))}
        <button type="submit">add</button>
        {error && <span>error</span>}
      </form>
    </section>
  );
}

export default WorkoutForm;
