import Offcanvas from "react-bootstrap/Offcanvas";
import style from "./SiteMap.module.css";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import LineChartProps from "@/components/Chart/LineChart";
import LoadingScreen from "@/components/LoadingScreen";

interface SiteMapProps {
  show: boolean;
  chartData: {
    trx_date: string;
    total_rev: number;
    total_payload: number;
    total_traffic: number;
  }[];
  handleClose: () => void;
  loading: boolean;
}

const SiteMapInfo: React.FC<SiteMapProps> = ({
  show,
  chartData,
  handleClose,
  loading,
}) => {
  if(loading){
    return <LoadingScreen/>
  }
  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      style={{ width: "32rem", marginTop: "5.4rem" }}
      backdrop={false}
    >
      <Offcanvas.Header className={style.offcanvasHeader} closeButton>
        <Offcanvas.Title className={style.header}>
          Site Report Details
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Container fluid>
          <Row className={style.customRow}> Chart Report</Row>
          {loading ? (
            <LoadingScreen />
          ) : chartData.length > 0 ? (
            <LineChartProps chartData={chartData} loading={loading} />
          ) : (
            <p>No performance data available</p>
          )}
        </Container>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SiteMapInfo;
