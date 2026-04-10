import { useState } from "react";
import Home from "./Home";
import Novel from "./Novel";
import NovelIntro from "./NovelIntro";
import Cards from "./Cards";
import CardsIntro from "./CardsIntro";
import Profile from "./Profile";
import Achievements from "./Achievements";

type Page = "home" | "novel-intro" | "novel" | "cards-intro" | "cards" | "profile" | "achievements";

export default function Index() {
  const [page, setPage] = useState<Page>("home");
  const [novelStartSlide, setNovelStartSlide] = useState(0);

  const navigate = (p: string) => setPage(p as Page);

  const handleStartChapter = (slideIndex: number) => {
    setNovelStartSlide(slideIndex);
    setPage("novel");
  };

  const handleStartCards = () => {
    setPage("cards");
  };

  return (
    <>
      {page === "home" && <Home onNavigate={(p) => {
        if (p === "novel") setPage("novel-intro");
        else if (p === "cards") setPage("cards-intro");
        else navigate(p);
      }} />}
      {page === "novel-intro" && (
        <NovelIntro
          onNavigate={navigate}
          onStartChapter={handleStartChapter}
        />
      )}
      {page === "novel" && (
        <Novel
          onNavigate={(p) => {
            if (p === "home") setPage("novel-intro");
            else navigate(p);
          }}
          startSlide={novelStartSlide}
        />
      )}
      {page === "cards-intro" && (
        <CardsIntro
          onNavigate={navigate}
          onStart={handleStartCards}
        />
      )}
      {page === "cards" && <Cards onNavigate={(p) => {
        if (p === "home") setPage("cards-intro");
        else navigate(p);
      }} />}
      {page === "profile" && <Profile onNavigate={navigate} />}
      {page === "achievements" && <Achievements onNavigate={navigate} />}
    </>
  );
}
