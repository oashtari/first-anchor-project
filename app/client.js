const anchor = require("@project-serum/anchor");
const provider = anchor.Provider.local();
// Configure the cluster.
anchor.setProvider(provider);
const args = require('minimist')(process.argv.slice(2));

async function main() {
 // Read the generated IDL.
 const idl = JSON.parse(
   require("fs").readFileSync("../target/idl/initiate_task.json", "utf8")
 );

 // Address of the deployed program.
 const programId = new anchor.web3.PublicKey(args['program']);
 const name = args['name'] || "Glass Chewer";
 const task = args['task'] || "you gotta have something you wann do, no?";

 // Generate the program client from IDL.
 const program = new anchor.Program(idl, programId);

 //create an account to store the GM name
 const taskAccount = anchor.web3.Keypair.generate();
 console.log("TASK ACCOUNT", taskAccount);

 console.log('Task account public key: ' + taskAccount.publicKey);
 console.log('user public key: ' + provider.wallet.publicKey);

 // create the RPC.
 let tx = await program.rpc.create(name,task,{
   accounts: {
     taskAccount: taskAccount.publicKey,
     user: provider.wallet.publicKey,
     systemProgram: anchor.web3.SystemProgram.programId
   },
   options: { commitment: "confirmed" },
   signers: [taskAccount],
 });

 console.log("Fetching transaction logs...");
 let t = await provider.connection.getConfirmedTransaction(tx, "confirmed");
 console.log(t.meta.logMessages);
 // #endregion main

 // Fetch the account details of the account containing the price data
 const storedName = await program.account.taskAccount.fetch(taskAccount.publicKey);
 console.log('Stored GM Name Is: ' + storedName.name + 'and your task is:' + storedName.task)
}

console.log("Running client...");
main().then(() => console.log("Success"));