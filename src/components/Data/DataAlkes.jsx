import React, { useEffect, useRef, useState } from 'react'

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
    Typography,
} from '@mui/material';

import { Delete as DeleteIcon, KeyboardArrowDown as KeyboardArrowDownIcon, KeyboardArrowUp as KeyboardArrowUpIcon, Visibility } from '@mui/icons-material';


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
const DataAlkes = ({details, user, web3}) => {

    const addressPackage = useRef()

    const handleClickOpen = (e) => {
        setAddressResponse(addressPackage.current.value);
        setOpen(true);
    };

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
export default DataAlkes;