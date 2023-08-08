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
    Header,
    MediaQuery,
    Navbar,
    Pagination,
    Paper,
    ScrollArea,
    Space,
    Table,
    Text,
    useMantineTheme,
} from "@mantine/core";
import { useEffect, useState } from "react";

import DarkModeBtn from "../MantineUI/DarkModeBtn";
import DateFormatter from "../../utils/dateFormatter";
import { IconTrash } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import NavbarDashboard from "../pages/NavbarDashboard";
import React from "react";
import axios from "axios";
import { baseDocumentURL } from "../../utils/baseURL";
import download from "downloadjs";

const DocumentList = () => {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);

    const [filesList, setFilesList] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        const abortController = new AbortController();

        getFilesList();

        window.scrollTo(0, 0);

        return () => {
            abortController.abort();
        };
    }, [page, keyword]);

    const getFilesList = async () => {
        try {
            const response = await axios.get(
                `${baseDocumentURL}?search_query=${keyword}&page=${page}&limit=${limit}`
            );
            // console.log(response);
            setErrorMsg("");
            setFilesList(response.data.result);
            setPage(response.data.page);
            setPages(response.data.totalItem);
            setRows(response.data.totalPage);
        } catch (error) {
            error.response && setErrorMsg(error.response.data);
        }
    };

    const handlePageChange = (event) => {
        setPage(event);
        console.log(event);
    };

    const downloadFile = async (id, file_path, mimetype) => {
        try {
            const result = await axios.get(`${baseDocumentURL}/${id}`, {
                responseType: "blob",
            });

            const split = file_path.split("/");
            const filename = split[split.length - 1];

            setErrorMsg("");

            return download(result.data, filename, mimetype);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMsg("Error ketika mendownload file! Coba lagi nanti!");
            } else if (error.response.status === 500) {
                setErrorMsg("File Tidak ditemukan!");
            }
        }
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
                        Daftar Dokumen
                    </Text>

                    <Divider labelPosition="center" my="xl" />

                    <Button
                        mb={20}
                        component={Link}
                        to="/dashboard/tambah-document"
                        // size="xs"
                    >
                        Tambah
                    </Button>

                    {errorMsg && <Text c="red">{errorMsg}</Text>}

                    <Table
                        highlightOnHover
                        withBorder
                        withColumnBorders
                        horizontalSpacing="xl"
                        verticalSpacing="xl"
                    >
                        <thead>
                            <tr>
                                <th style={{ textAlign: "center" }}>
                                    Tanggal Upload
                                </th>
                                <th style={{ textAlign: "center" }}>
                                    Nama Dokumen
                                </th>
                                <th style={{ textAlign: "center" }}>
                                    Deskripsi
                                </th>
                                <th style={{ textAlign: "center" }}>
                                    Download
                                </th>
                                <th style={{ textAlign: "center" }}>Hapus</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filesList.length > 0 ? (
                                filesList.map(
                                    ({
                                        _id,
                                        title,
                                        description,
                                        file_path,
                                        file_mimetype,
                                        createdAt,
                                        // index,
                                    }) => (
                                        <tr key={_id}>
                                            {/* <td>{index}</td> */}
                                            <td style={{ textAlign: "center" }}>
                                                <DateFormatter
                                                    date={createdAt}
                                                />
                                            </td>
                                            <td>{title}</td>
                                            <td>{description}</td>
                                            <td style={{ textAlign: "center" }}>
                                                <a
                                                    href="#/"
                                                    onClick={() =>
                                                        downloadFile(
                                                            _id,
                                                            file_path,
                                                            file_mimetype
                                                        )
                                                    }
                                                >
                                                    Download
                                                </a>
                                            </td>
                                            <td style={{ textAlign: "center" }}>
                                                <ActionIcon
                                                    color="red"
                                                    onClick={async () => {
                                                        await axios.delete(
                                                            `${baseDocumentURL}/${_id}`
                                                        );
                                                        setFilesList(
                                                            filesList.filter(
                                                                (post) => {
                                                                    return (
                                                                        post._id !==
                                                                        _id
                                                                    );
                                                                }
                                                            )
                                                        );
                                                    }}
                                                >
                                                    <IconTrash
                                                        size={16}
                                                        stroke={1.5}
                                                    />
                                                </ActionIcon>
                                            </td>
                                        </tr>
                                    )
                                )
                            ) : (
                                <tr>
                                    <td style={{ fontWeight: "300" }}>
                                        Tidak ada file. Silahkan tambah file.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>

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
            </>
        </AppShell>
    );
};

export default DocumentList;
