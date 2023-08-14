import {
    ActionIcon,
    Alert,
    AppShell,
    Box,
    Burger,
    Button,
    Center,
    Divider,
    Footer,
    Group,
    Header,
    Image,
    MediaQuery,
    Navbar,
    ScrollArea,
    Text,
    TextInput,
    useMantineTheme,
} from "@mantine/core";
import { IconAlertCircle, IconCheck, IconTrash } from "@tabler/icons-react";
import { Link, Redirect, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
    deleteGalleryAction,
    fetchDetailGalleryAction,
    updateGalleryAction,
} from "../redux/slices/gallery/gallerySlice";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useDispatch, useSelector } from "react-redux";

import DarkModeBtn from "../MantineUI/DarkModeBtn";
import NavbarDashboard from "../pages/NavbarDashboard";
import { openConfirmModal } from "@mantine/modals";
import { useForm } from "@mantine/form";

const UpdateGallery = () => {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const dispatch = useDispatch();
    const params = useParams();
    const id = params.id;

    //get data from store
    const state = useSelector((state) => state?.gallery);
    // console.log(state);
    const {
        appError,
        loading,
        serverError,
        galleryDetail = [],
        isEdited,
        isDeleted,
    } = state;
    // console.log(galleryDetail);

    useEffect(() => {
        dispatch(fetchDetailGalleryAction(id));
    }, [dispatch, id]);

    const form = useForm({
        initialValues: {
            title: galleryDetail?.title,
        },

        validate: (value) => ({
            title:
                value.title.length < 3 ? "Terlalu pendek. Min. 3 huruf" : null,
        }),
    });

    const formOnSubmit = form.onSubmit((values) =>
        dispatch(updateGalleryAction({ title: values.title, id }))
    );

    const openDeleteModal = () =>
        openConfirmModal({
            title: "Hapus?",
            centered: true,
            children: (
                <Text size="sm">
                    {`Apakah Anda yakin ingin menghapus foto "${galleryDetail?.title}" ?`}
                </Text>
            ),
            labels: { confirm: "Hapus", cancel: "Batal" },
            confirmProps: { color: "red" },
            onCancel: () => {
                showNotification({
                    title: "Batal",
                    message: "Aksi dibatalkan",
                    color: "red",
                });
            },
            onConfirm: () => {
                showNotification({
                    id: "load-data",
                    loading: true,
                    title: "Loading..",
                    message: "Menghapus data",
                    autoClose: false,
                    disallowClose: true,
                });
                setTimeout(() => {
                    dispatch(deleteGalleryAction(id));
                    updateNotification({
                        id: "load-data",
                        color: "teal",
                        title: "Sukses",
                        message: "Berhasil menghapus data",
                        icon: <IconCheck size={16} />,
                        autoClose: 3000,
                    });
                }, 2000);
            },
        });

    //redirect
    if (isEdited || isDeleted) return <Redirect push to="/dashboard/gallery" />;

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
            <Text
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
                size="lg"
                weight={500}
                mt={30}
            >
                Update Gallery
            </Text>

            <Divider labelPosition="center" my="xl" />

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

                <Center>
                    <Image
                        radius="md"
                        height={250}
                        width={250}
                        fit="cover"
                        src={galleryDetail?.image}
                        alt="With default placeholder"
                        withPlaceholder
                        // caption={galleryDetail?.title}
                    />
                </Center>

                <TextInput
                    withAsterisk
                    label="Judul"
                    placeholder="Min. 3 huruf"
                    value={form.values.title}
                    onChange={(event) =>
                        form.setFieldValue("title", event.currentTarget.value)
                    }
                    disabled
                    // onChange={form.setValues((prev) => ({ ...prev }))}

                    // {...form.getInputProps("title")}
                />

                <Group position="center" mt="xl">
                    {loading ? (
                        <Button disabled compact loading>
                            Loading...
                        </Button>
                    ) : (
                        <Group>
                            <Button
                                // disabled={!form.isValid()}
                                type="submit"
                                color="green"
                                disabled
                            >
                                Update
                            </Button>
                            <ActionIcon color="red" onClick={openDeleteModal}>
                                <IconTrash size={16} stroke={1.5} />
                            </ActionIcon>
                        </Group>
                    )}
                </Group>
            </form>
        </AppShell>
    );
};

export default UpdateGallery;
