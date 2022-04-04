import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { FirstAnchorProject } from "../target/types/first_anchor_project";

describe("first_anchor_project", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.FirstAnchorProject as Program<FirstAnchorProject>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log("Your transaction signature", tx);
  });
});
