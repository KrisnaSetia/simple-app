import Offcanvas from "react-bootstrap/Offcanvas";
import style from "./SiteMap.module.css";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

interface SiteMapProps {
  show: boolean;
  btsData: {
    site_id: string;
    trx_date: string;
    latitude: number;
    longitude: number;
    total_rev: number;
    total_payload: number;
    total_profit: number;
  }[];
  handleClose: () => void;
  loading: boolean;
}

const SiteMapInfo: React.FC<SiteMapProps> = ({
  show,
  handleClose,
  btsData,
  loading,
}) => {
  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      style={{ width: "32rem", marginTop: "5.4rem" }}
      backdrop={false}
    >
      <Offcanvas.Header className={style.offcanvasHeader} closeButton>
        <Offcanvas.Title className={style.header}>Site Report Details</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Container fluid>
          <Row className={style.customRow}> General Information</Row>
          {loading ? (
            <p>Loading...</p>
          ) : btsData.length > 0 ? (
            <>
              {btsData.map((bts, index) => (
                <div key={index} className={style.btsInfo}>
                  <Table striped bordered hover className={style.table}>
                    <tbody>
                      <tr>
                        <td>
                          <strong>Site ID </strong>
                        </td>
                        <td>{bts.site_id}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Latitude</strong>
                        </td>
                        <td>{bts.latitude}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Longitude</strong>
                        </td>
                        <td>{bts.longitude}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              ))}
            </>
          ) : (
            <p>No data available</p>
          )}
          <Row className={style.customRow}> Chart Report</Row>
        </Container>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SiteMapInfo;
