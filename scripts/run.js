const main = async () => {
  const [chidam,randomPerson,randomPerson2] = await hre.ethers.getSigners(); //creating demo users 
    const shoppingFactory = await hre.ethers.getContractFactory("SastraShop"); //compiling the code
    const shoppingContract = await shoppingFactory.deploy();; //starting up the server
    await shoppingContract.deployed();
    await hre.ethers.provider.getBalance(shoppingContract.address).then((balance)=>{
      console.log("contract Balance :",hre.ethers.utils.formatEther(balance))
    })
    await hre.ethers.provider.getBalance(chidam.address).then((balance)=>{
      console.log("chidam Balance :",hre.ethers.utils.formatEther(balance))
    })
    await hre.ethers.provider.getBalance(randomPerson.address).then((balance)=>{
      console.log("random Balance :",hre.ethers.utils.formatEther(balance))
    })
    await shoppingContract.register(2,"watch","good")
    await shoppingContract.register(1,"chochlate","tastes bad")
    await hre.ethers.provider.getBalance(chidam.address).then((balance)=>{
      console.log("chidam Balance after registration :",hre.ethers.utils.formatEther(balance))
    })
    let totalProducts = await shoppingContract.listProducts()
    let price = await shoppingContract.connect(randomPerson).quotePrice(1)
    await hre.ethers.provider.getBalance(randomPerson.address).then((balance)=>{
      console.log("random Balance :",hre.ethers.utils.formatEther(balance))
    })
    let buyTxn = await shoppingContract.connect(randomPerson).buy(1, { value:price });
    await hre.ethers.provider.getBalance(randomPerson.address).then((balance)=>{
      console.log("randomoPerson Balance after buying :",hre.ethers.utils.formatEther(balance))
    })
    await buyTxn.wait(); // Wait for the transaction to be mined
    let delivTxn = await shoppingContract.connect(randomPerson).deleivered(1);
    await hre.ethers.provider.getBalance(chidam.address).then((balance)=>{
      console.log("chidam Balance after deliverying :",hre.ethers.utils.formatEther(balance))
    })
    await buyTxn.wait(); // Wait for the transaction to be mined
    // console.log({buyTxn})
    // console.log({delivTxn})
    totalProducts = await shoppingContract.listProducts()
    // console.log({totalProducts})
  };
  
  const runMain = async () => {
    try {
      await main();
    } catch (error) {
      console.log(error);
    }
  };
  
  runMain();













  // const delivTxn = await shoppingContract.connect(randomPerson).deleivered(1);
  // await delivTxn.wait();
  // console.log({delivTxn})