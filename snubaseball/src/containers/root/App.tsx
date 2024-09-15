import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import RootLayout from "./RootLayout/RootLayout";
import Home from "../Home/Home";
import Archive from "../Archive/Archive";
import Sitemap from "../Sitemap/Sitemap";
import Ask from "../Ask/Ask";
import About from "../About/About";
import Schedule from "../Schedule/Schedule";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="archive" element={<Archive />} />
      <Route path="sitemap" element={<Sitemap />} />
      <Route path="ask" element={<Ask />} />
      <Route path="about/*" element={<About />} />
      <Route path="schedule/*" element={<Schedule />} />
      <Route path="portal" element={<Home />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
