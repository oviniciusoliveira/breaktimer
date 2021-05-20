import { Provider } from "next-auth/client";
import { useRouter } from "next/router";
import { Sidebar } from "../components/Sidebar";
import "./../styles/global.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <Provider session={pageProps.session}>
        {router.pathname !== "/login" && <Sidebar />}
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
