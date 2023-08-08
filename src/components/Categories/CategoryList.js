import {
    ActionIcon,
    AppShell,
    Avatar,
    Badge,
    Box,
    Burger,
    Button,
    Container,
    Divider,
    Footer,
    Group,
    Header,
    Loader,
    MediaQuery,
    Navbar,
    Paper,
    ScrollArea,
    Table,
    Text,
    useMantineTheme,
} from "@mantine/core";
import { IconPencil, IconPlus } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DarkModeBtn from "../MantineUI/DarkModeBtn";
import DateFormatter from "../../utils/dateFormatter";
import { Link } from "react-router-dom";
import NavbarDashboard from "../pages/NavbarDashboard";
import { fetchAllCategoryAction } from "../redux/slices/category/categorySlice";

const CategoryList = () => {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllCategoryAction());
    }, [dispatch]);

    const category = useSelector((state) => state?.category);

    const { categoryList = [], loading, appError, serverError } = category;

    // console.log(category);

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
                    Daftar Kategori
                </Text>

                <Divider labelPosition="center" my="xl" />

                <Button
                    component={Link}
                    to="/dashboard/tambah-kategori"
                    variant=""
                    leftIcon={<IconPlus size={14} />}
                    mb={30}
                    // compact
                >
                    Tambah
                </Button>
                <div>
                    {loading ? (
                        <Loader size="xl" variant="dots" />
                    ) : appError || serverError ? (
                        <h2>
                            {appError}
                            {serverError}
                        </h2>
                    ) : categoryList?.length <= 0 ? (
                        <h2>Tidak ada kategori</h2>
                    ) : (
                        <Table
                            striped
                            highlightOnHover
                            verticalSpacing="sm"
                            horizontalSpacing="md"
                            withBorder
                        >
                            <thead>
                                <tr>
                                    <th style={{ width: "30%" }}>Author</th>
                                    <th>Kategori</th>
                                    <th>createdAt</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categoryList &&
                                    categoryList.map((category) => (
                                        <tr key={category?._id}>
                                            <td>
                                                <Group>
                                                    <Avatar
                                                        size={40}
                                                        radius={40}
                                                        src={
                                                            category?.user
                                                                ?.profilePhoto
                                                        }
                                                    />
                                                    <div>
                                                        <Text
                                                            size="sm"
                                                            weight={500}
                                                        >
                                                            {
                                                                category?.user
                                                                    ?.fullName
                                                            }
                                                        </Text>
                                                        <Text
                                                            color="dimmed"
                                                            size="xs"
                                                        >
                                                            {
                                                                category?.user
                                                                    ?.email
                                                            }
                                                        </Text>
                                                    </div>
                                                </Group>
                                            </td>
                                            <td>
                                                <Badge
                                                    variant={
                                                        theme.colorScheme ===
                                                        "dark"
                                                            ? "light"
                                                            : "outline"
                                                    }
                                                >
                                                    {category?.title}
                                                </Badge>
                                            </td>
                                            <td>
                                                <DateFormatter
                                                    date={category?.createdAt}
                                                />
                                            </td>
                                            <td>
                                                <Group
                                                    spacing={0}
                                                    position="left"
                                                >
                                                    <ActionIcon
                                                        component={Link}
                                                        to={`/dashboard/update-kategori/${category?._id}`}
                                                        color="blue"
                                                    >
                                                        <IconPencil
                                                            size={16}
                                                            stroke={1.5}
                                                        />
                                                    </ActionIcon>
                                                </Group>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    )}
                </div>
            </Container>
        </AppShell>
    );
};

export default CategoryList;
