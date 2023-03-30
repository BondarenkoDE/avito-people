import React from "react";
import axios from "axios";
import { Collapse, theme, Col, Row } from "antd";
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";

function timeSince(date) {
  let seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

export const Comment = ({ id }) => {
  const { token } = theme.useToken();
  const { Panel } = Collapse;
  const [commentInfo, setCommentInfo] = React.useState({});
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  React.useEffect(() => {
    axios
      .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      .then((res) => {
        setCommentInfo(res.data);
      });
  }, []);

  return (
    <Collapse
      bordered={false}
      style={{
        background: token.colorBgContainer,
      }}
    >
      {commentInfo && !commentInfo.hasOwnProperty("deleted") && (
        <Panel
          header={
            <>
              <Row>
                <Col span={4}>
                  <UserOutlined /> {commentInfo.by}
                </Col>
                <Col span={4}>
                  <CalendarOutlined />
                  {" " + timeSince(new Date(commentInfo.time * 1000)) + " ago"}
                </Col>
              </Row>
              <div
                dangerouslySetInnerHTML={{
                  __html: commentInfo.text,
                }}
              />
            </>
          }
          key={id}
          style={panelStyle}
          accordion={commentInfo.hasOwnProperty("kids")}
          showArrow={commentInfo.hasOwnProperty("kids")}
        >
          {commentInfo.hasOwnProperty("kids") &&
            commentInfo.kids.map((id) => <Comment id={id} key={id} />)}
        </Panel>
      )}
    </Collapse>
  );
};
