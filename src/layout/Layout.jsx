import "./Layout.css";
import Header from "./header/Header";
import Footer from "./footer/Footer";

const Layout = ({ children }) => (
  <div className="layout">
    <Header />
    <main className="layout-content">
      <div className="centered-content">{children}</div>
    </main>
    <Footer />
  </div>
);

export default Layout;
