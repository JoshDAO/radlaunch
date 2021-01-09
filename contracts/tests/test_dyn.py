from settings import *
import brownie
from datetime import datetime


def test_factory_number_auctions(dyn_pool_factory, accounts):
    assert dyn_pool_factory.numberOfProducts({'from': accounts[factory_owner]}) == 2


def test_factory_set_minimum_fee(dyn_pool_factory, accounts):
    assert dyn_pool_factory.minimumFee({'from': accounts[0]}) == 1e17
    tx = dyn_pool_factory.setMinimumFee(new_fee_amount, {'from': accounts[factory_owner]})
    assert 'MinimumFeeUpdated' in tx.events
    with brownie.reverts():
        dyn_pool_factory.setMinimumFee(0, {'from': accounts[account_alt]})
    assert dyn_pool_factory.minimumFee({'from': accounts[factory_owner]}) == new_fee_amount


def test_deprecate_factory_not_owner(dyn_pool_factory, accounts):
    with brownie.reverts():
        dyn_pool_factory.deprecateFactory(dyn_pool_factory, {'from': accounts[account_alt]})


def test_provide_erc_to_ibco_contract(alt_token, dyn_alt_owners_contract):
    assert alt_token.balanceOf(dyn_alt_owners_contract) == IBCO_token_amount


def test_owner_ibco_contract(alt_token, dyn_alt_owners_contract, accounts):
    assert dyn_alt_owners_contract.owner() == accounts[account_main]


def test_reverts_withdraw_erc_before_start(alt_token, dyn_alt_owners_contract, accounts):
    with brownie.reverts():
        dyn_alt_owners_contract.withdrawToken({"from": accounts[account_main]})


def test_reverts_receive_eth_before_offering(alt_token, dyn_alt_owners_contract, accounts):
    with brownie.reverts():
        accounts[account_alt].transfer(dyn_alt_owners_contract, eth_to_transfer)


def test_receive_eth_during_offering(alt_token, dyn_alt_owners_contract, accounts):
    start = dyn_alt_owners_contract.START({'from':accounts[factory_owner]})
    end = dyn_alt_owners_contract.END({'from': accounts[factory_owner]})
    start_delta = start - datetime.now().timestamp() + 1
    # divide the times into number of investors for tests
    delta = int((end - start)/number_of_investors)
    brownie.chain.sleep(start_delta)
    # loop through and allow the investors to invest
    for n in range(number_of_investors):
        tx = accounts[n].transfer(dyn_alt_owners_contract, investment_enough)
        assert 'Received' in tx.events
        brownie.chain.sleep(delta)
        assert dyn_alt_owners_contract.provided(accounts[n]) > 0
    assert dyn_alt_owners_contract.totalProvided() == investment_enough * number_of_investors


def test_reverts_receive_eth_after_offering(alt_token, dyn_alt_owners_contract, accounts):
    end = dyn_alt_owners_contract.END({'from': accounts[factory_owner]})
    delta = end - datetime.now().timestamp()
    brownie.chain.sleep(delta + 86400)
    with brownie.reverts():
        accounts[account_alt].transfer(dyn_alt_owners_contract, eth_to_transfer)


def test_claim_erc_after_offering_enough_provided(alt_token, dyn_alt_owners_contract, accounts):
    start = dyn_alt_owners_contract.START({'from':accounts[factory_owner]})
    end = dyn_alt_owners_contract.END({'from': accounts[factory_owner]})
    owners_eth_balance = accounts[account_main].balance()
    start_delta = start - datetime.now().timestamp() + 1
    # divide the times into number of investors for tests
    delta = int((end - start)/number_of_investors)
    brownie.chain.sleep(start_delta)
    for n in range(number_of_investors):
        tx = accounts[n+2].transfer(dyn_alt_owners_contract, investment_enough)
        assert 'Received' in tx.events
        brownie.chain.sleep(delta)
        assert dyn_alt_owners_contract.provided(accounts[n+2]) > 0
    brownie.chain.sleep(delta*4)
    with brownie.reverts():
        dyn_alt_owners_contract.withdrawProvidedETH({'from': accounts[factory_owner]})
    for n in range(number_of_investors):
        tx = dyn_alt_owners_contract.claim({'from': accounts[n+2]})
        assert 'Claimed' in tx.events
        brownie.chain.sleep(delta)
        assert dyn_alt_owners_contract.provided(accounts[n+2]) == 0
        assert alt_token.balanceOf(accounts[n+2]) == (investment_enough/(investment_enough * number_of_investors))*IBCO_token_amount
    dyn_alt_owners_contract.withdrawProvidedETH({'from': accounts[account_main]})
    assert dyn_alt_owners_contract.balance() == 0
    assert accounts[account_main].balance() == owners_eth_balance + (number_of_investors * investment_enough)
    with brownie.reverts():
        dyn_alt_owners_contract.withdrawToken({'from': accounts[account_main]})


def test_claim_eth_after_offering_not_enough_provided(alt_token, dyn_alt_owners_contract, accounts):
    start = dyn_alt_owners_contract.START({'from':accounts[factory_owner]})
    end = dyn_alt_owners_contract.END({'from': accounts[factory_owner]})
    owners_eth_balance = accounts[account_main].balance()
    start_delta = start - datetime.now().timestamp() + 1
    # divide the times into number of investors for tests
    delta = int((end - start)/number_of_investors)
    brownie.chain.sleep(start_delta)
    # send money in
    for n in range(number_of_investors):
        tx = accounts[n+2].transfer(dyn_alt_owners_contract, investment_not_enough)
        assert 'Received' in tx.events
        brownie.chain.sleep(delta)
        assert dyn_alt_owners_contract.provided(accounts[n+2]) > 0
    brownie.chain.sleep(delta*4)
    with brownie.reverts():
        dyn_alt_owners_contract.withdrawToken({'from': accounts[factory_owner]})
    # claim money
    for n in range(number_of_investors):
        tx = dyn_alt_owners_contract.claim({'from': accounts[n+2]})
        assert 'Claimed' in tx.events
        brownie.chain.sleep(delta)
        assert dyn_alt_owners_contract.provided(accounts[n+2]) == 0
        assert alt_token.balanceOf(accounts[n+2]) == 0
        assert accounts[n+2].balance() == 100e18
    dyn_alt_owners_contract.withdrawToken({'from': accounts[account_main]})
    assert dyn_alt_owners_contract.balance() == 0
    assert accounts[account_main].balance() == owners_eth_balance
    assert alt_token.balanceOf(accounts[account_main]) == 1000000e18
    with brownie.reverts():
        dyn_alt_owners_contract.withdrawProvidedETH({'from': accounts[account_main]})


def test_only_withdraw_unclaimed_erc_after_30_days(alt_token, dyn_alt_owners_contract, accounts):
    end = dyn_alt_owners_contract.END({'from': accounts[factory_owner]})
    delta = end - datetime.now().timestamp()
    brownie.chain.sleep(delta + 86400)
    # not past 30 days
    with brownie.reverts():
        dyn_alt_owners_contract.withdrawUnclaimedToken({'from': accounts[account_main]})
    # not owner
    with brownie.reverts():
        dyn_alt_owners_contract.withdrawUnclaimedToken({'from': accounts[factory_owner]})
    # unix for 31 days
    brownie.chain.sleep(30 * 24 * 3600)
    # check balance before
    assert alt_token.balanceOf(accounts[account_main]) == ERC_token_amount - IBCO_token_amount
    with brownie.reverts():
        dyn_alt_owners_contract.withdrawUnclaimedToken({'from': accounts[factory_owner]})
    dyn_alt_owners_contract.withdrawUnclaimedToken({'from': accounts[account_main]})
    # check balance is transferred
    assert alt_token.balanceOf(dyn_alt_owners_contract) == 0
    assert alt_token.balanceOf(accounts[account_main]) == ERC_token_amount


def test_ownership_another_offering(dyn_owners_contract, accounts):
    assert dyn_owners_contract.owner() == accounts[factory_owner]
