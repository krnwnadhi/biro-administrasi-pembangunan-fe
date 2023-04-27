import {
    Button,
    Container,
    Divider,
    FileInput,
    Group,
    Paper,
    Text,
    TextInput,
    useMantineTheme,
} from "@mantine/core";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { useEffect, useRef, useState } from "react";

import { IconChevronLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { baseDocumentURL } from "../../utils/baseURL";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

export default function CreateDocument(props) {
    const [errorMsg, setErrorMsg] = useState("");

    const theme = useMantineTheme();

    const history = useHistory();

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

        try {
            if (
                form.values.title.trim() !== "" &&
                form.values.description.trim() !== ""
            ) {
                if (form.values.files) {
                    const formData = new FormData();
                    formData.append("title", form.values.title);
                    formData.append("description", form.values.description);
                    formData.append("files", form.values.files);

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
                        clearable
                        required
                        withAsterisk
                        accept=".pdf, .xls, .xlsx"
                        error={errorMsg}
                        {...form.getInputProps("files")}
                    />

                    <Group position="apart" mt="xl">
                        <Button
                            compact
                            component={Link}
                            color="gray"
                            to="/dashboard/documents"
                            variant="subtle"
                            leftIcon={<IconChevronLeft size={12} />}
                            size="xs"
                        >
                            <Text>Dokumen</Text>
                        </Button>

                        <Button
                            disabled={!form.isValid()}
                            type="submit"
                            compact
                        >
                            Tambah
                        </Button>
                    </Group>
                </form>
            </Container>
        </Paper>
    );
}
