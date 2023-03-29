import React, { useEffect } from "react";
import axios from "axios";

// import styles from "./Main.module.scss";
import { New } from "../../components/new";

export const MainPage = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [news, setNews] = React.useState([]);

  useEffect(() => {
    axios
      .get("https://hacker-news.firebaseio.com/v0/newstories.json")
      .then((res) => {
        setNews(res.data.filter((_, i) => i < 100 && true));
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {news.map((id, i) => (
        <New id={id} key={i} />
      ))}
      {/* {isLoading
        ? [...new Array(10)].map((_, i) => <New id={0} key={i} />)
        : news.map((id, i) => <New id={id} key={i} />)} */}
    </>
  );
};
