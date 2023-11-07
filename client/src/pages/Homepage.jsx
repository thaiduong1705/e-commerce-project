import { Slidebar, Slideshow } from "../components";
const Homepage = () => {
	return (
		<div className="col-span-12">
			<div className="flex gap-4 mb-8">
				<Slidebar className={"w-1/4"} />
				<Slideshow className={"w-3/4"} />
			</div>
			<div className="flex gap-4">
				<Slidebar className={"w-1/4"} />
				<Slideshow className={"w-3/4"} />
			</div>
		</div>
	);
};

export default Homepage;
