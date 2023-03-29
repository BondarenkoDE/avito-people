import React, { useEffect } from "react";
import axios from "axios";
import { Layout, Pagination } from "antd";

import styles from "./Main.module.scss";
import { New } from "../../components/New/New";

export const MainPage = () => {
  const { Header, Footer, Content } = Layout;
  const [news, setNews] = React.useState([]);
  const [current, setCurrent] = React.useState(1);

  const onChange = (page) => {
    setCurrent(page);
    console.log(page);
  };

  useEffect(() => {
    axios
      .get("https://hacker-news.firebaseio.com/v0/newstories.json")
      .then((res) => {
        setNews(res.data.filter((_, i) => i < 100 && true));
      });
  }, []);

  return (
    <>
      <Layout className={styles.root}>
        <Header className={styles.headerStyle}>Avito People</Header>
        <Content className={styles.contentStyle}>
          {news.map((id, i) => (
            <New id={id} key={i} />
          ))}
        </Content>
        <Footer className={styles.footerStyle}>
          <Pagination
            defaultCurrent={1}
            defaultPageSize={100}
            current={current}
            onChange={onChange}
            total={500}
          />
        </Footer>
      </Layout>
    </>
  );
};
