import React, { useEffect, useRef, useState } from 'react'

import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
   
    Paper,
    Step,
    StepLabel,
    Stepper,
   
} from '@mui/material';


const handleClickOpen = (e) => {
    setAddressResponse(addressPackage.current.value);
    setOpen(true);
};

const handleClose = () => {
    setOpen(false);
};


const ModalDetailAlkes = () => {

    console.log(status);



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
                        <Stepper activeStep={status + 1} alternativeLabel>
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

export default ModalDetailAlkes;