import "./NotFound.scss";
import React from "react";
import { bemElement } from "../../utils/bem-class-names";
import { Helmet } from "react-helmet";

const baseClassName = "not-found-page";
const bem = bemElement(baseClassName);

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404</title>
        <meta property="og:title" content="404" />
      </Helmet>
      <div className={baseClassName}>
        <h1 className={bem("text")}>404</h1>
      </div>
    </>
  );
};

export default NotFound;
