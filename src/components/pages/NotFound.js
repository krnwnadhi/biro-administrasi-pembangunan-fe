import {
    Button,
    Container,
    Group,
    Text,
    Title,
    createStyles,
} from "@mantine/core";

import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
    root: {
        paddingTop: 80,
        paddingBottom: 80,
    },

    label: {
        textAlign: "center",
        fontWeight: 900,
        fontSize: 220,
        lineHeight: 1,
        marginBottom: theme.spacing.xl * 2.5,
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[4],

        [theme.fn.smallerThan("sm")]: {
            fontSize: 120,
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        textAlign: "center",
        fontWeight: 900,
        fontSize: 38,

        [theme.fn.smallerThan("sm")]: {
            fontSize: 32,
        },
    },

    description: {
        maxWidth: 500,
        margin: "auto",
        marginTop: theme.spacing.xl,
        marginBottom: theme.spacing.xl * 1.5,
    },
}));

export default function NotFound() {
    const { classes } = useStyles();

    return (
        <Container className={classes.root}>
            <div className={classes.label}>404</div>
            <Title className={classes.title}>
                Oops! Halaman tidak ditemukan.
            </Title>
            <Text
                color="dimmed"
                size="lg"
                align="center"
                className={classes.description}
            >
                Maaf, halaman yang anda cari tidak ditemukan. Mungkin anda salah
                mengetik URL? Pastikan untuk memeriksa ejaan Anda.
            </Text>
            <Group position="center">
                <Button component={Link} to="/" variant="filled" size="md">
                    Halaman Utama
                </Button>
            </Group>
        </Container>
    );
}
