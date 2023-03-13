// import {
//     ActionIcon,
//     Badge,
//     Button,
//     Group,
//     Image,
//     List,
//     Loader,
//     Paper,
//     Table,
//     Text,
//     useMantineTheme,
// } from "@mantine/core";
// import { IconPencil, IconPlus } from "@tabler/icons-react";
// import { useDispatch, useSelector } from "react-redux";

// import DateFormatter from "../../../utils/dateFormatter";
// import { Link } from "react-router-dom";
// import React from "react";
// import { fetchAllCategoryAction } from "../../redux/slices/category/categorySlice";
// import { fetchAllPostAction } from "../../redux/slices/posts/postSlice";
// import { useEffect } from "react";

// const PostListPublic = (req, res) => {
//     // console.log(req);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(fetchAllPostAction(""));
//     }, [dispatch]);

//     useEffect(() => {
//         dispatch(fetchAllCategoryAction());
//     }, [dispatch]);

//     const theme = useMantineTheme();

//     const jobColors = {
//         sosial: "blue",
//         ekonomi: "cyan",
//         teknologi: "pink",
//     };

//     const post = useSelector((state) => state?.post);

//     const { postList = [], loading, appError, serverError } = post;
//     // console.log(postList);

//     const category = useSelector((state) => state?.category);
//     const {
//         // appError: appErrorCat,
//         categoryList,
//         // loading: loadingCat,
//         // serverError: serverErrorCat,
//     } = category;
//     // console.log(categoryList);

//     // const allCategories = categoryList?.map((category) => {
//     //     return {
//     //         label: category?.title,
//     //         value: category?.title,
//     //     };
//     // });

//     return (
//         <Paper p="xl" radius={0} style={{ minHeight: "92vh" }}>
//             <Text mb={30}>Daftar Post</Text>
//             <Button
//                 component={Link}
//                 to="/tambah-post"
//                 variant=""
//                 leftIcon={<IconPlus size={14} />}
//                 mb={10}
//             >
//                 Tambah
//             </Button>
//             <div>
//                 <div onClick={() => dispatch(fetchAllPostAction(""))}>
//                     Reset Kategori
//                 </div>
//                 {categoryList?.map((category) => (
//                     <List key={category._id}>
//                         <List.Item
//                             sx={{
//                                 width: 100,
//                                 // backgroundColor: "gray"
//                             }}
//                             onClick={() =>
//                                 dispatch(fetchAllPostAction(category?.title))
//                             }
//                         >
//                             {category?.title}
//                         </List.Item>
//                     </List>
//                 ))}
//             </div>
//             <div>
//                 {loading ? (
//                     <Loader size="xl" variant="dots" />
//                 ) : appError || serverError ? (
//                     <h2>
//                         {appError}
//                         {serverError}
//                     </h2>
//                 ) : postList?.length <= 0 ? (
//                     <h2>Tidak ada Post</h2>
//                 ) : (
//                     <Table
//                         striped
//                         highlightOnHover
//                         verticalSpacing="sm"
//                         horizontalSpacing="xl"
//                         withBorder
//                         withColumnBorders
//                         mt={10}
//                         sx={{ width: "100%" }}
//                     >
//                         <thead>
//                             <tr>
//                                 {/* <th>Author</th> */}
//                                 <th>Judul</th>
//                                 <th style={{ width: "40%" }}>Deskripsi</th>
//                                 <th>Kategori</th>
//                                 <th>Gambar</th>
//                                 <th>Dibuat</th>
//                                 <th>Aksi</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {postList &&
//                                 postList.map((post) => (
//                                     <tr key={post?._id}>
//                                         {/* <td>
//                                             <Group>
//                                                 <Avatar
//                                                     size={40}
//                                                     radius={40}
//                                                     src={
//                                                         post?.user?.profilePhoto
//                                                     }
//                                                 />
//                                                 <div>
//                                                     <Text
//                                                         size="sm"
//                                                         weight={500}
//                                                     >
//                                                         {post?.user?.fullName}
//                                                     </Text>
//                                                     <Text
//                                                         color="dimmed"
//                                                         size="xs"
//                                                     >
//                                                         {post?.user?.email}
//                                                     </Text>
//                                                 </div>
//                                             </Group>
//                                         </td> */}
//                                         <td>
//                                             <Text size="sm" weight={500}>
//                                                 {post?.title}
//                                             </Text>
//                                         </td>
//                                         <td>
//                                             <Text lineClamp={1}>
//                                                 {post?.description}
//                                             </Text>
//                                         </td>
//                                         <td>
//                                             <Badge
//                                                 color={
//                                                     jobColors[
//                                                         post?.title.toLowerCase()
//                                                     ]
//                                                 }
//                                                 variant={
//                                                     theme.colorScheme === "dark"
//                                                         ? "light"
//                                                         : "outline"
//                                                 }
//                                             >
//                                                 {post?.category}
//                                             </Badge>
//                                         </td>
//                                         <td>
//                                             <Image
//                                                 src={post?.image}
//                                                 width={50}
//                                                 fit="contain"
//                                                 alt="Gambar Rusak"
//                                             />
//                                         </td>
//                                         <td>
//                                             <DateFormatter
//                                                 date={post?.createdAt}
//                                             />
//                                         </td>
//                                         <td>
//                                             <Group spacing={0} position="left">
//                                                 <ActionIcon
//                                                     component={Link}
//                                                     // to={`/update-kategori/${post?._id}`}
//                                                     to={`/posts/update/${post?._id}`}
//                                                     color="blue"
//                                                 >
//                                                     <IconPencil
//                                                         size={16}
//                                                         stroke={1.5}
//                                                     />
//                                                 </ActionIcon>
//                                             </Group>
//                                         </td>
//                                     </tr>
//                                 ))}
//                         </tbody>
//                     </Table>
//                 )}
//             </div>
//         </Paper>
//     );
// };

// export default PostListPublic;

import {
    AspectRatio,
    Avatar,
    Box,
    Card,
    Center,
    Container,
    Divider,
    Group,
    Image,
    Loader,
    SimpleGrid,
    Text,
    createStyles,
    useMantineTheme,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";

import DateFormatter from "../../../utils/dateFormatter";
import { Link } from "react-router-dom";
import { fetchAllPostAction } from "../../redux/slices/posts/postSlice";
import { useEffect } from "react";
import { useMediaQuery } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        "&:hover": {
            transform: "scale(1.02)",
        },
        transition: "transform 500ms ease",
    },

    title: {
        fontWeight: 700,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        lineHeight: 1.2,
    },

    body: {
        padding: theme.spacing.xl,
    },
}));

export default function PostListPublic() {
    const { classes } = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllPostAction(""));
        window.scrollTo(0, 0);
    }, [dispatch]);

    const post = useSelector((state) => state?.post);
    const { postList = [], appError, serverError, loading } = post;
    console.log(postList);

    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

    return (
        <>
            {/* <Container> */}
            <Box
                sx={(theme) => ({
                    backgroundColor:
                        theme.colorScheme === "dark"
                            ? theme.colors.dark[6]
                            : theme.colors.gray[1],
                    // textAlign: "center",
                    margin: theme.spacing.lg,
                    padding: theme.spacing.xl,
                    borderRadius: theme.radius.md,
                    // cursor: "pointer",

                    // "&:hover": {
                    //     backgroundColor:
                    //         theme.colorScheme === "dark"
                    //             ? theme.colors.dark[5]
                    //             : theme.colors.gray[2],
                    // },
                })}
            >
                Home / Berita
                <SimpleGrid
                    p="xl"
                    verticalSpacing="xl"
                    cols={2}
                    breakpoints={[
                        { maxWidth: 1050, cols: 1, spacing: "md" },
                        // { maxWidth: 755, cols: 2, spacing: "sm" },
                        { maxWidth: 600, cols: 1, spacing: "sm" },
                    ]}
                >
                    {loading ? (
                        <Center inline>
                            <Loader size="xl" variant="dots" />
                        </Center>
                    ) : appError || serverError ? (
                        <h2>
                            {appError}
                            {serverError}
                        </h2>
                    ) : postList?.length <= 0 ? (
                        <h2>Tidak ada Post</h2>
                    ) : (
                        [...postList]
                            .sort((a, b) => (a > b ? 1 : -1))
                            .map((item) => {
                                return (
                                    <Card
                                        key={item._id}
                                        withBorder
                                        radius="md"
                                        // p={0}
                                        className={classes.card}
                                        shadow="xl"
                                    >
                                        <Group noWrap spacing={0}>
                                            <Image
                                                src={item.image}
                                                height={mobile ? 140 : 240}
                                                width={mobile ? 140 : 240}
                                                radius="xl"
                                            />
                                            <div className={classes.body}>
                                                <Text
                                                    transform="uppercase"
                                                    color="dimmed"
                                                    weight={700}
                                                    size="xs"
                                                >
                                                    {item.category}
                                                </Text>
                                                <Text
                                                    component={Link}
                                                    to={`/berita/${item._id}`}
                                                    className={classes.title}
                                                    mt="xs"
                                                    mb="md"
                                                >
                                                    {item.title}
                                                </Text>
                                                {/* <Divider /> */}
                                                <Group
                                                    noWrap
                                                    spacing="xs"
                                                    mt={20}
                                                >
                                                    {/* <Group spacing="xs" noWrap> */}
                                                    <Avatar
                                                        size={20}
                                                        src={
                                                            item.user
                                                                .profilePhoto
                                                        }
                                                    />
                                                    <Text size="xs">
                                                        {item.user.fullName}
                                                    </Text>
                                                    {/* </Group> */}
                                                    <Text
                                                        size="xs"
                                                        color="dimmed"
                                                    >
                                                        •
                                                    </Text>
                                                    <Text
                                                        size="xs"
                                                        color="dimmed"
                                                    >
                                                        <DateFormatter
                                                            date={
                                                                item?.createdAt
                                                            }
                                                        />
                                                    </Text>
                                                </Group>
                                            </div>
                                        </Group>
                                    </Card>
                                );
                            })
                    )}
                </SimpleGrid>
                <SimpleGrid
                    p="xl"
                    verticalSpacing="xl"
                    cols={2}
                    breakpoints={[
                        { maxWidth: 1050, cols: 1, spacing: "md" },
                        // { maxWidth: 755, cols: 2, spacing: "sm" },
                        { maxWidth: 600, cols: 1, spacing: "sm" },
                    ]}
                >
                    <AspectRatio ratio={16 / 9} sx={{ maxWidth: 500 }}>
                        <iframe
                            src="https://www.youtube.com/embed/Dorf8i6lCuk"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </AspectRatio>
                    <AspectRatio ratio={16 / 9} sx={{ maxWidth: 500 }}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d498.53206092129386!2d103.58285755645555!3d-1.6032178220115967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e25885a2db494ab%3A0x867f3a1a856bd41a!2sKantor%20Gubernur%20Jambi!5e0!3m2!1sen!2sru!4v1677471620099!5m2!1sen!2sru"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google map"
                            frameBorder="0"
                        />
                    </AspectRatio>
                </SimpleGrid>
            </Box>
            {/* </Container> */}
        </>
    );
}
