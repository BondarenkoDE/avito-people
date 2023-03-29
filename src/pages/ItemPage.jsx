import React from "react";
import { Link, useParams } from "react-router-dom";
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";
import axios from "axios";
import { Layout, Typography, Button, Col, Row } from "antd";

import styles from "./MainPage/Main.module.scss";
import { Comment } from "../components/Comment/Comment";

export const ItemPage = () => {
  const { Header, Content } = Layout;
  const { Title } = Typography;
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
        <Content className={styles.itemPageStyle}>
          <Title level={2}>{itemInfo.title}</Title>
          <Row justify="start">
            <Col span={4}>
              <UserOutlined /> {itemInfo.by}
            </Col>
            <Col span={4}>
              <CalendarOutlined />
              {` ${new Date(itemInfo.time * 1000).getDate()}` +
                "." +
                `${new Date(itemInfo.time * 1000).getMonth()}` +
                "." +
                `${new Date(itemInfo.time * 1000).getFullYear()}  `}
            </Col>
            <Col span={4}>
              <Link to={itemInfo.url}>Link</Link>
            </Col>
          </Row>
          <br />
          <br />
          <div dangerouslySetInnerHTML={{ __html: itemInfo.text }} />
          <br />
          <br />
          {itemInfo.hasOwnProperty("kids") &&
            itemInfo.kids.map((id) => <Comment id={id} key={id} />)}
        </Content>
      </Layout>
    </>
  );
};
