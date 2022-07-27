import React, { useEffect, useState } from "react";
import { fetchClient } from "../../service";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate } from "react-router-dom";

import { StyledBadge } from "./styled";

function Home() {
  const [data, setData] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    return () => {
      fetchClient
        .get("http://api.nitirat.co.th/user/profile")
        .then((res) => res.data)
        .then((result) => {
          result.statusCode === 200 && setData(result.data);
        })
    };
  }, []);

  function Logout(event) {
    event.preventDefault();

    localStorage.removeItem("token");
    navigate("/login");
  }
  
  if (!data) {
    return (
      <>
        <Stack>
          <Card sx={{ maxWidth: 275, m: 2 }}>
            <CardHeader
              avatar={<Skeleton variant="circular" width={40} height={40} />}
              title={<Skeleton height={10} />}
              subheader={<Skeleton height={10} width="70%" />}
            />
            <CardContent>
              <Skeleton height={10} />
              <Skeleton height={10} />
              <Skeleton height={10} width="80%" />
            </CardContent>
          </Card>
        </Stack>
      </>
    );
  }

  return (
    <>
      <Stack>
        <Card sx={{ maxWidth: 275, m: 2 }}>
          <CardHeader
            avatar={
              data ? (
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar
                    alt="Remy Sharp"
                    src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
                  />
                </StyledBadge>
              ) : (
                <Avatar
                  alt="Remy Sharp"
                  src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
                />
              )
            }
            title={data.username}
            subheader={new Date(data.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          />
          <CardContent>
            <Typography color="text.secondary">
            Employee Id: {data.employeeId}
            </Typography>
            <Typography color="text.secondary">
              Role: {data.role}
            </Typography>
            <Typography color="text.secondary">
            Updated: {new Date(data.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
            </Typography>
          </CardContent>
        </Card>
        <Button onClick={(event) => Logout(event)}>Logout</Button>
      </Stack>
    </>
  );
}

export default Home;
