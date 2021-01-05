#!/usr/bin/python3

from brownie import Token, accounts, ERCToken


def main():
    return ERCToken.deploy({'from': accounts[0]})
