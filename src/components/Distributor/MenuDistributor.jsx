import React, { useEffect, useRef, useState } from 'react'

import Loader from '../Loader/Loader';

import useBlockchain from '@/utils/useBlockchain';
import RawAlkes from '../../build/RawAlkes.json';

import PropTypes from 'prop-types';

import {
    Box,
    Button,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grow,
    IconButton,
    LinearProgress,
    Paper,
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

import { Check, Delete as DeleteIcon, KeyboardArrowDown as KeyboardArrowDownIcon, KeyboardArrowUp as KeyboardArrowUpIcon, Send, Visibility } from '@mui/icons-material';
import Draggable from 'react-draggable';

const MenuDistributor = () => {

    const { account, loading, supplyChain, web3, handleInputChange } = useBlockchain();


    const [addressManufaktur, setAddressManufaktur] = useState("");
    const [addressAlkes, setAddressAlkes] = useState("");
    const [details, setDetails] = useState([]);
    const [detailsResponse, setDetailsResponse] = useState([]);
    const [user, setUser] = useState([]);
    const [userResponse, setUserResponse] = useState([]);
    const [arrayStatus, setArrayStatus] = useState([]);
    const [arrayStatusResponse, setArrayStatusResponse] = useState([]);

    const [open, setOpen] = useState("");
    const [opensend, setOpenSend] = useState("");
    const [addressResponse, setAddressResponse] = useState("");
    const [data, setData] = useState("");
    const [status, setStatus] = useState("");
    const [namaAlkes, setNamaAlkesFetch] = useState("");
    const [klasifikasiAlkes, setklasifikasiAlkes] = useState("");
    const [tipeAlkes, settipeAlkes] = useState("");
    const [kelasAlkes, setkelasAlkes] = useState("");
    const [kelasResiko, setkelasResiko] = useState("");
    const [izinEdar, setIzinEdar] = useState("");

    const addressPackage = useRef()
    const addressKemenkes = useRef()


    const [isLoading, setLoading] = useState(loading)
    console.log(loading, account, supplyChain);


    const handleInputChangeForm = (e) => {


        if (e.target.id === 'address_manufaktur') {
            setAddressManufaktur(e.target.value);
        } else if (e.target.id === 'address_alkes') {
            setAddressAlkes(e.target.value);
        }

    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(addressManufaktur, addressAlkes);

        try {
            await supplyChain.methods.requestProduct(account, addressManufaktur, addressAlkes).send({ from: account })
                .once('receipt', (receipt) => {
                    alert('Request Alkes ke Manufaktur!');
                    console.log(receipt);
                    setLoading(true);

                    window.location.reload();
                })

        } catch (error) {

            console.error("error", error)
            setLoading(false)
        }
    }

    const dataBlockchain = async () => {
        try {
            let events = await supplyChain.getPastEvents('requestEvent', { filter: { distributor: account }, fromBlock: 0, toBlock: 'latest' });
            console.log(events);

            events = events.filter((event) => {
                return event.returnValues.distributor === account;
            });

            console.log(events);

            return events

        } catch (error) {
            console.error('Error:', error);
            throw error
        }
    }
    const dataResponse = async () => {
        try {
            let events = await supplyChain.getPastEvents('rsEvent', { filter: { distributor: account }, fromBlock: 0, toBlock: 'latest' });
            console.log(events);

            events = events.filter((event) => {
                return event.returnValues.distributor === account;
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
                const res = await dataBlockchain();
                const res_rs = await dataResponse();

                console.log(res);

                const listUser = await Promise.all(
                    res.map(async (user) => {
                        const dataUser = await supplyChain.methods.getUserInfo(user.returnValues.manufaktur).call()
                        console.log(dataUser);
                        return dataUser
                    })
                )

                const infoAlkes = await Promise.all(
                    res.map(async (alkes) => {
                        const rawMaterial = new web3.eth.Contract(RawAlkes.abi, alkes.returnValues.alkesAddr);

                        const fetchedStatus = await rawMaterial.methods.getRawAlkesStatus().call();
                        console.log(fetchedStatus);
                        return fetchedStatus
                    })
                )

                const listUserRes = await Promise.all(
                    res_rs.map(async (user) => {
                        const dataUser = await supplyChain.methods.getUserInfo(user.returnValues.distributor).call()
                        console.log(dataUser);
                        return dataUser
                    })
                )

                const infoAlkesRes = await Promise.all(
                    res_rs.map(async (alkes) => {
                        const rawMaterial = new web3.eth.Contract(RawAlkes.abi, alkes.returnValues.alkesAddr);

                        const fetchedStatus = await rawMaterial.methods.getRawAlkesStatus().call();
                        console.log(fetchedStatus);
                        return fetchedStatus
                    })
                )
                console.log(listUser);



                //Alkes

                setUser(listUser)
                setArrayStatus(infoAlkes)
                setDetails(res);
                
                //Response dari RS
                setUserResponse(listUserRes)
                setArrayStatusResponse(infoAlkesRes)

                setDetailsResponse(res_rs);


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

    console.log(details);
    console.log(user);


    if (loading && isLoading) {

        return <Loader></Loader>;


    }

    const DataAlkes = () => {
        return (
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell><strong>  Address Alkes (Blockchain) </strong></TableCell>
                            <TableCell align="right"><strong>ManuFaktur</strong></TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {
                            details?.map((alkes, index) => (
                                <Row key={alkes.returnValues.alkesAddr} alkes={alkes} details={details} user={user} arrayStatus={arrayStatus} web3={web3} index={index} />
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

        )
    }

   


    const Row = ({ alkes, user, arrayStatus, web3, index }) => {

        console.log(alkes);
        console.log(Number(arrayStatus[0]));

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

                    {user[index].userAddr === alkes.returnValues.manufaktur
                        ?

                        <TableCell align='right'>{web3.utils.hexToUtf8(user[index].name).trim()}
                        </TableCell>
                        :
                        <TableCell align='right'>{alkes.returnValues.manufaktur}</TableCell>

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
                                            <TableCell>Distributor Address</TableCell>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Status (M)</TableCell>
                                            <TableCell>Status (K)</TableCell>
                                            <TableCell />
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        <TableCell>{alkes.returnValues.distributor}</TableCell>
                                        <TableCell>{new Date(alkes.returnValues.timestamp * 1000).toString()}</TableCell>
                                        <TableCell>
                                            {
                                                Number(arrayStatus[index]) < 1
                                                    ?
                                                    "Delay" :
                                                    "Approve"
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {
                                                Number(arrayStatus[index]) < 2
                                                    ?
                                                    "Delay" :
                                                    "Approve"
                                            }
                                        </TableCell>
                                        <TableCell>
                                            <IconButton onClick={()=>handleClickOpen(alkes.returnValues.alkesAddr)} aria-label="open">
                                                <Visibility />
                                            </IconButton>

                                            {
                                                Number(arrayStatus[index]) == 0 || Number(arrayStatus[index]) == 1 &&
                                                <IconButton onClick={() => handleClickOpenSend(alkes.returnValues.alkesAddr)} >
                                                    <Send />
                                                </IconButton>
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

    const DataAlkesResponse = () => {
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
                            detailsResponse?.map((alkes, index) => (
                                <RowResponse key={alkes.returnValues.alkesAddr} alkes={alkes} userResponse={userResponse} arrayStatusResponse={arrayStatusResponse} web3={web3} index={index} />
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

        )
    }
    const RowResponse = ({ alkes, userResponse, arrayStatusResponse, web3, index }) => {

        console.log(alkes);
        console.log(Number(arrayStatusResponse[0]));

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

                    {userResponse[index].userAddr === alkes.returnValues.distributor
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
                                            <TableCell>Date</TableCell>
                                            <TableCell>Status (RS)</TableCell>
                                            <TableCell />
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        <TableCell>{alkes.returnValues.rs}</TableCell>
                                        <TableCell>{new Date(alkes.returnValues.timestamp * 1000).toString()}</TableCell>
                                        <TableCell>
                                            {
                                                Number(arrayStatusResponse[index]) <= 2
                                                    ?
                                                    "Delay" :
                                                    "Approve"
                                            }
                                        </TableCell>
                                      
                                        <TableCell>
                                            <IconButton onClick={()=>handleClickOpen(alkes.returnValues.alkesAddr)}>
                                                <Visibility />
                                            </IconButton>

                                            {
                                                Number(arrayStatusResponse[index]) <= 2 &&
                                                <IconButton onClick={() => handleAccept(alkes.returnValues.alkesAddr, alkes.returnValues.rs)} >
                                                    <Check />
                                                </IconButton>
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

    const handleAccept = async (addressPackage, addressRS) => {
        console.log(addressPackage, addressRS, account);

        try {

            const rawAlkes = new web3.eth.Contract(RawAlkes.abi, addressPackage);
            rawAlkes.methods.distributorToRs(addressRS).send({ from: account })
                .once('receipt', async (receipt) => {
                    console.log(receipt);
                    window.location.reload()

                });

        } catch (error) {
            console.error('Error:', error);
            throw error

        }

    }

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

    const handleClickOpen = (address) => {
        setAddressResponse(address);
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

    const handleClickOpenSend = (addressPackage) => {
        setAddressResponse(addressPackage)
        setOpenSend(true);
    };

    const handleCloseSend = () => {
        setOpenSend(false);
    };

    const handleSend = async (addressResponse) => {
        const kemenkesAddress = addressKemenkes.current.value;


        console.log(addressResponse, kemenkesAddress, account);

        try {
            await supplyChain.methods.izinRequest(account, kemenkesAddress, addressResponse).send({ from: account })
                .once('receipt', (receipt) => {
                    alert('Request Izin ke Kemenks!');
                    console.log(receipt);
                    setLoading(true);

                    window.location.reload();
                })

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

                        Request Izin Edar
                    </div>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <div className='text-center'>

                            Untuk Melakukan request Izin Edar Alat Kesehatan
                            &ensp;
                            <strong>
                                {addressResponse}
                            </strong>
                            <br />
                            silahkan masukkan address blockhain Kemenkes.
                        </div>
                    </DialogContentText>
                    <div className='mt-20'>

                        <input
                            type="text"
                            id='addrees_kemenkes'
                            name="addrees_kemenkes"
                            ref={addressKemenkes}
                            placeholder="Masukkan Address Kemenkes"
                        />


                    </div>



                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSend}>Cancel</Button>
                    <Button onClick={() => handleSend(addressResponse)}>Submit</Button>
                </DialogActions>
            </Dialog>
        )

    }






    return (
        <>
            <div className="liton__wishlist-area pb-70">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ltn__product-tab-area">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div className="ltn__tab-menu-list mb-50">
                                                <div className="nav">
                                                    <a className="active show" data-bs-toggle="tab" href="#liton_tab_1">Dashboard <i className="fas fa-home"></i></a>
                                                    <a data-bs-toggle="tab" href="#liton_tab_2">Request <i className="fas fa-arrow-right"></i></a>
                                                    <a data-bs-toggle="tab" href="#liton_tab_3">Response <i className="fas fa-arrow-left"></i></a>
                                                    <a data-bs-toggle="tab" href="#liton_tab_4">Alkes <i className="fas fa-stethoscope"></i></a>
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
                                                        <p>Silahkan Melakukan Request Alkes Sebagai <strong>Distributor</strong> ke <strong>Manufakur</strong>  </p>
                                                        <div className="ltn__form-box">
                                                            <form onSubmit={handleSubmit}>

                                                                <fieldset>
                                                                    <legend>Request Alkes</legend>
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <label>Blockchain Address Manufaktur :</label>
                                                                            <input type="text" name="address_manufaktur" id='address_manufaktur' onChange={handleInputChangeForm} />
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
            </div >



            <ModalDetailAlkes />
            <ModalSend />




        </>
    )
}

export default MenuDistributor