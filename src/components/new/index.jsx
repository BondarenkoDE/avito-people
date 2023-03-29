import React from "react";
import { Card, Space } from "antd";
import axios from "axios";

// import styles from "./New.module.scss";

export const New = ({ id }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [itemInfo, setItemInfo] = React.useState({});

  React.useEffect(() => {
    if (id !== 0) {
      setIsLoading(true);
      axios
        .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        .then((res) => {
          setItemInfo(res.data);
          setIsLoading(false);
        });
    }
  }, []);

  return (
    <Space direction="vertical" size={16}>
      {itemInfo ? (
        <Card
          title={itemInfo.title}
          loading={isLoading}
          extra={<a href={itemInfo.url}>Link</a>}
          size="small"
          style={{ width: 950 }}
        >
          Time:
          {isLoading
            ? "Long time ago"
            : ` ${new Date(itemInfo.time * 1000).getDate()}` +
              "." +
              `${new Date(itemInfo.time * 1000).getMonth()}` +
              "." +
              `${new Date(itemInfo.time * 1000).getFullYear()}  `}
          By {`${itemInfo.by}  `}
        </Card>
      ) : (
        ""
      )}
    </Space>
  );
};
