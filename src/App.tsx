import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import GamesLibrary from "./pages/GamesLibrary";
import GradesOverview from "./pages/GradesOverview";
import GradePage from "./pages/GradePage";
import TopicsOverview from "./pages/TopicsOverview";
import TopicPage from "./pages/TopicPage";
import GameLaunch from "./pages/GameLaunch";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="games" element={<GamesLibrary />} />
          <Route path="games/:gameId" element={<GameLaunch />} />
          <Route path="grades" element={<GradesOverview />} />
          <Route path="grade/:grade" element={<GradePage />} />
          <Route path="topics" element={<TopicsOverview />} />
          <Route path="topic/:topicSlug" element={<TopicPage />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
