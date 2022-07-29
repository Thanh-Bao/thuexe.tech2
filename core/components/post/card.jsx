import { Card, CardContent, Tooltip, Typography, Chip, Stack, IconButton, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import ShowMore from '../showMore';
import GalleryPostMedia from '../gallery/postMedia';
import { PhotoLibrary, ModeComment } from '@mui/icons-material';
import { roundToNearest5 } from '@/helper/roundNumber';
import PostUserCard from './userCard';
import moment from 'moment-timezone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaidIcon from '@mui/icons-material/Paid';
import { getProvinceName } from '@/helper/address';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const useStyles = makeStyles((theme) => ({
    media: {
        height: '100%',
        maxHeight: '140px',
        width: 'auto',
        margin: 'auto'
    },
    postLink: {
        color: "inherit",
        textDecoration: 'none'
    },
    wrapperHeader: {
        padding: '12px'
    },
    contentWrapper: {
        backgroundColor: theme.article.contentWrapper.bgColor,
        border: "1.5px solid #d4d4d4",
        "&:hover": {
            boxShadow: "#acaeb0 3px 8px 15px",
        }
    },
    subheaderUserCard: {
        ...theme.subheaderUserCard,
        textDecoration: 'none',
    },
    content: {
        padding: '0 12px',
    },
    mediaCounter: {
        padding: '0 16px 12px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    mediaCount: {
        color: theme.typography.body2.color,
        backgroundColor: "##e8e8e8",
        "&:hover": {
            backgroundColor: "#a6a6a6",
        }
    },
    mediaWrapper: {
        margin: 0
    },
    linkPost: theme.linkPost,
    actionPostWrapper: {

    },
    actionPostItem: {
        textAlign: 'center',
    },
    chipStats: {
        backgroundColor: 'transparent'
    },
    dividerAction: {
        borderColor: '#eaebed45'
    },
    titleContainer: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
    },
    title: {
        margin: '5px',
    },
    price: {
        margin: 0,
        color: 'red',
    },
}));

const PostCard = (props) => {
    const classes = useStyles();

    const { media, content, title, price, id, rented, createdAt, location: { provinceId } } = props.post;

    return (
        <a style={{ textDecoration: 'none' }} href={`/post/${id}`}>
            <Card className={classes.contentWrapper}>
                <PostUserCard post={props.post} />
                <Divider />
                <div className={classes.titleContainer}>
                    <h3 className={classes.title}>{title}</h3>
                    <h3 className={classes.price}>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ/ngày</h3>
                </div>
                <Stack spacing={1}>
                    <CardContent className={classes.content}>
                        <ShowMore>
                            <Typography variant="body2" fontSize={'14px'} component="p">
                                {content}
                            </Typography>
                        </ShowMore>
                    </CardContent>
                    <CardContent className={classes.mediaCounter}>
                        <div>
                            <Tooltip title="Xem toàn bộ hình">
                                <Chip size='small' className={classes.mediaCount} avatar={<PhotoLibrary />} label={`${media.length < 5 ? media.length : `${roundToNearest5(media.length)}+`}`} />
                            </Tooltip>
                        </div>
                        <div>
                            {getProvinceName(provinceId) &&
                                <Stack direction="row" alignItems="center">
                                    <LocationOnIcon />
                                    <span style={{ fontWeight: 400, color: "#40403f" }}>{getProvinceName(provinceId)}</span>
                                </Stack>
                            }
                        </div>
                    </CardContent>
                    <GalleryPostMedia media={media} maximage={4} className={classes.mediaWrapper} />
                    <Stack direction="row" justifyContent="space-around" >
                        <h5 style={{ color: rented ? 'red' : 'green', display: "block", verticalAlign: 'middle' }}>
                            <Stack direction="row" alignItems="center">
                                <PaidIcon />
                                {rented ? "Đã có người thuê" : "Chưa có người thuê"}
                            </Stack>
                        </h5>
                        <h5 style={{ display: "block", verticalAlign: 'middle' }}>
                            <Stack direction="row" alignItems="center">
                                <AccessTimeIcon />
                                {moment.unix(createdAt).format('DD-MM-YYYY')}
                            </Stack>
                        </h5>
                    </Stack>
                </Stack>
            </Card>
        </a >
    );
}

export default PostCard;

