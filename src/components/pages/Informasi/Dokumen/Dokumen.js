import {
    ActionIcon,
    Anchor,
    Box,
    Breadcrumbs,
    Button,
    Center,
    CloseButton,
    Container,
    Group,
    Loader,
    Pagination,
    Paper,
    Space,
    Table,
    Text,
    TextInput,
    useMantineTheme,
} from "@mantine/core";
import { IconDownload, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import DateFormatter from "../../../../utils/dateFormatter";
import React from "react";
import axios from "axios";
import { baseDocumentURL } from "../../../../utils/baseURL";
import download from "downloadjs";
import { useMediaQuery } from "@mantine/hooks";

const Dokumen = () => {
    const [filesList, setFilesList] = useState([]);
    // console.log(filesList);
    const [errorMsg, setErrorMsg] = useState("");

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState("");

    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`);

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
        // console.log(event);
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
            // console.log(result.data, filename, mimetype)
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMsg("Error ketika mendownload file! Coba lagi nanti!");
            } else if (error.response.status === 500) {
                setErrorMsg("File Tidak ditemukan!");
            }
        }
    };

    const breadcrumbsItem = [
        { title: "Home", href: "/" },
        { title: "Informasi", href: "#" },
        { title: "Dokumen", href: "#" },
    ].map((item, index) => (
        <Anchor
            href={item.href}
            key={index}
            size="sm"
            underline={false}
            truncate="end"
        >
            {item.title}
        </Anchor>
    ));

    return (
        <Paper sx={{ minHeight: "75vh" }}>
            <Container size="lg" mt={20}>
                <Breadcrumbs>{breadcrumbsItem}</Breadcrumbs>

                <Space h="xl" />

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
                            <th
                                style={{
                                    textAlign: "center",
                                    display: mobile ? "none" : "block",
                                }}
                            >
                                Deskripsi
                            </th>
                            <th style={{ textAlign: "center", width: "10%" }}>
                                Download
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filesList?.length > 0 ? (
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
                                            <DateFormatter date={createdAt} />
                                        </td>
                                        <td
                                            style={{
                                                textAlign: "center",
                                            }}
                                        >
                                            {title}
                                        </td>
                                        <td
                                            style={{
                                                textAlign: "center",
                                                display: mobile
                                                    ? "none"
                                                    : "block",
                                            }}
                                        >
                                            {description}
                                        </td>
                                        <td>
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
                                                <ActionIcon>
                                                    <IconDownload
                                                        color="blue"
                                                        size="20"
                                                    />
                                                </ActionIcon>
                                            </a>
                                        </td>
                                        {/* <td
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                            }}
                                        >
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
                                        </td> */}
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
        </Paper>
    );
};

export default Dokumen;
