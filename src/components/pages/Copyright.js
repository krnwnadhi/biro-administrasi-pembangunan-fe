import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";

const Copyright = (props) => {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {" "}
            {"Copyright © "}
            <NavLink to="/">Biro Administrasi Pembangunan</NavLink> 2023
            {"."}
        </Typography>
    );
};

export default Copyright;
