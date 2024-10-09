import WalletImg from "./assets/Products-Image/wallet.jpg"
import IphoneCableImg from "./assets/Products-Image/iphone-cable.jpg"
import bagImg from "./assets/Products-Image/bag.jpg"
import ringImg from "./assets/Products-Image/vintage-ring.jpg"
import smartwatchImg from "./assets/Products-Image/smartwatch.jpg"


export const ListOfProducts=[
    {
        id:1,
        name: "Wallet",
        price: 29.99,
        img: WalletImg,
        category: "accessories",
    },
    {
        id:2,
        name: "Bag",
        price: 69.99,
        img: bagImg,
        category: "accessories",

    },
    {
        id:3,
        name: "Iphone Cable",
        price: 5.99,
        img: IphoneCableImg,
        category: "electronics",

    },
    {
        id:4,
        name: "Vintage Ring",
        price: 14.99,
        img: ringImg,
        category: "jewelry",

    },
    {
        id:5,
        name: "Smartwatch",
        price: 199.99,
        img: smartwatchImg,
        category: "electronics",

    }
]