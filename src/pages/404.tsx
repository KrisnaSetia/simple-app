import { FC } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Head from 'next/head';
import style from "@/styles/404.module.css"

const Custom404: FC = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
        <meta name="description" content="Page not found" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/telkomsel.svg"/>
      </Head>
      <Container fluid className={style.container}>
        <Row className={style.row}>
          <Col xs={12} className={style.column}>
            <h1 className={style.title}>404</h1>
            <h2 className={style.subtitle}>Page Not Found</h2>
            <p className={style.description}>
              Sorry,your page was not found.
            </p>
            <Button 
              variant="danger" 
              className={style.button}
              onClick={() => router.push('/home')}
            >
              Back to Home
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Custom404;