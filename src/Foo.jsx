/* eslint-disable react/prop-types */
import { Fragment } from "react";

const Foo = (props) => {
  return (
    <Fragment>
      <h1>{props.message}</h1>
      <p> Bienvenidos </p>
    </Fragment>
  );
};

export default Foo;
