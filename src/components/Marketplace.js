import Navbar from "./Navbar";
import NFTTile from "./NFTTile";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";
import { GetIpfsUrlFromPinata } from "../utils";

export default function Marketplace() {
const sampleData = [
    {
        "name": "DEMO-CRAFT#1",
        "description": "Handmade Copper Finish Krishna",
        "website":"http://axieinfinity.io",
        "image":"https://orange-vocational-shark-633.mypinata.cloud/ipfs/Qmd7m7o5cwVxxi4V91FGoYcoMixvjZzrQVYBf9qVmty6ZA?_gl=1*131xj7*_ga*NTU2MzE3MDQ5LjE2ODkwODM1MzA.*_ga_5RMPXG14TE*MTY4OTU5MzI3NC43LjEuMTY4OTU5Mzc4NS40Mi4wLjA.",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0x2868167C72398863070a8461C137d08dAa0FB730",  
    },
    {
        "name": "DEMO-CRAFT#2",
        "description": "Devi Oil Painting",
        "website":"http://axieinfinity.io",
        "image":"https://orange-vocational-shark-633.mypinata.cloud/ipfs/QmVBFrSTNQnGRbVUB72WYf2aR7tqEarDkPZwmbBh91LRip?_gl=1*1r7uyno*_ga*NTU2MzE3MDQ5LjE2ODkwODM1MzA.*_ga_5RMPXG14TE*MTY4OTU5MzI3NC43LjEuMTY4OTU5Mzc4NS40Mi4wLjA.",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0x2868167C72398863070a8461C137d08dAa0FB730",
    },
    {
        "name": "DEMO-CRAFT#3",
        "description": "Clay Art",
        "website":"http://axieinfinity.io",
        "image":"https://orange-vocational-shark-633.mypinata.cloud/ipfs/QmPAcMhN7evwgZMTuey3G7mBMki1QV9XgGPVHoocYx8zzr?_gl=1*m33ee2*_ga*NTU2MzE3MDQ5LjE2ODkwODM1MzA.*_ga_5RMPXG14TE*MTY4OTU5MzI3NC43LjEuMTY4OTU5Mzc4NS40Mi4wLjA.",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0x2868167C72398863070a8461C137d08dAa0FB730",
    },

    {
        "name": "DEMO-CRAFT#4",
        "description": "Hand carved Wooden Elephant",
        "website":"http://axieinfinity.io",
        "image":"https://orange-vocational-shark-633.mypinata.cloud/ipfs/QmeZZ9M8NoDXyg1hrmQ8ZmWYdRcxYB6zPqx4ZMEzwhdpbn?_gl=1*hm7zpr*_ga*NTU2MzE3MDQ5LjE2ODkwODM1MzA.*_ga_5RMPXG14TE*MTY4OTU5MzI3NC43LjEuMTY4OTU5Mzc4NS40Mi4wLjA.",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0x2868167C72398863070a8461C137d08dAa0FB730",
    },

    {
        "name": "DEMO-CRAFT#5",
        "description": "Hand-painted Green Tara Shyamatara Mother Goddess Tibetan Thangka Painting",
        "website":"http://axieinfinity.io",
        "image":"https://orange-vocational-shark-633.mypinata.cloud/ipfs/QmdZpvFVvEn4DsYqnTwGPz7YPY69UxZrcNxdAeksb3C6Ep?_gl=1*1b6zl4b*_ga*NTU2MzE3MDQ5LjE2ODkwODM1MzA.*_ga_5RMPXG14TE*MTY4OTU5MzI3NC43LjEuMTY4OTU5Mzc4NS40Mi4wLjA.",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0x2868167C72398863070a8461C137d08dAa0FB730",
    },

    {
        "name": "DEMO-CRAFT#6",
        "description": "Tree of life wall decor painting",
        "website":"http://axieinfinity.io",
        "image":"https://orange-vocational-shark-633.mypinata.cloud/ipfs/Qmewn7stPaq9vxWAWEstSkY2UPA3pxdUuokpPXUt57xHBZ?_gl=1*1rfft1*_ga*NTU2MzE3MDQ5LjE2ODkwODM1MzA.*_ga_5RMPXG14TE*MTY4OTU5MzI3NC43LjEuMTY4OTU5Mzc4NS40Mi4wLjA.",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0x2868167C72398863070a8461C137d08dAa0FB730",
    },
];
const [data, updateData] = useState(sampleData);
const [dataFetched, updateFetched] = useState(false);

async function getAllNFTs() {
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)
    //create an NFT Token
    let transaction = await contract.getAllNFTs()

    //Fetch all the details of every NFT from the contract and display
    const items = await Promise.all(transaction.map(async i => {
        var tokenURI = await contract.tokenURI(i.tokenId);
        console.log("getting this tokenUri", tokenURI);
        tokenURI = GetIpfsUrlFromPinata(tokenURI);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.image,
            name: meta.name,
            //artisan: meta.artisan,
            //description: meta.description,
        }
        return item;
    }))

    updateFetched(true);
    updateData(items);
}

if(!dataFetched)
    getAllNFTs();

return (
    <div>
        <Navbar></Navbar>
        <div className="flex flex-col place-items-center mt-20">
            <div className="md:text-xl font-bold text-white">
                Top CRAFTs
            </div>
            <div className="flex mt-5 justify-between flex-wrap max-w-screen-xl text-center">
                {data.map((value, index) => {
                    return <NFTTile data={value} key={index}></NFTTile>;
                })}
            </div>
        </div>            
    </div>
);

}