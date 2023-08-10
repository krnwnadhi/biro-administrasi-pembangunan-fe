import {
    Alert,
    AppShell,
    Box,
    Burger,
    Button,
    Container,
    Divider,
    Footer,
    Group,
    Header,
    MediaQuery,
    Navbar,
    ScrollArea,
    Text,
    TextInput,
    useMantineTheme,
} from "@mantine/core";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import DarkModeBtn from "../MantineUI/DarkModeBtn";
import { IconAlertCircle } from "@tabler/icons-react";
import NavbarDashboard from "../pages/NavbarDashboard";
import { createCategoryAction } from "../redux/slices/category/categorySlice";
import { useForm } from "@mantine/form";
import { useState } from "react";

export default function AddCategory() {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const dispatch = useDispatch();
    const form = useForm({
        initialValues: {
            title: "",
        },

        validate: (value) => ({
            title:
                value.title.length < 3 ? "Terlalu pendek. Min. 3 huruf" : null,
        }),
    });

    //get data from store
    const state = useSelector((state) => state?.category);
    const { appError, loading, serverError, isCreated } = state;

    const formOnSubmit = form.onSubmit((values) =>
        dispatch(createCategoryAction(values))
    );

    // Redirect
    if (isCreated) return <Redirect to="/dashboard/kategori" />;

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
                <Container mt={140} size="lg">
                    <Text
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                        size="lg"
                        weight={500}
                        mt={30}
                    >
                        Tambah Kategori
                    </Text>

                    <Divider labelPosition="center" my="xl" />

                    <form onSubmit={formOnSubmit}>
                        {appError || serverError ? (
                            <Alert
                                icon={<IconAlertCircle size={16} />}
                                title="Error!"
                                color="red"
                            >
                                {appError}
                            </Alert>
                        ) : null}
                        <TextInput
                            withAsterisk
                            label="Kategori"
                            placeholder="Contoh: Teknologi, Min. 3 Karakter"
                            // {...form.getInputProps("title")}
                            value={form.values.title.toUpperCase()}
                            onChange={(event) =>
                                form.setFieldValue(
                                    "title",
                                    event.currentTarget.value.toUpperCase()
                                )
                            }
                        />

                        <Group position="center" mt="xl">
                            {loading ? (
                                <Button disabled compact loading>
                                    Loading...
                                </Button>
                            ) : (
                                <Button
                                    disabled={!form.isValid()}
                                    type="submit"
                                    // compact
                                    fullWidth
                                >
                                    Tambah
                                </Button>
                            )}
                        </Group>
                    </form>
                </Container>
            </>
        </AppShell>
    );
}
