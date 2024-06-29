import NewsList from "../components/NewsList/NewsList";
import NewsId from "../components/NewsId/NewsId";


export const publicRoutes = [
    { path: "/item/:id", element: <NewsId />, exact: true },
    { path: "*", element: <NewsList />, exact: true },
  ];
