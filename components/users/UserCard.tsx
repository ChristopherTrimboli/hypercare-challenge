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

const cardImageHeight = 250;

interface UserCardProps {
  user: User;
  onViewUser: (userId: string) => void;
}

const UserCard = ({ user, onViewUser }: UserCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const dimensions = useResizeObserver(ref, {
    throttleTimeout: 5000,
  });

  const sizedImage = useMemo(() => {
    return `${user?.avatar.split("?")[0]}?size=${Math.round(
      dimensions?.width || cardImageHeight
    )}x${cardImageHeight}&set=set1`;
  }, [dimensions?.width, user?.avatar]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: 0.3 }}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0.9 },
      }}
      data-testid="user-card"
    >
      <Card>
        {isInView && (
          <Fade in>
            <CardMedia
              sx={{ height: cardImageHeight }}
              image={sizedImage}
              title={user?.username}
            />
          </Fade>
        )}
        <CardContent
          sx={{
            minHeight: "9rem",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {user?.firstname} {user?.lastname}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              whiteSpace: "normal",
              maxHeight: "4.5rem",
              lineHeight: "1.5",
            }}
          >
            {user?.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => onViewUser(user?.id)}
            size="small"
            fullWidth
            sx={{
              textTransform: "none",
            }}
          >
            View More
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
};

export default UserCard;
