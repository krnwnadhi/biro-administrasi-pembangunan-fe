import {
    ActionIcon,
    Button,
    Container,
    Group,
    Table,
    Text,
} from "@mantine/core";
import { IconChevronLeft, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";
import { baseDocumentURL } from "../../utils/baseURL";
import download from "downloadjs";

const DocumentList = () => {
    const [filesList, setFilesList] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const getFilesList = async () => {
            try {
                const { data } = await axios.get(`${baseDocumentURL}`);
                setErrorMsg("");
                setFilesList(data);
            } catch (error) {
                error.response && setErrorMsg(error.response.data);
            }
        };

        getFilesList();
    }, []);

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
                setErrorMsg("Error while downloading file. Try again later");
            } else if (error.response.status === 500) {
                setErrorMsg("File not found. Try again later");
            }
        }
    };

    return (
        <div>
            <Container mt={50}>
                <Button
                    mb={25}
                    component={Link}
                    to="/dashboard/tambah-document"
                >
                    Tambah Dokumen
                </Button>
                {errorMsg && <p>{errorMsg}</p>}
                <Table
                    highlightOnHover
                    withBorder
                    withColumnBorders
                    horizontalSpacing="md"
                    verticalSpacing="md"
                >
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Download File</th>
                            <th>Hapus</th>
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
                                }) => (
                                    <tr key={_id}>
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
                                        <td>
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

                <Group position="apart" mt="xl">
                    <Button
                        compact
                        component={Link}
                        color="gray"
                        to="/dashboard"
                        variant="subtle"
                        leftIcon={<IconChevronLeft size={12} />}
                        size="xs"
                    >
                        <Text>Dashboard</Text>
                    </Button>
                </Group>
            </Container>
        </div>
    );
};

export default DocumentList;
