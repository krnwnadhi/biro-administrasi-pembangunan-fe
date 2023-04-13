import {
    Alert,
    Box,
    Button,
    Center,
    Container,
    Divider,
    FileInput,
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
import {
    IconAlertCircle,
    IconChevronLeft,
    IconPhoto,
    IconUpload,
    IconX,
} from "@tabler/icons-react";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { baseDocumentURL } from "../../utils/baseURL";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

export default function CreateDocument(props) {
    // const [file, setFile] = useState(null);
    const [previewSrc, setPreviewSrc] = useState("");
    const [loading, setLoading] = useState(false);

    const [errorMsg, setErrorMsg] = useState("");
    const [isPreviewAvailable, setIsPreviewAvailable] = useState(false);
    const dropzoneRef = useRef();

    const theme = useMantineTheme();

    const history = useHistory();

    // useEffect(() => {
    //     dropzoneRef.current.focus();
    // }, []);

    const form = useForm({
        initialValues: {
            title: "",
            description: "",
            files: "",
        },

        validate: {
            title: hasLength({ min: 5 }, "Terlalu pendek. Minimal 5 huruf."),
            description: hasLength(
                { min: 5 },
                "Terlalu pendek. Minimal 5 huruf."
            ),
            files: isNotEmpty("Silahkan upload dokumen"),
        },
    });

    const formOnSubmit = form.onSubmit(async (values, event) => {
        event.preventDefault();
        // console.log(values);

        try {
            if (
                form.values.title.trim() !== "" &&
                form.values.description.trim() !== ""
            ) {
                if (form.values.files) {
                    const formData = new FormData();
                    formData.append("files", form.values.files);
                    formData.append("title", form.values.title);
                    formData.append("description", form.values.description);

                    setErrorMsg("");

                    await axios.post(`${baseDocumentURL}`, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });
                    history.push("/dashboard/documents");
                } else {
                    setErrorMsg("Please select a file to add.");
                }
            } else {
                setErrorMsg("Please enter all the field values.");
            }
        } catch (error) {
            error.response && setErrorMsg(error.response.data);
        }
    });

    // Redirect
    // if (isCreated) return <Redirect to="/dashboard/gallery" />;

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
                    Tambah Dokumen
                </Text>

                <Divider labelPosition="center" my="xl" />

                <form onSubmit={formOnSubmit}>
                    <TextInput
                        withAsterisk
                        label="Judul"
                        aria-label="Judul"
                        placeholder="Judul Artikel"
                        {...form.getInputProps("title")}
                    />

                    <TextInput
                        withAsterisk
                        label="Deskripsi"
                        aria-label="Deskripsi"
                        placeholder="Deskripsi"
                        {...form.getInputProps("description")}
                    />

                    <FileInput
                        label="Files"
                        description="Input files berekstensi pdf/excel."
                        placeholder="Silahkan Pilih Files"
                        // multiple
                        clearable
                        required
                        withAsterisk
                        accept="pdf, xls, xlsx"
                        error={errorMsg}
                        {...form.getInputProps("files")}
                    />

                    <Button disabled={!form.isValid()} type="submit" compact>
                        Tambah
                    </Button>
                </form>
            </Container>
        </Paper>
    );
}
