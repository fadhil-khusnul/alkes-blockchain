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
    IconButton,
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
    Typography,
} from '@mui/material';

import { Delete as DeleteIcon, KeyboardArrowDown as KeyboardArrowDownIcon, KeyboardArrowUp as KeyboardArrowUpIcon, Visibility } from '@mui/icons-material';
import Draggable from 'react-draggable';

const MenuDistributor = () => {

    const { account, loading, supplyChain, web3, handleInputChange } = useBlockchain();


    const [addressManufaktur, setAddressManufaktur] = useState("");
    const [addressAlkes, setAddressAlkes] = useState("");
    const [details, setDetails] = useState([]);
    const [user, setUser] = useState([]);
    const [dataAlkes, setAlkes] = useState([]);

    const [open, setOpen] = useState("");
    const [addressResponse, setAddressResponse] = useState("");

    const addressPackage = useRef()

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
                })

        } catch (error) {

            console.error("error", error)
            setLoading(false)
        }
    }

    const dataBlockchain = async () => {
        try {
            let events = await supplyChain.getPastEvents('buyEvent', { filter: { buyer: account }, fromBlock: 0, toBlock: 'latest' });
            console.log(events);

            events = events.filter((event) => {
                return event.returnValues.buyer === account;
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

                console.log(res);

                const listUser = await Promise.all(
                    res.map(async (user) => {
                        const dataUser = await supplyChain.methods.getUserInfo(user.returnValues.seller).call()
                        console.log(dataUser);
                        return dataUser
                    })
                )
                console.log(listUser);

                // const listAlkes = await Promise.all(
                //     res.map(async (alkes) => {
                //         const rawAlkes = new web3.eth.Contract(RawAlkes.abi, alkes.returnValues.packageAddr);
                //         const data = await rawAlkes.methods.getRawAlkes().call({ from: account });

                //         console.log(data);
                //         return data
                //     })
                // )
                // console.log(listAlkes);

                // setAlkes(listAlkes)


                setUser(listUser)

                setDetails(res);


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [account, web3, supplyChain])

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
                                <Row key={alkes.returnValues.packageAddr} alkes={alkes} details={details} user={user} web3={web3} index={index} />
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

        )
    }


    const Row = ({ alkes, user, web3, index }) => {

        console.log(alkes);
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
                        {alkes.returnValues.packageAddr}
                    </TableCell>

                    {user[index].userAddr === alkes.returnValues.seller
                        ?

                        <TableCell align='right'>{web3.utils.hexToUtf8(user[index].name).trim()}
                        </TableCell>
                        :
                        <TableCell align='right'>{alkes.returnValues.seller}</TableCell>

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
                                            <TableCell />
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        <TableCell>{alkes.returnValues.buyer}</TableCell>
                                        <TableCell>{new Date(alkes.returnValues.timestamp * 1000).toString()}</TableCell>
                                        <TableCell>
                                            <IconButton ref={addressPackage} value={alkes.returnValues.packageAddr} onClick={handleClickOpen} aria-label="delete">
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

    const handleClickOpen = (e) => {
        setAddressResponse(addressPackage.current.value);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const ModalDetailAlkes = ({ addressResponse }) => {

        const steps = [
            'Manufaktur',
            'Distributor',
            'Kemenkes',
            'Rumah Sakit',
        ];
        console.log(addressResponse);
        return (
            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    {addressResponse}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Box sx={{ width: '100%' }}>
                            <Stepper activeStep={2} alternativeLabel>
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
                                                    <a data-bs-toggle="tab" href="#liton_tab_2">Response <i className="fas fa-arrow-left"></i></a>
                                                    <a data-bs-toggle="tab" href="#liton_tab_3">Alkes <i className="fas fa-stethoscope"></i></a>
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

            <ModalDetailAlkes addressResponse={addressResponse} />

        </>
    )
}

export default MenuDistributor