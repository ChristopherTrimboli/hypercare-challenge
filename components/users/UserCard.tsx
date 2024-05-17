"use client";

import { useMemo, useRef } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Fade,
  Typography,
} from "@mui/material";
import useResizeObserver from "../../hooks/useResizeObserver";
import { motion, useInView } from "framer-motion";
import type { User } from "../../types/user";

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const dimensions = useResizeObserver(ref, {
    throttleTimeout: 5000,
  });

  const sizedImage = useMemo(() => {
    return `${user?.avatar.split("?")[0]}?size=${Math.round(
      dimensions?.height || 50
    )}x${Math.round(dimensions?.width || 50)}&set=set1`;
  }, [dimensions?.height, dimensions?.width, user?.avatar]);

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
          <Fade in>
            <CardMedia
              sx={{ height: 150 }}
              image={sizedImage}
              title={user?.username}
            />
          </Fade>
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
