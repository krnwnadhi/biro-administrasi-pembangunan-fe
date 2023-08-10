import {
    Alert,
    Box,
    Button,
    Container,
    Paper,
    Text,
    TextInput,
} from "@mantine/core";
import EditorToolbar, { formats, modules } from "../pages/EditorToolbar";
import React, { useEffect } from "react";
import {
    fetchDetailPostAction,
    updatePostAction,
} from "../redux/slices/posts/postSlice";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";

import { IconAlertCircle } from "@tabler/icons-react";
import ReactQuill from "react-quill";
import { Redirect } from "react-router-dom";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";

const UpdatePost = (props) => {
    const {
        computedMatch: {
            params: { id },
        },
    } = props;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDetailPostAction(id));
        window.scrollTo(0, 0);
    }, [id, dispatch]);

    //select post
    const postData = useSelector((state) => state?.post);
    const { postDetail } = postData;

    //select updated post
    const updatedPost = useSelector((state) => state?.post);
    console.log(updatedPost);
    const { appError, loading, serverError, isUpdated } = updatedPost;

    const form = useForm({
        initialValues: {
            title: postDetail?.title,
            description: postDetail?.description,
        },

        validate: {
            title: isNotEmpty("Judul tidak boleh kosong"),
            description: isNotEmpty("Deskripsi tidak boleh kosong"),
        },
    });

    const formOnSubmit = form.onSubmit((values) => {
        const data = {
            title: values.title,
            description: values.description,
            id,
        };
        dispatch(updatePostAction(data));
    });

    // const openUpdateModal = () =>
    //     openConfirmModal({
    //         title: "Hapus Berita?",
    //         centered: true,
    //         children: (
    //             <Text size="sm">
    //                 {`Apakah Anda yakin ingin update berita "${postDetail?.title}" ?`}
    //             </Text>
    //         ),
    //         labels: { confirm: "Hapus", cancel: "Batal" },
    //         confirmProps: { color: "red" },
    //         onCancel: () => {
    //             showNotification({
    //                 title: "Batal",
    //                 message: "Aksi dibatalkan",
    //                 color: "red",
    //             });
    //         },
    //         onConfirm: () => {
    //             setTimeout(() => {
    //                 dispatch(updatePostAction(data));
    //                 showNotification({
    //                     title: "Hapus",
    //                     message: "Post berhasil dihapus",
    //                 });
    //             }, 1500);
    //         },
    //     });

    //redirect
    if (isUpdated) return <Redirect to={`/posts/${postDetail?._id}`} />;

    return (
        <Paper style={{ minHeight: "92vh" }}>
            <Container mt={10}>
                {appError || serverError ? (
                    <Alert
                        icon={<IconAlertCircle size={16} />}
                        title="Error!"
                        color="red"
                    >
                        {appError}
                        {serverError}
                    </Alert>
                ) : null}
                <form onSubmit={formOnSubmit}>
                    <TextInput
                        placeholder="Judul"
                        label="Judul"
                        withAsterisk
                        {...form.getInputProps("title")}
                    />

                    <Box mt={20}>
                        <EditorToolbar toolbarId={"t2"} />
                        <ReactQuill
                            theme="snow"
                            placeholder={"Tulis sesuatu..."}
                            modules={modules("t2")}
                            formats={formats}
                            {...form.getInputProps("description")}
                        />
                    </Box>

                    {loading ? (
                        <Button mt={10} fullWidth disabled>
                            Loading...
                        </Button>
                    ) : (
                        <Button mt={10} fullWidth type="submit">
                            Update
                        </Button>
                    )}
                </form>
            </Container>
        </Paper>
    );
};

export default UpdatePost;
