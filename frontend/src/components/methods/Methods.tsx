import "./Methods.scss";
import React from "react";
import { bemElement } from "../../utils/bem-class-names";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DateAging from "./DateAging";
import Decomposition from "./Decomposition";
import GeneralizationString from "./GeneralizationString";
import Identifier from "./Identifier";
import MicroAggregation from "./MicroAggregation";
import Round from "./Round";
import ValueReplacementByPattern from "./ValueReplacementByPattern";
import ValueVariance from "./ValueVariance";
import GeneralizationValue from "./GeneralizationValue";
import MicroAggregationBySingleAxis from "./MicroAggregationBySingleAxis";

const baseClassName = "methods";
const bem = bemElement(baseClassName);

interface IMethodsData {
  columns: string[];
}

const Methods = ({ columns }: IMethodsData) => {
  return (
    <div className={baseClassName}>
      <Typography variant="h6">Настройка методов обезличивания</Typography>
      <div className={bem("list")}>
        {columns.map((column: string) => (
          <Accordion key={column}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{column}</Typography>
            </AccordionSummary>
            <AccordionDetails className={bem("list-content")}>
              <DateAging />
              <Decomposition />
              <GeneralizationString />
              <GeneralizationValue />
              <Identifier />
              <MicroAggregation k={1} setK={() => {}} />
              <MicroAggregationBySingleAxis k={1} setK={() => {}} />
              <Round />
              <ValueReplacementByPattern />
              <ValueVariance />
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default Methods;