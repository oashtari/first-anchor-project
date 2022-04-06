use anchor_lang::prelude::*;

declare_id!("Fbus3DQgvzSNmjqu2qQvgqgJyYh3afXAmJwp6N3uuUpW");

#[program]
pub mod initiate_task {
    use super::*;
    pub fn create(ctx: Context<Create>, name: String, task: String) -> Result<()> {
        let task_account = &mut ctx.accounts.task_account;
        // let task = &mut ctx.accounts.task;

        task_account.name = name;
        task_account.task = task;

        msg!("GM {}, your new task is {}", task_account.name, task_account.task);
        Ok(())

    }
}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer = user, space = 8 +32 )]
    pub task_account: Account<'info, TaskAccount>,
    // #[account(init, payer=user, space = 8 + 32)]
    // pub task_itself: Account<'info, TaskItself>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct TaskAccount {
    pub name: String,
    pub task: String
}

// #[account]
// pub struct TaskItself {
//     pub task: String,
// }


// #[program]
// pub mod first_anchor_project {
//     use super::*;

//     pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
//         Ok(())
//     }
// }

// #[derive(Accounts)]
// pub struct Initialize {}
