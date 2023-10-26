import "./ApplyMethodsModal.scss";
import React from "react";
import { joinClassNames } from "../../../utils/join-class-names";
import { Box, Button, Modal, Typography } from "@mui/material";
import { bemElement } from "../../../utils/bem-class-names";
import { Link, useNavigate } from "react-router-dom";

const baseClassName = "apply-methods-modal";
const bem = bemElement(baseClassName);

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: 2,
  boxShadow: 24,
  p: 4
};

interface IApplyMethodsModalData {
  show: boolean;
  onHide: () => void;
  className?: string;
}

const ApplyMethodsModal = ({ show, onHide, className = "" }: IApplyMethodsModalData) => {
  const navigate = useNavigate();

  return (
    <Modal
      open={show}
      onClose={onHide}
      className={joinClassNames(baseClassName, className)}
    >
      <Box sx={style}>
        <Typography variant="h6">Готово</Typography>
        <Typography>
          Процесс обезличивания запущен. Когда он будет завершен, результаты будут отображены <Link to="/tables">здесь</Link>.
        </Typography>
        <div className={bem("buttons")}>
          <Button variant="outlined" color="secondary" onClick={onHide}>
            Остаться
          </Button>
          <Button
            variant="contained"
            sx={{ width: 200 }}
            // TODO
            onClick={() => navigate("/tables")}
          >
            К результатам
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ApplyMethodsModal;