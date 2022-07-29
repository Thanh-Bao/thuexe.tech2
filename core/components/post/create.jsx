/* eslint-disable @next/next/no-img-element */
import { API_URL } from '@/config';
import { upload } from '@api/media';
import { createPost } from '@api/post';
import { PhotoLibrarySharp } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, ImageList, ImageListItem, Input, Stack, Tooltip, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { ContentState, Editor, EditorState } from 'draft-js';
import "draft-js/dist/Draft.css";
import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import UserPostCreatePortalCard from '../user/post/userPostCreatePortalCard';
import PostCreateLoading from './create/loading';

import { useDispatch } from 'react-redux';
import { addPost } from '@/reduxTookit/slices/postsIndexSlice'
import { postMapper } from '@/helper/mapper';
import TextField from '@mui/material/TextField';
import NumberFormat from 'react-number-format';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { getProvinces, getDistricts, getWards } from '@api/address';


const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            prefix="VNĐ  "
        />
    );
});

const useStyles = makeStyles((theme) => ({
    titleCreatePost: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textEditor: {
        minHeight: "6em",
        cursor: "text",
        width: '500px',
    },
    dialog: {
        alignItems: 'baseline'
    },
    actionPost: {
        border: '1px solid rgba(0, 0, 0, 0.12)',
        margin: '10px 0',
        padding: '7px 0',
        borderRadius: '4px'
    },
    uploadPost: {
        width: '100%',
        background: '#000000',
        color: 'white'
    },
    disabledUploadPost: {
        background: '#d6d6d6'
    },
    uploadMedia: {
        display: 'none'
    },
    buttonUpload: {
        '&:hover': {
            background: '#3d3d3d'
        }
    }
}));

const PostCreate = (props, ref) => {

    const [price, setPrice] = useState(300000);
    const [showErrorPrice, setErrorPrice] = useState(false);

    const [title, setTitle] = useState("");
    const [showErrorTitle, setErrorTitle] = useState(false);
    const [showErrorContent, setErrorContent] = useState(false);

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistrics] = useState([]);
    const [wards, setWards] = useState([]);

    const [provinceId, setProvinceId] = useState(4);
    const [districtId, setDistrictId] = useState(16);
    const [wardId, setWardId] = useState(1034);


    useEffect(() => {
        getProvinces()
            .then(({ LtsItem }) => {
                setProvinces(LtsItem);
            })
            .catch(() => alert("Lỗi lấy danh sách tỉnh"))
    }, [])

    useEffect(() => {
        if (provinceId != null) {
            getDistricts(provinceId)
                .then(list => {
                    if (list != null && list.length > 0) {
                        setDistrics(list);
                    }
                })
                .catch(() => alert("Lỗi lấy danh sách huyện"))
        }
    }, [provinceId])

    useEffect(() => {
        if (districtId != null) {
            getWards(districtId)
                .then(list => {
                    if (list != null && list.length > 0) {
                        setWards(list);
                    }
                })
                .catch(() => alert("Lỗi lấy danh sách xã"))
        }
    }, [districtId])

    //____________________________________________
    const styles = useStyles();
    const { me, afterLogin = () => { } } = props;

    const [open, setOpen] = useState(false);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [handlingRequest, setHandlingRequest] = useState(false);
    const [fileUploads, setFileUploads] = useState([]);
    const [fileLoadings, setFileLoadings] = useState([]);

    const editorRef = useRef(null);
    const userCard = useRef(null);
    const loadingModal = useRef(null);
    const dispatch = useDispatch();

    useImperativeHandle(ref, () => ({
        open: () => {
            handleOpen();
        }
    }));

    const handleOpen = () => { setOpen(true); }
    const handleClose = () => { setOpen(false) }
    const focusEditor = () => { editorRef.current.focus(); }

    const uploadFiles = event => {
        const files = event.target.files;
        const filesName = _.map(Array.from(files), item => item.name);

        setFileLoadings([...fileLoadings, filesName]);

        const fileHaveUploaded = _.map(Array.from(files), file => {
            return new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append('media', file, file.name);

                upload(formData).then(mediaDoc => {
                    setFileLoadings(_.filter(fileLoadings, item => item != file.name));
                    resolve(mediaDoc);
                }).catch(error => {
                    reject(error)
                });
            })
        });

        Promise.all(fileHaveUploaded).then(mediaDocs => {
            setFileUploads(_.concat(mediaDocs, fileUploads));
        }).catch(error => { })
    }

    const uploadPost = event => {
        setHandlingRequest(true);
        loadingModal.current.open();

        const mediaIds = fileUploads.map(item => ({ link: item }));

        const description = editorState.getCurrentContent().getPlainText();

        const params = {
            description: description,
            images: mediaIds,
            price: price,
            title: title,
            location: {
                provinceId: provinceId,
                districtId: districtId,
                wardId: wardId
            }
        }
        createPost(params).then(post => {
            setEditorState(EditorState.push(editorState, ContentState.createFromText('')));
            setFileUploads([]);
            handleClose();
            const data = postMapper(post);
            dispatch(addPost(data))
        }).finally(() => {
            setHandlingRequest(false);
            loadingModal.current.close();
        })
    }
    //_______________________________________

    const handlePriceChange = event => {
        const value = event.target.value;
        setPrice(value);
        if (value > 300000 && value <= 10000000) {
            setErrorPrice(false);
        } else {
            setErrorPrice(true);
        }
    }

    const handleTitleChange = event => {
        const title = event.target.value;
        setTitle(title.toUpperCase());
        if (title.length >= 5 && title.length < 30) {
            setErrorTitle(false);
        } else {
            setErrorTitle(true);
        }
    }

    const handleLocationChange = ({ target: { name, value } }) => {
        switch (name) {
            case 'province':
                setProvinceId(value);
                setDistrictId(null);
                setWardId(null);
                break;
            case 'district':
                setDistrictId(value);
                setWardId(null);
                break;
            case 'ward':
                setWardId(value);
                break;
            default:
                alert("lỗi chọn Id địa chỉ");
                break;
        }
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose} classes={{ container: styles.dialog }}>
                <DialogTitle className={styles.titleCreatePost}> Đăng bài </DialogTitle>
                <DialogContent dividers>
                    <UserPostCreatePortalCard ref={userCard} user={me} />

                    <br />
                    <TextField
                        onChange={handleTitleChange}
                        style={{ width: "100%" }}
                        label="Nhập tên xe, hãng, ..."
                        value={title}
                        error={showErrorTitle}
                        helperText={showErrorTitle ? "Tên xe thiểu 5 ký tự, tối đa 30 ký tự" : ""}
                        variant="outlined" />
                    <br />
                    <br />
                    <TextField
                        onChange={handlePriceChange}
                        style={{ width: "100%" }}
                        label="Giá thuê theo ngày" variant="outlined"
                        error={showErrorPrice}
                        helperText={showErrorPrice ? "Tối thiểu 300K, tối đa 10 triệu" : ""}
                        value={price}
                        InputProps={{
                            inputComponent: NumberFormatCustom,
                        }}
                    />
                    <br />
                    <br />
                    <Stack direction="row" spacing={2} justifyContent="space-around">
                        <FormControl fullWidth>
                            <InputLabel>Chọn tỉnh</InputLabel>
                            <Select
                                name="province"
                                value={provinceId}
                                label="Chọn tỉnh"
                                onChange={handleLocationChange}
                            >
                                {provinces.map(({ ID, Title }) =>
                                    <MenuItem key={ID} value={ID}>{Title}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel>Chọn huyện</InputLabel>
                            <Select
                                name="district"
                                value={districtId}
                                label="Chọn huyện"
                                onChange={handleLocationChange}
                            >
                                {districts.map(({ ID, Title }) =>
                                    <MenuItem key={ID} value={ID}>{Title}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel>Chọn xã</InputLabel>
                            <Select
                                name="ward"
                                value={wardId}
                                label="Chọn xã"
                                onChange={handleLocationChange}
                            >
                                {wards.map(({ ID, Title }) =>
                                    <MenuItem key={ID} value={ID}>{Title}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Stack>
                    <h4>Mô tả:</h4>
                    {showErrorContent && 
                    <spans style={{ color: 'red' }}>
                        Tối thiểu 140 ký tự ({editorState.getCurrentContent().getPlainText().length}/140)
                        </spans>}
                    <hr />
                    <br />
                    <div className={styles.textEditor} onClick={focusEditor}>
                        <Editor
                            ref={editorRef}
                            editorState={editorState}
                            onChange={e => {
                                setEditorState(e);
                                if (editorState.getCurrentContent().getPlainText().length > 140) {
                                    setErrorContent(false);
                                } else {
                                    setErrorContent(true);
                                }
                            }}
                            placeholder="Mô tả về động cơ, tình trạng bảo dưỡng, phụ phí, bảo hiểm, hồ sơ đăng kiểm, ..."
                        />
                    </div>

                    {(fileUploads.length > 0 || fileLoadings.length > 0) &&
                        <Scrollbars className={styles.wrapper} style={{ height: '225px', width: '100%' }} universal={true}>

                            <ImageList variant="masonry" cols={2} gap={8}>
                                {fileUploads.map(item => (


                                    <ImageListItem key={item}>
                                        <img
                                            src={`${API_URL}/images/${item}`}
                                            srcSet={`${API_URL}/images/${item}`}
                                            alt={item}
                                        />
                                    </ImageListItem>
                                ))}

                                {fileLoadings.map((item, key) => (
                                    <ImageListItem key={key}>
                                        <Box component="span" sx={{ height: '30px', }}>
                                            <CircularProgress />
                                        </Box>
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </Scrollbars>
                    }

                    <div className={styles.actionPost} >
                        <Tooltip title='thêm hình ảnh'>
                            <label htmlFor="icon-button-file">
                                <Input id="icon-button-file" inputProps={{ multiple: true, accept: "image/*,video/*" }} type="file" className={styles.uploadMedia} onChange={uploadFiles} />

                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <PhotoLibrarySharp />
                                </IconButton>
                            </label>
                        </Tooltip>
                        <Typography variant="button">
                            Thêm hình ảnh
                        </Typography>
                    </div>

                    <div>
                        <LoadingButton
                            onClick={uploadPost}
                            color="primary"
                            disabled={(!(editorState.getCurrentContent().hasText() && editorState.getCurrentContent().getPlainText().length > 140) || fileUploads.length == 0 || fileLoadings > 0 || handlingRequest == true && !showErrorPrice && !showErrorTitle || title.length < 5)}
                            loadingPosition="start"
                            loading={handlingRequest}
                            className={styles.buttonUpload}
                            classes={{
                                root: styles.uploadPost,
                                disabled: styles.disabledUploadPost
                            }}>
                            Đăng bài
                        </LoadingButton>
                    </div>
                </DialogContent>
            </Dialog>

            <PostCreateLoading ref={loadingModal} />
        </>
    )
}

export default forwardRef(PostCreate);