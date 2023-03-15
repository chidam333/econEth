const main = async () => {
  const [chidam,randomPerson,randomPerson2] = await hre.ethers.getSigners(); //creating demo users 
    const shoppingFactory = await hre.ethers.getContractFactory("SastraShop"); //compiling the code
    const shoppingContract = await shoppingFactory.deploy(); //starting up the server
    await shoppingContract.deployed();
    console.log("Contract deployed to:", shoppingContract.address);
    console.log("Contract deployed by:", chidam.address);
    await shoppingContract.getTotalProducts();
    const chidamregisterTxn = await shoppingContract.register();
    await chidamregisterTxn.wait();
    await shoppingContract.getTotalProducts();
    const randomregisterTxn = await shoppingContract.connect(randomPerson).register();
    await randomregisterTxn.wait();
    const randomregisterTxn2 = await shoppingContract.connect(randomPerson2).register();
    await randomregisterTxn2.wait();
    await shoppingContract.getTotalProducts();
  };
  
  const runMain = async () => {
    try {
      await main();
    } catch (error) {
      console.log(error);
    }
  };
  
  runMain();