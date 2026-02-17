// src/layout/Layout.jsx
import { Layout } from "antd";

const { Header, Content } = Layout;

export default function AppLayout({ children }) {
  return (
    <Layout style={{ width: "100vw", height: "100vh" }}>
      <Header
        style={{
          height: 56,
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
          background: "#0f253a",
          color: "#fff",
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 16, lineHeight: "16px" }}>
          IIoT.IstOK
        </div>

        <div style={{ marginLeft: 12, opacity: 0.85, fontSize: 12 }}>
          Отчет директора по производству
        </div>

        {/* справа ничего не показываем */}
        <div style={{ marginLeft: "auto" }} />
      </Header>

      <Content
        style={{
          height: "calc(100vh - 56px)",
          padding: 12,
          background: "#f5f6f7",
          overflow: "hidden",
        }}
      >
        {children}
      </Content>
    </Layout>
  );
}
