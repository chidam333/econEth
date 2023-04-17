<script lang='ts'>
    import { ethers } from "ethers";
    import { onMount } from "svelte";
    import abi from "./utils/SastraShop.json";
    export let userid:string;
    export let contractAddress:string;
    let totalProduct = 0;
    onMount(()=>{
        const contractABI = abi.abi;
        getTotalProducts(contractABI);
    })
    const getTotalProducts = async(contractABI)=>{
    	let ethereum = window.ethereum;
        if(ethereum){
                const provider = new ethers.BrowserProvider(window.ethereum)
                const signer = await provider.getSigner();
                const shoppingContract = new ethers.Contract(contractAddress, contractABI, signer)
                console.log(shoppingContract)
                $: totalProduct=0;
                const everything = await shoppingContract.listProducts();
                for(const item of everything){
                    if(!item[6]){
                        totalProduct+=1
                    }
                }
            }
    }
</script>
<main>
    <nav>
        <div class="h-16 flex bg-black">
            <div class="heading text-amber-300 font-bold m-auto pl-4">Sastra shopping</div>
        </div>
        <div class="total-products text-gray-500 absolute top-24 right-16">
            total-products : {totalProduct}
        </div>
    </nav>
</main>
<style>

</style>