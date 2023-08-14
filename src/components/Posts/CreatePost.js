// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import "react-quill/dist/quill.snow.css";

import {
    Alert,
    AppShell,
    Box,
    Burger,
    Button,
    Center,
    Container,
    Divider,
    FileButton,
    FileInput,
    Footer,
    Group,
    Header,
    Loader,
    MediaQuery,
    Navbar,
    ScrollArea,
    Select,
    Space,
    Text,
    TextInput,
    useMantineTheme,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import EditorToolbar, { formats, modules } from "../pages/EditorToolbar";
import {
    IconAlertCircle,
    IconCheck,
    IconPhoto,
    IconUpload,
    IconX,
} from "@tabler/icons-react";
import { Link, Redirect } from "react-router-dom";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import DarkModeBtn from "../MantineUI/DarkModeBtn";
import NavbarDashboard from "../pages/NavbarDashboard";
import ReactQuill from "react-quill";
import { createPostAction } from "../redux/slices/posts/postSlice";
import { fetchAllCategoryAction } from "../redux/slices/category/categorySlice";

export default function CreatePost() {
    const [file, setFile] = useState(null);
    const resetRef = useRef(null);

    const [editorMarkdownValue, setEditorMarkdownValue] = useState("");
    const [opened, setOpened] = useState(false);
    const theme = useMantineTheme();

    const clearFile = () => {
        setFile(null);
        resetRef.current?.();
    };

    const dispatch = useDispatch();

    const onEditorContentChanged = (content) => {
        // setEditorHtmlValue(content.html);
        setEditorMarkdownValue(content.markdown);
    };

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

    const formOnSubmit = form.onSubmit(
        (values) => dispatch(createPostAction(values))
        // console.log(values)
    );

    // Redirect
    // if (isCreated) return <Redirect to="/posts" />;
    if (isCreated) return <Redirect to="/dashboard" />;

    return (
        <AppShell
            styles={{
                main: {
                    background:
                        theme.colorScheme === "dark"
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            navbar={
                <Navbar
                    p="sm"
                    width={{ sm: 150, lg: 280 }}
                    hiddenBreakpoint="sm"
                    hidden={!opened}
                >
                    <Divider mt={10} />
                    <Navbar.Section
                        grow
                        component={ScrollArea}
                        mx="-xs"
                        px="xs"
                    >
                        <Box py="md">
                            <NavbarDashboard />
                        </Box>
                    </Navbar.Section>
                </Navbar>
            }
            footer={
                <Footer
                    sx={{ display: "flex", justifyContent: "center" }}
                    height={60}
                    p="md"
                >
                    <Text size="sm">
                        Copyright © 2023{" "}
                        <Text component={Link} to="/" weight="bold">
                            Biro Adminitrasi Pembangunan Provinsi Jambi
                        </Text>
                    </Text>
                </Footer>
            }
            header={
                <Header height={{ base: 50, md: 70 }} p="md">
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            height: "100%",
                        }}
                    >
                        <MediaQuery
                            largerThan="sm"
                            styles={{ display: "none" }}
                        >
                            <Burger
                                opened={opened}
                                onClick={() => setOpened((o) => !o)}
                                size="sm"
                                color={theme.colors.gray[6]}
                                mr="xl"
                            />
                        </MediaQuery>
                        <Text ml={10}>Biro Administrasi Pembangunan</Text>
                        <DarkModeBtn />
                    </div>
                </Header>
            }
        >
            {/* <Paper radius="md" p="xl" style={{ minHeight: "78vh" }}> */}
            <Container size="lg">
                <Text
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                    size="lg"
                    weight={500}
                    mt={30}
                >
                    Tambah Berita & Kegiatan
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
                            placeholder="Min. 3 Huruf"
                            {...form.getInputProps("title")}
                        />

                        <Space h="xl" />

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

                        <Space h="xl" />

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

                        <Space h="xl" />

                        {/* <Dropzone
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
                                style={{
                                    minHeight: 75,
                                    pointerEvents: "none",
                                }}
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
                        </Dropzone> */}

                        <FileInput
                            label="Gambar Carousel"
                            description="Input gambar berekstensi jpg, jpeg, atau png & berukuran < 1Mb."
                            placeholder="Silahkan Pilih Gambar Untuk Carousel"
                            clearable
                            required
                            withAsterisk
                            accept="image/png, image/jpeg, image/jpg"
                            // value={value}
                            // onChange={handleFileChange}
                            {...form.getInputProps("image")}
                        />

                        <Text size="sm" color="red" ta="center">
                            {appErrorPost
                                ? "File terlalu besar, Silahkan refresh browser dahulu"
                                : null}
                        </Text>

                        <Space h="xl" />

                        <Group position="apart" mt="xl">
                            {loadingPost ? (
                                <Button disabled loading fullWidth>
                                    Loading...
                                </Button>
                            ) : (
                                <Button
                                    disabled={!form.isValid()}
                                    type="submit"
                                    // compact
                                    fullWidth
                                    onClick={() => {
                                        showNotification({
                                            id: "load-data",
                                            loading: true,
                                            title: "Loading..",
                                            message: "Menambahkan data",
                                            autoClose: false,
                                            disallowClose: true,
                                        });

                                        setTimeout(() => {
                                            updateNotification({
                                                id: "load-data",
                                                color: "teal",
                                                title: "Sukses",
                                                message:
                                                    "Berhasil menambahkan data",
                                                icon: <IconCheck size={16} />,
                                                autoClose: 4500,
                                            });
                                        }, 3000);
                                    }}
                                >
                                    Tambah
                                </Button>
                            )}
                        </Group>
                    </form>
                )}
            </Container>
        </AppShell>
    );
}
