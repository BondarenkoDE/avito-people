import React from "react";
import { observer } from "mobx-react";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space, Col, Row } from "antd";
import { Layout } from "antd";

import styles from "../../pages/MainPage/Main.module.scss";
import store from "../../store/store";

const items = [
  {
    label: "Top Stories",
    key: "topstories",
  },
  {
    label: "New Stories",
    key: "newstories",
  },
  {
    label: "Best Stories",
    key: "beststories",
  },
];

const MainHeader = () => {
  const { Header } = Layout;

  const handleMenuClick = (e) => {
    store.setSortType(items.find((elem) => elem.key === e.key));
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <Header className={styles.headerStyle}>
      <Row justify="space-around">
        <Col span={4}>
          <Button>Refresh</Button>
        </Col>
        <Col span={4}>Avito People</Col>
        <Col span={4}>
          <Dropdown menu={menuProps}>
            <Button>
              <Space>
                {store.sortType.label}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </Col>
      </Row>
    </Header>
  );
};

export default observer(MainHeader);
