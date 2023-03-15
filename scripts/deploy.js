const main = async () => {
      const [chidam] = await hre.ethers.getSigners();
      const balance = await chidam.getBalance();
      console.log(`my current ${balance} \n my acc. add. ${chidam.address}`)
      const shoppingFactory = await hre.ethers.getContractFactory("SastraShop"); //compiling the code
      const shoppingContract = await shoppingFactory.deploy(); //starting up the server
      await shoppingContract.deployed();
      console.log("Contract deployed to:", shoppingContract.address);
    };
    
    const runMain = async () => {
      try {
        await main();
      } catch (error) {
        console.log(error);
      }
      // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
    };
    
    runMain();