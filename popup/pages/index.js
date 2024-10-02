import { memo } from "react";
import Container from "../components/layout/Container";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Main from "../components/layout/Main";
const IndexPage = memo(() => <Container>
    <Header />
    <Main />
    <Footer />
  </Container>);
export default IndexPage;