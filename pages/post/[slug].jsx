/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Stack, TextField, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import HTMLReactParse from 'html-react-parser';
import _ from 'lodash';
import moment from 'moment-timezone';
import Card from '@mui/material/Card';

import { API_URL } from '@/config';

import Head from '@/layout/web/head';
import WebLayout from '@/layout/web';

import UserPortalCard from '@/components/user/portalCard';
import DotDivider from '@/components/dotDivider';
import { ImageList, ImageListItem, Button } from '@mui/material';
import Box from '@mui/material/Box';
import { getPost } from '@/api/post';
import { formatSpacingNumber } from '@/helper/roundNumber';
import { getProvinceName } from '@/helper/address';
import { getWard, getDistrict, getProvince } from '@api/address';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        backgroundColor: theme.palette.primary.bgColor,
    },
    mainBox: {
        width: "100%"
    },
    contentWrapper: {
        backgroundColor: theme.article.contentWrapper.bgColor,
        padding: theme.article.contentWrapper.padding,
    },
    articleWrapper: {
        backgroundColor: theme.article.contentWrapper.bgColor,
        padding: theme.article.contentWrapper.padding,
        color: theme.typography.body2.color,
        margin: '16px'
    },
    commentWrapper: {
        padding: '16px',
    },
    userCard: {
        color: theme.typography.body2.color,
        marginBottom: '10px'
    },
    iconButton: {
        color: theme.typography.body2.color,
    },
    subheaderUserCard: {
        ...theme.subheaderUserCard,
        textDecoration: 'none',
    },
    linkPost: theme.linkPost,
    btnCheckout: {
        borderRadius: "999px",
        backgroundColor: "#0078d2",
        color: "#fff",

        "&:hover": {
            color: "#0078d2",
        }

    }
}));

const Post = ({ article }) => {
    const classes = useStyles();
    const { user, id, createdAt, images, price, title, description, location: { provinceId, districtId, wardId } } = article;


    const addressInit = {
        province: "Lỗi lấy tên tỉnh",
        district: "lỗi lấy huyện",
        ward: "lỗi lấy tên xã"
    }

    const [address, setAddress] = useState(addressInit);

    useEffect(() => {
        Promise.all([getProvince(provinceId), getDistrict(districtId), getWard(wardId)])
            .then(res =>
                setAddress(
                    {
                        province: res[0].Title,
                        district: res[1].Title,
                        ward: res[2].Title
                    }
                )
            )
            .catch(() => setAddress(addressInit))
    }, []);


    return (
        <>
            <Head
                title={`${user.username} - Bài viết `}
            />
            <WebLayout>
                <br />
                <Container maxWidth='lg'>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} key='post'>
                            <Paper variant="outlined" square className={classes.articleWrapper}>
                                <UserPortalCard
                                    user={user}
                                    cardProps={{
                                        subheader: <>
                                            <Tooltip title={moment.unix(createdAt).format('DD-MM-YYYY')}><a className={classes.linkPost}>{moment.unix(createdAt).format('DD-MM-YYYY')}</a></Tooltip>
                                            <DotDivider />
                                        </>,
                                        action:
                                            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>

                                            </Stack>,
                                        classes: {
                                            root: classes.userCard
                                        },
                                        subheaderTypographyProps: {
                                            className: classes.subheaderUserCard
                                        }
                                    }}
                                />
                                <div style={{ marginLeft: '20px' }}>
                                    <Stack direction="row" alignItems="center">
                                        <LocationOnIcon />
                                        <h4 style={{ fontWeight: 400, color: "#40403f" }}>
                                            <a 
                                            href={`https://www.google.com/maps/search/${address.ward}, ${address.district}, ${address.province}`}
                                            target="_blank" rel="noreferrer">
                                            {`${address.ward}, ${address.district}, ${address.province}`}
                                            </a>
                                        </h4>
                                    </Stack>
                                </div>
                                <hr />

                                <Button className={classes.btnCheckout} size='large'>Đặt xe</Button>
                                
                                <Stack direction="row" justifyContent="space-around" >
                                    <h1>{title}</h1>
                                    <h1 style={{ color: "red" }}>{formatSpacingNumber(price)}đ/ngày</h1>
                                </Stack>
                                <div style={{ boxSizing: "border-box", padding: "20px" }}>{HTMLReactParse(description)}</div>
                            </Paper>
                            <ImageList >
                                {
                                    images.map(item => (
                                        <ImageListItem key={item.id}>
                                            <img
                                                src={`${API_URL}/images/${item.link}`}
                                                alt={item}
                                            />
                                        </ImageListItem>
                                    ))
                                }
                            </ImageList>

                            <Card>
                                <Box ml={3} mt={3} mb={4} >
                                    {/* ////////////// */}
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </WebLayout>
        </>
    )
}

Post.getInitialProps = async (ctx) => {
    const { slug } = ctx.query;

    const article = await getPost(slug);
    return { article };
}

export default Post; 