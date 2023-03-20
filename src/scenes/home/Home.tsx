import MainCarousel from "./MainCarousel"
// import ShoppingList from "./ShoppingList"

import { useAppSelector } from "../../state/hooks"
import Item from "../../components/Item"

const Home = () => {
    const products = useAppSelector(state => state.productsSlice.items)
    console.log(products)

	return (<div>
        <MainCarousel />
        {/* <ShoppingList /> */}
        {products.map(item => (
            <Item key={item.id} item={item} width="100px"/>
        ))}
    </div>)
}

export default Home
