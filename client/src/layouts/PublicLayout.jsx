import { Outlet } from "react-router";
import { Header, Navigation } from "../components";

const PublicLayout = () => {
	return (
		<div className="flex justify-center">
			<div className="grid grid-cols-12 w-main">
				<Header className={"col-span-12"}></Header>
				<Navigation className={"col-span-12"}></Navigation>

				<Outlet />
			</div>
		</div>
	);
};

export default PublicLayout;
