import {
    Alert,
    AppShell,
    Box,
    Burger,
    Button,
    Center,
    Container,
    Divider,
    FileInput,
    Footer,
    Group,
    Header,
    Image,
    Loader,
    MediaQuery,
    Navbar,
    Paper,
    ScrollArea,
    Select,
    Space,
    Text,
    TextInput,
    Textarea,
    useMantineTheme,
} from "@mantine/core";
import {
    IconAlertCircle,
    IconChevronLeft,
    IconPhoto,
    IconUpload,
    IconX,
} from "@tabler/icons-react";
import { Link, Redirect } from "react-router-dom";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import DarkModeBtn from "../MantineUI/DarkModeBtn";
import NavbarDashboard from "../pages/NavbarDashboard";
import { createGalleryAction } from "../redux/slices/gallery/gallerySlice";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

// import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function CreateGallery() {
    const [value, setValue] = useState("");

    const [opened, setOpened] = useState(false);

    const history = useHistory();

    const theme = useMantineTheme();

    const dispatch = useDispatch();

    const gallery = useSelector((state) => state);
    // console.log(gallery);
    const { appError, loading, serverError, isCreated } = gallery;

    const form = useForm({
        initialValues: {
            title: "",
            image: "",
        },

        validate: {
            title: hasLength({ min: 3 }, "Terlalu pendek. Min. 3 huruf"),
            image: isNotEmpty("Tidak boleh kosong"),
        },
    });

    const formOnSubmit = form.onSubmit((values) => {
        dispatch(createGalleryAction(values));
        setTimeout(() => {
            history.push("/dashboard/gallery");
        }, 3000);
    });

    if (isCreated) return <Redirect to="/dashboard/gallery" />;

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
            <>
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
                        Tambah Gallery
                    </Text>

                    <Divider labelPosition="center" my="xl" />

                    {loading ? (
                        <Center style={{ minHeight: "80vh" }}>
                            <Loader mt={20} size="lg" variant="dots" />
                        </Center>
                    ) : (
                        <form
                            onSubmit={formOnSubmit}
                            encType="multipart/form-data"
                            method="POST"
                        >
                            {appError || serverError ? (
                                <Alert
                                    icon={<IconAlertCircle size={16} />}
                                    title="Error!"
                                    color="red"
                                >
                                    Tidak ada Token! Silahkan login kembali.
                                </Alert>
                            ) : (
                                <>
                                    <TextInput
                                        mb={20}
                                        withAsterisk
                                        label="Judul Gambar"
                                        aria-label="My input"
                                        placeholder="Min. 3 Huruf"
                                        {...form.getInputProps("title")}
                                        // disabled
                                    />
                                    <FileInput
                                        label="Gambar"
                                        description="Input gambar berekstensi jpg, jpeg, atau png & berukuran < 1Mb."
                                        placeholder="Silahkan Pilih Gambar"
                                        // multiple
                                        clearable
                                        required
                                        withAsterisk
                                        accept="image/png, image/jpeg, image/jpg"
                                        // value={value}
                                        // onChange={handleFileChange}
                                        {...form.getInputProps("image")}
                                        // disabled
                                    />
                                </>
                            )}

                            <Text size="sm" color="red" ta="center">
                                {appError
                                    ? "File terlalu besar, Silahkan refresh browser dahulu"
                                    : null}
                            </Text>

                            <Space h="xl" />

                            {loading ? (
                                <Button disabled compact loading>
                                    Loading...
                                </Button>
                            ) : (
                                <Button
                                    disabled={!form.isValid()}
                                    type="submit"
                                    fullWidth
                                >
                                    Tambah
                                </Button>
                            )}
                        </form>
                    )}
                </Container>
            </>
        </AppShell>
    );
}
