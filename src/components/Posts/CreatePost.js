// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import "react-quill/dist/quill.snow.css";

import {
    Alert,
    Box,
    Button,
    Center,
    Container,
    Divider,
    Group,
    Image,
    Loader,
    Paper,
    Select,
    Text,
    TextInput,
    Textarea,
    useMantineTheme,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import EditorToolbar, { formats, modules } from "../pages/EditorToolbar";
import {
    IconAlertCircle,
    IconPhoto,
    IconUpload,
    IconX,
} from "@tabler/icons-react";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import ReactQuill from "react-quill";
import { Redirect } from "react-router-dom";
import { createPostAction } from "../redux/slices/posts/postSlice";
import { fetchAllCategoryAction } from "../redux/slices/category/categorySlice";

// import Viewer from "../pages/Viewer";

// import EditorToolbar, { formats, modules } from "./EditorToolbar";

// import { EditorState, convertToRaw } from "draft-js";

// import { Editor } from "react-draft-wysiwyg";

// import draftToHtml from "draftjs-to-html";

export default function CreatePost() {
    const [editorMarkdownValue, setEditorMarkdownValue] = useState("");

    const onEditorContentChanged = (content) => {
        // setEditorHtmlValue(content.html);
        setEditorMarkdownValue(content.markdown);
    };
    const theme = useMantineTheme();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllCategoryAction());
    }, [dispatch]);

    //get category data from store
    const category = useSelector((state) => state?.category);
    const { categoryList = [], loading, appError, serverError } = category;

    const allCategories = categoryList?.map((category) => {
        return {
            label: category?.title,
            value: category?.title,
        };
    });

    //get post data
    const post = useSelector((state) => state?.post);
    const { appError: appErrorPost, loading: loadingPost, isCreated } = post;

    // console.log(appErrorPost);
    // console.log(loadingPost);

    const form = useForm({
        initialValues: {
            title: "",
            description: "",
            category: "",
            image: "",
        },

        validate: {
            title: hasLength({ min: 3 }, "Terlalu pendek. Min. 3 huruf"),
            description: isNotEmpty("Deskripsi tidak boleh kosong"),
            category: isNotEmpty("Kategori tidak boleh kosong"),
            image: isNotEmpty("Tidak boleh kosong"),
        },
    });

    const formOnSubmit = form.onSubmit((values) =>
        // console.log(values)
        dispatch(createPostAction(values))
    );

    // Redirect
    // if (isCreated) return <Redirect to="/posts" />;
    if (isCreated) return <Redirect to="/dashboard" />;

    return (
        <Paper radius="md" p="xl">
            <Container>
                <Text
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                    size="lg"
                    weight={500}
                >
                    Tambah Post
                </Text>

                <Divider labelPosition="center" my="xl" />

                {loading ? (
                    <Center style={{ minHeight: "80vh" }}>
                        <Loader mt={20} size="lg" variant="dots" />
                    </Center>
                ) : (
                    <form onSubmit={formOnSubmit}>
                        {appError || serverError ? (
                            <Alert
                                icon={<IconAlertCircle size={16} />}
                                title="Error!"
                                color="red"
                            >
                                Tidak ada Token! Silahkan login kembali.
                            </Alert>
                        ) : null}

                        <TextInput
                            withAsterisk
                            label="Judul"
                            aria-label="My input"
                            placeholder="Judul Artikel"
                            {...form.getInputProps("title")}
                        />

                        {/* <Textarea
                        mt={10}
                        withAsterisk
                        label="Deskripsi"
                        placeholder="Deskripsi Artikel"
                        {...form.getInputProps("description")}
                    /> */}
                        {/* <Text mt={10}>Deskripsi</Text> */}
                        <Box mt={20}>
                            <EditorToolbar toolbarId={"t2"} />
                            <ReactQuill
                                theme="snow"
                                // value={userInfo.information}
                                // onChange={oninformation}
                                placeholder={"Tulis sesuatu..."}
                                modules={modules("t2")}
                                formats={formats}
                                {...form.getInputProps("description")}
                            />
                        </Box>

                        {/* <Viewer value={editorMarkdownValue} /> */}

                        {/* <div
                        style={{
                            minHeight: "300px",
                            border: "1px solid lightgray",
                            marginTop: "10px",
                            padding: "5px",
                        }}
                    >
                        <Editor
                            editorState={editorState}
                            onEditorStateChange={(newState) => {
                                setEditorState(newState);
                            }}
                            // onEditorStateChange={setEditorState}
                            // {...form.getInputProps("description")}
                        />
                    </div>

                    <div>
                        <Textarea
                            value={draftToHtml(
                                convertToRaw(editorState.getCurrentContent())
                            )}
                            onChange={(event) => {
                                setEditorState(event.currentTarget.value);
                                // console.log(event);
                            }}
                        />
                    </div> */}

                        {/* {loading ? (
                            <Center>
                                <Loader mt={20} size="lg" variant="dots" />
                            </Center>
                        ) : ( */}
                        <Select
                            mt={10}
                            // required
                            withAsterisk
                            label="Kategori"
                            placeholder="Pilih Kategori"
                            searchable
                            nothingFound="Kategori tidak ditemukan"
                            clearable
                            transition="pop-top-left"
                            transitionDuration={80}
                            transitionTimingFunction="ease"
                            allowDeselect
                            data={allCategories}
                            maxDropdownHeight={120}
                            {...form.getInputProps("category")}
                        />
                        {/* )} */}

                        <Dropzone
                            mt={20}
                            onDrop={(image) => {
                                form.setFieldValue("image", image[0]);
                            }}
                            maxSize={1 * 1024 ** 2}
                            accept={IMAGE_MIME_TYPE}
                            name={form.values.image}
                        >
                            <Group
                                position="center"
                                spacing="xl"
                                style={{ minHeight: 75, pointerEvents: "none" }}
                            >
                                <Dropzone.Accept>
                                    <IconUpload
                                        size={50}
                                        stroke={1.5}
                                        color={
                                            theme.colors[theme.primaryColor][
                                                theme.colorScheme === "dark"
                                                    ? 4
                                                    : 6
                                            ]
                                        }
                                    />
                                </Dropzone.Accept>
                                <Dropzone.Reject>
                                    <IconX
                                        size={50}
                                        stroke={1.5}
                                        color={
                                            theme.colors.red[
                                                theme.colorScheme === "dark"
                                                    ? 4
                                                    : 6
                                            ]
                                        }
                                    />
                                </Dropzone.Reject>
                                <Dropzone.Idle>
                                    <IconPhoto size={50} stroke={1.5} />
                                </Dropzone.Idle>

                                <div>
                                    <Text size="md" inline>
                                        Seret gambar ke sini atau klik untuk
                                        memilih file
                                    </Text>
                                    <Text
                                        size="xs"
                                        color="dimmed"
                                        inline
                                        mt={7}
                                    >
                                        File hanya ber-ektensi JPEG/JPG. File
                                        tidak boleh lebih dari 1MB.
                                    </Text>
                                </div>
                            </Group>
                        </Dropzone>
                        <Text size="sm" color="red" ta="center">
                            {appErrorPost
                                ? "File terlalu besar, Silahkan refresh browser dahulu"
                                : null}
                        </Text>
                        <Group position="apart" mt="xl">
                            {/* <Button
                            compact
                            component={Link}
                            color="gray"
                            to="/posts"
                            variant="subtle"
                            leftIcon={<IconChevronLeft size={12} />}
                            size="xs"
                        >
                            <Text>Post</Text>
                        </Button> */}
                            {loadingPost ? (
                                <Button disabled compact loading>
                                    Loading...
                                </Button>
                            ) : (
                                <Button
                                    disabled={!form.isValid()}
                                    type="submit"
                                    compact
                                >
                                    Tambah
                                </Button>
                            )}
                        </Group>
                    </form>
                )}
            </Container>
        </Paper>
    );
}
