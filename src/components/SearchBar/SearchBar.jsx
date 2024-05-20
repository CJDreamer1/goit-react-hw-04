import { Field, Form, Formik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { FaMagnifyingGlass } from "react-icons/fa6";
import css from "../SearchBar/SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  const notify = () => toast.error("Please enter search request!");
  return (
    <Formik
      initialValues={{ query: "" }}
      onSubmit={(values, actions) => {
        if (values.query.trim() === "") {
          notify();
        } else {
          onSearch(values.query);
          actions.resetForm();
        }
      }}
    >
      <Form className={css.header}>
        <Field name="query">
          {({ field }) => (
            <div className={css.fieldContainer}>
              <input className={css.field} type="text" {...field} />
              <button type="submit" className={css.iconButton}>
                <FaMagnifyingGlass />
              </button>
            </div>
          )}
        </Field>
        <Toaster />
      </Form>
    </Formik>
  );
}
