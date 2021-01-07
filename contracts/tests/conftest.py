#!/usr/bin/python3

import pytest
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
def dyn_owners_contract(DynPoolFactory):
    token.increaseAllowance(dyn_pool_factory, 20e18, {"from": accounts[0]})
    tx = dyn_pool_factory.initIBCO(token, 20e18, chain.time() + 10, chain.time() + 1000, 1e18,
                                     {"from": accounts[0], "value": Wei(1e17)})
    dyn_owners_contract = IBCOTemplate.at(tx.events['IBCODeployed']['addr'])
    assert dyn_non_owners_contract.owner() == accounts[0]
    return dyn_owners_contract

# deploy a dynamic pool contract from the factory that is not owned by the factory owner
@pytest.fixture(scope="module", autouse=True)
def dyn_non_owners_contract(DynPoolFactory):
    alt_token.increaseAllowance(dyn_pool_factory, 20e18, {"from": accounts[1]})
    tx = dyn_pool_factory.initIBCO(alt_token, 20e18, chain.time() + 10, chain.time() + 1000, 1e18,
                                     {"from": accounts[1], "value": Wei(1e17)})
    dyn_non_owners_contract = IBCOTemplate.at(tx.events['IBCODeployed']['addr'])
    assert dyn_non_owners_contract.owner() == accounts[1]
    return dyn_non_owners_contract
