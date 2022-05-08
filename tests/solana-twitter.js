import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolanaTwitter } from "../target/types/solana_twitter";
import * as assert from "assert";
import * as bs58 from "bs58";

describe("solana-twitter", () => {
  const provider = anchor.AnchorProvider.local();

  // Configure the client to use the local cluster.
  anchor.setProvider(provider);
  const program = anchor.workspace.SolanaTwitter as Program<SolanaTwitter>;

  it("can send a new tweet", async () => {
    // Call the "SendTweet" instruction.
    const tweet = anchor.web3.Keypair.generate();

    program.state.rpc.sendTweet("veganism", "Hummus, am I right?", {
      accounts: {
        tweet: tweet.publicKey,
        author: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [tweet],
    });

    // Fetch the account details of the created tweet.
    const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);
    console.log(">>tweet account from blockchain", tweetAccount);

    // Ensure it has the right data.
    assert.equal(tweetAccount.author.toBase58(), program.provider.wallet.publicKey.toBase58());
    assert.equal(tweetAccount.topic, 'veganism');
    assert.equal(tweetAccount.content, 'Hummus, am I right?');
    assert.ok(tweetAccount.timestamp);

  });

    //unHAPPY path
    //WE CAN DO SMAE FOR CHECKING TOPIC
    it('cannot provide a content with more than 280 characters', async () => {
      try {
          const tweet = anchor.web3.Keypair.generate();
        const contentWith281Chars = 'x'.repeat(281);
        program.state.rpc.sendTweet('veganism', contentWith281Chars, {
            accounts: {
              tweet: tweet.publicKey,
            author: program.provider.wallet.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId,
            
          signers: [tweet],
          
    } catch (error) {
          assert.equal(error.msg, 'The provided content should be 280 characters long maximum.');
        return;
    }
      
    assert.fail('The instruction should have failed with a 281-character content.');
      
    
  //   it("can send a new tweet without a topic", async () => {
    //     // Execute the "SendTweet" instruction.
    //     const tweet = anchor.web3.Keypair.generate();
           await program.rpc.sendTweet("", "gm", {
  //       accounts: {
  //         tweet: tweet.publicKey,
  //         author: program.provider.wallet.publicKey,
           systemProgram: anchor.web3.SystemProgram.programId,
            
            rs: [tweet],
            
          
          Fetch the account details of the created tweet.
  //     const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);
      
  //     // Ensure it has the right data.
  //     assert.equal(
             tweetAccount.author.toBase58(),
  //       program.provider.wallet.publicKey.toBase58()
           );
      /    assert.equal(tweetAccount.topic, "");
    //     assert.equal(tweetAccount.content, "gm");
  //     assert.ok(tweetAccount.timestamp);
  //   });

  //   it("can send a new tweet from a different author", async () => {
  //     // Generate another user and airdrop them some SOL.
  //     const otherUser = anchor.web3.Keypair.generate();
  //     const signature = await program.provider.connection.requestAirdrop(
  //       otherUser.publicKey,
  //       1000000000
  //     );
  //     await program.provider.connection.confirmTransaction(signature);

  //     // Execute the "SendTweet" instruction on behalf of this other user.
  //     const tweet = anchor.web3.Keypair.generate();
  //     await program.rpc.sendTweet("veganism", "Yay Tofu!", {
  //       accounts: {
  //         tweet: tweet.publicKey,
  //         author: otherUser.publicKey,
  //         systemProgram: anchor.web3.SystemProgram.programId,
  //       },
  //       signers: [otherUser, tweet],
  //     });

  //     // Fetch the account details of the created tweet.
  //     const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);

  //     // Ensure it has the right data.
  //     assert.equal(
  //       tweetAccount.author.toBase58(),
  //       otherUser.publicKey.toBase58()
  //     );
  //     assert.equal(tweetAccount.topic, "veganism");
  //     assert.equal(tweetAccount.content, "Yay Tofu!");
  //     assert.ok(tweetAccount.timestamp);
  //   });

  //   it("can fetch all tweets", async () => {
  //     const tweetAccounts = await program.account.tweet.all();
  //     assert.equal(tweetAccounts.length, 3);
  //   });

  //   it("can filter tweets by author", async () => {
  //     const tweetAccounts = await program.account.tweet.all([
  //       {
  //         memcmp: {
  //           offset: 8, // Discriminator.
  //           bytes: program.provider.wallet.publicKey.toBase58(),
  //         },
  //       },
  //     ]);

  //     const expectedAuthor = program.provider.wallet.publicKey.toBase58();
  //     assert.equal(tweetAccounts.length, 2);
  //     assert.ok(
  //       tweetAccounts.every((tweetAccount) => {
  //         return tweetAccount.account.author.toBase58() === expectedAuthor;
  //       })
  //     );
  //   });

  //   it("can filter tweets by topics", async () => {
  //     const tweetAccounts = await program.account.tweet.all([
  //       {
  //         memcmp: {
  //           offset:
  //             8 + // Discriminator.
  //             32 + // Author public key.
  //             4 + // Topic string length.
  //             8, // Timestamp length.
  //           bytes: bs58.encode(Buffer.from("veganism")),
  //         },
  //       },
  //     ]);

  //     assert.equal(tweetAccounts.length, 2);
  //     assert.ok(
  //       tweetAccounts.every((tweetAccount) => {
  //         return tweetAccount.account.topic === "veganism";
  //       })
  //     );
  //   });

  //fetch 3 tweets
  // it('can fetch all tweets', async () => {
  //   const tweetAccounts = await program.account.tweet.all();
  //   assert.equal(tweetAccounts.length, 3);
  // })

  it('can filter tweets by author', async () => {
    const authorPublicKey = program.provider.wallet.publicKey
    const tweetAccounts = await program.account.tweet.all([
        {
            memcmp: {
                offset: 8, // Discriminator.
                bytes: authorPublicKey.toBase58(),
            }
        }
    ]);

    assert.equal(tweetAccounts.length, 2);
    assert.ok(tweetAccounts.every(tweetAccount => {
        return tweetAccount.account.author.toBase58() === authorPublicKey.toBase58()
    }))
});

});
