import { memo } from "react";
import Layout from "../sections/Layout";
const Main = memo(() => <main className="flex flex-col p-2 gap-y-4">
    <Layout />
  </main>);
export default Main;