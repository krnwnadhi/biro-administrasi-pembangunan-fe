import {
    Alert,
    Button,
    Container,
    Paper,
    TextInput,
    Textarea,
} from "@mantine/core";
import React, { useEffect } from "react";
import {
    fetchDetailPostAction,
    updatePostAction,
} from "../redux/slices/posts/postSlice";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";

import { IconAlertCircle } from "@tabler/icons-react";
import { Redirect } from "react-router-dom";

const UpdatePost = (props) => {
    const {
        computedMatch: {
            params: { id },
        },
    } = props;
    // console.log(id);

    // const [value, setValue] = useState("");
    // const [valueDesc, setValueDesc] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDetailPostAction(id));
    }, [id, dispatch]);

    //select post
    const postData = useSelector((state) => state?.post);
    const { postDetail } = postData;
    // console.log(postDetail);

    //select updated post
    const updatedPost = useSelector((state) => state?.post);
    const { appError, loading, serverError, isUpdated } = updatedPost;

    const form = useForm({
        initialValues: {
            title: postDetail?.title,
            description: postDetail?.description,
            // category: "",
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
        // console.log(values);
    });

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
                        // value={value}
                        // onChange={(e) => {
                        //     setValue(e.target.value);
                        // }}
                        {...form.getInputProps("title")}
                    />

                    <Textarea
                        placeholder="Deskripsi"
                        label="Deskripsi"
                        withAsterisk
                        autosize
                        minRows={4}
                        maxRows={8}
                        // value={valueDesc}
                        // onChange={(e) => {
                        //     setValueDesc(e.target.value);
                        // }}
                        {...form.getInputProps("description")}
                    />

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
