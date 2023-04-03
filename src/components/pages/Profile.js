// import {
//     Center,
//     Container,
//     Group,
//     ScrollArea,
//     Table,
//     Text,
//     TextInput,
//     UnstyledButton,
//     createStyles,
// } from "@mantine/core";
// import {
//     IconChevronDown,
//     IconChevronUp,
//     IconSearch,
//     IconSelector,
// } from "@tabler/icons-react";

// import { keys } from "@mantine/utils";
// import { useState } from "react";

// const useStyles = createStyles((theme) => ({
//     th: {
//         padding: "0 !important",
//     },

//     control: {
//         width: "100%",
//         padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

//         "&:hover": {
//             backgroundColor:
//                 theme.colorScheme === "dark"
//                     ? theme.colors.dark[6]
//                     : theme.colors.gray[0],
//         },
//     },

//     icon: {
//         width: 21,
//         height: 21,
//         borderRadius: 21,
//     },
// }));

// function Th({ children, reversed, sorted, onSort }) {
//     const { classes } = useStyles();
//     const Icon = sorted
//         ? reversed
//             ? IconChevronUp
//             : IconChevronDown
//         : IconSelector;
//     return (
//         <th className={classes.th}>
//             <UnstyledButton onClick={onSort} className={classes.control}>
//                 <Group position="apart">
//                     <Text weight={500} size="sm">
//                         {children}
//                     </Text>
//                     <Center className={classes.icon}>
//                         <Icon size={14} stroke={1.5} />
//                     </Center>
//                 </Group>
//             </UnstyledButton>
//         </th>
//     );
// }

// function filterData(data, search) {
//     const query = search.toLowerCase().trim();
//     return data.filter((item) =>
//         keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
//     );
// }

// function sortData(data, payload) {
//     const { sortBy } = payload;

//     if (!sortBy) {
//         return filterData(data, payload.search);
//     }

//     return filterData(
//         [...data].sort((a, b) => {
//             if (payload.reversed) {
//                 return b[sortBy].localeCompare(a[sortBy]);
//             }

//             return a[sortBy].localeCompare(b[sortBy]);
//         }),
//         payload.search
//     );
// }

// const data = [
//     {
//         name: "Athena Weissnat",
//         company: "Little - Rippin",
//         email: "Elouise.Prohaska@yahoo.com",
//     },
//     {
//         name: "Deangelo Runolfsson",
//         company: "Greenfelder - Krajcik",
//         email: "Kadin_Trantow87@yahoo.com",
//     },
//     {
//         name: "Danny Carter",
//         company: "Kohler and Sons",
//         email: "Marina3@hotmail.com",
//     },
//     {
//         name: "Trace Tremblay PhD",
//         company: "Crona, Aufderhar and Senger",
//         email: "Antonina.Pouros@yahoo.com",
//     },
//     {
//         name: "Derek Dibbert",
//         company: "Gottlieb LLC",
//         email: "Abagail29@hotmail.com",
//     },
//     {
//         name: "Viola Bernhard",
//         company: "Funk, Rohan and Kreiger",
//         email: "Jamie23@hotmail.com",
//     },
//     {
//         name: "Austin Jacobi",
//         company: "Botsford - Corwin",
//         email: "Genesis42@yahoo.com",
//     },
//     {
//         name: "Hershel Mosciski",
//         company: "Okuneva, Farrell and Kilback",
//         email: "Idella.Stehr28@yahoo.com",
//     },
//     {
//         name: "Mylene Ebert",
//         company: "Kirlin and Sons",
//         email: "Hildegard17@hotmail.com",
//     },
//     {
//         name: "Lou Trantow",
//         company: "Parisian - Lemke",
//         email: "Hillard.Barrows1@hotmail.com",
//     },
//     {
//         name: "Dariana Weimann",
//         company: "Schowalter - Donnelly",
//         email: "Colleen80@gmail.com",
//     },
//     {
//         name: "Dr. Christy Herman",
//         company: "VonRueden - Labadie",
//         email: "Lilyan98@gmail.com",
//     },
//     {
//         name: "Katelin Schuster",
//         company: "Jacobson - Smitham",
//         email: "Erich_Brekke76@gmail.com",
//     },
//     {
//         name: "Melyna Macejkovic",
//         company: "Schuster LLC",
//         email: "Kylee4@yahoo.com",
//     },
//     {
//         name: "Pinkie Rice",
//         company: "Wolf, Trantow and Zulauf",
//         email: "Fiona.Kutch@hotmail.com",
//     },
//     {
//         name: "Brain Kreiger",
//         company: "Lueilwitz Group",
//         email: "Rico98@hotmail.com",
//     },
// ];

// export default function Profile() {
//     const [search, setSearch] = useState("");
//     const [sortedData, setSortedData] = useState(data);
//     const [sortBy, setSortBy] = useState(null);
//     const [reverseSortDirection, setReverseSortDirection] = useState(false);

//     const setSorting = (field) => {
//         const reversed = field === sortBy ? !reverseSortDirection : false;
//         setReverseSortDirection(reversed);
//         setSortBy(field);
//         setSortedData(sortData(data, { sortBy: field, reversed, search }));
//     };

//     const handleSearchChange = (event) => {
//         const { value } = event.currentTarget;
//         setSearch(value);
//         setSortedData(
//             sortData(data, {
//                 sortBy,
//                 reversed: reverseSortDirection,
//                 search: value,
//             })
//         );
//     };

//     const rows = sortedData.map((row) => (
//         <tr key={row.name}>
//             <td>{row.name}</td>
//             <td>{row.email}</td>
//             <td>{row.company}</td>
//         </tr>
//     ));

//     return (
//         <Container>
//             <ScrollArea>
//                 <TextInput
//                     placeholder="Search by any field"
//                     mb="md"
//                     icon={<IconSearch size={14} stroke={1.5} />}
//                     value={search}
//                     onChange={handleSearchChange}
//                 />
//                 <Table
//                     horizontalSpacing="md"
//                     verticalSpacing="xs"
//                     sx={{ tableLayout: "fixed", minWidth: 700 }}
//                 >
//                     <thead>
//                         <tr>
//                             <Th
//                                 sorted={sortBy === "name"}
//                                 reversed={reverseSortDirection}
//                                 onSort={() => setSorting("name")}
//                             >
//                                 Name
//                             </Th>
//                             <Th
//                                 sorted={sortBy === "email"}
//                                 reversed={reverseSortDirection}
//                                 onSort={() => setSorting("email")}
//                             >
//                                 Email
//                             </Th>
//                             <Th
//                                 sorted={sortBy === "company"}
//                                 reversed={reverseSortDirection}
//                                 onSort={() => setSorting("company")}
//                             >
//                                 Company
//                             </Th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {rows.length > 0 ? (
//                             rows
//                         ) : (
//                             <tr>
//                                 <td colSpan={Object.keys(data[0]).length}>
//                                     <Text weight={500} align="center">
//                                         Nothing found
//                                     </Text>
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </Table>
//             </ScrollArea>
//         </Container>
//     );
// }

import { Avatar, Card, Group, Image, Text, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    },

    title: {
        fontWeight: 700,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        lineHeight: 1.2,
    },

    body: {
        padding: theme.spacing.md,
    },
}));

const data = {
    image: "https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    category: "technology",
    title: "The best laptop for Frontend engineers in 2022",
    date: "Feb 6th",
    author: {
        name: "Elsa Brown",
        avatar: "https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    },
};

export default function Profile() {
    const { classes } = useStyles();
    console.log(data);
    return (
        <Card withBorder radius="md" p={0} className={classes.card}>
            <Group noWrap spacing={0}>
                <Image src={data.image} height={140} width={140} />
                <div className={classes.body}>
                    <Text
                        transform="uppercase"
                        color="dimmed"
                        weight={700}
                        size="xs"
                    >
                        {data.category}
                    </Text>
                    <Text className={classes.title} mt="xs" mb="md">
                        {data.title}
                    </Text>
                    <Group noWrap spacing="xs">
                        <Group spacing="xs" noWrap>
                            <Avatar size={20} src={data.author.avatar} />
                            <Text size="xs">{data.author.name}</Text>
                        </Group>
                        <Text size="xs" color="dimmed">
                            •
                        </Text>
                        <Text size="xs" color="dimmed">
                            {data.date}
                        </Text>
                    </Group>
                </div>
            </Group>
        </Card>
    );
}
