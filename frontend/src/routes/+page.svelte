<script>
    import {onMount} from "svelte"
  	import Navbar from "../Navbar.svelte";
    console.log("wow");
    let noWallet = true;
	let userid;
	let connected = false;
	const contractAddress = "0xDF8b66BD5a144cFb980DcD0A6679bA651bD8A0A5"
    onMount(() => {
    	let {ethereum} = window;
        console.log(ethereum)
        if(!ethereum){
            noWallet=true;
        }else{
		  	noWallet=false

      }
    });
	const connect = async()=>{
		let accounts = await ethereum.request({ method: "eth_requestAccounts", });
		console.log("\n","The user pub. account ",accounts[0])
		userid = accounts[0]
		connected=true
	}
  </script>
  <main>
	{#if !connected}
		{#if noWallet}
			<div class="viewPort w-[100vw] h-[100vh] grid bg-red-800 place-items-center">
				<button class="appearance-none connect bg-indigo-200 font-bold px-4 py-2">Do the <a class="text-violet-900 underline" target="_blank" href="https://metamask.io/download/">metamask</a> setup</button>
			</div>    
		{:else}
			<div class="viewPort w-[100vw] h-[100vh] grid bg-green-800 place-items-center" on:click={connect}>
				<button class="appearance-none connect bg-amber-200 font-bold px-4 py-2">Connect</button>
			</div>
		{/if}
	{:else}
		<Navbar {userid}{contractAddress}/>
	{/if}
  </main>
  <style>
  </style>
  