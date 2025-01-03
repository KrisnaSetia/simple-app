import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import style from "./CardProfit.module.css";
import Image from "next/image";
import img from "@/../public/assets/Profit.png";
const cardProfit = () => {
  return (
    <>
      <Card className={style.cardBackground}>
      <div className={style.imageWrapper}>
          <Image src={img} alt="Payload Logo" layout="responsive" />
        </div>
        <Card.Body>
          <Card.Title>Profit</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card&apos;s content.
          </Card.Text>
          <Button variant="danger">Go somewhere</Button>
        </Card.Body>
      </Card>
    </>
  );
};
export default cardProfit;
