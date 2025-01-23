/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import React, { useState } from "react";
import style from "./CardRegion.module.css";
import Image from "next/image";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import img from "@/../public/assets/indonesia_map_region.png";
import Spinner from "react-bootstrap/Spinner";

const cardMap = () => {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const handleMapClick = () => {
    setLoading(true); // Aktifkan spinner
    setTimeout(() => {
      setLoading(false); // Matikan spinner (opsional jika navigasi cepat)
      push("/map/regionmap"); // Navigasi ke halaman login
    }, 2000); // Simulasi loading 2 detik
  };
  return (
    <>
      <Card className={style.cardBackground}>
        <div className={style.imageWrapper}>
          <Image src={img} alt="Map of Indonesia" layout="responsive" />
        </div>
        <Card.Body>
          <Card.Title style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
            Region Map
          </Card.Title>
          <Card.Text>
          This report will visualize and summarize Telkomsel BTS tower data based on Region level in Jawa, Bali, and Nusa Tenggara Area.
          </Card.Text>
          <Button variant="danger" onClick={handleMapClick} disabled={loading}>
          {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    {" Loading..."}
                  </>
                ) : (
                  "Access Region Map"
                )}
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default cardMap;
