import { Code, Group, Navbar, ScrollArea, createStyles } from "@mantine/core";
import {
    IconAdjustments,
    IconCalendarStats,
    IconCategory2,
    IconFile,
    IconFileAnalytics,
    IconGauge,
    IconLock,
    IconNotes,
    IconPhotoSearch,
    IconPresentationAnalytics,
    IconVideo,
} from "@tabler/icons-react";

import { LinksGroup } from "./NavbarLinksGroup";
import MenuMantine from "../MantineUI/MenuMantine";
import { useLocation } from "react-router-dom";

// import { UserButton } from "../UserButton/UserButton";

const mockdata = [
    {
        label: "Dashboard",
        icon: IconGauge,
        // initiallyOpened: true,
        links: [
            { label: "Home", link: "/" },
            { label: "Dashboard", link: "/dashboard" },
        ],
    },
    {
        label: "Berita & Kegiatan",
        icon: IconNotes,
        initiallyOpened: true,
        links: [{ label: "Tambah", link: "/dashboard/tambah-post" }],
    },
    {
        label: "Kategori",
        icon: IconCategory2,
        links: [
            { label: "Daftar Kategori", link: "/dashboard/kategori" },
            { label: "Tambah Kategori", link: "/dashboard/tambah-kategori" },
        ],
    },
    {
        label: "Dokumen",
        icon: IconFile,
        // initiallyOpened: true,
        links: [
            { label: "Daftar Dokumen", link: "/dashboard/documents" },
            { label: "Tambah Dokumen", link: "/dashboard/tambah-document" },
        ],
    },
    {
        label: "Galeri",
        icon: IconPhotoSearch,
        links: [
            { label: "List Gallery", link: "/dashboard/gallery" },
            { label: "Tambah Galeri", link: "/dashboard/tambah-gallery" },
        ],
    },
];

const useStyles = createStyles((theme) => ({
    navbar: {
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        paddingBottom: 0,
    },

    header: {
        padding: theme.spacing.md,
        paddingTop: 0,
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        borderBottom: `1px solid ${
            theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[3]
        }`,
    },

    links: {
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
    },

    linksInner: {
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
    },

    footer: {
        marginLeft: `calc(${theme.spacing.md} * -1)`,
        marginRight: `calc(${theme.spacing.md} * -1)`,
        borderTop: `1px solid ${
            theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[3]
        }`,
    },
}));

export default function NavbarDashboard() {
    const { classes } = useStyles();
    const links = mockdata.map((item) => (
        <LinksGroup {...item} key={item.label} />
    ));

    // const withoutSidebarRoutes = [
    //     "/",
    //     "404",
    //     "/signin",
    //     "/signup",
    //     "/dashboard",
    // ];

    // const { pathname } = useLocation();
    // if (withoutSidebarRoutes.some((item) => pathname.includes(item)))
    //     return null;

    return (
        <Navbar width={{ sm: 150, lg: 280 }} p="md" className={classes.navbar}>
            <Navbar.Section
                grow
                className={classes.links}
                component={ScrollArea}
            >
                <div className={classes.linksInner}>{links}</div>
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
                <MenuMantine />
            </Navbar.Section>
        </Navbar>
    );
}
