import React from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Layout } from "antd";
import { Button } from "antd";

import styles from "./MainPage/Main.module.scss";

export const ItemPage = () => {
  const { Header, Footer, Content } = Layout;
  const [itemInfo, setItemInfo] = React.useState({});
  const { id } = useParams();

  React.useEffect(() => {
    if (id !== 0) {
      axios
        .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        .then((res) => {
          setItemInfo(res.data);
        });
    }
  }, []);

  return (
    <>
      <Layout className={styles.root}>
        <Header className={styles.headerStyle}>
          <Link to={"/"}>
            <Button> {"< "}Back</Button>
          </Link>
        </Header>
        <Content className={styles.contentStyle}>{itemInfo.title}</Content>
        <Footer className={styles.footerStyle}>Footer</Footer>
      </Layout>
    </>
  );
};
