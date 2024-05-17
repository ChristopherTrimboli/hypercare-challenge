"use client";

import { useRef } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { motion, useInView } from "framer-motion";
import type { User } from "../../../types/user";

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: 0.3 }}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0.95 },
      }}
    >
      <Card>
        {isInView && (
          <CardMedia
            sx={{ height: 140 }}
            image={user?.avatar}
            title={user?.username}
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {user?.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">View More</Button>
        </CardActions>
      </Card>
    </motion.div>
  );
};

export default UserCard;
