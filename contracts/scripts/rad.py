#!/usr/bin/python3

from brownie import accounts, ERCToken, DynPoolFactory


def main():
    ERCToken.deploy({'from': accounts[0]})
    DynPoolFactory.deploy({"from": accounts[0]})
    # token.increaseAllowance(dyn_pool_factory, IBCO_token_amount, {"from": accounts[0]})
    # tx = dyn_pool_factory.deployIBCO(token, IBCO_token_amount, chain.time() + 10, chain.time() + IBCO_time, minimal_provide,
    #                                  {"from": accounts[0], "value": Wei(value_sent)})
    # dyn_owners_contract = IBCOTemplate.at(tx.events['IBCODeployed']['addr'])
