#!/usr/bin/python3

import pytest
from settings import *
from brownie import accounts, web3, Wei, chain, Contract
from brownie.network.transaction import TransactionReceipt
from brownie.convert import to_address


@pytest.fixture(scope="function", autouse=True)
def isolate(fn_isolation):
    # perform a chain rewind after completing each test, to ensure proper isolation
    # https://eth-brownie.readthedocs.io/en/v1.10.3/tests-pytest-intro.html#isolation-fixtures
    pass


@pytest.fixture(scope="module")
def token(ERCToken, accounts):
    # deploys 1 million tokens
    return ERCToken.deploy({'from': accounts[0]})


@pytest.fixture(scope="module")
def alt_token(ERCToken, accounts):
    # deploys 1 million tokens
    return ERCToken.deploy({'from': accounts[1]})

# ===============================

# DynPoolFactory

# ===============================
# deploy a token factory
@pytest.fixture(scope="module", autouse=True)
def dyn_pool_factory(DynPoolFactory):
    dyn_pool_factory = DynPoolFactory.deploy({"from": accounts[0]})
    return dyn_pool_factory

# deploy a dynamic pool contract from the factory that is owned by the factory owner
@pytest.fixture(scope="module", autouse=True)
def dyn_owners_contract(dyn_pool_factory, token, IBCOTemplate):
    token.increaseAllowance(dyn_pool_factory, IBCO_token_amount, {"from": accounts[0]})
    tx = dyn_pool_factory.deployIBCO(token, IBCO_token_amount, chain.time() + 10, chain.time() + IBCO_time, minimal_provide,
                                     {"from": accounts[0], "value": Wei(value_sent)})
    dyn_owners_contract = IBCOTemplate.at(tx.events['IBCODeployed']['addr'])
    return dyn_owners_contract

# deploy a dynamic pool contract from the factory that is not owned by the factory owner
@pytest.fixture(scope="module", autouse=True)
def dyn_alt_owners_contract(dyn_pool_factory, alt_token, IBCOTemplate):
    alt_token.increaseAllowance(dyn_pool_factory, IBCO_token_amount, {"from": accounts[1]})
    tx = dyn_pool_factory.deployIBCO(alt_token, IBCO_token_amount, chain.time() + 10, chain.time() + IBCO_time, minimal_provide,
                                     {"from": accounts[1], "value": Wei(value_sent)})
    dyn_alt_owners_contract = IBCOTemplate.at(tx.events['IBCODeployed']['addr'])
    return dyn_alt_owners_contract
