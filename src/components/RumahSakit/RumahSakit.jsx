import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import useBlockchain from '@/utils/useBlockchain';


import {
  Alert,
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grow,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Check, Create, Delete as DeleteIcon, KeyboardArrowDown as KeyboardArrowDownIcon, KeyboardArrowUp as KeyboardArrowUpIcon, Visibility } from '@mui/icons-material';
import Draggable from 'react-draggable';

import Transactions from '../../build/Transactions.json';
import RawAlkes from '../../build/RawAlkes.json';
import Link from 'next/link';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import ModalDetailAlkes from '../Data/ModalDetailAlkes';
import ModalPasien from '../Pasien/ModalPasien';
import axios from 'axios';



const RumahSakit = ({ subtitle }) => {
  const { account, loading, supplyChain, web3 } = useBlockchain();




  console.log(loading, account, supplyChain);

  //Request


  const [addressDistribur, setAddressDistribur] = useState("");
  const [addressAlkes, setAddressAlkes] = useState("");
  const [isLoading, setLoading] = useState(loading)



  //Modal dan Tabel Alkes
  const [details, setDetails] = useState([]);
  const [detailsResponse, setDetailsResponse] = useState([]);

  const [user, setUser] = useState([]);
  const [userResponse, setUserResponse] = useState([]);

  const [arrayStatus, setArrayStatus] = useState([]);
  const [arrayStatusResponse, setArrayStatusResponse] = useState([]);
  const [transactionsRes, setTransactionsRes] = useState([]);

  const [arrayAlkes, setArrayAlkes] = useState([]);
  const [addressResponse, setAddressResponse] = useState("");
  const [txn, setTxnAddress] = useState("");
  const [txnTime, setTxnTime] = useState("");
  const [data, setData] = useState("");
  const [open, setOpen] = useState("");
  const [openPasien, setOpenPasien] = useState("");

  const [status, setStatus] = useState(0);
  const [namaAlkes, setNamaAlkesFetch] = useState("");
  const [klasifikasiAlkes, setklasifikasiAlkes] = useState("");
  const [tipeAlkes, settipeAlkes] = useState("");
  const [kelasAlkes, setkelasAlkes] = useState("");
  const [kelasResiko, setkelasResiko] = useState("");
  const [izinEdar, setIzinEdar] = useState("");

  const addressPackage = useRef()


  const handleInputChangeForm = (e) => {


    if (e.target.id === 'address_distributor') {
      setAddressDistribur(e.target.value);
    } else if (e.target.id === 'address_alkes') {
      setAddressAlkes(e.target.value);
    }

  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(addressDistribur, addressAlkes);

    try {
      await supplyChain.methods.reqAlkesRs(account, addressDistribur, addressAlkes).send({ from: account })
        .once('receipt', (receipt) => {
          alert('Request Alkes ke Distributor!');
          console.log(receipt);
          setLoading(true);

          window.location.reload();
        })

    } catch (error) {

      console.error("error", error)
      setLoading(false)
    }
  }




  const dataResponse = async () => {
    try {
      let events = await supplyChain.getPastEvents('RsEvent', { filter: { rs: account }, fromBlock: 0, toBlock: 'latest' });
      console.log(events);

      events = events.filter((event) => {
        return event.returnValues.rs === account;
      });

      console.log(events);

      return events

    } catch (error) {
      console.error('Error:', error);
      throw error
    }
  }

  const responsePasien = async () => {
    try {
      let events = await supplyChain.getPastEvents('PasienEvent', { filter: { faskes: account }, fromBlock: 0, toBlock: 'latest' });
      console.log(events);

      events = events.filter((event) => {
        return event.returnValues.faskes === account;
      });

      console.log(events);

      return events

    } catch (error) {
      console.error('Error:', error);
      throw error
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      try {

        const responseAlkes = await dataResponse()
        const pasien_rs = await responsePasien();

        const listUser = await Promise.all(
          responseAlkes.map(async (user) => {
            const dataUser = await supplyChain.methods.getUserInfo(user.returnValues.rs).call()
            console.log(dataUser);
            return dataUser
          })
        )

        const listUserRes = await Promise.all(
          pasien_rs.map(async (user) => {
            const dataUser = await supplyChain.methods.getUserInfo(user.returnValues.faskes).call()
            console.log(dataUser);
            return dataUser
          })
        )

        const infoStatus = await Promise.all(
          responseAlkes.map(async (alkes) => {
            const rawMaterial = new web3.eth.Contract(RawAlkes.abi, alkes.returnValues.alkesAddr);

            const fetchedStatus = await rawMaterial.methods.getRawAlkesStatus().call();
            console.log(fetchedStatus);
            return fetchedStatus
          })
        )

        const infoAlkes = await Promise.all(
          responseAlkes.map(async (alkes) => {
            const rawAlkes = new web3.eth.Contract(RawAlkes.abi, alkes.returnValues.alkesAddr);

            const fetched = await rawAlkes.methods.getRawAlkes().call();
            console.log(fetched);
            return fetched
          })
        )

        const infoAlkesRes = await Promise.all(
          pasien_rs.map(async (alkes) => {
            const rawMaterial = new web3.eth.Contract(RawAlkes.abi, alkes.returnValues.alkesAddr);

            const fetchedStatus = await rawMaterial.methods.getRawAlkesStatus().call();
            console.log(fetchedStatus);
            return fetchedStatus
          })
        )

        const transactions = await Promise.all(
          pasien_rs.map(async (alkes) => {

            const data = await axios.post('/api/transaksi', {
              addressResponse: alkes.returnValues.alkesAddr,
              txn: alkes.transactionHash,
            });

            console.log(data);
            
            return data.data.products
          })
        )

        console.log(infoAlkes);
        console.log(listUser);


        setUser(listUser)

        setArrayAlkes(infoAlkes)
        setArrayStatus(infoStatus)
        setDetails(responseAlkes);


        //Response Dari Pasien
        setUserResponse(listUserRes)
        setArrayStatusResponse(infoAlkesRes)
        setDetailsResponse(pasien_rs);
        setTransactionsRes(transactions)


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [account, web3, supplyChain])




  //MODAL DETAILL

  const handleClickOpen = () => {
    setAddressResponse(addressPackage.current.value);
    setOpen(true);
  };

  const handleClickOpenPasien = (address, tx, time) => {
    console.log(address, tx, time);
    setAddressResponse(address);
    setTxnAddress(tx);
    setTxnTime(time);
    setOpenPasien(true);
  };
  
  const handleAccept = async (addressPackage, addressPasien, txn) => {
    console.log(addressPackage, addressPasien, account, txn);

    try {

      const rawAlkes = new web3.eth.Contract(RawAlkes.abi, addressPackage);
      rawAlkes.methods.faskesToPasien(addressPasien).send({ from: account })
        .once('receipt', async (receipt) => {


          const products = {
            txn,
          }
          const response = await fetch(`/api/transaksi/status`, {
            method: "POST",
            body: JSON.stringify(products)
          })
          window.location.reload()

        });

    } catch (error) {
      console.error('Error:', error);
      throw error

    }

  }







  //TABLE-ALKES

  const DataAlkes = () => {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell><strong>  Address Alkes (Blockchain) </strong></TableCell>
              <TableCell align="right"><strong>Distributor</strong></TableCell>

            </TableRow>
          </TableHead>
          <TableBody>

            {
              details?.map((alkes, index) => (
                <Row key={alkes.returnValues.alkesAddr} alkes={alkes} user={user} arrayStatus={arrayStatus} arrayAlkes={arrayAlkes} web3={web3} index={index} />
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>

    )
  }


  const Row = ({ alkes, user, web3, index, arrayStatus, arrayAlkes }) => {

    console.log(alkes);
    console.log(Number(arrayStatus[0]));
    console.log(arrayAlkes);
    console.log(user);
    // const { row } = props;
    const [open, setOpen] = useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>


          <TableCell component="th" scope="row">
            {alkes.returnValues.alkesAddr}
          </TableCell>

          {user[index].userAddr === alkes.returnValues.distributor
            ?

            <TableCell align='right'>{web3.utils.hexToUtf8(user[index].name).trim()}
            </TableCell>
            :
            <TableCell align='right'>{alkes.returnValues.distributor}</TableCell>

          }

        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Details :
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Faskes Address</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>

                    {user[index].userAddr === alkes.returnValues.rs
                      ?

                      <TableCell>{web3.utils.hexToUtf8(user[index].name).trim()}
                      </TableCell>
                      :
                      <TableCell>{alkes.returnValues.rs}</TableCell>

                    }

                    <TableCell>
                      {
                        arrayStatus[index] <= 2
                          ?
                          "Delay" :
                          "Approve"
                      }
                    </TableCell>
                    <TableCell>{new Date(alkes.returnValues.timestamp * 1000).toString()}</TableCell>

                    <TableCell>
                      <IconButton ref={addressPackage} value={alkes.returnValues.alkesAddr} onClick={handleClickOpen} aria-label="Open">
                        <Visibility />
                      </IconButton>


                    </TableCell>





                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  const DataAlkesResponse = () => {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell><strong>  Address Alkes (Blockchain) </strong></TableCell>
              <TableCell align="right"><strong>Faskes</strong></TableCell>

            </TableRow>
          </TableHead>
          <TableBody>

            {
              detailsResponse?.map((alkes, index) => (
                <RowResponse key={alkes.returnValues.alkesAddr} transactionsRes={transactionsRes} alkes={alkes} userResponse={userResponse} arrayStatusResponse={arrayStatusResponse} web3={web3} index={index} />
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>

    )
  }
  const RowResponse = ({ alkes, userResponse, arrayStatusResponse, web3, index, transactionsRes }) => {

    console.log(transactionsRes);
    console.log(Number(arrayStatusResponse[0]));

    console.log(userResponse);

    // const { row } = props;
    const [open, setOpen] = useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>


          <TableCell component="th" scope="row">
            {alkes.returnValues.alkesAddr}
          </TableCell>

          {userResponse[index].userAddr === alkes.returnValues.faskes
            ?

            <TableCell align='right'>{web3.utils.hexToUtf8(userResponse[index].name).trim()}
            </TableCell>
            :
            <TableCell align='right'>{alkes.returnValues.faskes}</TableCell>

          }

        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Details :
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Pasien Address</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Status (Pasien)</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>

                    <TableCell>{alkes.returnValues.pasien}</TableCell>
                    <TableCell>{new Date(alkes.returnValues.timestamp * 1000).toString()}</TableCell>
                    <TableCell>
                      {
                        Number(arrayStatusResponse[index]) > 3 && transactionsRes[index][0].status 
                          ?
                          "Approve" :
                          "Delay"
                      }
                    </TableCell>

                    <TableCell>
                      <IconButton onClick={() => handleClickOpenPasien(alkes.returnValues.alkesAddr, alkes.transactionHash, alkes.returnValues.timestamp)}>
                        <Visibility />
                      </IconButton>

                      {
                        Number(arrayStatusResponse[index]) <= 3 || !transactionsRes[index][0].status ?
                        <IconButton onClick={() => handleAccept(alkes.returnValues.alkesAddr, alkes.returnValues.pasien, alkes.transactionHash)} >
                          <Check />
                        </IconButton>
                        :
                        ''
                      }
                    </TableCell>

                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  if (loading) {

    return <Loader></Loader>;


  }

  return (
    <>
      <div className="liton__wishlist-area pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mb-50">
              <div className="ltn__product-tab-area">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="ltn__tab-menu-list mb-50">
                        <div className="nav">
                          <a className="active show" data-bs-toggle="tab" href="#liton_tab_1">Dashboard <i className="fas fa-home"></i></a>
                          <a data-bs-toggle="tab" href="#liton_tab_2">Request<i className="fas fa-arrow-right"></i></a>
                          <a data-bs-toggle="tab" href="#liton_tab_3">Respones<i className="fas fa-arrow-left"></i></a>
                          <a data-bs-toggle="tab" href="#liton_tab_4">Alkes<i className="fas fa-stethoscope"></i></a>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="tab-content">
                        <div className="tab-pane fade active show" id="liton_tab_1">
                          <div className="ltn__myaccount-tab-content-inner">
                            <p>Blockchain Address : <strong>{account}</strong>

                            </p>
                          </div>
                        </div>

                        <div className="tab-pane fade" id="liton_tab_2">
                          <div className="ltn__myaccount-tab-content-inner">
                            <p>Silahkan Melakukan Request Alkes Sebagai <strong>Faskes</strong> ke <strong>Distributor</strong>  </p>
                            <div className="ltn__form-box">
                              <form onSubmit={handleSubmit}>

                                <fieldset>
                                  <legend>Request Alkes</legend>
                                  <div className="row">
                                    <div className="col-md-12">
                                      <label>Blockchain Address Distributor :</label>
                                      <input type="text" name="address_distributor" id='address_distributor' onChange={handleInputChangeForm} />

                                      <label>Blockchain Address Alkes :</label>
                                      <input type="text" name="address_alkes" id='address_alkes' onChange={handleInputChangeForm} />

                                    </div>
                                  </div>
                                </fieldset>
                                <div className="btn-wrapper text-end">
                                  <button type="submit" className="btn theme-btn-1 btn-effect-1 text-uppercase">Request</button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>

                        <div className="tab-pane fade" id="liton_tab_3">
                          <DataAlkesResponse />


                        </div>









                        <div className="tab-pane fade" id="liton_tab_4">
                          <DataAlkes />

                        </div>




                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

      {
        open
          ?
          <ModalDetailAlkes
            setOpen={setOpen}
            open={open}
            addressResponse={addressResponse}
            // status={status}
            RawAlkes={RawAlkes}
            web3={web3}
            account={account}
          />
          : null

      }
      {
        openPasien
          ?
          <ModalPasien
            setOpen={setOpenPasien}
            open={openPasien}
            addressResponse={addressResponse}
            txn={txn}
            txnTime={txnTime}
            RawAlkes={RawAlkes}
            web3={web3}
            account={account}
          />
          : null

      }





    </>



  )
}

export default RumahSakit