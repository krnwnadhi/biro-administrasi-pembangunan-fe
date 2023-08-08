import {
    ActionIcon,
    Box,
    Burger,
    Center,
    Collapse,
    Divider,
    Drawer,
    Group,
    Header,
    HoverCard,
    Image,
    ScrollArea,
    SimpleGrid,
    Text,
    ThemeIcon,
    Tooltip,
    UnstyledButton,
    createStyles,
} from "@mantine/core";
import {
    IconBinaryTree,
    IconBook,
    IconBrandFacebook,
    IconBrandInstagram,
    IconBrandYoutube,
    IconBuilding,
    IconBuildingArch,
    IconChevronDown,
    IconFileInfo,
    IconLayoutDashboard,
    IconPhotoCheck,
} from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";

import DarkModeBtn from "../../MantineUI/DarkModeBtn";
import { useDisclosure } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
    link: {
        display: "flex",
        alignItems: "center",
        height: "100%",
        paddingLeft: theme.spacing.sm,
        paddingRight: theme.spacing.sm,
        textDecoration: "none",
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        fontWeight: 500,
        fontSize: theme.fontSizes.sm,

        [theme.fn.smallerThan("sm")]: {
            height: 42,
            display: "flex",
            alignItems: "center",
            width: "100%",
        },

        ...theme.fn.hover({
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[3],
        }),
    },

    subLink: {
        width: "100%",
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
        borderRadius: theme.radius.lg,

        ...theme.fn.hover({
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[7]
                    : theme.colors.gray[3],
        }),

        "&:active": theme.activeStyles,
    },

    dropdownFooter: {
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[0],
        margin: -theme.spacing.md,
        marginTop: theme.spacing.sm,
        padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
        paddingBottom: theme.spacing.xl,
        borderTop: `1px solid ${
            theme.colorScheme === "dark"
                ? theme.colors.dark[5]
                : theme.colors.gray[1]
        }`,
    },

    hiddenMobile: {
        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },

    hiddenDesktop: {
        [theme.fn.largerThan("sm")]: {
            display: "none",
        },
    },

    social: {
        [theme.fn.smallerThan("md")]: {
            display: "none",
        },
    },
}));

const dataProfil = [
    {
        icon: IconBuildingArch,
        title: "Selayang Pandang",
        description:
            "Gambaran Umum Biro Adminsistrasi Pembangunan Provinsi Jambi",
        link: "/profil/selayangpandang",
    },
    {
        icon: IconBuilding,
        title: "Visi & Misi",
        description:
            "Visi & Misi Biro Adminsistrasi Pembangunan Provinsi Jambi",
        link: "/profil/visimisi",
    },
    {
        icon: IconBinaryTree,
        title: "Struktur Organisasi",
        description:
            "Struktur Organisasi & Pejabat Biro Adminsistrasi Pembangunan Provinsi Jambi",
        link: "/profil/struktur",
    },
];

const dataInformasi = [
    {
        icon: IconBook,
        title: "Berita dan Kegiatan",
        description: "Berita Biro Adminsistrasi Pembangunan Provinsi Jambi",
        link: "/berita",
    },
    {
        icon: IconFileInfo,
        title: "Dokumen",
        description: "Dokumen Biro Adminsistrasi Pembangunan Provinsi Jambi",
        link: "/dokumen",
    },
    {
        icon: IconPhotoCheck,
        title: "Galeri",
        description: "Galeri Biro Adminsistrasi Pembangunan Provinsi Jambi",
        link: "/galeri",
    },
];

const dataLayanan = [
    {
        icon: IconBuildingArch,
        title: "SIMANTAP",
        description: "SIMANTAP Biro Adminsistrasi Pembangunan Provinsi Jambi",
        link: "/profil",
    },
];

export default function AdminNavbar() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
        useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const [linksOpenedTwo, { toggle: toggleLinksTwo }] = useDisclosure(false);
    const [linksOpenedThree, { toggle: toggleLinksThree }] =
        useDisclosure(false);
    const { classes, theme } = useStyles();

    const withouSidebarRoutes = [
        "404",
        "/signin",
        "/signup",
        "/dashboard",
        "/kategori",
    ];

    const { pathname } = useLocation();
    if (withouSidebarRoutes.some((item) => pathname.includes(item)))
        return null;

    const linksProfil = dataProfil.map((item) => (
        <UnstyledButton className={classes.subLink} key={item.title}>
            <Group noWrap align="flex-start">
                <ThemeIcon size={34} variant="default" radius="md">
                    <item.icon size={22} color={theme.fn.primaryColor()} />
                </ThemeIcon>
                <UnstyledButton component={Link} to={item.link}>
                    <Text size="sm" weight={500}>
                        {item.title}
                    </Text>
                    <Text size="xs" color="dimmed">
                        {item.description}
                    </Text>
                </UnstyledButton>
            </Group>
        </UnstyledButton>
    ));

    const linksInformasi = dataInformasi.map((item) => (
        <UnstyledButton className={classes.subLink} key={item.title}>
            <Group noWrap align="flex-start">
                <ThemeIcon size={34} variant="default" radius="md">
                    <item.icon size={22} color={theme.fn.primaryColor()} />
                </ThemeIcon>
                <UnstyledButton component={Link} to={item.link}>
                    <Text size="sm" weight={500}>
                        {item.title}
                    </Text>
                    <Text size="xs" color="dimmed">
                        {item.description}
                    </Text>
                </UnstyledButton>
            </Group>
        </UnstyledButton>
    ));

    const linksLayanan = dataLayanan.map((item) => (
        <UnstyledButton className={classes.subLink} key={item.title}>
            <Group noWrap align="flex-start">
                <ThemeIcon size={34} variant="default" radius="md">
                    <item.icon size={22} color={theme.fn.primaryColor()} />
                </ThemeIcon>
                <UnstyledButton component={Link} to={item.link}>
                    <Text size="sm" weight={500}>
                        {item.title}
                    </Text>
                    <Text size="xs" color="dimmed">
                        {item.description}
                    </Text>
                </UnstyledButton>
            </Group>
        </UnstyledButton>
    ));

    return (
        <Box pb={75}>
            <Header fixed="false" height={75} px="xl">
                <Group position="apart" sx={{ height: "100%" }}>
                    <ActionIcon component={Link} to={`/`} color="blue">
                        <Image
                            ml={200}
                            width={250}
                            height={65}
                            // fit="cover"
                            src={
                                theme.colorScheme === "dark"
                                    ? "https://res.cloudinary.com/degzbxlnx/image/upload/v1690361888/biro-administrasi-pembangunan-setda-provinsi-jambi_wnnxqw.png"
                                    : "https://res.cloudinary.com/degzbxlnx/image/upload/v1690361888/biro-administrasi-pembangunan-setda-provinsi-jambi_1_obbwwu.png"
                            }
                            alt="With custom placeholder"
                            withPlaceholder
                            placeholder={
                                <Text size="sm">
                                    Biro Administrasi Pembangunan
                                </Text>
                            }
                        />
                    </ActionIcon>
                    <Group
                        sx={{ height: "100%" }}
                        spacing={0}
                        className={classes.hiddenMobile}
                    >
                        <Link to="/" className={classes.link}>
                            Home
                        </Link>
                        <HoverCard
                            transition="scale-y"
                            width={600}
                            position="bottom"
                            radius="md"
                            shadow="md"
                            withinPortal
                        >
                            <HoverCard.Target>
                                <UnstyledButton className={classes.link}>
                                    <Center inline>
                                        <Box component="span" mr={5}>
                                            Profil
                                        </Box>
                                        <IconChevronDown
                                            size={16}
                                            color={theme.fn.primaryColor()}
                                        />
                                    </Center>
                                </UnstyledButton>
                            </HoverCard.Target>

                            <HoverCard.Dropdown sx={{ overflow: "hidden" }}>
                                <SimpleGrid cols={1} spacing={4}>
                                    {linksProfil}
                                </SimpleGrid>
                            </HoverCard.Dropdown>
                        </HoverCard>

                        <HoverCard
                            transition="scale-y"
                            width={600}
                            position="bottom"
                            radius="md"
                            shadow="md"
                            withinPortal
                        >
                            <HoverCard.Target>
                                <UnstyledButton className={classes.link}>
                                    <Center inline>
                                        <Box component="span" mr={5}>
                                            Informasi
                                        </Box>
                                        <IconChevronDown
                                            size={16}
                                            color={theme.fn.primaryColor()}
                                        />
                                    </Center>
                                </UnstyledButton>
                            </HoverCard.Target>

                            <HoverCard.Dropdown sx={{ overflow: "hidden" }}>
                                <SimpleGrid cols={1} spacing={4}>
                                    {linksInformasi}
                                </SimpleGrid>
                            </HoverCard.Dropdown>
                        </HoverCard>
                        <HoverCard
                            transition="scale-y"
                            width={600}
                            position="bottom"
                            radius="md"
                            shadow="md"
                            withinPortal
                        >
                            <HoverCard.Target>
                                <UnstyledButton className={classes.link}>
                                    <Center inline>
                                        <Box component="span" mr={5}>
                                            Layanan
                                        </Box>
                                        <IconChevronDown
                                            size={16}
                                            color={theme.fn.primaryColor()}
                                        />
                                    </Center>
                                </UnstyledButton>
                            </HoverCard.Target>

                            <HoverCard.Dropdown sx={{ overflow: "hidden" }}>
                                <SimpleGrid cols={1} spacing={4}>
                                    {linksLayanan}
                                </SimpleGrid>
                            </HoverCard.Dropdown>
                        </HoverCard>

                        <Tooltip transition="slide-up" label="Dashboard">
                            <UnstyledButton
                                component={Link}
                                to="/dashboard"
                                className={classes.link}
                            >
                                <ActionIcon variant="transparent">
                                    <IconLayoutDashboard size={18} />
                                </ActionIcon>
                            </UnstyledButton>
                        </Tooltip>
                    </Group>
                    <Group
                        spacing={4}
                        className={classes.social}
                        position="right"
                        noWrap
                    >
                        <DarkModeBtn />
                        <Divider orientation="vertical" />
                        <ActionIcon size="lg" color="dark">
                            <Tooltip transition="slide-up" label="Facebook">
                                <IconBrandFacebook size={18} stroke={1.5} />
                            </Tooltip>
                        </ActionIcon>
                        <ActionIcon size="lg" color="dark">
                            <Tooltip transition="slide-up" label="Instagram">
                                <IconBrandInstagram size={18} stroke={1.5} />
                            </Tooltip>
                        </ActionIcon>
                        <ActionIcon size="lg" color="dark">
                            <Tooltip transition="slide-up" label="Youtube">
                                <IconBrandYoutube size={18} stroke={1.5} />
                            </Tooltip>
                        </ActionIcon>
                        {/* <ActionIcon size="lg" color="dark">
                            <Tooltip transition="slide-up" label="Twitter">
                                <IconBrandTwitter size={18} stroke={1.5} />
                            </Tooltip>
                        </ActionIcon> */}
                    </Group>
                    <Burger
                        opened={drawerOpened}
                        onClick={toggleDrawer}
                        className={classes.hiddenDesktop}
                    />
                </Group>
            </Header>

            {/* Mobile */}

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="70%"
                padding="md"
                title="Biro Administrasi Pembangunan"
                className={classes.hiddenDesktop}
                zIndex={1000000}
                transition="pop"
            >
                <ScrollArea sx={{ height: "calc(100vh - 60px)" }} mx="-md">
                    <Divider
                        my="sm"
                        color={
                            theme.colorScheme === "dark" ? "dark.5" : "gray.3"
                        }
                    />

                    <a href="/" className={classes.link}>
                        Home
                    </a>
                    <UnstyledButton
                        className={classes.link}
                        onClick={toggleLinks}
                    >
                        <Center inline>
                            <Box component="span" mr={5}>
                                Profil
                            </Box>
                            <IconChevronDown
                                size={16}
                                color={theme.fn.primaryColor()}
                            />
                        </Center>
                    </UnstyledButton>
                    <Collapse in={linksOpened}>{linksProfil}</Collapse>

                    <UnstyledButton
                        className={classes.link}
                        onClick={toggleLinksTwo}
                    >
                        <Center inline>
                            <Box component="span" mr={5}>
                                Informasi
                            </Box>
                            <IconChevronDown
                                size={16}
                                color={theme.fn.primaryColor()}
                            />
                        </Center>
                    </UnstyledButton>

                    <Collapse in={linksOpenedTwo}>{linksInformasi}</Collapse>

                    <UnstyledButton
                        className={classes.link}
                        onClick={toggleLinksThree}
                    >
                        <Center inline>
                            <Box component="span" mr={5}>
                                Layanan
                            </Box>
                            <IconChevronDown
                                size={16}
                                color={theme.fn.primaryColor()}
                            />
                        </Center>
                    </UnstyledButton>

                    <Collapse in={linksOpenedThree}>{linksLayanan}</Collapse>
                    {/* <a href="/kontak" className={classes.link}>
                        Kontak
                    </a> */}
                    <a href="/dashboard" className={classes.link}>
                        Dashboard
                    </a>

                    <Divider
                        my="xl"
                        color={
                            theme.colorScheme === "dark" ? "dark.5" : "gray.3"
                        }
                    />

                    <Group position="center" pb="xl" px="md">
                        <DarkModeBtn />
                        <Divider orientation="vertical" />

                        <ActionIcon size="lg">
                            <Tooltip label="Facebook">
                                <IconBrandFacebook size={18} stroke={1.5} />
                            </Tooltip>
                        </ActionIcon>
                        <ActionIcon size="lg">
                            <Tooltip label="Instagram">
                                <IconBrandInstagram size={18} stroke={1.5} />
                            </Tooltip>
                        </ActionIcon>
                        <ActionIcon size="lg">
                            <Tooltip label="Youtube">
                                <IconBrandYoutube size={18} stroke={1.5} />
                            </Tooltip>
                        </ActionIcon>
                        {/* <ActionIcon size="lg">
                            <Tooltip label="Twitter">
                                <IconBrandTwitter size={18} stroke={1.5} />
                            </Tooltip>
                        </ActionIcon> */}
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}
