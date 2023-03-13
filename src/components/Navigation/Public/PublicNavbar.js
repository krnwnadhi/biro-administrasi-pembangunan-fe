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
    Menu,
    ScrollArea,
    SimpleGrid,
    Text,
    ThemeIcon,
    Tooltip,
    UnstyledButton,
    createStyles,
} from "@mantine/core";
import {
    IconArrowsLeftRight,
    IconBook,
    IconBrandFacebook,
    IconBrandInstagram,
    IconBrandTwitter,
    IconBrandYoutube,
    IconChartPie3,
    IconChevronDown,
    IconCode,
    IconCoin,
    IconFingerprint,
    IconNotification,
    IconTrash,
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
        borderRadius: theme.radius.md,

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

const mockdata = [
    {
        icon: IconCode,
        title: "Open source",
        description: "This Pokémon's cry is very loud and distracting",
    },
    {
        icon: IconCoin,
        title: "Free for everyone",
        description: "The fluid of Smeargle's tail secretions changes",
    },
    {
        icon: IconBook,
        title: "Documentation",
        description: "Yanma is capable of seeing 360 degrees without",
    },
    {
        icon: IconFingerprint,
        title: "Security",
        description: "The shell's rounded shape and the grooves on its.",
    },
    {
        icon: IconChartPie3,
        title: "Analytics",
        description: "This Pokémon uses its flying ability to quickly chase",
    },
    {
        icon: IconNotification,
        title: "Notifications",
        description: "Combusken battles with the intensely hot flames it spews",
    },
];

export default function PublicNavbar() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
        useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const [linksOpenedTwo, { toggle: toggleLinksTwo }] = useDisclosure(false);
    const [linksOpenedThree, { toggle: toggleLinksThree }] =
        useDisclosure(false);
    const { classes, theme } = useStyles();

    const withouSidebarRoutes = ["404", "/signin", "/signup", "/dashboard"];

    const { pathname } = useLocation();
    if (withouSidebarRoutes.some((item) => pathname.includes(item)))
        return null;

    const links = mockdata.map((item) => (
        <UnstyledButton className={classes.subLink} key={item.title}>
            <Group noWrap align="flex-start">
                <ThemeIcon size={34} variant="default" radius="md">
                    <item.icon size={22} color={theme.fn.primaryColor()} />
                </ThemeIcon>
                <div>
                    <Text size="sm" weight={500}>
                        {item.title}
                    </Text>
                    <Text size="xs" color="dimmed">
                        {item.description}
                    </Text>
                </div>
            </Group>
        </UnstyledButton>
    ));

    return (
        <Box pb={60}>
            <Header fixed="false" height={60} px="md">
                <Group position="apart" sx={{ height: "100%" }}>
                    <Text
                        sx={{
                            color:
                                theme.colorScheme === "dark"
                                    ? theme.white
                                    : theme.black,
                        }}
                    >
                        Logo Biro AdPemb
                    </Text>
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
                                <SimpleGrid cols={2} spacing={4}>
                                    {links}
                                </SimpleGrid>
                            </HoverCard.Dropdown>
                        </HoverCard>

                        <Menu
                            transition="scale-y"
                            trigger="hover"
                            exitTransitionDuration={0}
                        >
                            <Menu.Target>
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
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Label>Danger zone</Menu.Label>
                                <Menu.Item
                                    icon={<IconArrowsLeftRight size={14} />}
                                >
                                    Transfer my data
                                </Menu.Item>
                                <Menu.Item
                                    color="red"
                                    icon={<IconTrash size={14} />}
                                >
                                    Delete my account
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>

                        <Menu
                            transition="scale-y"
                            trigger="hover"
                            exitTransitionDuration={0}
                        >
                            <Menu.Target>
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
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item
                                    icon={<IconArrowsLeftRight size={14} />}
                                >
                                    Transfer my data
                                </Menu.Item>
                                <Menu.Item icon={<IconTrash size={14} />}>
                                    Delete my account
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>

                        <Link to="/kontak" className={classes.link}>
                            Kontak
                        </Link>
                        {/* <Link to="/dashboard" className={classes.link}>
                            Dashboard
                        </Link> */}
                    </Group>

                    <Group
                        spacing={4}
                        className={classes.social}
                        position="right"
                        noWrap
                    >
                        <DarkModeBtn />
                        <ActionIcon size="lg" color="dark">
                            <Tooltip transition="slide-up" label="Facebook">
                                <IconBrandFacebook size={18} stroke={1.5} />
                            </Tooltip>
                        </ActionIcon>
                        <ActionIcon size="lg" color="dark">
                            <Tooltip transition="slide-up" label="Twitter">
                                <IconBrandTwitter size={18} stroke={1.5} />
                            </Tooltip>
                        </ActionIcon>
                        <ActionIcon size="lg" color="dark">
                            <Tooltip transition="slide-up" label="Youtube">
                                <IconBrandYoutube size={18} stroke={1.5} />
                            </Tooltip>
                        </ActionIcon>
                        <ActionIcon size="lg" color="dark">
                            <Tooltip transition="slide-up" label="Instagram">
                                <IconBrandInstagram size={18} stroke={1.5} />
                            </Tooltip>
                        </ActionIcon>
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
                title="Logo Biro AdPemb"
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
                    <Collapse in={linksOpened}>{links}</Collapse>

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

                    <Collapse in={linksOpenedTwo}>
                        <UnstyledButton className={classes.subLink}>
                            <Text size="sm" weight={500} color="dimmed" mx={10}>
                                Testing #1
                            </Text>
                        </UnstyledButton>
                        <UnstyledButton className={classes.subLink} mx={10}>
                            <Text size="sm" weight={500} color="dimmed">
                                Testing #2
                            </Text>
                        </UnstyledButton>
                        <UnstyledButton className={classes.subLink} mx={10}>
                            <Text size="sm" weight={500} color="dimmed">
                                Testing #3
                            </Text>
                        </UnstyledButton>
                    </Collapse>

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

                    <Collapse in={linksOpenedThree}>
                        <UnstyledButton className={classes.subLink}>
                            <Text size="sm" weight={500} color="dimmed" mx={10}>
                                Testing #4
                            </Text>
                        </UnstyledButton>
                        <UnstyledButton className={classes.subLink} mx={10}>
                            <Text size="sm" weight={500} color="dimmed">
                                Testing #5
                            </Text>
                        </UnstyledButton>
                        <UnstyledButton className={classes.subLink} mx={10}>
                            <Text size="sm" weight={500} color="dimmed">
                                Testing #6
                            </Text>
                        </UnstyledButton>
                    </Collapse>
                    <a href="/kontak" className={classes.link}>
                        Kontak
                    </a>

                    <Divider
                        my="xl"
                        color={
                            theme.colorScheme === "dark" ? "dark.5" : "gray.3"
                        }
                    />

                    <Group position="center" pb="xl" px="md">
                        <DarkModeBtn />
                        <ActionIcon size="lg">
                            <Tooltip label="Facebook">
                                <IconBrandFacebook size={18} stroke={1.5} />
                            </Tooltip>
                        </ActionIcon>
                        <ActionIcon size="lg">
                            <Tooltip label="Twitter">
                                <IconBrandTwitter size={18} stroke={1.5} />
                            </Tooltip>
                        </ActionIcon>
                        <ActionIcon size="lg">
                            <Tooltip label="Youtube">
                                <IconBrandYoutube size={18} stroke={1.5} />
                            </Tooltip>
                        </ActionIcon>
                        <ActionIcon size="lg">
                            <Tooltip label="Instagram">
                                <IconBrandInstagram size={18} stroke={1.5} />
                            </Tooltip>
                        </ActionIcon>
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}
