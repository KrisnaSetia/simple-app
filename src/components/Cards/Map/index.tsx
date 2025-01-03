import style from "./CardMap.module.css";
import Image from "next/image";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import img from "@/../public/assets/indonesia_map.png";

const cardMap = () => {
  return (
    <>
      <Card className={style.cardBackground}>
        <div className={style.imageWrapper}>
          <Image src={img} alt="Map of Indonesia" layout="responsive" />
        </div>
        <Card.Body>
          <Card.Title style={{ fontWeight: "bold", fontSize: "1.5rem" }}>Base Transceiver Station (BTS) Map</Card.Title>
          <Card.Text>
            Base Transceiver Station (BTS) Map is a map of the base transceiver station (BTS) in Indonesia. Let&apos;s access this map and find out the location of the BTS in your area.
          </Card.Text>
          <Button variant="danger">Access BTS Map</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default cardMap;
