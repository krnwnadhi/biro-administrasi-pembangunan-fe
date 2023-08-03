import {
    AppShell,
    Aside,
    Box,
    Burger,
    Divider,
    Footer,
    Header,
    MediaQuery,
    Navbar,
    ScrollArea,
    Text,
    useMantineTheme,
} from "@mantine/core";
import { Link, useLocation } from "react-router-dom";

import DarkModeBtn from "../MantineUI/DarkModeBtn";
import MenuMantine from "../MantineUI/MenuMantine";
import NavbarDashboard from "./NavbarDashboard";
import PostList from "../Posts/PostList";
import TableMantine from "../MantineUI/TableMantine";
import { useState } from "react";

// import NavbarDashboard from "./NavbarDashboard";

function Dashboard(/*{ children }*/) {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);

    // const withouSidebarRoutes = [
    //     // "/",
    //     "404",
    //     "/signin",
    //     "/signup",
    //     // "/dashboard",
    //     // "/berita",
    // ];

    // const { pathname } = useLocation();
    // if (withouSidebarRoutes.some((item) => pathname.includes(item)))
    //     return null;

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
            {/* <TableMantine /> */}
            <PostList />
        </AppShell>
    );
}

export default Dashboard;
