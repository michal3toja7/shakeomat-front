import React, { useEffect, useRef } from "react";
import { IDiscountCard } from "../../../types/discountCoupon.type";
import bwipjs from "bwip-js";
import Box from "@mui/material/Box";
import { Button, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

type Props = {
  couponCard: IDiscountCard;
  setIsClose: Function;
};

const CouponInformationComponent: React.FC<Props> = ({
  couponCard,
  setIsClose,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let canvas = canvasRef.current;
    if (canvas) {
      bwipjs.toCanvas(canvas, {
        bcid: "pdf417",
        text: couponCard.card_number.toString(),
        scale: 3,
        height: 10,
        includetext: true,
        textxalign: "center",
      });
    }
  }, [canvasRef, couponCard.card_number]);

  const onCloseHandler = () => {
    setTimeout(() => {
      setIsClose();
    }, 300);
  };

  return (
    <React.Fragment>
      <Box>
        <Box textAlign={"right"}>
          <Button onClick={onCloseHandler} color={"secondary"} size={"small"}>
            X
          </Button>
        </Box>
        <Typography align="center" fontWeight="bold" padding="5px 0 10px 0">
          Aby użyć podaj:
        </Typography>

        <Grid container justifyContent={"space-between"}>
          <Typography>Numer telefonu:</Typography>
          <Typography fontWeight="bold">{couponCard.phone_number}</Typography>
        </Grid>
        <Grid container justifyContent={"space-between"}>
          <Typography>Numer karty:</Typography>
          <Typography fontWeight="bold">{couponCard.card_number}</Typography>
        </Grid>

        <Typography align="center" fontWeight="bold" padding="5px 0 10px 0">
          Lub zeskanuj:
        </Typography>
      </Box>
      <Box
        bgcolor={"#ffffff"}
        sx={{
          marginInline: "-20px",
          padding: "10px 0 5px 0",
          textAlign: "center",
        }}
      >
        <canvas ref={canvasRef} />
      </Box>
    </React.Fragment>
  );
};

export default CouponInformationComponent;
