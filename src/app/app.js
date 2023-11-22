
"use client"
import React, { Component } from 'react';
import Web3 from 'web3';
import SupplyChain from '../build/SupplyChain.json';
import SelectRole from '@/components/Home/SelectRole';
import Loader from '@/components/Loader/Loader';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



class App extends Component {
  constructor() {
    super();
    this.state = {
      'account': null,
      'supplyChain': null,
      'identicon': null,
      'loading': true,
      'web3': null,
    }
  }
  async componentWillMount() {
    this.loadWeb3()
    this.loadBlockChain()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }


  handleInputChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  async loadBlockChain() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);

    this.setState({ 'account': accounts[0] });
    const networkId = await web3.eth.net.getId();
    const networkData = SupplyChain.networks[networkId];
    if (networkData) {
      const supplyChain = new web3.eth.Contract(SupplyChain.abi, networkData.address);
      this.setState(
        {
          'supplyChain': supplyChain,
          'loading': false,
          'web3': web3
        }
      );
      console.log(this.state.supplyChain);

    } else {
      window.alert('Supply chain contract not deployed to detected network.');
    }
  }

  render(){

    if (this.state.loading === false) {
      return (
        <Router>
          <Switch>
            <Route  exact path="/" component={SelectRole}/>
          </Switch>
  
        </Router>
  
      );
    }
    else {
      return (
        <Loader />
      );
    }
  }


};

export default App;



