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
  TextField,
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



const Pasien = () => {
  const { account, loading, supplyChain, web3 } = useBlockchain();




  console.log(loading, account, supplyChain);

  //Request

  const [addressFaskes, setAddressDistribur] = useState("");
  const [addressAlkes, setAddressAlkes] = useState("");
  const [isLoading, setLoading] = useState(loading)



  //Modal dan Tabel Alkes
  const [details, setDetails] = useState([]);
  const [user, setUser] = useState([]);
  const [arrayStatus, setArrayStatus] = useState([]);
  const [arrayAlkes, setArrayAlkes] = useState([]);
  const [addressResponse, setAddressResponse] = useState("");
  const [data, setData] = useState("");
  const [open, setOpen] = useState("");

  const [status, setStatus] = useState(0);
  const [namaAlkes, setNamaAlkesFetch] = useState("");
  const [klasifikasiAlkes, setklasifikasiAlkes] = useState("");
  const [tipeAlkes, settipeAlkes] = useState("");
  const [kelasAlkes, setkelasAlkes] = useState("");
  const [kelasResiko, setkelasResiko] = useState("");
  const [izinEdar, setIzinEdar] = useState("");
  const [generatedIds, setGeneratedIds] = useState([]);
  const [count, setCount] = useState(1);


  const addressPackage = useRef()


  const handleInputChangeForm = (e) => {


    if (e.target.id === 'address_faskes') {
      setAddressDistribur(e.target.value);
    } else if (e.target.id === 'address_alkes') {
      setAddressAlkes(e.target.value);
    }

  }

  const handleCountChange = (e) => {
    const newCount = parseInt(e.target.value, 10) || 1;
    setCount(newCount);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(addressFaskes, addressAlkes, count);

    try {
      await supplyChain.methods.reqAlkesPasien(account, addressFaskes, addressAlkes).send({ from: account })
        .once('receipt', async (receipt) => {

          const products = {
            addressAlkes,
            account,
            count
          }
          const response = await fetch(`/api/generatedID/addressAlkes`, {
            method: "POST",
            body: JSON.stringify(products)
          })
          alert('Request Alkes ke Faskes!');
          console.log(receipt);
          // setLoading(true);

          window.location.reload();
        })

    } catch (error) {

      console.error("error", error)
      setLoading(false)
    }
  }




  const dataResponse = async () => {
    try {
      let events = await supplyChain.getPastEvents('PasienEvent', { filter: { pasien: account }, fromBlock: 0, toBlock: 'latest' });
      console.log(events);

      events = events.filter((event) => {
        return event.returnValues.pasien === account;
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

        const listUser = await Promise.all(
          responseAlkes.map(async (user) => {
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

        console.log(infoAlkes);
        console.log(listUser);


        setUser(listUser)

        setArrayAlkes(infoAlkes)
        setArrayStatus(infoStatus)

        setDetails(responseAlkes);


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [account, web3, supplyChain])

  // useEffect(() => {
  //   const fetchDataDetails = async () => {
  //     try {
  //       const rawMaterial = new web3.eth.Contract(RawAlkes.abi, addressResponse);
  //       const fetchedData = await rawMaterial.methods.getRawAlkes().call({ from: account });
  //       const fetchedStatus = await rawMaterial.methods.getRawAlkesStatus().call();
  //       console.log(fetchedData);

  //       const nama = web3.utils.hexToUtf8(fetchedData[1][0]).trim();
  //       const klasifikasi = web3.utils.hexToUtf8(fetchedData[1][2]).trim();
  //       const tipe = web3.utils.hexToUtf8(fetchedData[1][3]).trim();
  //       const kelas = web3.utils.hexToUtf8(fetchedData[1][4]).trim();
  //       const kelas_resiko = web3.utils.hexToUtf8(fetchedData[1][5]).trim();
  //       const izin_edar = web3.utils.hexToUtf8(fetchedData[1][6]).trim();



  //       setNamaAlkesFetch(nama)
  //       setklasifikasiAlkes(klasifikasi)
  //       settipeAlkes(tipe)
  //       setkelasAlkes(kelas)
  //       setkelasResiko(kelas_resiko)
  //       setIzinEdar(izin_edar)
  //       setData(fetchedData)
  //       setStatus(fetchedStatus);
  //     } catch (error) {
  //       console.error("Error", error);
  //     }
  //   };

  //   fetchDataDetails();

  // }, [addressResponse, account]);

  const PaperComponent = (props) => {
    return (
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
    );
  }

  //MODAL DETAILL

  const handleClickOpen = (address) => {
    console.log(address);
    setAddressResponse(address);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  //TABLE-ALKES

  const DataAlkes = () => {
    console.log(details);
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

          {user[index].userAddr === alkes.returnValues.faskes
            ?

            <TableCell align='right'>{web3.utils.hexToUtf8(user[index].name).trim()}
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
                      <TableCell>Status</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>

                    {user[index].userAddr === alkes.returnValues.pasien
                      ?

                      <TableCell>{web3.utils.hexToUtf8(user[index].name).trim()}
                      </TableCell>
                      :
                      <TableCell>{alkes.returnValues.pasien}</TableCell>

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
                      <IconButton onClick={() => handleClickOpen(alkes.returnValues.alkesAddr)} aria-label="Open">
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

  if (loading) {

    return <Loader></Loader>;


  }

  const stylesSelect = {
    color: "#5C727D",
    paddingBottom: "2em",
    borderRadius: "0",
    '& label.Mui-focused': {
      color: '#4ab2d3',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#4ab2d3',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#e4ecf2',
      },
      '&:hover fieldset': {
        borderColor: '#4ab2d3',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#4ab2d3',
      },
    },

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
                          <a data-bs-toggle="tab" href="#liton_tab_3">Alkes<i className="fas fa-stethoscope"></i></a>
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
                            <p>Silahkan Melakukan Request Alkes Sebagai <strong>Rumah Sakit</strong> ke <strong>Distributor</strong>  </p>
                            <div className="ltn__form-box">
                              <form onSubmit={handleSubmit}>

                                <fieldset>
                                  <legend>Request Alkes</legend>
                                  <div className="row">
                                    <div className="col-md-12">
                                      <label>Blockchain Address Faskes :</label>
                                      <input type="text" name="address_faskes" id='address_faskes' onChange={handleInputChangeForm} />

                                      <label>Blockchain Address Alkes :</label>
                                      <input type="text" name="address_alkes" id='address_alkes' onChange={handleInputChangeForm} />

                                      <TextField
                                        id="kuantitas"
                                        label="Jumlah Barang"
                                        type="number"
                                        value={count}
                                        onChange={handleCountChange}
                                        inputProps={{
                                          min: 1,
                                          step: 1,
                                        }}

                                        fullWidth
                                        sx={{ ...stylesSelect }}

                                      />

                                      {/* <Button size='small' variant="contained" color='primary' onClick={handleGenerateIds}>
                                        Generate Product
                                      </Button>
                                      <TabelGenerateId generatedIds={generatedIds} /> */}

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







    </>



  )
}

export default Pasien