import React, { useEffect } from "react";
import { observer } from "mobx-react";
import store from "../../store/store";
import axios from "axios";
import { Layout, Pagination } from "antd";

import styles from "./Main.module.scss";
import { New } from "../../components/New/New";
import MainHeader from "../../components/MainHeader/MainHeader";

const MainPage = () => {
  const { Footer, Content } = Layout;

  const onChange = (page, size) => {
    store.setPageSize(size);
    store.setCurrentPage(page);
  };

  useEffect(() => {
    const order = store.sortType.key;
    axios
      .get(`https://hacker-news.firebaseio.com/v0/${order}.json`)
      .then((res) => {
        store.setNews(
          res.data.filter(
            (_, i) =>
              i >= (store.currentPage - 1) * store.pageSize &&
              i < store.currentPage * store.pageSize
          )
        );
      });
  }, [store.currentPage, store.pageSize, store.sortType]);

  return (
    <>
      <Layout className={styles.root}>
        <MainHeader />
        <Content className={styles.contentStyle}>
          {store.news.map((id) => (
            <New id={id} key={id} />
          ))}
        </Content>
        <Footer className={styles.footerStyle}>
          <Pagination
            defaultCurrent={1}
            defaultPageSize={store.pageSize}
            current={store.currentPage}
            onChange={onChange}
            total={250}
          />
        </Footer>
      </Layout>
    </>
  );
};

export default observer(MainPage);
