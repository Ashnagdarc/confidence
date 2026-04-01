"use client";

import {
  CoverFlow as BaseCoverFlow,
  type CoverFlowItem,
  type CoverFlowProps,
} from "@ashishgogula/coverflow";

import { cn } from "@/lib/utils";

import styles from "./coverflow.module.css";

export type { CoverFlowItem, CoverFlowProps };

export function CoverFlow({ className, ...props }: CoverFlowProps) {
  return <BaseCoverFlow {...props} className={cn(styles.scope, className)} />;
}
