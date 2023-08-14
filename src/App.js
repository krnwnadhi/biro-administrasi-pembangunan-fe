import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import {
    Center,
    ColorSchemeProvider,
    Container,
    Loader,
    MantineProvider,
    Paper,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";

import About from "./components/pages/Contact";
import AddCategory from "./components/Categories/AddCategory";
import AdminRoute from "./components/Navigation/ProtectedRoutes/AdminRoute";
import CategoryList from "./components/Categories/CategoryList";
import Contact from "./components/pages/Contact";
import CreateDocument from "./components/Documents/CreateDocument";
import CreateGallery from "./components/Gallery/CreateGallery";
import CreatePost from "./components/Posts/CreatePost";
import Dashboard from "./components/pages/Dashboard";
import DocumentList from "./components/Documents/DocumentList";
import Dokumen from "./components/pages/Informasi/Dokumen/Dokumen";
import FooterMantine from "./components/MantineUI/FooterMantine";
import GalleryList from "./components/Gallery/GalleryList";
import GalleryListPublic from "./components/Gallery/public/GalleryListPublic";
import HomePage from "./components/pages/HomePage";
import IndexProfile from "./components/pages/Profil/IndexProfile";
import { ModalsProvider } from "@mantine/modals";
import Navbar from "./components/Navigation/Navbar";
import NavbarDashboard from "./components/pages/NavbarDashboard";
// import { NavigationProgress } from "@mantine/nprogress";
import NotFound from "./components/pages/NotFound";
import { NotificationsProvider } from "@mantine/notifications";
import PostDetails from "./components/Posts/PostDetails";
import PostDetailsPublic from "./components/Posts/Public/PostDetailsPublic";
import PostList from "./components/Posts/PostList";
import PostListPublic from "./components/Posts/Public/PostListPublic";
import SelayangPandang from "./components/pages/Profil/IndexProfile";
import SignInMantine from "./components/pages/SignInMantine";
import Struktur from "./components/pages/Profil/Struktur";
import UpdateCategory from "./components/Categories/UpdateCategory";
import UpdateGallery from "./components/Gallery/UpdateGallery";
import UpdatePost from "./components/Posts/UpdatePost";
import VideoList from "./components/video/VideoList";
import VisiMisi from "./components/pages/Profil/VisiMisi";

const App = () => {
    const [colorScheme, setColorScheme] = useLocalStorage({
        key: "toggle-dark-mode",
        defaultValue: "dark",
        getInitialValueInEffect: true,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1500);
    }, []);

    const toggleColorScheme = (value) =>
        setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

    useHotkeys([["mod+J", () => toggleColorScheme()]]);

    return (
        <>
            {loading === false ? (
                <ColorSchemeProvider
                    colorScheme={colorScheme}
                    toggleColorScheme={toggleColorScheme}
                >
                    <MantineProvider
                        withNormalizeCSS
                        withGlobalStyles
                        theme={{
                            colorScheme,
                            loader: "dots",
                            // components: {
                            //     Container: {
                            //         defaultProps: {
                            //             sizes: {
                            //                 xs: 540,
                            //                 sm: 720,
                            //                 md: 960,
                            //                 lg: 1140,
                            //                 xl: 1320,
                            //             },
                            //         },
                            //     },
                            // },
                            // fontFamily: "Open Sans",
                            fontFamily: "Arial, sans-serif",
                            // fontSizes: { lg: 90 },
                            // radius: { sm: 200 },
                            // components: {
                            //     Button: {
                            //         defaultProps: { color: "green" },
                            //     },
                            // },
                        }}
                    >
                        {/* <NavigationProgress /> */}
                        <ModalsProvider>
                            <NotificationsProvider limit={5}>
                                <BrowserRouter>
                                    <Paper>
                                        <Navbar />
                                        {/* <NavbarDashboard /> */}
                                        <Switch>
                                            <Route
                                                exact
                                                path="/signin"
                                                component={SignInMantine}
                                            />

                                            <Route
                                                exact
                                                path="/"
                                                component={HomePage}
                                            />

                                            {/* <Route
                                                exact
                                                path="/profil"
                                                component={Profile}
                                            /> */}

                                            <Route
                                                exact
                                                path="/profil/:tabValue"
                                                component={IndexProfile}
                                            />

                                            <Route
                                                exact
                                                path="/selayangpandang"
                                                component={SelayangPandang}
                                            />

                                            <Route
                                                exact
                                                path="/visimisi"
                                                component={VisiMisi}
                                            />

                                            <Route
                                                exact
                                                path="/struktur"
                                                component={Struktur}
                                            />

                                            <Route
                                                exact
                                                path="/dokumen"
                                                component={Dokumen}
                                            />

                                            {/* <Route
                                            exact
                                            path="/kontak"
                                            component={Contact}
                                        /> */}

                                            <Route
                                                exact
                                                path="/about"
                                                component={About}
                                            />

                                            <AdminRoute
                                                exact
                                                path="/dashboard"
                                                component={Dashboard}
                                            />

                                            <AdminRoute
                                                exact
                                                path="/dashboard/tambah-post"
                                                component={CreatePost}
                                            />

                                            {/* <AdminRoute
                                            exact
                                            path="/dashboard/posts"
                                            component={PostList}
                                        /> */}

                                            <AdminRoute
                                                exact
                                                path="/dashboard/tambah-kategori"
                                                component={AddCategory}
                                            />

                                            <AdminRoute
                                                exact
                                                path="/dashboard/kategori"
                                                component={CategoryList}
                                            />

                                            <AdminRoute
                                                exact
                                                path="/dashboard/update-kategori/:id"
                                                component={UpdateCategory}
                                            />

                                            <AdminRoute
                                                exact
                                                path="/dashboard/daftar-post"
                                                component={PostList}
                                            />

                                            <AdminRoute
                                                exact
                                                path="/posts"
                                                component={PostList}
                                            />

                                            <AdminRoute
                                                exact
                                                path="/posts/:id"
                                                component={PostDetails}
                                            />

                                            <Route
                                                exact
                                                path="/berita"
                                                component={PostListPublic}
                                            />

                                            <Route
                                                exact
                                                path="/berita/:id"
                                                component={PostDetailsPublic}
                                            />

                                            <AdminRoute
                                                exact
                                                path="/posts/update/:id"
                                                component={UpdatePost}
                                            />

                                            <AdminRoute
                                                exact
                                                path="/dashboard/gallery"
                                                component={GalleryList}
                                            />

                                            <AdminRoute
                                                exact
                                                path="/dashboard/tambah-gallery"
                                                component={CreateGallery}
                                            />

                                            <AdminRoute
                                                exact
                                                path="/dashboard/update-gallery/:id"
                                                component={UpdateGallery}
                                            />

                                            <Route
                                                exact
                                                path="/gallery"
                                                component={GalleryListPublic}
                                            />

                                            <AdminRoute
                                                exact
                                                path="/dashboard/documents"
                                                component={DocumentList}
                                            />

                                            <AdminRoute
                                                exact
                                                path="/dashboard/tambah-document"
                                                component={CreateDocument}
                                            />

                                            {/* <Route
                                            exact
                                            path="/documents/:id"
                                            component={DocumentDetailsPublic}
                                        /> */}

                                            {/* {isAdmin && ( */}
                                            {/* <Route
                                    exact
                                    path="/dashboard"
                                    component={Dashboard}
                                /> */}
                                            {/* )} */}

                                            <Route
                                                exact
                                                path="/404"
                                                component={NotFound}
                                            />
                                            <Route exact path="*">
                                                <Redirect to="/404" />
                                            </Route>
                                        </Switch>
                                        <FooterMantine />
                                    </Paper>
                                </BrowserRouter>
                            </NotificationsProvider>
                        </ModalsProvider>
                    </MantineProvider>
                </ColorSchemeProvider>
            ) : (
                // <Container size="xl">
                <Center style={{ width: "auto", height: 600 }}>
                    <Loader variant="dots" size="xl" />
                </Center>
                // </Container>
            )}
        </>
    );
};

export default App;
