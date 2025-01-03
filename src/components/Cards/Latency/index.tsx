import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import style from "./CardLatency.module.css";
import Image from "next/image";
import img from "@/../public/assets/Latency.png";
const cardLatency = () => {
    return (
        <>
        <Card className={style.cardBackground}>
        <div className={style.imageWrapper}>
          <Image src={img} alt="Payload Logo" layout="responsive" height={50}/>
        </div>
        <Card.Body>
          <Card.Title>Latency</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card&apos;s content.
          </Card.Text>
          <Button variant="danger">Go somewhere</Button>
        </Card.Body>
      </Card>
        </>
    )
};
export default cardLatency;