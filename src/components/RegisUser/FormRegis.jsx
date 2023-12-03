import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import useBlockchain from '@/utils/useBlockchain';
import { Alert, Box, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';




const FormRegis = () => {
    const { account, loading, supplyChain, web3, handleInputChange } = useBlockchain();


    console.log(account, supplyChain);
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [noTelp, setNoTelp] = useState("");
    const [address, setAddress] = useState("");
    const [loadingSubmit, setLoadingSubmit] = useState(loading);
    const [loadingView, setLoadingView] = useState(loading);
    const [viewAddress, setViewAddress] = useState("");
    const [viewName, setViewName] = useState("");
    const [viewEmail, setViewEmail] = useState("");
    const [viewNoTelp, setViewNoTelp] = useState("");
    const [viewRole, setViewRole] = useState("");
    const [viewUserLocx, setViewUserLocx] = useState("");
    const [viewUserLocy, setViewUserLocy] = useState("");
    const [viewInfo, setViewInfo] = useState(false);


    const handleInputChangeForm = (e) => {

        if (e.target.id === 'name') {
            setName(e.target.value);
        } else if (e.target.id === 'email') {
            setEmail(e.target.value);
        } else if (e.target.id === 'no_telp') {
            setNoTelp(e.target.value);
        } else if (e.target.id === 'address') {
            setAddress(e.target.value);
        }

    }

    const handleSelect = (e) => {
        console.log(e.target);
        setRole(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name, email, noTelp, role, address);
        setLoadingSubmit(true);

        try {

            const n = web3.utils.padRight(web3.utils.fromAscii(name), 64);
            const e = web3.utils.padRight(web3.utils.fromAscii(email), 64);
            const no = web3.utils.padRight(web3.utils.fromAscii(noTelp), 64);
            // const loc = [String(locationx), String(locationy)];
            await supplyChain.methods
                .registerUser(n, e, no, role, address)
                .send({ from: account })
                .once('receipt', (receipt) => {
                    console.log(receipt);
                    setLoadingSubmit(false);

                    window.location.reload();

                });
        } catch (error) {
            console.error('Error submitting:', error);
            setLoadingSubmit(false);
        }
    }
    const getEventData = () => {

        supplyChain.events
            .UserRegister({ fromBlock: 0, toBlock: 'latest' })
            .on('data', (event) => {
                console.log(event);
            });
    };
    if (loading) {
        return <Loader></Loader>;
    }
    getEventData();



    const handleInputView = (e) => {
        console.log(e.target.value);
        setViewAddress(e.target.value);
    }



    const handleSubmitView = async (e) => {
        try {
            e.preventDefault();

            setLoadingView(true);

            const info = await supplyChain.methods.getUserInfo(viewAddress).call();

            console.log("infooo", info);

            setViewRole(info.role);

            console.log(info.role, info.email);

            if (web3.utils.isHexStrict(info.name)) {
                // Convert HEX to UTF-8
                const utf8Name = web3.utils.hexToUtf8(info.name).trim();
                const utf8Email = web3.utils.hexToUtf8(info.email).trim();
                const utf8Notelp = web3.utils.hexToUtf8(info.noTelp).trim();


                setViewName(utf8Name)
                setViewEmail(utf8Email)
                setViewNoTelp(utf8Notelp)
            }

            setViewInfo(true);

        } catch (error) {
            console.error('Error fetching user info:', error);

        }

    }

    const DetailUser = () => {
        return (
            <div className="ltn__team-details-member-info-details">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ltn__team-details-member-about">
                            <ul>
                                <li><strong>Blockchain : </strong> {viewAddress}</li>
                                <li><strong>Nama User : </strong> {viewName}</li>
                                <li><strong>Email : </strong> {viewEmail}</li>
                                <li><strong>No Telp : </strong> {viewNoTelp}</li>
                                <li><strong>Role User : </strong> {viewRole}</li>
                            </ul>
                        </div>
                    </div>

                </div>
                <hr />
            </div>
        )



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
            <div className="ltn__contact-message-area ltn__contact-address-area mt-50 mb-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mb-50">
                            <div className="ltn__form-box contact-form-box box-shadow white-bg">
                                <h4 className="title-2">Registrasi User</h4>
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="input-item input-item-name ltn__custom-icon">
                                                <input type="text" id='name' name="name" onChange={handleInputChangeForm} placeholder="Masukkan Name User" />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="input-item input-item-email ltn__custom-icon">
                                                <input type="email" id='email' name="email" onChange={handleInputChangeForm} placeholder="Masukkan Email User" />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="input-item input-item-phone ltn__custom-icon">
                                                <input type="text" id='no_telp' name="no_telp" onChange={handleInputChangeForm} placeholder="Masukkan No Telp User" />
                                            </div>
                                        </div>
                                        {/* <div className="col-md-12">
                                            <div className="input-item input-item-role ltn__custom-icon">
                                                <input type="text" id='role' name="role" onChange={handleInputChangeForm} placeholder="Masukkan Role User" />
                                            </div>
                                        </div> */}


                                        <div className="col-md-12">
                                            <div className="input-item input-item-address ltn__custom-icon">
                                                <input type="text" id='address' name="address" onChange={handleInputChangeForm} placeholder="Masukkan Blockchain Address" />
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="input-item input-item-select">
                                                <Box>
                                                    <FormControl
                                                        fullWidth
                                                        sx={{ ...stylesSelect }}
                                                    >
                                                        <InputLabel id="label-select-role">Role User</InputLabel>
                                                        <Select
                                                            labelId="label-select-role"
                                                            id="role"
                                                            name="role"
                                                            onChange={handleSelect}
                                                        >
                                                            <MenuItem value={1}>Manufaktur</MenuItem>
                                                            <MenuItem value={2}>Distributor</MenuItem>
                                                            <MenuItem value={3}>Kemenkes</MenuItem>
                                                            <MenuItem value={4}>Rumah Sakit</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Box>

                                            </div>
                                        </div>


                                    </div>
                                    {!loadingSubmit
                                        ?
                                        <Stack sx={{ width: '100%' }} spacing={2}>
                                            <Alert severity="success">User Berhasil Diregistrasi</Alert>
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
                            <div className="ltn__form-box contact-form-box box-shadow white-bg">
                                <h4 className="title-2">View User</h4>
                                <form onSubmit={handleSubmitView} noValidate autoComplete='off'>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="input-item input-item-subject ltn__custom-icon">
                                                <input type="text" id='address_view' name="address_view" onChange={handleInputView} placeholder="Masukkan Blockchai Address User" />
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        viewInfo
                                            ?
                                            <DetailUser />
                                            :
                                            null
                                    }

                                    <div className="btn-wrapper text-end">
                                        <button className="btn theme-btn-1 btn-effect-1 text-uppercase" type="submit">View</button>
                                    </div>






                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>



        </>



    )
}

export default FormRegis