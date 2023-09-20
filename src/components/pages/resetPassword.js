import {
    Anchor,
    Button,
    Center,
    Container,
    Group,
    Loader,
    Paper,
    Space,
    TextInput,
    Title,
    createStyles,
} from "@mantine/core";
import { IconArrowLeft, IconCheck, IconX } from "@tabler/icons-react";
import { isEmail, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { passwordResetTokenAction } from "../redux/slices/users/usersSlices";
import { showNotification } from "@mantine/notifications";

const useStyles = createStyles((theme) => ({
    title: {
        fontSize: 40,
        fontWeight: 900,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    controls: {
        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column-reverse",
        },
    },

    control: {
        [theme.fn.smallerThan("xs")]: {
            width: "100%",
            textAlign: "center",
        },
    },
}));

export default function ResetPassword() {
    const { classes } = useStyles();

    const dispatch = useDispatch();

    const form = useForm({
        initialValues: {
            email: "",
        },

        validate: {
            email: isEmail("Invalid email"),
        },
    });

    const user = useSelector((state) => state?.users);
    // console.log(user);
    const { passwordToken, loading, appError, serverError } = user;

    const formOnSubmit = form.onSubmit(
        (values) => dispatch(passwordResetTokenAction(values?.email))
        // console.log(values)
    );

    return (
        <Container size={460} my={100} sx={{ minHeight: "65vh" }}>
            <Title className={classes.title} align="center">
                Lupa password?
            </Title>

            <Space h="xl" />

            {appError || serverError
                ? showNotification({
                      title: "Oops",
                      message: appError,
                      icon: <IconX size={18} />,
                      color: "red",
                  })
                : null}

            {passwordToken
                ? showNotification({
                      title: "Sukses!",
                      message:
                          "Email telah terkirim. Silahkan tutup tab ini dan cek inbox email anda. Konfirmasi dalam waktu 3 menit!",
                      icon: <IconCheck size={18} />,
                      color: "green",
                  })
                : null}

            <form onSubmit={formOnSubmit}>
                <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
                    <TextInput
                        label="Email"
                        placeholder="xxx@mail.com"
                        required
                        disabled={loading}
                        {...form.getInputProps("email")}
                    />
                    <Group
                        position="apart"
                        mt="lg"
                        className={classes.controls}
                    >
                        <Anchor
                            color="dimmed"
                            size="sm"
                            className={classes.control}
                        >
                            <Center inline>
                                <IconArrowLeft size={12} stroke={1.5} />
                                <Anchor
                                    component={Link}
                                    to="/signin"
                                    underline={false}
                                    ml={5}
                                >
                                    Kembali
                                </Anchor>
                            </Center>
                        </Anchor>
                        {loading ? (
                            <Button
                                className={classes.control}
                                size="sm"
                                disabled
                                leftIcon={<Loader variant="oval" size="sm" />}
                            >
                                Loading...
                            </Button>
                        ) : (
                            <Button
                                className={classes.control}
                                disabled={!form.isValid()}
                                type="submit"
                                size="sm"
                                // onClick={notification}
                            >
                                Reset password
                            </Button>
                        )}
                    </Group>
                </Paper>
            </form>
        </Container>
    );
}
