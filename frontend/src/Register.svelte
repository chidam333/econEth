<script lang="ts">
    import { ethers } from "ethers";
    import { onMount } from "svelte";
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    import abi from "./utils/SastraShop.json";
    export let userid:string;
    export let contractAddress:string;
    let contractABI,allitems=[];
    let [name,rate,desc]=["",0,""]
    onMount(()=>{
        contractABI = abi.abi;
        allitem()
    })
    const register = async()=>{
    	let ethereum = window.ethereum;
        if(ethereum){
                const provider = new ethers.BrowserProvider(window.ethereum)
                const signer = await provider.getSigner();
                const shoppingContract = new ethers.Contract(contractAddress, contractABI, signer)
                console.log(shoppingContract)
                const registerTxn = await shoppingContract.register(rate,name,desc);
                console.log({mining:registerTxn.hash})
                await registerTxn.wait()
                console.log({mined:registerTxn.hash})
                dispatch('rerender',{text:"rerender"})
                allitem()
            }
    }
    const allitem = async()=>{
        let ethereum = window.ethereum;
        if(ethereum){
                const provider = new ethers.BrowserProvider(window.ethereum)
                const signer = await provider.getSigner();
                const shoppingContract = new ethers.Contract(contractAddress, contractABI, signer)
                console.log(shoppingContract)
                const everything = await shoppingContract.listProducts();
                allitems = [...everything]
                console.log({allitems})
        }
    }
    const buy = async(id:Number)=>{
        let ethereum = window.ethereum;
        if(ethereum){
                const provider = new ethers.BrowserProvider(window.ethereum)
                const signer = await provider.getSigner();
                const shoppingContract = new ethers.Contract(contractAddress, contractABI, signer)
                let price = await shoppingContract.quotePrice(id)
                let buyTx= await shoppingContract.buy(id,{value:price})
                buyTx.wait()
                console.log({buyTx})
                let deliverTx = await shoppingContract.deleivered(id)
                deliverTx.wait()
                console.log({deliverTx})
        }
    }

</script>
<main>
    <form class="contain h-64 w-80 border-2 border-black mt-20 ml-4 pt-6 pl-2 mb-6" >
        <label for="name" class="font-mono">name : </label>
        <input type="text" id="name" class="border-2 border-black mb-2" bind:value={name} required>
        <br/>
        <label for="rate" class="font-mono">cost : </label>
        <input type="text" id="rate" class="border-2 border-black mb-2" bind:value={rate} required>
        <br/>
        <label for="desc" class="font-mono">desc : </label>
        <input type="text" id="desc" class="border-2 border-black mb-4" bind:value={desc} required>
        <div class="buttondiv w-full grid justify-center">
            <button class="bg-black text-amber-200 font-semibold px-4 py-1" on:click|preventDefault={register}>Register Item !</button>
        </div>
    </form>
    <div class="allitems">
        {#each allitems as item,i}
        {#if !item[6]}
            <div class="bg-amber-400 h-10 mb-2 border-2 border-amber-900 flex px-10 py-2 gap-6 relative">
                <div class="name">{item[4]}</div>
                <div class="desc">{item[5]}</div>
                <div class="name mr-10">{Number(item[3])/10000000000000000}</div>
                <div class="absolute right-2 bg-amber-900 text-amber-100 px-2 cursor-pointer" on:click={()=>{buy(i+1)}}>buy!</div>
            </div>
        {/if}
        {/each}
    </div>
</main>
<style>

</style>