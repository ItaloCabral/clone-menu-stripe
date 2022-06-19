import React from "react";
import { Navbar } from "components";
import Layout from "components/Layout";

import { GlobalStyle } from "styles";

function App() {
  return (
    <>
      <Layout>
        <Navbar />
      </Layout>
      <GlobalStyle />
    </>
  );
}

export default App;
