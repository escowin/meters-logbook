import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { form, docMutation, updateCache } from "../utils/helpers";

function WorkoutForm({ initialValues, doc, type }) {
  const fields =
    type === "login" || type === "sign-up" ? form.login : form[doc];

  const [mutation, { error }] = useMutation(docMutation(doc, type), {
    // updates client side cache
    update(cache, { data }) {
      try {
        updateCache(cache, data, type)
      } catch (err) {
        console.error(err);
      }
    },
  });

  // State variables & functions
  const [formState, setFormState] = useState({});

  useEffect(() => {
    // filters 'profile' object based on the 'details' array
    const docFields = {};
    fields.forEach((field) => {
      if (field.type === "date") {
        const today = new Date()
          .toLocaleDateString("en-CA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
          .split("/")
          .join("/");
        docFields[field.name] = initialValues[field.name] || today;
      } else {
        docFields[field.name] = initialValues[field.name] || "";
      }
    });
    // Sets the filtered 'profile' object as the initial 'formState'
    setFormState(docFields);
  }, [initialValues, fields]);

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
      if (formState.meters) {
        // Converts string to integer for GraphQL mutation acceptance
        formState.meters = parseInt(formState.meters)
      }
      console.log(formState)
      // Sets the object to mirror the GraphQL schema
      const variables = {
        ...formState,
        ...(type === "edit" ? { id: initialValues._id } : {}),
      };
      await mutation({ variables: variables });
      // postMutation(type, navigate, setEditSelected);
    } catch (err) {
      // Error handling
      console.error(`mutation failed. original error: ${err}`);
    }
  };

  // UI
  const displayField = (field, i) => {
    switch (field.type) {
      case "radio":
        return (
          <fieldset id={field.name} key={i}>
            <legend>{field.name}</legend>
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
                {radio}
              </label>
            ))}
          </fieldset>
        );
      default:
        return (
          <label key={i} htmlFor={field.name} className="label">
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
    <section className="form-section">
      <form onSubmit={handleFormSubmit} id="workout-form">
        <h2>Add workout</h2>
        {fields.map((field, i) => displayField(field, i))}
        <button type="submit">add</button>
        {error && <span>error</span>}
      </form>
    </section>
  );
}

export default WorkoutForm;
