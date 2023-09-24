import "./NotFound.scss";
import React from 'react';
import {bemElement} from "../../utils/bem-class-names";

const baseClassName = "not-found-page";
const bem = bemElement(baseClassName);

const NotFound = () => {
  return (
    <div className={baseClassName}>
      <h1 className={bem("text")}>404</h1>
    </div>
  );
};

export default NotFound;