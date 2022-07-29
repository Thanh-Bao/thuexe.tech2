import React from 'react';
import { useState } from 'react';
import Head from '@/layout/web/head';
import WebLayout from '@/layout/web';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import PostCard from '@/components/post/card';
import { display, minWidth, width } from '@mui/system';
import { Button, Divider, Dialog, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        backgroundColor: theme.article.contentWrapper.bgColor,
        border: "1.5px solid #d4d4d4",
        width: "50%",
        margin: "auto",
        marginTop: "2.5rem",
        minWidth: "400px"
    },

    header: {
        display: "flex",
        justifyContent: "center"
    },

    post: {
        display: "flex",

    },

    postImg: {
        width: "100px",
        height: "100px",
        objectFit: "cover"
    },

    content: {
        padding: "2rem 2rem"
    },
    checkoutInfo: {
        padding: "0 2rem",
        marginBottom: "2.5rem",

    },
    price: {
        margin: 0,
        color: 'red',
        fontSize: '30px'
    },

    btnCheckout: {
        borderRadius: "999px",
        backgroundColor: "#0078d2",
        color: "#fff",

        "&:hover": {
            color: "#0078d2",
        }

    }

}));

const Checkout = () => {
    const classes = useStyles();
    const price = 1000000;

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
            <Head
                title="checkout"
            />
            <WebLayout>
                <div
                    className={classes.wrapper}
                >
                    <div className={classes.header}>
                        <h2>Thanh toán</h2>
                    </div>
                    <Divider />
                    <div className={classes.content}>
                        <div className={classes.post}>
                            <img className={classes.postImg} src='https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/suzuki_ertiga_2021/p/g/2021/02/05/12/eSO62gDYCmq14ou8Javh1w.jpg' alt='xe' />
                            <div style={{ marginLeft: "0.5rem", fontSize: "25px" }}>Xe siêu nhân đỏ</div>
                        </div>
                    </div>
                    <Divider />
                    <div className={classes.checkoutInfo}>

                        <div style={{ display: "flex" }}>
                            <div style={{ flex: "1" }}>
                                <h3>Ngày thuê xe:</h3>
                                <h3>Ngày trả xe:</h3>
                                <h2 style={{ display: "inline" }}>Giá: </h2> <span className={classes.price}>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ</span>
                            </div>

                            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                <img style={{ width: "100px", height: "100px", marginBottom: "1rem"}} src="https://static.mservice.io/blogscontents/momo-upload-api-211217174745-637753600658721515.png" alt='qr' />
                                <div>
                                    <Button onClick={handleClickOpen} className={classes.btnCheckout} size='large'>Thanh toán</Button>
                                    <Dialog
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                <div style={{ display: "flex", alignItems: "center", flexDirection: "column", color: "green" }}>
                                                    <CheckCircleOutline style={{ fontSize: "70px" }} />
                                                    <h2>Thanh toán thành công </h2>
                                                </div>

                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>

                                            <Button onClick={handleClose} autoFocus>
                                                <a style={{textDecoration: "none"}} href='http://localhost:3000'>Đóng</a>
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>

                            </div>



                        </div>
                    </div>
                </div>
            </WebLayout>

        </>
    )
}

export default Checkout;
