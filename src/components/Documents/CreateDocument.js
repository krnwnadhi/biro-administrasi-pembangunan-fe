import {
    AppShell,
    Box,
    Burger,
    Button,
    Container,
    Divider,
    FileInput,
    Footer,
    Group,
    Header,
    MediaQuery,
    Navbar,
    ScrollArea,
    Space,
    Text,
    TextInput,
    useMantineTheme,
} from "@mantine/core";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";

import DarkModeBtn from "../MantineUI/DarkModeBtn";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import NavbarDashboard from "../pages/NavbarDashboard";
import axios from "axios";
import { baseDocumentURL } from "../../utils/baseURL";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useState } from "react";

export default function CreateDocument(props) {
    const [errorMsg, setErrorMsg] = useState("");

    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);

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
                        Tambah Dokumen
                    </Text>

                    <Divider labelPosition="center" my="xl" />

                    <form onSubmit={formOnSubmit}>
                        <TextInput
                            withAsterisk
                            label="Judul"
                            aria-label="Judul"
                            placeholder="Judul Dokumen"
                            {...form.getInputProps("title")}
                        />

                        <Space h="xl" />

                        <TextInput
                            withAsterisk
                            label="Deskripsi"
                            aria-label="Deskripsi"
                            placeholder="Deskripsi"
                            {...form.getInputProps("description")}
                        />

                        <Space h="xl" />

                        <FileInput
                            label="Files"
                            description="Input files berekstensi pdf/excel berukuran kurang dari 1MB!"
                            placeholder="Silahkan Pilih Files"
                            clearable
                            required
                            withAsterisk
                            accept=".pdf, .xls, .xlsx"
                            error={errorMsg}
                            {...form.getInputProps("files")}
                        />

                        <Group position="center" mt="xl">
                            <Button
                                disabled={!form.isValid()}
                                type="submit"
                                fullWidth
                                // compact
                            >
                                Tambah
                            </Button>
                        </Group>
                    </form>
                </Container>
            </>
        </AppShell>
    );
}
