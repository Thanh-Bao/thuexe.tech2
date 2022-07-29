/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ImageList, ImageListItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import _ from 'lodash';
import React, { useState } from 'react';
import { API_URL } from '@/config';


import ImageLoader from './imageLoader';

const useStyles = makeStyles((theme) => ({
    dialog: {
        alignItems: 'baseline',
        minHeight: '100vh',
    },
    rootDialog: {
        backgroundColor: theme.palette.primary.bgColor,
        marginTop: '52px'
    },
    showPointer: { cursor: 'pointer' },

    nextImg: {
        position: 'absolute',
        right: '1%',
        top: '50%',
        cursor: 'pointer',
        transform: 'translate(0, -50%)',
        backgroundColor: '#9e9e9e85',
    },
    prevImg: {
        position: 'absolute',
        left: '1%',
        top: '50%',
        cursor: 'pointer',
        transform: 'translate(0, -50%)',
        backgroundColor: '#9e9e9e85',
    }
}));

const GalleryPostMedia = (props) => {
    const media = [...props.media];
    let cols = 2;

    return (
        <>
            {
                media.length > 1 ?
                    <ImageList sx={{ height: '30vh', overflowY: 'hidden' }} variant="quilted" cols={cols} gap={2} {...props}>
                        {
                            media.map(item => (
                                <ImageListItem key={item.id}>
                                    <ImageLoader item={item} />
                                </ImageListItem>
                            ))
                        }
                    </ImageList> :
                    <img src={`${API_URL}/images/${media[0].link}`}/>
            }
        </>
    );
}

export default GalleryPostMedia;