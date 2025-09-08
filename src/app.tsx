import { Header } from "./header.tsx";
import { ImoList } from "./list.tsx";

function App() {
	return (
		<div className="max-w-3xl mx-auto grid gap-4 p-4">
			<Header />
			<ImoList />
		</div>
	);
}

export default App;
