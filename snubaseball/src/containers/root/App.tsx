import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import RootLayout from "./RootLayout/RootLayout";
import Home from "containers/Home/Home";
import Archive from "containers/Archive/Archive";
import Sitemap from "containers/Sitemap/Sitemap";
import Ask from "containers/Ask/Ask";
import About from "containers/About/About";
import Schedule from "containers/Schedule/Schedule";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="archive" element={<Archive />} />
      <Route path="sitemap" element={<Sitemap />} />
      <Route path="ask" element={<Ask />} />
      <Route path="about" element={<About />} />
      <Route path="schedule/*" element={<Schedule />} />
      <Route path="portal" element={<Home />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
