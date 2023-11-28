import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import useBlockchain from '@/utils/useBlockchain';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import Transactions from '../../build/Transactions.json';
import RawAlkes from '../../build/RawAlkes.json';



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

    const dataBlockchain = async () => {
        try {
            const abi = await supplyChain.methods.getAllPackagesData().call({ from: account })
            const abi2 = await supplyChain.methods.getAllPackages().call({ from: account })
            console.log(abi);
            console.log(abi2);

            return abi

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
                setAlkes(res);


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [account, web3, supplyChain])



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

            console.log(kr);
            await supplyChain.methods
                .createAlkesManufaktur(n, d, c, t, k, kr, account)
                .send({ from: account })
                .once('receipt', async (receipt) => {
                    setLoadingSubmit(true);

                    console.log(receipt);
                    var rawMaterialAddresses = await supplyChain.methods.getAllPackages().call({ from: account });
                    let rawMaterialAddress = rawMaterialAddresses[rawMaterialAddresses.length - 1];
                    console.log(rawMaterialAddress);
                    const rawMaterial = new web3.eth.Contract(RawAlkes.abi, rawMaterialAddress);
                    const data = await rawMaterial.methods.getRawAlkes().call({ from: account });
                    console.log(data[9]);
                    const txnContractAddress = data[9];
                    const txnHash = receipt.transactionHash;
                    const transactions = new web3.eth.Contract(Transactions.abi, txnContractAddress);
                    await transactions.methods.createTxnEntry(txnHash, account, rawMaterialAddress, txnHash, '10', '10').send({ from: account });

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

    const DataAlkesComp = () => {
        return (
            <ul>
                {
                    getAllData?.map((alkes, index) => {
                        return (
                            <li key={alkes.address}>

                                <div className="top-rated-product-item clearfix">
                                    <div className="top-rated-product-img">
                                        <a href="product-details.html"><img src="img/product/1.png" alt="#" /></a>
                                    </div>
                                    <div className="top-rated-product-info">
                                        <h2 className='product-title'><a href="product-details.html">{web3.utils.hexToUtf8(alkes.namAlkes).trim()} </a></h2>



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
            <div className="ltn__contact-message-area ltn__contact-address-area mt-50 mb-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mb-50">
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
                                                            <MenuItem value={1}>Kelas 1</MenuItem>
                                                            <MenuItem value={2}>Kelas 2</MenuItem>
                                                            <MenuItem value={3}>Kelas 3</MenuItem>
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
                        <div className="col-lg-6">
                            <div className="ltn__form-box contact-form-box box-shadow white-bg ltn__top-rated-product-widget">
                                <h4 className="title-2">List Alkes</h4>
                                {
                                    loadingSubmit
                                        ? <DataAlkesComp />
                                        : <Loader />
                                }

                            </div>
                        </div>
                    </div>
                </div>

            </div>



        </>



    )
}

export default TambahAlkes