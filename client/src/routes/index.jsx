import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import { PublicLayout } from "../layouts";
import { Homepage } from "../pages";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<PublicLayout />}>
			<Route index element={<Homepage />}></Route>
		</Route>
	)
);

export default router;
