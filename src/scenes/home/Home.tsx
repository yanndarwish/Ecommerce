import { useAppSelector } from "../../state/hooks"

const Home = () => {
    const products = useAppSelector(state => state.productsSlice.items)
    console.log(products)

	return <div>Home</div>
}

export default Home
