// import {
//     ActionIcon,
//     Container,
//     Group,
//     Paper,
//     Text,
//     createStyles,
// } from "@mantine/core";
// import {
//     IconBrandInstagram,
//     IconBrandTwitter,
//     IconBrandYoutube,
// } from "@tabler/icons-react";

// import { useLocation } from "react-router-dom";

// const useStyles = createStyles((theme) => ({
//     footer: {
//         // marginTop: 20,
//         borderTop: `1px solid ${
//             theme.colorScheme === "dark"
//                 ? theme.colors.dark[5]
//                 : theme.colors.gray[2]
//         }`,
//     },

//     inner: {
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         paddingTop: theme.spacing.xl,
//         paddingBottom: theme.spacing.xl,

//         [theme.fn.smallerThan("xs")]: {
//             flexDirection: "column",
//         },
//     },

//     links: {
//         [theme.fn.smallerThan("xs")]: {
//             marginTop: theme.spacing.md,
//         },
//     },
// }));

// export default function FooterMantine() {
//     const { classes } = useStyles();

//     const withouSidebarRoutes = ["404", "/signin", "/signup", "/dashboard"];

//     const { pathname } = useLocation();
//     if (withouSidebarRoutes.some((item) => pathname.includes(item)))
//         return null;

//     return (
//         <Paper p="sm" radius={0} style={{ minHeight: "15vh" }}>
//             <div className={classes.footer}>
//                 <Container className={classes.inner}>
//                     <Text color="dimmed" size="sm">
//                         Copyright © 2023 Biro Adminitrasi Pembangunan
//                     </Text>
//                     <Group
//                         spacing={0}
//                         className={classes.links}
//                         position="right"
//                         noWrap
//                     >
//                         <ActionIcon size="lg">
//                             <IconBrandTwitter size={18} stroke={1.5} />
//                         </ActionIcon>
//                         <ActionIcon size="lg">
//                             <IconBrandYoutube size={18} stroke={1.5} />
//                         </ActionIcon>
//                         <ActionIcon size="lg">
//                             <IconBrandInstagram size={18} stroke={1.5} />
//                         </ActionIcon>
//                     </Group>
//                 </Container>
//             </div>
//         </Paper>
//     );
// }

import {
    ActionIcon,
    Container,
    Divider,
    Group,
    Text,
    createStyles,
} from "@mantine/core";
import {
    IconBrandInstagram,
    IconBrandTwitter,
    IconBrandYoutube,
} from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";

const useStyles = createStyles((theme) => ({
    footer: {
        marginTop: 120,
        paddingTop: theme.spacing.xl * 2,
        paddingBottom: theme.spacing.xl * 2,
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[1],
        borderTop: `1px solid ${
            theme.colorScheme === "dark"
                ? theme.colors.dark[5]
                : theme.colors.gray[4]
        }`,
        // position: "fixed",
        // overflow: "hidden",
        // zIndex: 10,
        // bottom: 0,
    },

    logo: {
        maxWidth: 200,

        [theme.fn.smallerThan("sm")]: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
    },

    description: {
        marginTop: 5,

        [theme.fn.smallerThan("sm")]: {
            marginTop: theme.spacing.xs,
            textAlign: "center",
        },
    },

    inner: {
        display: "flex",
        justifyContent: "space-between",

        [theme.fn.smallerThan("sm")]: {
            flexDirection: "column",
            alignItems: "center",
        },
    },

    groups: {
        display: "flex",
        flexWrap: "wrap",

        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },

    wrapper: {
        width: 160,
    },

    link: {
        display: "block",
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[1]
                : theme.colors.gray[6],
        fontSize: theme.fontSizes.sm,
        paddingTop: 3,
        paddingBottom: 3,

        "&:hover": {
            color:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[3]
                    : theme.colors.gray[9],
        },
    },

    title: {
        fontSize: theme.fontSizes.lg,
        fontWeight: 700,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        marginBottom: theme.spacing.xs / 2,
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },

    afterFooter: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: theme.spacing.xl,
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
        borderTop: `1px solid ${
            theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[4]
        }`,

        [theme.fn.smallerThan("sm")]: {
            flexDirection: "column",
        },
    },

    social: {
        [theme.fn.smallerThan("sm")]: {
            marginTop: theme.spacing.xs,
        },
    },
}));

const data = [
    {
        title: "Layanan",
        links: [
            {
                label: "Profil",
                link: "/profil",
            },
            {
                label: "Layanan #2",
                link: "#",
            },
            {
                label: "Layanan #3",
                link: "#",
            },
            {
                label: "Layanan #4",
                link: "/tambah-post",
            },
            {
                label: "Layanan #5",
                link: "/tambah-post",
            },
        ],
    },
    {
        title: "Situs Terkait",
        links: [
            {
                label: "Situs Terkait #1",
                link: "#",
            },
            {
                label: "Situs Terkait #2",
                link: "#",
            },
            {
                label: "Situs Terkait #3",
                link: "#",
            },
            {
                label: "Situs Terkait #4",
                link: "#",
            },
        ],
    },
    {
        title: "Kontak",
        links: [
            {
                label: "{No. Telp.}",
                link: "#",
            },
        ],
    },
];

export default function FooterMantine() {
    const { classes } = useStyles();

    const withouSidebarRoutes = [
        "404",
        "/signin",
        "/signup",
        "/dashboard",
        // "/posts",
        "/tambah-post",
        "/kategori",
        "/tambah-kategori",
    ];

    const { pathname } = useLocation();
    if (withouSidebarRoutes.some((item) => pathname.includes(item)))
        return null;

    const groups = data.map((group) => {
        const links = group.links.map((link, index) => (
            <Text
                key={index}
                className={classes.link}
                component={Link}
                to={link.link}
                // href={link.link}
                // onClick={(event) => event.preventDefault()}
            >
                {link.label}
            </Text>
        ));

        return (
            <div className={classes.wrapper} key={group.title}>
                <Text className={classes.title}>{group.title}</Text>
                {links}
            </div>
        );
    });

    return (
        <footer className={classes.footer}>
            <Container className={classes.inner}>
                <div className={classes.logo}>
                    LOGO ADPEMB
                    <Text
                        size="xs"
                        color="dimmed"
                        className={classes.description}
                    >
                        ALAMAT
                    </Text>
                    <Divider />
                    <Text
                        size="xs"
                        color="dimmed"
                        className={classes.description}
                    >
                        Jl. Jend. Ahmad Yani No.1, Telanaipura, Kec.
                        Telanaipura, Kota Jambi, Jambi 36128
                    </Text>
                </div>
                <div className={classes.groups}>{groups}</div>
            </Container>
            <Container className={classes.afterFooter}>
                <Text color="dimmed" size="sm">
                    {/* © 2020 mantine.dev. All rights reserved.  */}
                    Copyright © 2023 Biro Adminitrasi Pembangunan Provinsi Jambi
                </Text>

                <Group
                    spacing={0}
                    className={classes.social}
                    position="right"
                    noWrap
                >
                    <ActionIcon size="lg">
                        <IconBrandTwitter size={18} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg">
                        <IconBrandYoutube size={18} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg">
                        <IconBrandInstagram size={18} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Container>
        </footer>
    );
}
