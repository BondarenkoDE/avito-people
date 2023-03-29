import React, { useEffect } from "react";
import axios from "axios";
import { Layout, Pagination } from "antd";

import styles from "./Main.module.scss";
import { New } from "../../components/New/New";

export const MainPage = () => {
  const { Header, Footer, Content } = Layout;
  const [news, setNews] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const onChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  useEffect(() => {
    axios
      .get("https://hacker-news.firebaseio.com/v0/newstories.json")
      .then((res) => {
        console.log(res.data);
        setNews(
          res.data.filter(
            (_, i) =>
              i >= (currentPage - 1) * pageSize && i < currentPage * pageSize
          )
        );
      });
  }, [currentPage, pageSize]);

  return (
    <>
      <Layout className={styles.root}>
        <Header className={styles.headerStyle}>Avito People</Header>
        <Content className={styles.contentStyle}>
          {news.map((id) => (
            <New id={id} key={id} />
          ))}
        </Content>
        <Footer className={styles.footerStyle}>
          <Pagination
            defaultCurrent={1}
            defaultPageSize={pageSize}
            current={currentPage}
            onChange={onChange}
            total={250}
          />
        </Footer>
      </Layout>
    </>
  );
};
