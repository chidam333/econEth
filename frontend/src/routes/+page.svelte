<script>
    import {onMount} from "svelte"
  	import Navbar from "../Navbar.svelte";
  	import Register from "../Register.svelte";
	let val = 0;
    console.log("wow");
    let noWallet = true;
	let userid;
	let connected = false;
	const contractAddress = "0x8035762D77dD81872bf51315E6c1aCe74b69eb5F"
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
	const render=()=>{
		val = (val==0) ? 1 : 0;
		console.log({val})
	}
  </script>
  <main>
	{#if !connected}
		{#if noWallet}
			<div class="viewPort w-[100vw] h-[100vh] grid bg-red-800 place-items-center">
				<button class="appearance-none connect bg-indigo-200 font-bold px-4 py-2">Do the <a class="text-violet-900 underline" target="_blank" href="https://metamask.io/download/">metamask</a> setup</button>
			</div>    
		{:else}
			<div class="viewPort w-[100vw] h-[100vh] grid bg-green-800 place-items-center" on:click={connect} on:keydown={()=>{}}>
				<button class="appearance-none connect bg-amber-200 font-bold px-4 py-2">Connect</button>
			</div>
		{/if}
	{:else}
		{#key val}
			<Navbar {userid}{contractAddress}/>
		{/key}
		<div class="mid grid justify-center">
			<Register {userid}{contractAddress} on:rerender={render}/>
		</div>
	{/if}
  </main>
  <style>
  </style>
  