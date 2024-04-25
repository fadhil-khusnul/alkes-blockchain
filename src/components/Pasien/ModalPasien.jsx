import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grow, LinearProgress, Paper, Step, StepLabel, Stepper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
// import RawAlkes from '../../build/RawAlkes.json';
import axios from 'axios';
import TabelPasien from './TabelPasien';





const ModalPasien = ({ account, web3, RawAlkes, addressResponse, txn, txnTime, open, setOpen }) => {

  console.log(addressResponse);
  const [alkesProducts, setAlkesProducts] = useState([]);
  const [data, setData] = useState("");
  const [status, setStatus] = useState(0);


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

  const handleClose = () => {
    setOpen(false);

  };


  console.log(addressResponse);
  console.log(alkesProducts);

  useEffect(() => {
    const fetchDataDetails = async () => {
      try {
        console.log(addressResponse);
        const rawMaterial = new web3.eth.Contract(RawAlkes.abi, addressResponse);
        const fetchedData = await rawMaterial.methods.getRawAlkes().call({ from: account });
        const fetchedStatus = await rawMaterial.methods.getRawAlkesStatus().call();

        console.log(fetchedData);

        const response = await axios.post('/api/getAlkesProduct/txn', {
          addressResponse: addressResponse,
          txn: txn,
        });

        console.log(response);
        if (response.data.status === 200) {
          console.log(response.data.products);
          setAlkesProducts(response.data.products);
        } else {
          throw new Error('Error fetching AlkesProducts');
        }


        setData(fetchedData)
        setStatus(fetchedStatus);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchDataDetails();

  }, [addressResponse, account, web3]);

  console.log(data);

  const steps = [
    'Manufaktur',
    'Distributor',
    'Kemenkes',
    'Faskes',

  ];
  const active = Number(status)





  return (

    <Dialog
      fullWidth={true}
      maxWidth={'lg'}
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
                          {data[1]?.namaAlkes ? web3.utils.hexToUtf8(data[1]?.namaAlkes).trim() : ""}


                        </td>

                      </tr>
                      <tr>
                        <td>
                          <strong>Tgl. Transaksi</strong>
                        </td>
                        <td>
                          :
                        </td>
                        <td>
                          {new Date(txnTime * 1000).toString()}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>
                            Kategori
                          </strong>
                        </td>
                        <td>
                          :
                        </td>
                        <td>
                          {data[1]?.kategori_alkes ? web3.utils.hexToUtf8(data[1]?.kategori_alkes).trim() : ""}

                        </td>

                      </tr>
                      <tr>
                        <td>
                          <strong>
                            Sub Kategori
                          </strong>
                        </td>
                        <td>
                          :
                        </td>
                        <td>
                          {data[1]?.subkategori_alkes ? web3.utils.hexToUtf8(data[1]?.subkategori_alkes).trim() : ""}

                        </td>

                      </tr>
                      <tr>
                        <td>
                          <strong>
                            Elektromedik
                          </strong>
                        </td>
                        <td>
                          :
                        </td>
                        <td>
                          {data[1]?.klasifikasiAlkes ? web3.utils.hexToUtf8(data[1]?.klasifikasiAlkes).trim() : ""}

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
                          {data[1]?.tipeAlkes ? web3.utils.hexToUtf8(data[1]?.tipeAlkes).trim() : ""}

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
                          {data[1]?.kelasResiko ? web3.utils.hexToUtf8(data[1]?.kelasResiko).trim() : ""}

                        </td>

                      </tr>
                      <tr>
                        <td>
                          <strong>
                            Kuantitas
                          </strong>
                        </td>
                        <td>
                          :
                        </td>
                        <td>
                          {alkesProducts.length}
                          {/* {data[1]?.kuantitas ? web3.utils.hexToUtf8(data[1]?.kuantitas).trim() : ""} */}

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
                            data[1]?.kelasResiko != data[1]?.noIzinEdar ? web3.utils.hexToUtf8(data[1]?.noIzinEdar).trim() : "-"
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
                            Faskes
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

                  <TabelPasien alkesProducts={alkesProducts} statusBlockchain={status} />
                </div>
              </div>

              <div className='mt-20 mb-20 text-center'>
                <strong>

                  Progress
                </strong>
                <Box sx={{ width: '100%', marginTop:"20px" }}>
                  <Stepper activeStep={active + 1} alternativeLabel>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              </div>

            </div>
          </div>



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

export default ModalPasien;
