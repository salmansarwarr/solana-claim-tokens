use anchor_lang::prelude::*;
use anchor_spl::token::{ self, Token, Transfer };

declare_id!("2bZGfFgJcEfkXNJjuvsTPcTafFxC8Wnnh9HkPJ9bKasX");

#[program]
pub mod meth {
    use super::*;

    pub fn initialize_meth(
        ctx: Context<InitializeMeth>,
        total_tokens: u64,
        bump: u8
    ) -> Result<()> {
        let meth = &mut ctx.accounts.meth;
        meth.admin = ctx.accounts.admin.key();
        meth.total_tokens = total_tokens;
        meth.claimed_tokens = 0;
        meth.bump = bump;
        Ok(())
    }

    pub fn claim(ctx: Context<Claim>, amount: u64) -> Result<()> {
        let user = ctx.accounts.user.key();
        let meth = &mut ctx.accounts.meth;

        // Check if total claimed tokens would exceed total tokens
        require!(
            meth.claimed_tokens.checked_add(amount).ok_or(CustomError::Overflow)? <=
                meth.total_tokens,
            CustomError::InsufficientFunds
        );

        // Find recipient entry or create a new one
        let recipient_index = meth.recipients.iter().position(|rec| rec.recipient == user);

        match recipient_index {
            Some(index) => {
                meth.recipients[index].amount = amount;
            }
            None => {
                meth.recipients.push(Recipient {
                    recipient: user,
                    amount,
                });
            }
        }

        // Update total claimed tokens
        meth.claimed_tokens = meth.claimed_tokens.checked_add(amount).unwrap();

        let seeds = &[b"meth".as_ref(), &[meth.bump]];
        let signer_seeds = &[&seeds[..]];

        // Transfer tokens
        token::transfer(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.vault.to_account_info(),
                    to: ctx.accounts.user_token_account.to_account_info(),
                    authority: ctx.accounts.meth.to_account_info(),
                },
                signer_seeds
            ),
            amount
        )?;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeMeth<'info> {
    #[account(init, payer = admin, space = 8 + Meth::SIZE, seeds = [b"meth".as_ref()], bump)]
    pub meth: Account<'info, Meth>,
    #[account(mut)]
    pub admin: Signer<'info>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct Claim<'info> {
    #[account(mut)]
    pub meth: Account<'info, Meth>,
    /// CHECK: This is a token account, not an Anchor account, so it uses AccountInfo
    #[account(mut)]
    pub vault: AccountInfo<'info>,
    /// CHECK: This is a token account, not an Anchor account, so it uses AccountInfo
    #[account(mut)]
    pub user_token_account: AccountInfo<'info>,

    #[account(mut)]
    pub user: Signer<'info>,
    pub token_program: Program<'info, Token>,
}

#[account]
pub struct Meth {
    pub admin: Pubkey,
    pub total_tokens: u64,
    pub claimed_tokens: u64,
    pub recipients: Vec<Recipient>,
    pub bump: u8,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Recipient {
    pub recipient: Pubkey,
    pub amount: u64,
}

impl Meth {
    pub const SIZE: usize =
        32 + // admin: Pubkey
        8 + // total_tokens: u64
        8 + // claimed_tokens: u64
        4 +
        (32 + 8) * 100 + // allocations: Vec<(Pubkey, u64)>, assume 100 entries max
        1; // bump: u8
}

#[error_code]
pub enum CustomError {
    #[msg("Overflow")]
    Overflow,
    #[msg("Insufficient funds")]
    InsufficientFunds,
}
