"use client";

import Image from "next/image";
import { User } from "../../types/user";
import { Box, Modal, Typography } from "@mui/material";
import { useMemo } from "react";

const imageSize = 150;

const Info = ({ label, value }: { label: string; value: string }) => (
  <Typography sx={{ mt: 2 }}>
    <b>{label}:</b> {value}
  </Typography>
);

const UserInfoModal = ({
  user,
  onClose,
}: {
  user: User | null;
  onClose: () => void;
}) => {
  const sizedImage = useMemo(() => {
    return `${
      user?.avatar.split("?")[0]
    }?size=${imageSize}x${imageSize}&set=set1`;
  }, [user?.avatar]);

  if (!user) {
    return null;
  }

  return (
    <Modal
      open
      onClose={onClose}
      aria-labelledby="user-modal-title"
      aria-describedby="user-modal-description"
    >
      <Box
        id="user-modal-description"
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          pb: 0,
        }}
      >
        <Typography id="user-modal-title" variant="h4">
          {user.username}
        </Typography>

        <Info label="Name" value={`${user.firstname} ${user.lastname}`} />

        <Info label="Email" value={user.email} />
        <Info label="Role" value={user.role} />
        <Info label="Join Date" value={user.join_date} />
        <Info label="Description" value={user.description} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src={sizedImage}
            alt={user.username}
            width={imageSize}
            height={imageSize}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default UserInfoModal;
