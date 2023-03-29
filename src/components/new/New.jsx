import React from "react";
import { Link } from "react-router-dom";
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
  }, [id]);

  return (
    <Space direction="vertical" size={16}>
      {itemInfo ? (
        <Card
          title={<Link to={`/item/${id}`}>{itemInfo.title}</Link>}
          loading={isLoading}
          extra={
            <Link to={itemInfo.url} target="_blank" rel="noopener noreferrer">
              Link
            </Link>
          }
          size="small"
          style={{ width: 950 }}
        >
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
