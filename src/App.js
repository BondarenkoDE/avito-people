import "./App.css";
import styles from "./pages/MainPage/Main.module.scss";
import { MainPage } from "./pages/MainPage/MainPage";

import { Layout } from "antd";

function App() {
  const { Header, Footer, Content } = Layout;
  return (
    <Layout className={styles.root}>
      <Header className={styles.headerStyle}>Avito People</Header>
      <Content className={styles.contentStyle}>
        <MainPage />
      </Content>
      <Footer className={styles.footerStyle}>Footer</Footer>
    </Layout>
  );
}

export default App;
