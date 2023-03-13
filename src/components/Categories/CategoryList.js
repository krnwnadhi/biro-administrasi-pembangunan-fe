import {
    ActionIcon,
    Avatar,
    Badge,
    Button,
    Group,
    Loader,
    Paper,
    Table,
    Text,
    useMantineTheme,
} from "@mantine/core";
import { IconPencil, IconPlus } from "@tabler/icons-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DateFormatter from "../../utils/dateFormatter";
import { Link } from "react-router-dom";
import { fetchAllCategoryAction } from "../redux/slices/category/categorySlice";

const CategoryList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllCategoryAction());
    }, [dispatch]);

    const theme = useMantineTheme();

    const category = useSelector((state) => state?.category);

    const { categoryList = [], loading, appError, serverError } = category;

    console.log(category);

    const jobColors = {
        sosial: "blue",
        ekonomi: "cyan",
        teknologi: "pink",
    };

    return (
        <Paper p="xl" radius={0} style={{ minHeight: "92vh" }}>
            <Text mb={30}>Daftar Kategori</Text>
            <Button
                component={Link}
                to="/tambah-kategori"
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
                                <th>Author</th>
                                <th>Title</th>
                                <th>createdAt</th>
                                <th>Action</th>
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
                                                        {category?.user?.email}
                                                    </Text>
                                                </div>
                                            </Group>
                                        </td>
                                        <td>
                                            <Badge
                                                color={
                                                    jobColors[
                                                        category?.title.toLowerCase()
                                                    ]
                                                }
                                                variant={
                                                    theme.colorScheme === "dark"
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
                                            <Group spacing={0} position="left">
                                                <ActionIcon
                                                    component={Link}
                                                    to={`/update-kategori/${category?._id}`}
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
        </Paper>
    );
};

export default CategoryList;
