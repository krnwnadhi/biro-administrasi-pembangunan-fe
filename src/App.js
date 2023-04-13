import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ColorSchemeProvider, MantineProvider, Paper } from "@mantine/core";
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
import DashboardAddPost from "./components/pages/DashboardAddPost";
import DashboardListPost from "./components/pages/DashboardListPost";
import DocumentDetails from "./components/Documents/DocumentDetails";
import DocumentDetailsPublic from "./components/Documents/public/DocumentDetailsPublic";
import DocumentList from "./components/Documents/DocumentList";
import DocumentListPublic from "./components/Documents/public/DocumentListPublic";
import FooterMantine from "./components/MantineUI/FooterMantine";
import GalleryDetails from "./components/Gallery/GalleryDetails";
import GalleryDetailsPublic from "./components/Gallery/public/GalleryDetailsPublic";
import GalleryList from "./components/Gallery/GalleryList";
import GalleryListPublic from "./components/Gallery/public/GalleryListPublic";
import HomePage from "./components/pages/HomePage";
import Informasi from "./components/pages/Informasi";
import { ModalsProvider } from "@mantine/modals";
import Navbar from "./components/Navigation/Navbar";
import NavbarDashboard from "./components/pages/NavbarDashboard";
import NotFound from "./components/pages/NotFound";
import { NotificationsProvider } from "@mantine/notifications";
import PostDetails from "./components/Posts/PostDetails";
import PostDetailsPublic from "./components/Posts/Public/PostDetailsPublic";
import PostList from "./components/Posts/PostList";
import PostListPublic from "./components/Posts/Public/PostListPublic";
import PrivateProtectRoute from "./components/Navigation/ProtectedRoutes/PrivateProtectRoute";
import Profile from "./components/pages/Profile";
import SignInMantine from "./components/pages/SignInMantine";
import UpdateCategory from "./components/Categories/UpdateCategory";
import UpdatePost from "./components/Posts/UpdatePost";

const App = () => {
    const [colorScheme, setColorScheme] = useLocalStorage({
        key: "toggle-dark-mode",
        defaultValue: "light",
        getInitialValueInEffect: true,
    });

    const toggleColorScheme = (value) =>
        setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

    useHotkeys([["mod+J", () => toggleColorScheme()]]);

    return (
        <>
            <ColorSchemeProvider
                colorScheme={colorScheme}
                toggleColorScheme={toggleColorScheme}
            >
                <MantineProvider
                    withNormalizeCSS
                    withGlobalStyles
                    theme={{
                        colorScheme,
                        // fontFamily: "Open Sans",
                        // fontFamily: "Verdana, sans-serif",
                        // fontSizes: { lg: 90 },
                        // radius: { sm: 200 },
                        // components: {
                        //     Button: {
                        //         defaultProps: { color: "green" },
                        //     },
                        // },
                    }}
                >
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

                                        <Route
                                            exact
                                            path="/profil"
                                            component={Profile}
                                        />

                                        <Route
                                            exact
                                            path="/informasi"
                                            component={Informasi}
                                        />

                                        <Route
                                            exact
                                            path="/kontak"
                                            component={Contact}
                                        />

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

                                        {/* <AdminRoute
                                            exact
                                            path="/dashboard/tambah-post"
                                            component={DashboardAddPost}
                                        /> */}

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
                                            path="/dashboard/gallery/:id"
                                            component={GalleryDetails}
                                        />

                                        <Route
                                            exact
                                            path="/gallery"
                                            component={GalleryListPublic}
                                        />

                                        <Route
                                            exact
                                            path="/gallery/:id"
                                            component={GalleryDetailsPublic}
                                        />

                                        {/* <AdminRoute
                                            exact
                                            path="/dashboard/documents/:id"
                                            component={DocumentDetails}
                                        /> */}

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

                                        <Route
                                            exact
                                            path="/documents"
                                            component={DocumentListPublic}
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
        </>
    );
};

export default App;
