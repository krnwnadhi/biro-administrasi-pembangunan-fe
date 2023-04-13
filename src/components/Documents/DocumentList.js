import {
    ActionIcon,
    Avatar,
    Box,
    Button,
    Card,
    Center,
    CloseButton,
    Container,
    Divider,
    Group,
    Image,
    List,
    Loader,
    Pagination,
    Paper,
    SimpleGrid,
    Table,
    Text,
    TextInput,
    createStyles,
    useMantineTheme,
} from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { IconTrash } from "@tabler/icons-react";
import React from "react";
import axios from "axios";
import { baseDocumentURL } from "../../utils/baseURL";
import download from "downloadjs";
import { fetchAllGalleryAction } from "../redux/slices/gallery/gallerySlice";
import { useMediaQuery } from "@mantine/hooks";

// import DateFormatter from "../../../utils/dateFormatter";

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        "&:hover": {
            transform: "scale(1.02)",
        },
        transition: "transform 500ms ease",
    },

    title: {
        fontWeight: 700,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        lineHeight: 1.2,
    },

    body: {
        padding: theme.spacing.xl,
    },
}));

const DocumentList = () => {
    const { classes } = useStyles();
    const dispatch = useDispatch();
    // const { _id } = useParams();

    useEffect(() => {
        dispatch(fetchAllGalleryAction());
        window.scrollTo(0, 0);
    }, [dispatch]);

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

    const downloadFile = async (id, path, mimetype) => {
        try {
            const result = await axios.get(`${baseDocumentURL}/${id}`, {
                responseType: "blob",
            });
            const split = path.split("/");
            const filename = split[split.length - 1];

            setErrorMsg("");

            return download(result.data, filename, mimetype);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMsg("Error while downloading file. Try again later");
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
                <Table>
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
                                        <td>
                                            <a
                                                href="#/"
                                                // to={`${baseDocumentURL}/${_id}`}
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
                                                // loading={loading}
                                                // onClick={openDeleteModal}
                                                // onClick={handleDelete}
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
                {errorMsg && <p>{errorMsg}</p>}
            </Container>
        </div>
    );
};

export default DocumentList;
