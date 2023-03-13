import {
    Button,
    Container,
    Overlay,
    Text,
    Title,
    createStyles,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
    hero: {
        position: "relative",
        backgroundImage:
            "url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)",
        // backgroundImage: "url(https://source.unsplash.com/random)",

        backgroundSize: "cover",
        backgroundPosition: "center",
    },

    container: {
        height: 700,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        paddingBottom: theme.spacing.xl * 10,
        zIndex: 1,
        position: "relative",

        [theme.fn.smallerThan("sm")]: {
            height: 500,
            paddingBottom: theme.spacing.xl * 3,
        },
    },

    title: {
        color: theme.white,
        fontSize: 50,
        fontWeight: 900,
        // lineHeight: 1.1,

        [theme.fn.smallerThan("sm")]: {
            fontSize: 40,
            lineHeight: 1.2,
        },

        [theme.fn.smallerThan("xs")]: {
            fontSize: 28,
            lineHeight: 1.3,
        },
    },

    description: {
        color: theme.white,
        maxWidth: 600,

        [theme.fn.smallerThan("sm")]: {
            maxWidth: "100%",
            fontSize: theme.fontSizes.sm,
        },
    },

    control: {
        marginTop: theme.spacing.xl * 1.5,

        [theme.fn.smallerThan("sm")]: {
            width: "100%",
        },
    },
}));

export default function HeroHeaderMantine() {
    const { classes } = useStyles();

    return (
        <div className={classes.hero}>
            <Overlay
                gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 80%)"
                opacity={1}
                zIndex={0}
            />
            <Container className={classes.container}>
                <Title className={classes.title}>
                    Biro Administrasi Pembangunan Provinsi Jambi
                </Title>
                <Text className={classes.description} size="xl" mt="xl">
                    Selamat Datang di Website
                </Text>
                <Text className={classes.description} size="xl">
                    Biro Administrasi Pembangunan Provinsi Jambi
                </Text>

                {/* <Button
                    variant="gradient"
                    size="xl"
                    radius="xl"
                    className={classes.control}
                >
                    Get started
                </Button> */}
            </Container>
        </div>
    );
}
