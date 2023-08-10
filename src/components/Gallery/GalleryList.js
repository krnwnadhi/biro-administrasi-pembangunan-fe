import {
    ActionIcon,
    AppShell,
    Box,
    Burger,
    Button,
    Center,
    Container,
    Divider,
    Footer,
    Group,
    Header,
    Image,
    Loader,
    MediaQuery,
    Navbar,
    Pagination,
    ScrollArea,
    SimpleGrid,
    Space,
    Text,
    TextInput,
    useMantineTheme,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import DarkModeBtn from "../MantineUI/DarkModeBtn";
import { IconTrash } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import NavbarDashboard from "../pages/NavbarDashboard";
import React from "react";
import axios from "axios";
import { baseGalleryURL } from "../../utils/baseURL";
import { fetchAllGalleryAction } from "../redux/slices/gallery/gallerySlice";

// import DateFormatter from "../../../utils/dateFormatter";

// const useStyles = createStyles((theme) => ({
//     card: {
//         backgroundColor:
//             theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
//         "&:hover": {
//             transform: "scale(1.02)",
//         },
//         transition: "transform 500ms ease",
//     },

//     title: {
//         fontWeight: 700,
//         fontFamily: `Greycliff CF, ${theme.fontFamily}`,
//         lineHeight: 1.2,
//     },

//     body: {
//         padding: theme.spacing.xl,
//     },
// }));

const GalleryList = () => {
    // const { classes } = useStyles();
    const dispatch = useDispatch();
    const [opened, setOpened] = useState(false);

    const theme = useMantineTheme();

    useEffect(() => {
        dispatch(fetchAllGalleryAction());
        window.scrollTo(0, 0);
    }, [dispatch]);

    const gallery = useSelector((state) => state?.gallery);
    const { galleryList = [], appError, serverError, loading } = gallery;
    // console.log(galleryList);

    const [galleryItem, setGalleryItem] = useState([galleryList]);
    const [load, setLoad] = useState(false);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(12);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");

    useEffect(() => {
        const abortController = new AbortController();
        // console.log(galleryItem);
        getGallery();

        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        setTimeout(() => setLoad(false), 2000);

        return () => {
            abortController.abort();
        };
    }, [page, keyword]);

    const getGallery = async () => {
        const response = await axios.get(
            `${baseGalleryURL}?search_query=${keyword}&page=${page}&limit=${limit}`
        );
        // console.log(response.data.result);
        setGalleryItem(response.data.result);
        setPage(response.data.page);
        setPages(response.data.totalItem);
        setRows(response.data.totalPage);
    };

    const handlePageChange = (event) => {
        setPage(event);
        // console.log(event);
    };

    const searchData = (e) => {
        e.preventDefault();
        setLoad(true);
        setTimeout(() => {
            setPage(0);
            setKeyword(query);
            setLoad(false);
        }, 2500);
    };

    const resetData = (e) => {
        e.preventDefault();
        setQuery("");
    };

    const handleTextInput = (e) => {
        setQuery(e.target.value);
    };

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
                    Gallery
                </Text>

                <Divider labelPosition="center" my="xl" />

                <Group mb={30} position="center">
                    <TextInput
                        placeholder="Cari Berdasarkan Judul"
                        value={query}
                        onChange={handleTextInput}
                        sx={!query ? { width: "54%" } : { width: "50%" }}
                    />
                    {load ? (
                        <Button
                            loading={
                                load ? (
                                    <Loader size="md" variant="dots" />
                                ) : null
                            }
                        />
                    ) : (
                        <Button onClick={searchData}>Cari </Button>
                    )}
                    <ActionIcon
                        onClick={resetData}
                        disabled={!query}
                        variant="subtle"
                        color="red"
                        sx={!query ? { display: "none" } : null}
                    >
                        <IconTrash size={14} />
                    </ActionIcon>
                </Group>

                <SimpleGrid
                    cols={4}
                    spacing="lg"
                    verticalSpacing="xl"
                    breakpoints={[
                        { maxWidth: 980, cols: 3, spacing: "md" },
                        { maxWidth: 755, cols: 2, spacing: "sm" },
                        { maxWidth: 600, cols: 1, spacing: "sm" },
                    ]}
                >
                    {loading ? (
                        <Center style={{ minHeight: "70vh" }}>
                            <Loader size="xl" />
                        </Center>
                    ) : appError || serverError ? (
                        <h2>
                            {appError}
                            {serverError}
                        </h2>
                    ) : galleryItem?.length === 0 ? (
                        <h2>Tidak ada Post</h2>
                    ) : null}

                    {
                        galleryItem?.map((item, index) => {
                            return (
                                <Center
                                    key={index}
                                    component={Link}
                                    to={`/dashboard/update-gallery/${item?._id}`}
                                    sx={{ textDecoration: "none" }}
                                >
                                    <Image
                                        key={index}
                                        radius="md"
                                        // height={200}
                                        // width={200}
                                        fit="cover"
                                        src={item?.image}
                                        alt="With default placeholder"
                                        withPlaceholder
                                        caption={item?.title}
                                    />
                                </Center>
                            );
                        })
                        // .sort((a, b) => (a > b ? 1 : -1))
                    }

                    {/* {galleryList.length > 0 ? (
                        galleryList
                            ?.map((item, index) => {
                                return (
                                    <Center key={index}>
                                        <Image
                                            key={index}
                                            radius="md"
                                            // height={200}
                                            // width={200}
                                            fit="cover"
                                            src={item?.image}
                                            alt="With default placeholder"
                                            withPlaceholder
                                            caption={item?.title}
                                        />
                                    </Center>
                                );
                            })
                            .sort((a, b) => (a > b ? 1 : -1))
                    ) : (
                        <Center>
                            <Text align="center" size={20}>
                                Belum ada Gambar
                            </Text>
                        </Center>
                    )} */}

                    {/* {loading ? (
                        <Center style={{ minHeight: "70vh" }}>
                            <Loader size="xl" variant="dots" />
                        </Center>
                    ) : appError || serverError ? (
                        <h2>
                            {appError}
                            {serverError}
                        </h2>
                    ) : null}
                    {galleryList?.length <= 0 ? (
                        <h2>Tidak ada Post</h2>
                    ) : (
                        galleryList
                            ?.map((item, index) => {
                                if (item.length !== 0) {
                                    return (
                                        <Center key={index}>
                                            <Image
                                                key={index}
                                                radius="md"
                                                // height={200}
                                                // width={200}
                                                fit="cover"
                                                src={item?.image}
                                                alt="With default placeholder"
                                                withPlaceholder
                                                caption={item?.title}
                                            />
                                        </Center>
                                    );
                                } else {
                                    return console.log(" ");
                                }
                            })
                            .sort((a, b) => (a > b ? 1 : -1))
                    )} */}
                </SimpleGrid>

                <Space h="xl" />

                <Text size="sm">
                    Halaman {rows ? page : 0} dari {rows}
                    <Space h="xs" />
                    Total : {pages} Item
                </Text>
                <Center>
                    <Box p={20}>
                        <Pagination
                            onChange={handlePageChange}
                            total={rows}
                            withControls
                            withEdges
                        />
                    </Box>
                </Center>
            </Container>
        </AppShell>

        // <div>
        //     {loading ? (
        //         <Center style={{ minHeight: "70vh" }}>
        //             <Loader size="xl" variant="dots" />
        //         </Center>
        //     ) : appError || serverError ? (
        //         <h2>
        //             {appError}
        //             {serverError}
        //         </h2>
        //     ) : galleryList?.length <= 0 ? (
        //         <h2>Tidak ada Post</h2>
        //     ) : (
        //         galleryList?.map((item, index) => {
        //             return (
        //                 <List key={index}>
        //                     <List.Item>{item.title}</List.Item>
        //                     <List.Item>
        //                         {item.images.map((file, index) => {
        //                             return (
        //                                 <div key={index}>
        //                                     <Text>{file.fileName}</Text>
        //                                     {/* <Text>{file.filePath}</Text> */}
        //                                     <Image
        //                                         // width={200}
        //                                         height={80}
        //                                         fit="contain"
        //                                         radius="md"
        //                                         src={file.filePath}
        //                                         alt="Random unsplash image"
        //                                     />
        //                                     <Text>{file.fileType}</Text>
        //                                     <Text>{file.fileSize}</Text>
        //                                 </div>
        //                             );
        //                         })}
        //                     </List.Item>
        //                     <Divider />
        //                 </List>
        //             );
        //         })
        //     )}
        // </div>
    );
};

export default GalleryList;
