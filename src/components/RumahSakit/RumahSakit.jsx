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



const RumahSakit = ({ subtitle }) => {
    const { account, loading, supplyChain, web3 } = useBlockchain();




    console.log(loading, account, supplyChain);

    //Request

    
    const [addressDistribur, setAddressDistribur] = useState("");
    const [addressAlkes, setAddressAlkes] = useState("");
    const [isLoading, setLoading] = useState(loading)



    //Modal dan Tabel Alkes
    const [details, setDetails] = useState([]);
    const [user, setUser] = useState([]);
    const [arrayStatus, setArrayStatus] = useState([]);
    const [arrayAlkes, setArrayAlkes] = useState([]);
    const [addressResponse, setAddressResponse] = useState("");
    const [addressKemenkes, setAddressKemenkes] = useState("");
    const [data, setData] = useState("");
    const [open, setOpen] = useState("");
    const [opensend, setOpenSend] = useState("");

    const [status, setStatus] = useState(0);
    const [namaAlkes, setNamaAlkesFetch] = useState("");
    const [klasifikasiAlkes, setklasifikasiAlkes] = useState("");
    const [tipeAlkes, settipeAlkes] = useState("");
    const [kelasAlkes, setkelasAlkes] = useState("");
    const [kelasResiko, setkelasResiko] = useState("");
    const [izinEdar, setIzinEdar] = useState("");

    const addressPackage = useRef()
    const noIzinEdar = useRef()


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
            let events = await supplyChain.getPastEvents('rsEvent', { filter: { rs: account }, fromBlock: 0, toBlock: 'latest' });
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


    useEffect(() => {
        const fetchData = async () => {
            try {

                const responseAlkes = await dataResponse()

                const listUser = await Promise.all(
                    responseAlkes.map(async (user) => {
                        const dataUser = await supplyChain.methods.getUserInfo(user.returnValues.distributor).call()
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

    useEffect(() => {
        const fetchDataDetails = async () => {
            try {
                const rawMaterial = new web3.eth.Contract(RawAlkes.abi, addressResponse);
                const fetchedData = await rawMaterial.methods.getRawAlkes().call({ from: account });
                const fetchedStatus = await rawMaterial.methods.getRawAlkesStatus().call();
                console.log(fetchedData);

                const nama = web3.utils.hexToUtf8(fetchedData[1]).trim();
                const klasifikasi = web3.utils.hexToUtf8(fetchedData[3]).trim();
                const tipe = web3.utils.hexToUtf8(fetchedData[4]).trim();
                const kelas = web3.utils.hexToUtf8(fetchedData[5]).trim();
                const kelas_resiko = web3.utils.hexToUtf8(fetchedData[6]).trim();
                const izin_edar = web3.utils.hexToUtf8(fetchedData[7]).trim();



                setNamaAlkesFetch(nama)
                setklasifikasiAlkes(klasifikasi)
                settipeAlkes(tipe)
                setkelasAlkes(kelas)
                setkelasResiko(kelas_resiko)
                setIzinEdar(izin_edar)
                setData(fetchedData)
                setStatus(fetchedStatus);
            } catch (error) {
                console.error("Error", error);
            }
        };

        fetchDataDetails();

    }, [addressResponse, account]);

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

    const handleClickOpen = () => {
        setAddressResponse(addressPackage.current.value);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const ModalDetailAlkes = () => {

        console.log(status);

        const active = Number(status)



        const steps = [
            'Manufaktur',
            'Distributor',
            'Kemenkes',
            'Rumah Sakit',

        ];
        console.log(addressResponse);
        console.log(data);


        return (

            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >


                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    <div className='text-center'>

                        <i className="fas fa-stethoscope"></i>
                    </div>
                </DialogTitle>

                <DialogContent>

                    <DialogContentText>
                        <div className="ltn__team-details-member-info-details">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="ltn__team-details-member-about">
                                        <table>
                                            <tbody valign="top">
                                                <tr>
                                                    <td width={40}>
                                                        <strong>

                                                            Blockchain
                                                        </strong>
                                                    </td>
                                                    <td width={10}>
                                                        :
                                                    </td>
                                                    <td width={50}>
                                                        {addressResponse}

                                                    </td>

                                                </tr>
                                                <tr>
                                                    <td>
                                                        <strong>
                                                            Klasifikasi
                                                        </strong>
                                                    </td>
                                                    <td>
                                                        :
                                                    </td>
                                                    <td>
                                                        {klasifikasiAlkes}

                                                    </td>

                                                </tr>
                                                <tr>
                                                    <td>
                                                        <strong>
                                                            Nama
                                                        </strong>
                                                    </td>
                                                    <td>
                                                        :
                                                    </td>
                                                    <td>
                                                        {namaAlkes}

                                                    </td>

                                                </tr>
                                                <tr>
                                                    <td>
                                                        <strong>
                                                            Tipe
                                                        </strong>
                                                    </td>
                                                    <td>
                                                        :
                                                    </td>
                                                    <td>
                                                        {tipeAlkes}

                                                    </td>

                                                </tr>
                                                <tr>
                                                    <td>
                                                        <strong>
                                                            Kelas
                                                        </strong>
                                                    </td>
                                                    <td>
                                                        :
                                                    </td>
                                                    <td>
                                                        {kelasAlkes}

                                                    </td>

                                                </tr>
                                                <tr>
                                                    <td>
                                                        <strong>
                                                            Kelas Resiko
                                                        </strong>
                                                    </td>
                                                    <td>
                                                        :
                                                    </td>
                                                    <td>
                                                        {kelasResiko}

                                                    </td>

                                                </tr>
                                                <tr>
                                                    <td>
                                                        <strong>
                                                            No. Izin Edar
                                                        </strong>
                                                    </td>
                                                    <td>
                                                        :
                                                    </td>
                                                    <td>
                                                        {
                                                            izinEdar != kelasResiko ? izinEdar : "-"
                                                        }

                                                    </td>

                                                </tr>
                                                <tr>
                                                    <td>
                                                        <strong>
                                                            Manufaktur
                                                        </strong>
                                                    </td>
                                                    <td>
                                                        :
                                                    </td>
                                                    <td>
                                                        {data[8]}

                                                    </td>

                                                </tr>
                                                <tr>
                                                    <td>
                                                        <strong>
                                                            Distributor
                                                        </strong>
                                                    </td>
                                                    <td>
                                                        :
                                                    </td>
                                                    <td>

                                                        {
                                                            data[9] != data[8] ? data[9] : "-"
                                                        }

                                                    </td>

                                                </tr>
                                                <tr>
                                                    <td>
                                                        <strong>
                                                            Kemenkes
                                                        </strong>
                                                    </td>
                                                    <td>
                                                        :
                                                    </td>
                                                    <td>

                                                        {
                                                            data[10] != data[8] ? data[10] : "-"
                                                        }

                                                    </td>

                                                </tr>
                                                <tr>
                                                    <td>
                                                        <strong>
                                                            Rs
                                                        </strong>
                                                    </td>
                                                    <td>
                                                        :
                                                    </td>
                                                    <td>

                                                        {
                                                            data[11] != data[8] ? data[11] : "-"
                                                        }

                                                    </td>

                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className='mt-20 mb-20 text-center'>
                            <strong>

                                Progress
                            </strong>
                        </div>




                        <Box sx={{ width: '100%' }}>
                            <Stepper activeStep={active + 1} alternativeLabel>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Box>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button ariant="outlined" color="error" autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>


        )




    }

    //MODAL SEND

    const handleClickOpenSend = (addressPackage, addressKemenkes) => {
        setAddressKemenkes(addressKemenkes)
        setAddressResponse(addressPackage)
        setOpenSend(true);
    };

    const handleCloseSend = () => {
        setOpenSend(false);
    };


    const handleSend = async (addressResponse, addressKemenkes) => {
        const izinEdar = web3.utils.padRight(web3.utils.fromAscii(noIzinEdar.current.value), 64);


        console.log(addressResponse, addressKemenkes, izinEdar, account);

        try {
            const rawAlkes = new web3.eth.Contract(RawAlkes.abi, addressResponse);
            rawAlkes.methods.izinEdarApprove(izinEdar, addressKemenkes).send({ from: account })
                .once('receipt', async (receipt) => {
                    console.log(receipt);
                    window.location.reload()

                });

        } catch (error) {

            console.error("error", error)
        }

    }

    const ModalSend = () => {

        return (
            <Dialog
                open={opensend}
                onClose={handleCloseSend}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    <div className='text-center'>

                        Input Izin Edar
                    </div>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <div className='text-center'>

                            Silahkan Masukkan Nomor Surat Izin Edar Untuk Alkes Ini.
                            &ensp;
                            <strong>
                                {addressResponse}
                            </strong>
                        </div>
                    </DialogContentText>
                    <div className='mt-20'>

                        <input

                            type="text"
                            id='noIzinEdar'
                            name="noIzinEdar"
                            ref={noIzinEdar}
                            placeholder="Masukkan No Izin Edar Kemenkes"
                        />


                    </div>



                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSend}>Cancel</Button>
                    <Button onClick={() => handleSend(addressResponse, addressKemenkes)}>Submit</Button>
                </DialogActions>
            </Dialog>
        )

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
                                            <TableCell>RS Address</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Date</TableCell>
                                            <TableCell />
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        <TableCell>{alkes.returnValues.rs}</TableCell>
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

            <ModalDetailAlkes />
            <ModalSend />





        </>



    )
}

export default RumahSakit