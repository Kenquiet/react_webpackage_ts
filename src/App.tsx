// import './App.less';
import {  Provider } from "react-redux";
import { ConfigProvider } from 'antd';
import zhCN from "antd/es/locale/zh_CN";
import store from "./store";
import Router from "./router";

const App = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <Router />
      </Provider>
    </ConfigProvider>
  );
}

export default App;
