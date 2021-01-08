from settings import *
import brownie


def test_provide_erc_to_ibco_contract(alt_token, dyn_alt_owners_contract):
    assert alt_token.balanceOf(dyn_alt_owners_contract) == IBCO_token_amount


def test_owner_ibco_contract(alt_token, dyn_alt_owners_contract, accounts):
    assert dyn_alt_owners_contract.owner() == accounts[account_main]


def test_reverts_withdraw_erc_before_start(alt_token, dyn_alt_owners_contract, accounts):
    with brownie.reverts():
        dyn_alt_owners_contract.withdrawToken({"from": accounts[account_main]})

def test_reverts_receive_ETH_before_start(alt_token, dyn_alt_owners_contract, accounts):
    with brownie.reverts():
        accounts[account_alt].transfer(dyn_alt_owners_contract, eth_to_transfer)