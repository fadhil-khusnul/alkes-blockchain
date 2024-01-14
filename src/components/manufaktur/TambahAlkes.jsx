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
import { Check, Delete as DeleteIcon, KeyboardArrowDown as KeyboardArrowDownIcon, KeyboardArrowUp as KeyboardArrowUpIcon, Launch, Visibility } from '@mui/icons-material';
import Draggable from 'react-draggable';

import Transactions from '../../build/Transactions.json';
import RawAlkes from '../../build/RawAlkes.json';
import Link from 'next/link';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';



const TambahAlkes = ({ subtitle }) => {
    const { account, loading, supplyChain, web3, handleInputChange } = useBlockchain();




    console.log(loading, account, supplyChain);
    const [nama_alkes, setnama_alkes] = useState("");
    const [deskripsi_alkes, setdeskripsi_alkes] = useState("");
    const [klasifikasi, setklasifikasi] = useState("");
    const [tipe_alkes, settipe_alkes] = useState("");
    const [kelas, setkelas] = useState("");
    const [kelas_resiko, setkelas_resiko] = useState("");
    const [loadingSubmit, setLoadingSubmit] = useState(loading);
    const [dataAlkes, setAlkes] = useState([])

    //Modal dan Tabel Alkes
    const [details, setDetails] = useState([]);
    const [user, setUser] = useState([]);
    const [arrayStatus, setArrayStatus] = useState([]);
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

    const addressPackage = useRef()
    const addressBuyer = useRef()


    const dataBlockchain = async () => {
        try {
            const abi = await supplyChain.methods.getAllPackagesData().call({ from: account })
            console.log(abi);

            return abi

        } catch (error) {
            console.error('Error:', error);
            throw error
        }
    }
    const dataResponse = async () => {
        try {
            let events = await supplyChain.getPastEvents('RequestEvent', { filter: { manufaktur: account }, fromBlock: 0, toBlock: 'latest' });
            console.log(events);

            events = events.filter((event) => {
                return event.returnValues.manufaktur === account;
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

                const responseAlkes = await dataResponse()

                const listUser = await Promise.all(
                    responseAlkes.map(async (user) => {
                        const dataUser = await supplyChain.methods.getUserInfo(user.returnValues.manufaktur).call()
                        console.log(dataUser);
                        return dataUser
                    })
                )

                const infoAlkes = await Promise.all(
                    responseAlkes.map(async (alkes) => {
                        const rawMaterial = new web3.eth.Contract(RawAlkes.abi, alkes.returnValues.alkesAddr);

                        const fetchedStatus = await rawMaterial.methods.getRawAlkesStatus().call();
                        console.log(fetchedStatus);
                        return fetchedStatus
                    })
                )

                console.log(infoAlkes);
                console.log(listUser);

                setAlkes(res);

                setUser(listUser)

                setArrayStatus(infoAlkes)

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

                const nama = web3.utils.hexToUtf8(fetchedData[1][0]).trim();
                const klasifikasi = web3.utils.hexToUtf8(fetchedData[1][2]).trim();
                const tipe = web3.utils.hexToUtf8(fetchedData[1][3]).trim();
                const kelas = web3.utils.hexToUtf8(fetchedData[1][4]).trim();
                const kelas_resiko = web3.utils.hexToUtf8(fetchedData[1][5]).trim();
                const izin_edar = web3.utils.hexToUtf8(fetchedData[1][6]).trim();




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



    console.log(dataAlkes);

    if (Object.keys(dataAlkes).length === 0) {
        return null;
    }

    const getAllData = Object.keys(dataAlkes[0]).map((i) => ({
        address: dataAlkes[0][i],
        namAlkes: dataAlkes[1][i],
        tipeAlkes: dataAlkes[2][i],
    }));


    const handleInputChangeForm = (e) => {
        if (e.target.id === 'nama_alkes') {
            setnama_alkes(e.target.value);
        } else if (e.target.id === 'deskripsi_alkes') {
            setdeskripsi_alkes(e.target.value);
        } else if (e.target.id === 'tipe_alkes') {
            settipe_alkes(e.target.value);
        }

    }
    const handleSelectChangeForm = (e) => {
        console.log(e.target);
        if (e.target.name === 'klasifikasi') {
            setklasifikasi(e.target.value);
        } else if (e.target.name === 'kelas') {
            setkelas(e.target.value);
        } else if (e.target.name === 'kelas_resiko') {
            setkelas_resiko(e.target.value);
        }

    }

    const handleSubmit = async (e) => {

        console.log(nama_alkes, deskripsi_alkes, klasifikasi, tipe_alkes, kelas, kelas_resiko);
        e.preventDefault();
        setLoadingSubmit(false);

        try {

           
            const n = web3.utils.padRight(web3.utils.fromAscii(nama_alkes), 64);
            const d = web3.utils.padRight(web3.utils.fromAscii(deskripsi_alkes), 64);
            const c = web3.utils.padRight(web3.utils.fromAscii(klasifikasi), 64);
            const t = web3.utils.padRight(web3.utils.fromAscii(tipe_alkes), 64);
            const k = web3.utils.padRight(web3.utils.fromAscii(kelas), 64);
            const kr = web3.utils.padRight(web3.utils.fromAscii(kelas_resiko), 64);

            const alkesDetails = {
                namaAlkes: n,
                deskripsiAlkes: d,
                klasifikasiAlkes: c,
                tipeAlkes: t,
                kelasAlkes:k,
                kelasReseeiko: kr,
                noIz2inEdar: kr
            };
            console.log(d);
            console.log(t);
            await supplyChain.methods
                .createAlkesManufaktur(alkesDetails, account, account, account)
                .send({ from: account })
                .once('receipt', async (receipt) => {
                    setLoadingSubmit(true);

                    console.log(receipt);
                    var rawAlkesAddresses = await supplyChain.methods.getAllPackages().call({ from: account });
                    let rawAlkesAddress = rawAlkesAddresses[rawAlkesAddresses.length - 1];
                    console.log(rawAlkesAddress);
                    const rawAlkes = new web3.eth.Contract(RawAlkes.abi, rawAlkesAddress);
                    const data = await rawAlkes.methods.getRawAlkes().call({ from: account });

                    console.log(data[6]);
                    const txnContractAddress = data[6];
                    const txnHash = receipt.transactionHash;
                    const transactions = new web3.eth.Contract(Transactions.abi, txnContractAddress);
                    await transactions.methods.createTxnEntry(txnHash, account, rawAlkesAddress, txnHash).send({ from: account });

                    window.location.reload();
                });


        } catch (error) {
            console.error('Error:', error);
            setLoadingSubmit(false);
        }
    };
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

    const handleClickOpenList = (address) => {
        setAddressResponse(address);
        setOpen(true);
    };
    const handleClickOpenAccept = () => {
        setAddressResponse(addressPackage.current.value);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAccept = async (addressPackage, addressBuyer) => {
        console.log(addressPackage, addressBuyer, account);

        try {

            const rawAlkes = new web3.eth.Contract(RawAlkes.abi, addressPackage);
            rawAlkes.methods.updatedistributorAddress(addressBuyer).send({ from: account })
                .once('receipt', async (receipt) => {
                    console.log(receipt);
                    window.location.reload()

                });

        } catch (error) {
            console.error('Error:', error);
            throw error

        }

    }

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
                                                        {data[2]}

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
                                                            data[3] != data[2]
                                                                ?
                                                                data[3]
                                                                :
                                                                "-"
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
                                                            data[4] != data[2]
                                                                ?
                                                                data[4]
                                                                :

                                                                "-"

                                                        }


                                                    </td>

                                                </tr>
                                                <tr>
                                                    <td>
                                                        <strong>
                                                            RS
                                                        </strong>
                                                    </td>
                                                    <td>
                                                        :
                                                    </td>
                                                    <td>
                                                        {
                                                            data[5] != data[2]
                                                                ?
                                                                data[5]
                                                                :

                                                                "-"

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


    const Row = ({ alkes, user, web3, index, arrayStatus }) => {

        console.log(alkes);
        console.log(arrayStatus);
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
                                            <TableCell>Status</TableCell>
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
                                        <TableCell align='center'>
                                            <IconButton onClick={()=>handleClickOpen(alkes.returnValues.alkesAddr)}>
                                                <Visibility />
                                            </IconButton>
                                            {
                                                Number(arrayStatus[index]) < 1 &&
                                                <IconButton onClick={() => handleAccept(alkes.returnValues.alkesAddr, alkes.returnValues.distributor)} >
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


    const DataAlkesComp = () => {
        return (
            <ul>
                {
                    getAllData?.map((alkes, index) => {
                        return (
                            <li key={alkes.address}>

                                <div className="top-rated-product-item clearfix">
                                    <div className="top-rated-product-img">
                                        <i className="fas fa-stethoscope"></i>

                                    </div>
                                    <div className="top-rated-product-info">
                                        <h2 className='product-title'>
                                            {web3.utils.hexToUtf8(alkes.namAlkes).trim()}
                                            <button type='button' className='btn btn-icon px-1 py-1' onClick={() => handleClickOpenList(alkes.address)}>
                                                <i className='fas fa-external-link-alt'></i>
                                            </button>




                                        </h2>
                                        <div className="product-price">
                                            <span>{alkes.address}</span>
                                        </div>
                                        <div className="product-brief">
                                            <h6>{web3.utils.hexToUtf8(alkes.tipeAlkes).trim()}</h6>

                                        </div>

                                    </div>
                                </div>

                            </li>
                        )


                    })
                }
            </ul>



        )

    }


    // fetchData();
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
                                                    <a data-bs-toggle="tab" href="#liton_tab_2">Tambah Alkes <i className="fas fa-arrow-right"></i></a>
                                                    <a data-bs-toggle="tab" href="#liton_tab_3">Alkes <i className="fas fa-stethoscope"></i></a>
                                                    <a data-bs-toggle="tab" href="#liton_tab_4">Response <i className="fas fa-arrow-left"></i></a>
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

                                                <div className='tab-pane fade' id='liton_tab_2'>
                                                    <div className="ltn__form-box contact-form-box box-shadow white-bg">
                                                        <h4 className="title-2">{subtitle}</h4>
                                                        <form onSubmit={handleSubmit}>
                                                            <div className="row">
                                                                <div className="col-md-12">
                                                                    <div className="input-item input-item-name ltn__custom-icon">
                                                                        <input type="text" id='nama_alkes' name="nama_alkes" onChange={handleInputChangeForm} placeholder="Masukkan Nama Alkes" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <div className="input-item input-item-textarea ltn__custom-icon">
                                                                        <textarea id="deskripsi_alkes" name="deskripsi_alkes" placeholder="Deskripsi Alkes" onChange={handleInputChangeForm}></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <div className="input-item input-item-select">
                                                                        <Box>
                                                                            <FormControl
                                                                                borderRadius={0}
                                                                                fullWidth
                                                                                sx={{ ...stylesSelect }}
                                                                            >
                                                                                <InputLabel>Klasifikasi Alkes</InputLabel>
                                                                                <Select
                                                                                    id="klasifikasi"
                                                                                    name='klasifikasi'
                                                                                    label="Klasifikasi"
                                                                                    onChange={handleSelectChangeForm}
                                                                                >
                                                                                    <MenuItem value={"elektromedik_radiasi"}>Elektromedik Radiasi</MenuItem>
                                                                                    <MenuItem value={"elktromedik_non_radiasi"}>Elektromedik Non Radiasi</MenuItem>
                                                                                    <MenuItem value={"non_elktromedik_steril"}>Non Elektromedik Steril</MenuItem>
                                                                                    <MenuItem value={"non_elktromedik_non_steril"}>Non Elektromedik Non Steril</MenuItem>
                                                                                    <MenuItem value={"diagnostic_invitro"}>Diagnostic Invitro</MenuItem>
                                                                                </Select>
                                                                            </FormControl>
                                                                        </Box>

                                                                    </div>
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <div className="input-item input-item-name ltn__custom-icon">
                                                                        <input type="text" id='tipe_alkes' name="tipe_alkes" onChange={handleInputChangeForm} placeholder="Masukkan Tipe Alkes" />
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-12">
                                                                    <div className="input-item input-item-select">
                                                                        <Box>
                                                                            <FormControl
                                                                                borderRadius={0}
                                                                                fullWidth
                                                                                sx={{ ...stylesSelect }}
                                                                            >
                                                                                <InputLabel>Kelas</InputLabel>
                                                                                <Select
                                                                                    id="kelas"
                                                                                    name="kelas"
                                                                                    label="Kelas"
                                                                                    onChange={handleSelectChangeForm}
                                                                                >
                                                                                    <MenuItem value={"Kelas 1"}>Kelas 1</MenuItem>
                                                                                    <MenuItem value={"Kelas 2"}>Kelas 2</MenuItem>
                                                                                    <MenuItem value={"Kelas 3"}>Kelas 3</MenuItem>
                                                                                </Select>
                                                                            </FormControl>
                                                                        </Box>

                                                                    </div>
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <div className="input-item input-item-select">
                                                                        <Box>
                                                                            <FormControl
                                                                                fullWidth
                                                                                sx={{ ...stylesSelect }}
                                                                            >
                                                                                <InputLabel>Kelas Resiko</InputLabel>
                                                                                <Select
                                                                                    id="kelas_resiko"
                                                                                    name="kelas_resiko"
                                                                                    label="Kelas Resiko"
                                                                                    onChange={handleSelectChangeForm}
                                                                                >
                                                                                    <MenuItem value={"A"}>Kelas A</MenuItem>
                                                                                    <MenuItem value={"B"}>Kelas B</MenuItem>
                                                                                    <MenuItem value={"C"}>Kelas C</MenuItem>
                                                                                    <MenuItem value={"D"}>Kelas D</MenuItem>
                                                                                </Select>
                                                                            </FormControl>
                                                                        </Box>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            {!loadingSubmit
                                                                ?
                                                                <Stack sx={{ width: '100%' }} spacing={2}>
                                                                    <Alert severity="success">Alat Kesehatan Berhasil Ditambah</Alert>
                                                                </Stack>
                                                                :
                                                                null

                                                            }


                                                            <div className="btn-wrapper text-end">
                                                                <button className="btn theme-btn-1 btn-effect-1 text-uppercase" type="submit">Submit</button>
                                                            </div>
                                                        </form>




                                                    </div>
                                                </div>

                                                <div className='tab-pane fade' id='liton_tab_3'>
                                                    <div className="ltn__form-box contact-form-box box-shadow white-bg ltn__top-rated-product-widget">
                                                        <h4 className="title-2">List Alkes</h4>
                                                        {
                                                            loadingSubmit
                                                                ? <DataAlkesComp />
                                                                : <Loader />
                                                        }

                                                    </div>
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

            <ModalDetailAlkes />




        </>



    )
}

export default TambahAlkes