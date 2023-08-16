import "@/styles/globals.css";
import type { AppProps } from "next/app";
import store from "../store";
import Header from "@/components/Header";
import Toast from "@/components/Toast";
import { Provider } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Start showing the loading indicator when navigating to a new route
    const handleStart = () => {
      setIsLoading(true);
      document.body.style.overflow = "hidden";
    };
    const handleComplete = () => {
      setIsLoading(false);
      document.body.style.overflow = "auto";
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    // Clean up the event listeners on unmount
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <Provider store={store}>
      <ErrorBoundary>
        {isLoading ? <Loading /> : null}
        <Component {...pageProps} />
        <Toast />
      </ErrorBoundary>
    </Provider>
  );
}
