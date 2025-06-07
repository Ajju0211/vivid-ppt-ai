import { JsonValue } from "@/generated/prisma/runtime/library";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { itemVarients, themes } from "@/lib/constants";
import { useSlideStore } from "@/store/useSlideStore";
import { useRouter } from "next/navigation";
import ThumbnailPreview from "./thumbnail-preiview";
import { timeAgo } from "@/lib/utils";
import AlertDialogBox from "../alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteProject, recoverProject } from "@/actions/projects";
type Props = {
  projectId: string;
  title: string;
  createdAt: string;
  isDeleted?: boolean;
  slideData: JsonValue;
  themeName: string;
};

const ProjectCard = ({
  projectId,
  title,
  createdAt,
  isDeleted,
  themeName,
  slideData,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleRecover = async () => {
    setLoading(true);
    if (!projectId) {
      setLoading(false);
      toast.error("Error", {
        description: "Project not found.",
      });
      return;
    }
    try {
      const res = await recoverProject(projectId);
      if (res.status !== 200) {
        toast.error("Opps!", {
          description: res.error || "Something went wrong.",
        });
        return
      }
      setOpen(false);
      router.refresh();
      toast.success("Successfully", {
        description: "Project deleted successfully",
      });
    } catch (err) {
      console.log(err);
      toast.error("Opps!", {
        description: "Something went wrong. Please contact support.",
      });
    }
  };
  const router = useRouter();
  const { setSlides } = useSlideStore();

  const theme = themes.find((theme) => theme.name === themeName || theme[0]);
  const hanndleNavigation = () => {
    setSlides(JSON.parse(JSON.stringify(slideData)));
    router.push(`/presentation/${projectId}`);
  };
  const handleDelete = async () => {
    setLoading(true);
    if (!projectId) {
      setLoading(false);
      toast.error("Error", {
        description: "Failed to delete the project.",
      });
      return;
    }
    try {
      const res = await deleteProject(projectId);
      if (res.status !== 200) {
        toast.error("Opps!", {
          description: res.error || "Something went wrong.",
        });
        return;
      }
      setOpen(false);
      router.refresh();
      toast.success("Successfully", {
        description: "Project recovered Successfully",
      });
    } catch (err) {
      console.log(err);
      toast.error("Opps!", {
        description: "Something went wrong. Please contact support.",
      });
    }
  };
  return (
    <motion.div
      className={`group w-full flex flex-col gap-y-3 rounded-xl p-3 transition-colors ${
        !isDeleted && "hover:bg-muted/50 "
      }`}
      variants={itemVarients}
    >
      <div
        className="ralative aspect-[16/10] overflow-hidden rounded-lg cursor-pointer"
        onClick={hanndleNavigation}
      >
        <ThumbnailPreview
          theme={theme}
          // slides={JSON.parse(JSON.stringify(slideData))?.[0]}
        />
      </div>

      <div className="w-full">
        <div className="space-y-1">
          <h3 className="font-semibold text-base text-primary line-clamp-1">
            {title}
          </h3>
        </div>
        <div className="flex w-full justify-between items-center gap-2">
          <p className="text-sm text-muted-foreground" suppressHydrationWarning>
            {timeAgo(createdAt)}
          </p>
          {isDeleted ? (
            <AlertDialogBox
              description="This will recover your project and restore your data."
              className="bg-green-50 text-white dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700"
              loading={loading}
              open={open}
              onClick={handleRecover}
              handleOpen={() => setOpen(!open)}
            >
              <Button
                size="sm"
                variant="ghost"
                className="bg-background-80 dark:hover:bg-background-90"
                disabled={loading}
              >
                Recover
              </Button>
            </AlertDialogBox>
          ) : (
            <AlertDialogBox
              description="This will delete your project and send to trash."
              className="bg-red-500 text-white dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700"
              onClick={handleDelete}
              loading={loading}
              open={open}
              handleOpen={() => setOpen(!open)}
            >
              <Button
                variant="ghost"
                size="sm"
                className="bg-background-80 dark:hover:bg-background-90"
                disabled={loading}
              >
                Delete
              </Button>
            </AlertDialogBox>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
