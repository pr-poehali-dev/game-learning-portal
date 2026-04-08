import { useState } from "react";
import Home from "./Home";
import Novel from "./Novel";
import Cards from "./Cards";
import Profile from "./Profile";
import Achievements from "./Achievements";

type Page = "home" | "novel" | "cards" | "profile" | "achievements";

export default function Index() {
  const [page, setPage] = useState<Page>("home");

  const navigate = (p: string) => setPage(p as Page);

  return (
    <>
      {page === "home" && <Home onNavigate={navigate} />}
      {page === "novel" && <Novel onNavigate={navigate} />}
      {page === "cards" && <Cards onNavigate={navigate} />}
      {page === "profile" && <Profile onNavigate={navigate} />}
      {page === "achievements" && <Achievements onNavigate={navigate} />}
    </>
  );
}
